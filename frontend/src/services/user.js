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
            query: (user) => {
                return {
                    url: `/user/update`,
                    method: "POST",
                    body: user,
                };
            },
            async onQueryStarted(
                newUser,
                { dispatch, getState, queryFulfilled }
            ) {
                try {
                    await queryFulfilled;
                    const user = getState().user.user;
                    dispatch(
                        setUser({
                            ...user,
                            ...newUser,
                        })
                    );
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
        getMyRooms: builder.query({
            query: () => `/user/room`,
        }),
        getMyLikeRooms: builder.query({
            query: () => `/user/like`,
        }),
    }),
});

export const {
    useLazyGetUserQuery,
    useGetMyRoomsQuery,
    useGetMyLikeRoomsQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useRejoinUserMutation,
} = userApi;
