import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithReAuth } from ".";

export const rankingApi = createApi({
  reducerPath: "rankingApi",
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    getNongbuRanking: builder.query({
      query: () => `/rank/nongbu`,
    }),

    getNongbuRankingByRoomId: builder.query({
      query: (roomId) => `/rank/${roomId}/nongbu`,
    }),

    getGongbuRankingByRoomId: builder.query({
      query: (roomId) => `/rank/${roomId}/gongbu`,
    }),
  }),
});

export const {
  useGetNongbuRankingQuery,
  useGetNongbuRankingByRoomIdQuery,
  useGetGongbuRankingByRoomIdQuery,
} = rankingApi;
