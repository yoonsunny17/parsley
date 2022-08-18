import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithReAuth } from ".";
import { setHerbBook } from "../modules/farmReducer";
import { setUser } from "../modules/userReducer";

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
      query: ({ herb }) => {
        return {
          url: `/farm/herb/add`,
          method: "POST",
          body: herb,
        };
      },
      async onQueryStarted(
        { herb, totalSley },
        { dispatch, getState, queryFulfilled }
      ) {
        try {
          console.log(herb);
          console.log(totalSley);
          await queryFulfilled;
          const user = getState().user.user;
          const newUser = {
            ...user,
            currentSley: user.currentSley - totalSley,
          };
          dispatch(setUser(newUser));
        } catch (err) {
          console.log(err);
        }
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
      async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const user = getState().user.user;
          const newUser = {
            ...user,
            currentSley: user.currentSley + data.addSley,
            currentBookPoint: user.currentBookPoint + data.addPoint,
          };
          dispatch(setUser(newUser));
        } catch (err) {
          console.log(err);
        }
      },
    }),

    getAllHerbBooks: builder.query({
      query: () => `/farm/book`,
      async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
        try {
          const herbBook = await queryFulfilled;
          dispatch(setHerbBook(herbBook?.data.userHerbBooks));
        } catch (err) {
          console.log(err);
        }
      },
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
