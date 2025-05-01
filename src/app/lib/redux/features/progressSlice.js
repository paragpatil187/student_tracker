import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProgress = createAsyncThunk(
  "progress/fetchAll",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/progress?userId=${userId}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateProgress = createAsyncThunk(
  "progress/update",
  async ({ contentId, contentType, completed }, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/progress", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentId, contentType, completed }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  progress: [],
  loading: false,
  error: null,
  stats: {
    totalPoints: 0,
    completedItems: 0,
    totalItems: 0,
  },
};

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    clearProgressError: (state) => {
      state.error = null;
    },
    updateStats: (state, action) => {
      state.stats = {
        ...state.stats,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Progress
      .addCase(fetchProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.progress = action.payload;
        // Calculate stats
        state.stats.completedItems = action.payload.filter(
          (p) => p.completed,
        ).length;
        state.stats.totalItems = action.payload.length;
        state.stats.totalPoints = action.payload.reduce(
          (sum, p) => sum + (p.completed ? p.pointsEarned : 0),
          0,
        );
      })
      .addCase(fetchProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Progress
      .addCase(updateProgress.fulfilled, (state, action) => {
        const index = state.progress.findIndex(
          (p) =>
            p.contentId === action.payload.contentId &&
            p.contentType === action.payload.contentType,
        );
        if (index !== -1) {
          state.progress[index] = action.payload;
        } else {
          state.progress.push(action.payload);
        }
        // Update stats
        state.stats.completedItems = state.progress.filter(
          (p) => p.completed,
        ).length;
        state.stats.totalPoints = state.progress.reduce(
          (sum, p) => sum + (p.completed ? p.pointsEarned : 0),
          0,
        );
      });
  },
});

export const { clearProgressError, updateStats } = progressSlice.actions;
export default progressSlice.reducer;

// Selectors
export const selectProgress = (state) => state.progress.progress;
export const selectProgressStats = (state) => state.progress.stats;
export const selectProgressLoading = (state) => state.progress.loading;
export const selectProgressError = (state) => state.progress.error;

// Helper selectors
export const selectContentProgress = (contentId, contentType) => (state) =>
  state.progress.progress.find(
    (p) => p.contentId === contentId && p.contentType === contentType,
  );

export const selectCompletionPercentage = (state) => {
  const { completedItems, totalItems } = state.progress.stats;
  return totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
};
