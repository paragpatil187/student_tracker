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

// Use these if you need the types in other files
export const getState = store.getState;
export const dispatch = store.dispatch;
