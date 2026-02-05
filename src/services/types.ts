import { TIngredient, TOrder, TUser } from '@utils-types';

// Тип для ингредиента в конструкторе
export type TConstructorIngredient = TIngredient & {
  id: string;
};

// Тип для состояния ингредиентов
export type TIngredientsState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
};

// Тип для состояния конструктора
export type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
  isLoading: boolean;
  error: string | null;
};

// Тип для состояния заказа
export type TOrderState = {
  order: TOrder | null;
  isLoading: boolean;
  error: string | null;
  modalData: TOrder | null;
};

// Тип для состояния пользователя
export type TUserState = {
  user: TUser | null;
  isLoading: boolean;
  error: string | null;
  isAuthChecked: boolean;
};

// Тип для состояния ленты заказов
export type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null;
};

// Корневой тип состояния
export type RootState = {
  ingredients: TIngredientsState;
  constructorBurger: TConstructorState;
  order: TOrderState;
  user: TUserState;
  feed: TFeedState;
};