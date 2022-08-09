import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { Mutex } from "async-mutex";

export const BASE_URL = process.env.REACT_APP_API_URL;

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

// const baseQueryWithReAuth = async () => {
//     await mutex.waitForUnlock();
//     let result = await baseQuery();
// };

// TODO: 로그인 연동
// Bearer token ${accessToken}
// 444 에러 -> /auth/refresh 요청을 하고, 원래 하려고 했던 걸 재요청
// 445 에러 -> 재로그인해라

// refresh token은 cookie에서 갖고 와서 구현 X

// /auth/login => response entity 를 보여줌
// (이걸 확인하면, 로그인에 성공했구나 => 원래 있었던 페이지로 보내줌)

// redis key 값은 email 로 설정해놓음
