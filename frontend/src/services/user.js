import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithReAuth } from ".";
import { setUser } from "../modules/userReducer";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => `/user`,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          console.log(result.data.userInfo);
          dispatch(setUser(result.data.userInfo));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    updateUser: builder.mutation({
      query: (newUser) => {
        return {
          url: `/user/update`,
          method: "POST",
          body: newUser,
        };
      },
      async onQueryStarted(newUser, { dispatch, getState, queryFulfilled }) {
        try {
          const user = getState().user.user;
          const copiedUser = Object.assign({}, user);
          copiedUser.name = newUser.name;
          copiedUser.description = newUser.description;
          copiedUser.profileImgUrl = newUser.profileImgUrl;
          dispatch(setUser(copiedUser));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    deleteUser: builder.mutation({
      query: () => ({
        url: `/user/delete`,
        method: "POST",
      }),
    }),
    rejoinUser: builder.mutation({
      query: () => ({
        url: `/user/rejoin`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLazyGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useRejoinUserMutation,
} = userApi;
