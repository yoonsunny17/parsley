import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_URL } from ".";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        kakaoLogin: builder.query({
            query: () => `/auth/login`,
        }),
        logout: builder.query({
            query: () => `/auth/logout`,
        }),
    }),
});

export const { useKakaoLoginQuery, useLogoutQuery } = userApi;
