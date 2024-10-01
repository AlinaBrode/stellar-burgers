// src/services/slices/feed-slice.test.ts

import feedsReducer, { fetchFeeds } from './feed-slice';
import { TFeedsResponse } from '../../utils/burger-api';

describe('feedSlice reducer', () => {
  const initialState = {
    feedsData: null,
    error: null
  };

  it('should return the initial state', () => {
    expect(feedsReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle fetchFeeds.pending', () => {
    const action = { type: fetchFeeds.pending.type };
    const expectedState = {
      feedsData: null,
      error: null
    };
    expect(feedsReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle fetchFeeds.fulfilled', () => {
    const feedsData: TFeedsResponse = {
      success: true,
      orders: [
        {
          _id: 'order1',
          ingredients: ['ingredient1', 'ingredient2'],
          status: 'done',
          name: 'Feed Order 1',
          createdAt: '2023-09-01T12:34:56.789Z',
          updatedAt: '2023-09-01T12:34:56.789Z',
          number: 1234
        }
      ],
      total: 100,
      totalToday: 10
    };

    const action = { type: fetchFeeds.fulfilled.type, payload: feedsData };
    const expectedState = {
      feedsData,
      error: null
    };
    expect(feedsReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle fetchFeeds.rejected', () => {
    const error = 'Failed to fetch feeds';
    const action = { type: fetchFeeds.rejected.type, payload: error };
    const expectedState = {
      feedsData: null,
      error
    };
    expect(feedsReducer(initialState, action)).toEqual(expectedState);
  });
});
