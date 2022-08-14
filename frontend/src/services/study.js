import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithReAuth } from ".";

export const studyApi = createApi({
    reducerPath: "studyApi",
    baseQuery: baseQueryWithReAuth,
    endpoints: (builder) => ({
        getGoal: builder.query({
            query: () => `/study/goal`,
        }),
        createGoal: builder.mutation({
            query: (targetTime) => {
                return {
                    url: `/study/goal/create`,
                    method: "POST",
                    body: targetTime,
                };
            },
        }),
        updateGoal: builder.mutation({
            query: (targetTime) => {
                return {
                    url: `/study/goal/update`,
                    method: "POST",
                    body: targetTime,
                };
            },
        }),
        getLog: builder.query({
            query: () => `/study/log`,
        }),
        getWeekly: builder.query({
            query: () => `/study/wekkly`,
        }),
    }),
});

export const {
    useGetGoalQuery,
    useCreateGoalMutation,
    useUpdateGoalMutation,
    useGetLogQuery,
    useGetWeeklyQuery,
} = studyApi;
