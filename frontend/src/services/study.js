import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithReAuth } from ".";
import { setWeekly, setLastWeek } from "../modules/studyReducer";
import { setUser } from "../modules/userReducer";

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
        console.log("-----------");
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
      query: () => `/study/weekly`,
      async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          console.log(getState().study.weekly);
          dispatch(setWeekly(result?.data.week));
          console.log(getState().study.weekly);
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
  useLazyGetLogQuery,
  useGetWeeklyQuery,
} = studyApi;
