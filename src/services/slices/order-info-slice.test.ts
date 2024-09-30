// src/services/slices/orderInfo-slice.test.ts

import orderInfoReducer, { fetchOrderInfo } from './order-info-slice';
import { TOrder } from '../../utils/types';

describe('orderInfoSlice reducer', () => {
  const initialState = {
    orderInfo: [],
    isOrderInfoLoading: false,
    error: '',
  };

  it('should return the initial state', () => {
    expect(orderInfoReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle fetchOrderInfo.pending', () => {
    const action = { type: fetchOrderInfo.pending.type };
    const expectedState = {
      orderInfo: [],
      isOrderInfoLoading: true,
      error: '',
    };
    expect(orderInfoReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle fetchOrderInfo.fulfilled', () => {
    const orderInfo: TOrder[] = [
      {
        _id: 'order1',
        status: 'done',
        name: 'Order 1',
        createdAt: '2023-09-01T12:34:56.789Z',
        updatedAt: '2023-09-01T12:34:56.789Z',
        number: 12345,
        ingredients: ['ingredient1', 'ingredient2'],
      },
    ];

    const action = { type: fetchOrderInfo.fulfilled.type, payload: { orders: orderInfo } };
    const expectedState = {
      orderInfo,
      isOrderInfoLoading: true,
      error: '',
    };
    expect(orderInfoReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle fetchOrderInfo.rejected', () => {
    const error = 'Failed to fetch order info';
    const action = { type: fetchOrderInfo.rejected.type, payload: error };
    const expectedState = {
      orderInfo: [],
      isOrderInfoLoading: false,
      error,
    };
    expect(orderInfoReducer(initialState, action)).toEqual(expectedState);
  });
});
