import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithReAuth } from ".";
import { setWeekly, setLastWeek } from "../modules/studyReducer";

export const studyApi = createApi({
    reducerPath: "studyApi",
    baseQuery: baseQueryWithReAuth,
    // refetchOnMountOrArgChange: 30,
    // refetchOnReconnect: true,
    endpoints: (builder) => ({
        getDDay: builder.query({
            query: () => `/study/dday`,
        }),
        createDDay: builder.mutation({
            query: (dDay) => {
                return {
                    url: `/study/dday/create`,
                    method: "POST",
                    body: { dDay },
                };
            },
        }),
        getGoal: builder.query({
            query: () => `/study/goal`,
        }),
        createGoal: builder.mutation({
            query: (targetTime) => {
                return {
                    url: `/study/goal/create`,
                    method: "POST",
                    // body: targetTime,
                    body: { targetTime },
                };
            },
        }),
        updateGoal: builder.mutation({
            query: (targetTime) => {
                return {
                    url: `/study/goal/update`,
                    method: "POST",
                    body: { targetTime },
                };
            },
        }),
        getLog: builder.query({
            query: () => `/study/log`,
        }),
        getWeekly: builder.query({
            query: () => `/study/weekly`,
            async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(setWeekly(result?.data.week));
                    // console.log(getState().study.weekly);
                    dispatch(setLastWeek(result?.data.lastWeek));
                } catch (err) {
                    console.log(err);
                }
            },
        }),
    }),
});

export const {
    useGetDDayQuery,
    useCreateDDayMutation,
    useGetGoalQuery,
    useCreateGoalMutation,
    useUpdateGoalMutation,
    useGetLogQuery,
    useGetWeeklyQuery,
} = studyApi;
