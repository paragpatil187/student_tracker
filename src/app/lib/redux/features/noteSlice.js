import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchNotes = createAsyncThunk(
  "notes/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/notes");
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createNote = createAsyncThunk(
  "notes/create",
  async (noteData, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/admin/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(noteData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateNote = createAsyncThunk(
  "notes/update",
  async ({ noteId, updates }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/admin/notes`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ noteId, updates }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteNote = createAsyncThunk(
  "notes/delete",
  async (noteId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/admin/notes`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ noteId }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      return noteId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  notes: [],
  loading: false,
  error: null,
  currentNote: null,
};

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setCurrentNote: (state, action) => {
      state.currentNote = action.payload;
    },
    clearNoteError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Notes
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Note
      .addCase(createNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      // Update Note
      .addCase(updateNote.fulfilled, (state, action) => {
        const index = state.notes.findIndex(
          (note) => note._id === action.payload._id,
        );
        if (index !== -1) {
          state.notes[index] = action.payload;
        }
      })
      // Delete Note
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note) => note._id !== action.payload);
      });
  },
});

export const { setCurrentNote, clearNoteError } = noteSlice.actions;
export default noteSlice.reducer;

// Selectors
export const selectNotes = (state) => state.notes.notes;
export const selectCurrentNote = (state) => state.notes.currentNote;
export const selectNoteLoading = (state) => state.notes.loading;
export const selectNoteError = (state) => state.notes.error;
