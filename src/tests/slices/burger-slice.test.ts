// burger-slice.test.ts
import burgerReducer, { addIngredient } from '../../services/slices/burger-slice';
import { TIngredient } from '../../utils/types';

describe('burgerReducer', () => {
  const initialState = {
    constructorItems: {
      bun: null,
      ingredients: [],
    },
  };

  it('should handle adding a filling ingredient', () => {
    const ingredient: TIngredient = {
      _id: '123',
      name: 'Lettuce',
      type: 'main',
      proteins: 1,
      fat: 0,
      carbohydrates: 1,
      calories: 5,
      price: 10,
      image: 'image.png',
      image_large: 'image_large.png',
      image_mobile: 'image_mobile.png',
    };

    const action = addIngredient(ingredient);
    const expectedState = {
      constructorItems: {
        bun: null,
        ingredients: [ingredient],
      },
    };

    expect(burgerReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle adding a bun', () => {
    const bun: TIngredient = {
      _id: '456',
      name: 'Bun',
      type: 'bun',
      proteins: 10,
      fat: 5,
      carbohydrates: 20,
      calories: 150,
      price: 50,
      image: 'bun_image.png',
      image_large: 'bun_image_large.png',
      image_mobile: 'bun_image_mobile.png',
    };

    const action = addIngredient(bun);
    const expectedState = {
      constructorItems: {
        bun: bun,
        ingredients: [],
      },
    };

    expect(burgerReducer(initialState, action)).toEqual(expectedState);
  });
});
