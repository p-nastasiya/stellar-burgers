import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getIngredientsApi();
      return data;
    } catch (error: any) {
      // Вместо передачи всего error (который несериализуем), передаем строку
      return rejectWithValue(error.message || 'Ошибка загрузки ингредиентов');
    }
  }
);
