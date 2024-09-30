// src/services/slices/order-slice.test.ts

import orderReducer, { fetchOrder, dropModalData } from './order-slice';
import { TNewOrderResponse } from '../../utils/burger-api';

describe('orderSlice reducer', () => {
  const initialState = {
    orderRequest: false,
    newOrderResponse: null,
    error: null,
  };

  it('should return the initial state', () => {
    expect(orderReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle fetchOrder.pending', () => {
    const action = { type: fetchOrder.pending.type };
    const expectedState = {
      orderRequest: true,
      newOrderResponse: null,
      error: null,
    };
    expect(orderReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle fetchOrder.fulfilled', () => {
    const newOrderResponse: TNewOrderResponse = {
      success: true,
      name: 'Burger Order',
      order: {
        _id: 'order123',
        ingredients: ['ingredient1', 'ingredient2'],
        status: 'done',
        name: 'Order 123',
        createdAt: '2023-09-01T12:34:56.789Z',
        updatedAt: '2023-09-01T12:34:56.789Z',
        number: 12345,
      },
    };

    const action = { type: fetchOrder.fulfilled.type, payload: newOrderResponse };
    const expectedState = {
      orderRequest: false,
      newOrderResponse,
      error: null,
    };
    expect(orderReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle fetchOrder.rejected', () => {
    const error = 'Failed to fetch order';
    const action = { type: fetchOrder.rejected.type, payload: error };
    const expectedState = {
      orderRequest: false,
      newOrderResponse: null,
      error,
    };
    expect(orderReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle dropModalData', () => {
    const previousState = {
      orderRequest: false,
      newOrderResponse: {
        success: true,
        name: 'Burger Order',
        order: {
          _id: 'order123',
          ingredients: ['ingredient1', 'ingredient2'],
          status: 'done',
          name: 'Order 123',
          createdAt: '2023-09-01T12:34:56.789Z',
          updatedAt: '2023-09-01T12:34:56.789Z',
          number: 12345,
        },
      },
      error: null,
    };

    const expectedState = {
      orderRequest: false,
      newOrderResponse: null,
      error: null,
    };

    expect(orderReducer(previousState, dropModalData())).toEqual(expectedState);
  });
});
