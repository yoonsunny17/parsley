import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithReAuth } from ".";

export const notificationApi = createApi({
    reducerPath: "notificationApi",
    baseQuery: baseQueryWithReAuth,
    endpoints: (builder) => ({}),
});

export const {} = notificationApi;
