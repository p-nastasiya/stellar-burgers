import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUserApi,
  registerUserApi,
  logoutApi,
  getUserApi,
  updateUserApi,
  forgotPasswordApi,
  resetPasswordApi,
  getOrdersApi,
  TLoginData,
  TRegisterData
} from '@api';
import { setCookie, getCookie, deleteCookie } from '../../utils/cookie';

// Эту функцию уже есть в слайсе, но для единообразия создадим здесь
export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(data);
      const accessToken = response.accessToken.replace('Bearer ', '');
      setCookie('accessToken', accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response.user;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка авторизации');
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(data);
      const accessToken = response.accessToken.replace('Bearer ', '');
      setCookie('accessToken', accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response.user;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка регистрации');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await logoutApi();
      }
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
      return null;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка выхода');
    }
  }
);

export const fetchUser = createAsyncThunk(
  'user/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const token = getCookie('accessToken');
      if (!token) {
        throw new Error('Токен отсутствует');
      }
      const response = await getUserApi();
      return response.user;
    } catch (error: any) {
      if (error.message === 'jwt expired' || error.message === '401') {
        return rejectWithValue('Токен истек');
      }
      return rejectWithValue(error.message || 'Ошибка получения пользователя');
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (data: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(data);
      return response.user;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка обновления данных');
    }
  }
);

// НОВЫЕ ЭКШЕНЫ

export const fetchUserOrders = createAsyncThunk(
  'user/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const orders = await getOrdersApi(); // Теперь это возвращает TOrder[]
      return orders;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка получения заказов');
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (email: string, { rejectWithValue }) => {
    try {
      await forgotPasswordApi({ email });
      return true;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка восстановления пароля');
    }
  }
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (data: { password: string; token: string }, { rejectWithValue }) => {
    try {
      await resetPasswordApi(data);
      return true;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка сброса пароля');
    }
  }
);
