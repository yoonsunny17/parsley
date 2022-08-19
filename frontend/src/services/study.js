import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithReAuth } from ".";
import { setWeekly, setLastWeek } from "../modules/studyReducer";
import { setUser } from "../modules/userReducer";

export const studyApi = createApi({
  reducerPath: "studyApi",
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    getDDay: builder.query({
      query: () => `/study/dday`,
    }),
    getGoal: builder.query({
      query: () => `/study/goal`,
    }),
    createGoal: builder.mutation({
      query: (targetTime) => {
        return {
          url: `/study/goal/create`,
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
          dispatch(setLastWeek(result?.data.lastWeek));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    createDDay: builder.mutation({
      query: (dDay) => {
        return {
          url: `/study/dday/create`,
          method: "POST",
          body: { dDay },
        };
      },
      async onQueryStarted(dDay, { dispatch, getState, queryFulfilled }) {
        try {
          const user = getState().user.user;
          const copiedUser = Object.assign({}, user);
          copiedUser.dDay = dDay;
          dispatch(setUser(copiedUser));
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
  useGetLogQuery,
  useGetWeeklyQuery,
} = studyApi;
