import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQuery, baseQueryWithReAuth } from ".";
import { login, logout, setToken, setUserId } from "../modules/userReducer";
import { parseJwt } from "../util/common";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: baseQueryWithReAuth,
    endpoints: (builder) => ({
        kakaoLogin: builder.query({
            query: (code) => `/auth/login?code=${code}`,
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(login());
                    dispatch(setToken(result?.data.accessToken));
                    dispatch(
                        setUserId(parseJwt(result?.data.accessToken).user.id)
                    );
                } catch (err) {
                        console.log(err);
                }
            },
        }),
        logout: builder.query({
            query: () => `/auth/logout`,
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(logout());
                    dispatch(setToken(null));
                    dispatch(setUserId(null));
                } catch (err) {
                    console.log(err);
                }
            },
        }),
    }),
});

export const { useKakaoLoginQuery, useLogoutQuery, useLazyLogoutQuery } =
    authApi;
