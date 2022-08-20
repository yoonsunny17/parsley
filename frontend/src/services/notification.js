import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithReAuth } from ".";
import { setNotificationCnt } from "../modules/notificationReducer";

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
      async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
        try {
          const notificationCnt = await queryFulfilled;
          console.log("알림가져오기");
          console.log(notificationCnt);
          dispatch(setNotificationCnt(notificationCnt?.data.uncheckCnt));
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useReadNotificationMutation, useGetNotificationCntQuery } =
  notificationApi;
