import { combineReducers } from 'redux';
import ingredientReducer from './slices/ingredient-slice';
import burgerReducer from './slices/burger-slice';
import feedsReducer from './slices/feed-slice';
import orderReducer from './slices/order-slice';
import orderInfoReducer from './slices/order-info-slice';
import userReducer from './slices/user-slice';

const rootReducer = combineReducers({
  ingredients: ingredientReducer,
  burger: burgerReducer,
  feeds: feedsReducer,
  orderInfo: orderInfoReducer,
  order: orderReducer,
  user: userReducer
});

export default rootReducer;
