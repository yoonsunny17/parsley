import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithReAuth } from ".";

export const farmApi = createApi({
  reducerPath: "farmApi",
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    getAllItems: builder.query({
      query: () => `/farm/item`,
    }),
    getCollection: builder.query({
      query: () => `/farm/book`,
    }),
    updateCollection: builder.mutation({
      query: (herbId) => ({
        url: `/farm/book/add`,
        method: "POST",
        body: herbId,
      }),
    }),
    getHerbs: builder.query({
      query: () => `/farm/herb`,
    }),
    updateHerbInfo: builder.mutation({
      query: ({ herbId, ...rest }) => {
        return {
          url: `/farm/herb/add`,
          method: "POST",
          body: rest,
        };
      },
    }),
  }),
});

export const {
  useGetAllItemsQuery,
  useGetCollectionQuery,
  useUpdateCollectionQuery,
  useGetHerbsQuery,
  useUpdateHerbInfoQuery,
} = farmApi;
