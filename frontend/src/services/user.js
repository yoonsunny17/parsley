import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_URL } from ".";
import { login, logout, setToken, setUserId } from "../modules/userReducer";
import { parseJwt } from "../util/common";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        kakaoLogin: builder.query({
            query: (code) => `/auth/login?code=${code}`,
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(login());
                    dispatch(setToken(data?.accessToken));
                    dispatch(setUserId(parseJwt(data?.accessToken)));
                } catch (err) {
                    alert("로그인 실패: ", err);
                }
            },
        }),
        logout: builder.query({
            query: () => `/auth/logout`,
            onQueryStarted(_, { dispatch }) {
                try {
                    dispatch(logout());
                    dispatch(setToken(null));
                    dispatch(setUserId(null));
                } catch (err) {
                    alert("로그아웃 실패: ", err);
                }
            },
        }),
    }),
});

export const { useKakaoLoginQuery, useLazyLogoutQuery } = userApi;
