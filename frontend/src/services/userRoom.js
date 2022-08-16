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
            async onQueryStarted(_, { dispatch, queryFulFilled }) {
                try {
                    const result = await queryFulFilled;
                } catch (err) {
                    console.log(err);
                }
            },
        }),
        withdrawRoom: builder.mutation({
            query: (roomId) => {
                return {
                    url: `/user/room/delete`,
                    method: "POST",
                    body: { roomId },
                };
            },
        }),
    }),
});

export const { useJoinRoomMutation, useWithdrawRoomMutation } = userRoomApi;
