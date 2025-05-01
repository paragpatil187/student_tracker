import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLectures = createAsyncThunk(
  "lectures/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/lectures");
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createLecture = createAsyncThunk(
  "lectures/create",
  async (lectureData, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/admin/lectures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lectureData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateLecture = createAsyncThunk(
  "lectures/update",
  async ({ lectureId, updates }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/admin/lectures`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lectureId, updates }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteLecture = createAsyncThunk(
  "lectures/delete",
  async (lectureId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/admin/lectures`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lectureId }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      return lectureId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  lectures: [],
  loading: false,
  error: null,
  currentLecture: null,
};

const lectureSlice = createSlice({
  name: "lectures",
  initialState,
  reducers: {
    setCurrentLecture: (state, action) => {
      state.currentLecture = action.payload;
    },
    clearLectureError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Lectures
      .addCase(fetchLectures.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLectures.fulfilled, (state, action) => {
        state.loading = false;
        state.lectures = action.payload;
      })
      .addCase(fetchLectures.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Lecture
      .addCase(createLecture.fulfilled, (state, action) => {
        state.lectures.push(action.payload);
      })
      // Update Lecture
      .addCase(updateLecture.fulfilled, (state, action) => {
        const index = state.lectures.findIndex(
          (lecture) => lecture._id === action.payload._id,
        );
        if (index !== -1) {
          state.lectures[index] = action.payload;
        }
      })
      // Delete Lecture
      .addCase(deleteLecture.fulfilled, (state, action) => {
        state.lectures = state.lectures.filter(
          (lecture) => lecture._id !== action.payload,
        );
      });
  },
});

export const { setCurrentLecture, clearLectureError } = lectureSlice.actions;
export default lectureSlice.reducer;

// Selectors
export const selectLectures = (state) => state.lectures.lectures;
export const selectCurrentLecture = (state) => state.lectures.currentLecture;
export const selectLectureLoading = (state) => state.lectures.loading;
export const selectLectureError = (state) => state.lectures.error;
