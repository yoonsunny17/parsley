import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithReAuth } from ".";

export const roomApi = createApi({
  reducerPath: "roomApi",
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    getAllRooms: builder.query({
      query: () => `/room`,
    }),
    getRoom: builder.query({
      query: (roomId) => `/room/${roomId}`,
      providesTags: ["Room"],
    }),
    createRoom: builder.mutation({
      query: (room) => {
        return {
          url: `/room/create`,
          method: "POST",
          body: room,
        };
      },
    }),
    updateRoom: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/room/${id}/update`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["Room"],
    }),
    deleteRoom: builder.mutation({
      query: (id) => ({
        url: `/room/${id}`,
        method: "POST",
      }),
    }),
    getStudySession: builder.query({
      query: (roomId) => `/room/session/${roomId}`,
    }), // 스터디룸 참가
    addStudyRooms: builder.query({
      query: ({ ...rest }) => ({
        url: `/room/add`,
        method: "POST",
        body: rest,
      }),
    }), // 스터디룸 추가 (한번도 참여 이력 없을 경우)
    addStudyLog: builder.mutation({
      query: ({ id, status }) => ({
        url: `/room/${id}/log`,
        method: "POST",
        body: { status },
      }),
      async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
        await queryFulfilled;
      },
    }),
  }),
});

export const {
  useGetAllRoomsQuery,
  useGetRoomQuery,
  useCreateRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
  useGetStudySessionQuery,
  useAddStudyLogMutation,
} = roomApi;
