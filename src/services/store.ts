import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

// Импортируйте редюсеры
import userReducer from '@slices/userSlice';
import ingredientsReducer from '@slices/ingredientsSlice';
import constructorReducer from '@slices/constructorSlice';
import orderReducer from '@slices/orderSlice';
import feedReducer from '@slices/feedSlice';

// Создаем корневой редюсер
const rootReducer = {
  user: userReducer,
  ingredients: ingredientsReducer,
  constructorBurger: constructorReducer,
  order: orderReducer,
  feed: feedReducer
};

// Создаем store
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

// Типы
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Типизированные хуки
export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
