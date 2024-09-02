import { getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface OrderInfoState {
  orderInfo: TOrder[];
  isOrderInfoLoading: boolean;
  error: string;
}

const initialState: OrderInfoState = {
  orderInfo: [],
  isOrderInfoLoading: false,
  error: ''
};

export const fetchOrderInfo = createAsyncThunk(
  'orderInfo/fetchOrderInfo',
  async (orderInfoId: number, { rejectWithValue }) => {
    try {
      const data = await getOrderByNumberApi(orderInfoId);
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
      .addCase(fetchOrderInfo.pending, (state) => {
        state.orderInfo = [];
        state.isOrderInfoLoading = true;
        state.error = '';
      })
      .addCase(fetchOrderInfo.fulfilled, (state, action) => {
        state.orderInfo = action.payload.orders;
        state.isOrderInfoLoading = true;
        state.error = '';
      })
      .addCase(fetchOrderInfo.rejected, (state, action) => {
        state.orderInfo = [];
        state.isOrderInfoLoading = false;
        state.error = action.payload as string;
      });
  }
});

export default orderInfoSlice.reducer;
