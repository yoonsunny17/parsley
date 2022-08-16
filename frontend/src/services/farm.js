import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithReAuth } from ".";

export const farmApi = createApi({
  reducerPath: "farmApi",
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    getAllItems: builder.query({
      query: () => `/farm/item`,
    }),

    getAllUserHerbBooks: builder.query({
      query: () => `/farm/book`,
    }),

    addHerb: builder.mutation({
      query: (herb) => {
        return {
          url: `/farm/herb/add`,
          method: "POST",
          body: herb,
        };
      },
    }),

    getAllHerbs: builder.query({
      query: () => `/farm/herb`,
    }),

    addHerbBook: builder.mutation({
      query: (herbId) => {
        console.log("수확하기 어떤 허브인가요~: " + herbId);
        return {
          url: `/farm/book/add`,
          method: "POST",
          body: herbId,
        };
      },
    }),

    getAllHerbBooks: builder.query({
      query: () => `/farm/book`,
    }),
  }),
});

export const {
  useGetAllItemsQuery,
  useGetAllUserHerbBooksQuery,
  useAddHerbMutation,
  useGetAllHerbsQuery,
  useAddHerbBookMutation,
  useGetAllHerbBooksQuery,
} = farmApi;
