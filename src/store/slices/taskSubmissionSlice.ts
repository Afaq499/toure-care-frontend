import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../../services/api';

interface TaskSubmissionState {
  loading: boolean;
  error: string | null;
}

interface SubmitTaskPayload {
  taskId: string;
  rating: number;
  review: string;
}

const initialState: TaskSubmissionState = {
  loading: false,
  error: null,
};

export const submitTask = createAsyncThunk(
  'taskSubmission/submit',
  async ({ taskId, rating, review }: SubmitTaskPayload, { rejectWithValue }) => {
    try {
      const response = await apiService.submitTask(taskId, { rating, review });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to submit task');
    }
  }
);

const taskSubmissionSlice = createSlice({
  name: 'taskSubmission',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitTask.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(submitTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default taskSubmissionSlice.reducer; 