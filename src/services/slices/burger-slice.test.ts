// burger-slice.test.ts
import burgerReducer, {
  addIngredient,
  deleteIngredient,
  moveIngredientDown,
  moveIngredientUp
} from './burger-slice';
import { TIngredient } from '../../utils/types';

describe('burgerReducer', () => {
  const initialState = {
    constructorItems: {
      bun: null,
      ingredients: []
    }
  };

  const ingredients: TIngredient[] = [
    {
      _id: '123',
      name: 'Lettuce',
      type: 'main',
      proteins: 1,
      fat: 0,
      carbohydrates: 1,
      calories: 5,
      price: 10,
      image: 'lettuce.png',
      image_large: 'lettuce_large.png',
      image_mobile: 'lettuce_mobile.png'
    },
    {
      _id: '124',
      name: 'Tomato',
      type: 'main',
      proteins: 1,
      fat: 0,
      carbohydrates: 2,
      calories: 10,
      price: 12,
      image: 'tomato.png',
      image_large: 'tomato_large.png',
      image_mobile: 'tomato_mobile.png'
    },
    {
      _id: '125',
      name: 'Cheese',
      type: 'main',
      proteins: 7,
      fat: 9,
      carbohydrates: 1,
      calories: 100,
      price: 15,
      image: 'cheese.png',
      image_large: 'cheese_large.png',
      image_mobile: 'cheese_mobile.png'
    }
  ];

  const nonEmptyState = {
    constructorItems: {
      bun: null,
      ingredients: ingredients
    }
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
      image_mobile: 'image_mobile.png'
    };

    const action = addIngredient(ingredient);
    const expectedState = {
      constructorItems: {
        bun: null,
        ingredients: [ingredient]
      }
    };

    expect(burgerReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle removing a filling ingredient', () => {
    const action = deleteIngredient(1);
    const expectedState = {
      constructorItems: {
        bun: null,
        ingredients: [
          {
            _id: '123',
            name: 'Lettuce',
            type: 'main',
            proteins: 1,
            fat: 0,
            carbohydrates: 1,
            calories: 5,
            price: 10,
            image: 'lettuce.png',
            image_large: 'lettuce_large.png',
            image_mobile: 'lettuce_mobile.png'
          },
          {
            _id: '125',
            name: 'Cheese',
            type: 'main',
            proteins: 7,
            fat: 9,
            carbohydrates: 1,
            calories: 100,
            price: 15,
            image: 'cheese.png',
            image_large: 'cheese_large.png',
            image_mobile: 'cheese_mobile.png'
          }
        ]
      }
    };

    expect(burgerReducer(nonEmptyState, action)).toEqual(expectedState);
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
      image_mobile: 'bun_image_mobile.png'
    };

    const action = addIngredient(bun);
    const expectedState = {
      constructorItems: {
        bun: bun,
        ingredients: []
      }
    };

    expect(burgerReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle reordering of a filling ingredient', () => {
    const action = moveIngredientUp(1);
    const expectedState = {
      constructorItems: {
        bun: null,
        ingredients: [
          {
            _id: '124',
            name: 'Tomato',
            type: 'main',
            proteins: 1,
            fat: 0,
            carbohydrates: 2,
            calories: 10,
            price: 12,
            image: 'tomato.png',
            image_large: 'tomato_large.png',
            image_mobile: 'tomato_mobile.png'
          },
          {
            _id: '123',
            name: 'Lettuce',
            type: 'main',
            proteins: 1,
            fat: 0,
            carbohydrates: 1,
            calories: 5,
            price: 10,
            image: 'lettuce.png',
            image_large: 'lettuce_large.png',
            image_mobile: 'lettuce_mobile.png'
          },
          {
            _id: '125',
            name: 'Cheese',
            type: 'main',
            proteins: 7,
            fat: 9,
            carbohydrates: 1,
            calories: 100,
            price: 15,
            image: 'cheese.png',
            image_large: 'cheese_large.png',
            image_mobile: 'cheese_mobile.png'
          }
        ]
      }
    };

    expect(burgerReducer(nonEmptyState, action)).toEqual(expectedState);
  });

  it('should handle reordering of a filling ingredient', () => {
    const action = moveIngredientDown(1);
    const expectedState = {
      constructorItems: {
        bun: null,
        ingredients: [
          {
            _id: '123',
            name: 'Lettuce',
            type: 'main',
            proteins: 1,
            fat: 0,
            carbohydrates: 1,
            calories: 5,
            price: 10,
            image: 'lettuce.png',
            image_large: 'lettuce_large.png',
            image_mobile: 'lettuce_mobile.png'
          },
          {
            _id: '125',
            name: 'Cheese',
            type: 'main',
            proteins: 7,
            fat: 9,
            carbohydrates: 1,
            calories: 100,
            price: 15,
            image: 'cheese.png',
            image_large: 'cheese_large.png',
            image_mobile: 'cheese_mobile.png'
          },
          {
            _id: '124',
            name: 'Tomato',
            type: 'main',
            proteins: 1,
            fat: 0,
            carbohydrates: 2,
            calories: 10,
            price: 12,
            image: 'tomato.png',
            image_large: 'tomato_large.png',
            image_mobile: 'tomato_mobile.png'
          }
        ]
      }
    };

    expect(burgerReducer(nonEmptyState, action)).toEqual(expectedState);
  });
});
