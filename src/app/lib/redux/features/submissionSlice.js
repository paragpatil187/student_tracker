import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async Thunks
export const fetchSubmissions = createAsyncThunk(
  "submissions/fetchAll",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/submissions?userId=${userId}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createSubmission = createAsyncThunk(
  "submissions/create",
  async (submissionData, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateSubmission = createAsyncThunk(
  "submissions/update",
  async ({ submissionId, updates }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/submissions/${submissionId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const gradeSubmission = createAsyncThunk(
  "submissions/grade",
  async ({ submissionId, grade, feedback }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/submissions/${submissionId}/grade`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ grade, feedback }),
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
  submissions: [],
  currentSubmission: null,
  loading: false,
  error: null,
  stats: {
    totalSubmissions: 0,
    pendingReview: 0,
    averageScore: 0,
  },
};

const submissionSlice = createSlice({
  name: "submissions",
  initialState,
  reducers: {
    setCurrentSubmission: (state, action) => {
      state.currentSubmission = action.payload;
    },
    clearSubmissionError: (state) => {
      state.error = null;
    },
    updateSubmissionStats: (state) => {
      const totalSubmissions = state.submissions.length;
      const pendingReview = state.submissions.filter(
        (sub) => !sub.graded,
      ).length;
      const gradedSubmissions = state.submissions.filter((sub) => sub.graded);
      const totalScore = gradedSubmissions.reduce(
        (sum, sub) => sum + sub.grade,
        0,
      );

      state.stats = {
        totalSubmissions,
        pendingReview,
        averageScore:
          gradedSubmissions.length > 0
            ? totalScore / gradedSubmissions.length
            : 0,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Submissions
      .addCase(fetchSubmissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubmissions.fulfilled, (state, action) => {
        state.loading = false;
        state.submissions = action.payload;
        state.error = null;
      })
      .addCase(fetchSubmissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Submission
      .addCase(createSubmission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubmission.fulfilled, (state, action) => {
        state.loading = false;
        state.submissions.push(action.payload);
        state.error = null;
      })
      .addCase(createSubmission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Submission
      .addCase(updateSubmission.fulfilled, (state, action) => {
        const index = state.submissions.findIndex(
          (submission) => submission._id === action.payload._id,
        );
        if (index !== -1) {
          state.submissions[index] = action.payload;
        }
      })
      // Grade Submission
      .addCase(gradeSubmission.fulfilled, (state, action) => {
        const index = state.submissions.findIndex(
          (submission) => submission._id === action.payload._id,
        );
        if (index !== -1) {
          state.submissions[index] = action.payload;
        }
        // Update stats after grading
        const gradedSubmissions = state.submissions.filter((sub) => sub.graded);
        const totalScore = gradedSubmissions.reduce(
          (sum, sub) => sum + sub.grade,
          0,
        );
        state.stats.averageScore = totalScore / gradedSubmissions.length;
        state.stats.pendingReview = state.submissions.filter(
          (sub) => !sub.graded,
        ).length;
      });
  },
});

export const {
  setCurrentSubmission,
  clearSubmissionError,
  updateSubmissionStats,
} = submissionSlice.actions;

export default submissionSlice.reducer;

// Selectors
export const selectAllSubmissions = (state) => state.submissions.submissions;
export const selectCurrentSubmission = (state) =>
  state.submissions.currentSubmission;
export const selectSubmissionLoading = (state) => state.submissions.loading;
export const selectSubmissionError = (state) => state.submissions.error;
export const selectSubmissionStats = (state) => state.submissions.stats;

// Custom selectors
export const selectPendingSubmissions = (state) =>
  state.submissions.submissions.filter((sub) => !sub.graded);

export const selectGradedSubmissions = (state) =>
  state.submissions.submissions.filter((sub) => sub.graded);

export const selectSubmissionById = (submissionId) => (state) =>
  state.submissions.submissions.find((sub) => sub._id === submissionId);

export const selectUserSubmissions = (userId) => (state) =>
  state.submissions.submissions.filter((sub) => sub.userId === userId);
