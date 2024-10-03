// root-reducer.test.ts
import rootReducer from './reducer';

describe('rootReducer', () => {
  it('should initialize with the correct initial state', () => {
    // Get the initial state by invoking rootReducer with undefined state and an empty action
    const initialState = rootReducer(undefined, { type: '@@INIT' });

    // Define the expected initial state
    const expectedInitialState = {
      ingredients: {
        ingredients: [],
        isIngredientsLoading: false,
        error: null
      },
      burger: {
        constructorItems: {
          bun: null,
          ingredients: []
        }
      },
      feeds: {
        feedsData: null,
        error: null
      },
      orderInfo: {
        orderInfo: [],
        isOrderInfoLoading: false,
        error: ''
      },
      order: {
        newOrderResponse: null,
        orderRequest: false,
        error: null
      },
      user: {
        isAuthChecked: false,
        isAuthenticated: false,
        data: null,
        loginUserError: null,
        loginUserRequest: false,
        registerUserError: null,
        registerUserRequest: false
      },
      personalOrder: {
        orders: [],
        isLoading: false,
        error: ''
      }
    };

    expect(initialState).toEqual(expectedInitialState);
  });
});
