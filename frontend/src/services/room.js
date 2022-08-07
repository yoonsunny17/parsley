import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_URL } from ".";

export const roomApi = createApi({
    reducerPath: "roomApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getAllRooms: builder.query({
            query: () => `/room`,
        }),
        getRoom: builder.query({
            query: (roomId) => `/room/${roomId}`,
        }),
        createRoom: builder.mutation({
            query: (room) => ({
                url: `/room/create`,
                method: "POST",
                body: room,
            }),
        }),
        updateRoom: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/room/${id}/update`,
                method: "POST",
                body: rest,
            }),
        }),
        deleteRoom: builder.mutation({
            query: (id) => ({
                url: `/room/${id}`,
                method: "POST",
            }),
        }),
    }),
});

export const {
    useGetAllRoomsQuery,
    useGetRoomQuery,
    useCreateRoomMutation,
    useUpdateRoomMutation,
    useDeleteRoomMutation,
} = roomApi;
