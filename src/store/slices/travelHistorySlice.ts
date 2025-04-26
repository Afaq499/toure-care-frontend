import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../../services/api';

interface Task {
  _id: string;
  productId: {
    _id: string;
    name: string;
    price: number;
    status: boolean;
    image: string;
    createdAt: string;
    updatedAt: string;
  };
  status: 'pending' | 'completed';
  productPrice: number;
}

interface TravelHistoryState {
  tasks: Task[];
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  loading: boolean;
  error: string | null;
}

const initialState: TravelHistoryState = {
  tasks: [],
  totalTasks: 0,
  completedTasks: 0,
  pendingTasks: 0,
  loading: false,
  error: null,
};

export const fetchTravelHistory = createAsyncThunk(
  'travelHistory/fetch',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await apiService.getTravelHistory(userId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch travel history');
    }
  }
);

const travelHistorySlice = createSlice({
  name: 'travelHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTravelHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTravelHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.tasks;
        state.totalTasks = action.payload.totalTasks;
        state.completedTasks = action.payload.completedTasks;
        state.pendingTasks = action.payload.pendingTasks;
      })
      .addCase(fetchTravelHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default travelHistorySlice.reducer; 