import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithReAuth } from ".";

export const userRoomApi = createApi({
    reducerPath: "userRoomApi",
    baseQuery: baseQueryWithReAuth,
    endpoints: (builder) => ({
        joinRoom: builder.mutation({
            query: (roomId) => {
                return {
                    url: `/user/room/add`,
                    method: "POST",
                    body: { roomId },
                };
            },
            invalidatesTags: ["Room"],
        }),
        withdrawRoom: builder.mutation({
            query: (roomId) => {
                return {
                    url: `/user/room/delete`,
                    method: "POST",
                    body: { roomId },
                };
            },
            invalidatesTags: ["Room"],
        }),
    }),
});

export const { useJoinRoomMutation, useWithdrawRoomMutation } = userRoomApi;
