import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export interface PersonalOrders {
  orders: TOrder[];
  isLoading: boolean;
  error: string;
}

const initialState: PersonalOrders = {
  orders: [],
  isLoading: false,
  error: ''
};

export const fetchPersonalOrders = createAsyncThunk(
  'personalOrders/fetchPersonalOrders',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getOrdersApi();
      return data;
    } catch (err) {
      return rejectWithValue('Failed to fetch order info');
    }
  }
);
const orderInfoSlice = createSlice({
  name: 'orderInfo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPersonalOrders.pending, (state) => {
        state.orders = [];
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchPersonalOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchPersonalOrders.rejected, (state, action) => {
        state.orders = [];
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export default orderInfoSlice.reducer;
