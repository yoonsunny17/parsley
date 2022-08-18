import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithReAuth } from ".";
import { setRoom } from "../modules/roomReducer";
import { setUser } from "../modules/userReducer";
import { roomApi } from "./room";

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
            async onQueryStarted(_, { dispatch, getState, queryFulFilled }) {
                try {
                    await queryFulFilled;
                    const room = getState().room.room;
                    const user = getState().user.user;
                    const newRoom = {
                        ...room,
                        members: [...room.members, user],
                    };
                    dispatch(setRoom(newRoom));
                    dispatch(roomApi.util.invalidateTags(["Room"]));
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
            async onQueryStarted(_, { dispatch, getState, queryFulFilled }) {
                try {
                    await queryFulFilled;
                    const room = getState().room.room;
                    const user = getState().user.user;
                    const newRoom = {
                        ...room,
                        members: room.members.filter(
                            (member) => member.id !== user.id
                        ),
                    };
                    console.log(room);
                    dispatch(setRoom(newRoom));
                    console.log(newRoom);
                    console.log(getState().room.room);
                    dispatch(roomApi.util.invalidateTags(["Room"]));
                } catch (err) {
                    console.log(err);
                }
            },
        }),
        addLikeRoom: builder.mutation({
            query: (roomId) => {
                return {
                    url: `/user/like/add`,
                    method: "POST",
                    body: { roomId },
                };
            },
            async onQueryStarted(_, { dispatch, getState, queryFulFilled }) {
                try {
                    await queryFulFilled;
                    const user = getState().user.user;
                    const newRoom = getState().room.room;
                    const newUser = {
                        ...user,
                        interestRooms: [...user.interestRooms, newRoom],
                    };
                    dispatch(setUser(newUser));
                } catch (err) {
                    console.log(err);
                }
            },
        }),
        deleteLikeRoom: builder.mutation({
            query: (roomId) => {
                return {
                    url: `/user/like/delete`,
                    method: "POST",
                    body: { roomId },
                };
            },
            async onQueryStarted(_, { dispatch, getState, queryFulFilled }) {
                try {
                    await queryFulFilled;
                    const user = getState().user.user;
                    const deleteRoom = getState().room.room;
                    const newUser = {
                        ...user,
                        interestRooms: user.interestRooms.filter(
                            (room) => room.id !== deleteRoom.id
                        ),
                    };
                    dispatch(setUser(newUser));
                } catch (err) {
                    console.log(err);
                }
            },
        }),
    }),
});

export const {
    useJoinRoomMutation,
    useWithdrawRoomMutation,
    useAddLikeRoomMutation,
    useDeleteLikeRoomMutation,
} = userRoomApi;
