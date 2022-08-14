import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithReAuth } from ".";
import { setUser } from "../modules/userReducer"


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
            query: ({ user }) => {
                return {
                    url: `/user/update`,
                    method: "POST",
                    body: user,
                }
            }
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
            })
        })
    }),
});

export const {
    useLazyGetUserQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useRejoinUserMutation,
} = userApi;