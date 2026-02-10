// Замените весь файл на:
import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrderByNumberApi } from '@api';

export const createOrder = createAsyncThunk(
  'order/create',
  async (ingredients: string[], { rejectWithValue }) => {
    try {
      const data = await orderBurgerApi(ingredients);
      return data.order; // data = {order: TOrder, name: string}
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка создания заказа');
    }
  }
);

export const fetchOrderByNumber = createAsyncThunk(
  'order/fetchByNumber',
  async (number: number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(number);
      // Проверьте что возвращает getOrderByNumberApi
      if (response.success && response.orders && response.orders.length > 0) {
        return response.orders[0];
      }
      throw new Error('Заказ не найден');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка получения заказа');
    }
  }
);
