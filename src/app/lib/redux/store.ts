import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import studentsReducer from "./features/studentsSlice";
import attendanceReducer from "./features/attendanceSlice";
import submissionsReducer from "./features/submissionsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentsReducer,
    attendance: attendanceReducer,
    submissions: submissionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
