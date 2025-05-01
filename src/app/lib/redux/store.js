import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import userReducer from "./features/userSlice";
import lectureReducer from "./features/lectureSlice";
import noteReducer from "./features/noteSlice";
import progressReducer from "./features/progressSlice";
import submissionReducer from "./features/submissionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    lectures: lectureReducer,
    notes: noteReducer,
    progress: progressReducer,
    submissions: submissionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// For use in other files
export const getState = store.getState;
export const dispatch = store.dispatch;
