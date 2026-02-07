import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../services/store';
import { isAuthCheckedSelector, userSelector } from '../services/selectors';
import { fetchUser, setAuthChecked } from '../services/slices/userSlice';
import { Preloader } from '@ui';

const ProtectedRoute = ({ children, onlyUnAuth = false }) => {
  const dispatch = useDispatch();
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const user = useSelector(userSelector);
  const location = useLocation();

  // Если авторизация еще не проверена, просто отмечаем это
  useEffect(() => {
    if (!isAuthChecked) {
      dispatch(setAuthChecked(true));
    }
  }, [dispatch, isAuthChecked]);

  // Показываем прелоадер, пока проверяется авторизация
  if (!isAuthChecked) {
    return <Preloader />;
  }

  // Если роут только для неавторизованных, а пользователь авторизован
  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate to={from} replace />;
  }

  // Если роут требует авторизации, а пользователь не авторизован
  if (!onlyUnAuth && !user) {
    // Сохраняем текущее местоположение для возврата после авторизации
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};

export const OnlyAuth = ({ children }) => (
  <ProtectedRoute>{children}</ProtectedRoute>
);

export const OnlyUnAuth = ({ children }) => (
  // eslint-disable-next-line react/jsx-boolean-value
  <ProtectedRoute onlyUnAuth={true}>{children}</ProtectedRoute>
);

export default ProtectedRoute;
