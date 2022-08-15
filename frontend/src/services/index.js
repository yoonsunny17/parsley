import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { Mutex } from "async-mutex";
import { setToken } from "../modules/userReducer";

export const BASE_URL = process.env.REACT_APP_API_URL;
const REDIRECT_URI = process.env.REACT_APP_APP_URL + "/login";
const REST_API_KEY = process.env.REACT_APP_API_KEY;
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

const mutex = new Mutex();
export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().user.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReAuth = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.data.status === 444) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        let result = await baseQuery(`/auth/refresh`, api, extraOptions);
        if (result?.data.accessToken) {
          api.dispatch(setToken(result?.data.accessToken));

          // Retry Initial Query
          result = await baseQuery(args, api, extraOptions);
        } else {
          await baseQuery(`/auth/logout`, api, extraOptions);
          window.location.href = "/";
        }
      } catch (err) {
        alert(err);
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  } else if (result?.error?.data.status === 445) {
    await baseQuery(`/auth/logout`, api, extraOptions);
    window.location.href = "/";
  }

  return result;
};
