import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';
import mockIngredients from '../../data/ingredients.json';
import { RootState } from '../../services/store';
import { TUserState } from '../../services/slices/user-slice';
import { PersonalOrders } from '../../services/slices/personal-orders-slice';

// Define minimal initial states for all slices
const initialIngredientsState = {
  ingredients: [],
  isIngredientsLoading: false,
  error: null,
};

const initialBurgerState = {
  constructorItems: {
    bun: null,
    ingredients: [],
  },
};

const initialFeedsState = {
  feedsData: null,
  error: null,
};

const initialOrderInfoState = {
  orderInfo: [],
  isOrderInfoLoading: false,
  error: '',
};

const initialOrderState = {
  newOrderResponse: null,
  orderRequest: false,
  error: null,
};

const initialUserState : TUserState = {
  isAuthChecked: false, // флаг для статуса проверки токена пользователя
  isAuthenticated: false,
  data: null,
  loginUserError: null,
  loginUserRequest: false,
  registerUserError: null,
  registerUserRequest: false
};


const initialPersonalOrderState : PersonalOrders = {
  orders: [],
  isLoading: false,
  error: ''
};

const mockStore = configureMockStore<RootState>();

describe('Burger Constructor', () => {
  it('test_00', () => {
    
  })
})

/*
describe('Burger Constructor', () => {
  let store: MockStoreEnhanced<RootState>;

  beforeEach(() => {
    store = mockStore({
      ingredients: initialIngredientsState,
      burger: initialBurgerState,
      feeds: initialFeedsState,
      orderInfo: initialOrderInfoState,
      order: initialOrderState,
      user: initialUserState,
      personalOrder: initialPersonalOrderState,
    });
  });

  it('should add one ingredient to the constructor', () => {
    render(
      <Provider store={store}>
        <BurgerConstructor />
      </Provider>
    );

    const ingredient = screen.getByText(/Lettuce/i);
    fireEvent.click(ingredient);

    const actions = store.getActions();
    expect(actions).toContainEqual({
      type: 'burger/addIngredient',
      payload: mockIngredients[1],
    });
  });

  it('should add a bun to the constructor', () => {
    render(
      <Provider store={store}>
        <BurgerConstructor />
      </Provider>
    );

    const bun = screen.getByText(/Bun/i);
    fireEvent.click(bun);

    const actions = store.getActions();
    expect(actions).toContainEqual({
      type: 'burger/addIngredient',
      payload: mockIngredients[0],
    });
  });
});
*/
