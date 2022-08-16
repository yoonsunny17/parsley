import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithReAuth } from ".";

export const notificationApi = createApi({
    reducerPath: "notificationApi",
    baseQuery: baseQueryWithReAuth,
    endpoints: (builder) => ({
        readNotification: builder.mutation({
            query: () => {
                return {
                    url: `/notification`,
                    method: "POST",
                };
            },
        }),
        getNotificationCnt: builder.query({
            query: () => `/notification/cnt`,
        }),
    }),
});

export const { useReadNotificationMutation, useGetNotificationCntQuery } =
    notificationApi;
