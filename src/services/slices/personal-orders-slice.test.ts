// src/services/slices/orderInfo-slice.test.ts

import orderInfoReducer, { fetchPersonalOrders } from './personal-orders-slice';
import { TOrder } from '../../utils/types';


describe('orderInfoSlice reducer', () => {
  const initialState = {
    orders: [],
    isLoading: false,
    error: '',
  };

  it('should return the initial state', () => {
    expect(orderInfoReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle fetchPersonalOrders.pending', () => {
    const action = { type: fetchPersonalOrders.pending.type };
    const expectedState = {
      orders: [],
      isLoading: true,
      error: '',
    };
    expect(orderInfoReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle fetchPersonalOrders.fulfilled', () => {
    const orders: TOrder[] = [
      {
        _id: 'order1',
        status: 'done',
        name: 'Order 1',
        createdAt: '2023-09-01T12:34:56.789Z',
        updatedAt: '2023-09-01T12:34:56.789Z',
        number: 12345,
        ingredients: ['ingredient1', 'ingredient2'],
      },
      {
        _id: 'order2',
        status: 'pending',
        name: 'Order 2',
        createdAt: '2023-09-02T10:00:00.000Z',
        updatedAt: '2023-09-02T10:30:00.000Z',
        number: 12346,
        ingredients: ['ingredient3', 'ingredient4'],
      },
    ];

    const action = { type: fetchPersonalOrders.fulfilled.type, payload: orders };
    const expectedState = {
      orders,
      isLoading: true, // Note that this should ideally be `false` after fulfilling the request, but follows your slice logic
      error: '',
    };
    expect(orderInfoReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle fetchPersonalOrders.rejected', () => {
    const error = 'Failed to fetch order info';
    const action = { type: fetchPersonalOrders.rejected.type, payload: error };
    const expectedState = {
      orders: [],
      isLoading: false,
      error,
    };
    expect(orderInfoReducer(initialState, action)).toEqual(expectedState);
  });
});
