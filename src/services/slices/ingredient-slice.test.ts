// src/services/slices/ingredient-slice.test.ts

import ingredientsReducer, { fetchIngredients } from './ingredient-slice';
import { TIngredient } from '../../utils/types';

describe('ingredientSlice reducer', () => {
  const initialState = {
    ingredients: [],
    isIngredientsLoading: false,
    error: null,
  };

  it('should return the initial state', () => {
    expect(ingredientsReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle fetchIngredient.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const expectedState = {
      ingredients: [],
      isIngredientsLoading: true,
      error: null,
    };
    expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle fetchIngredients.fulfilled', () => {
    const ingredients: TIngredient[] = [
      {
        _id: '123',
        name: 'Ingredient 1',
        type: 'main',
        proteins: 10,
        fat: 5,
        carbohydrates: 15,
        calories: 200,
        price: 50,
        image: 'image1.png',
        image_large: 'image1_large.png',
        image_mobile: 'image1_mobile.png',
      },
      {
        _id: '124',
        name: 'Ingredient 2',
        type: 'bun',
        proteins: 20,
        fat: 10,
        carbohydrates: 30,
        calories: 400,
        price: 100,
        image: 'image2.png',
        image_large: 'image2_large.png',
        image_mobile: 'image2_mobile.png',
      },
    ];

    const action = { type: fetchIngredients.fulfilled.type, payload: ingredients };
    const expectedState = {
      ingredients: ingredients,
      isIngredientsLoading: false,
      error: null,
    };
    expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle fetchIngredients.rejected', () => {
    const error = 'Failed to fetch ingredients';
    const action = { type: fetchIngredients.rejected.type, payload: error };
    const expectedState = {
      ingredients: [],
      isIngredientsLoading: false,
      error: error,
    };
    expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
  });
});
