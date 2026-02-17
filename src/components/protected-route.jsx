import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../services/store';
import { isAuthCheckedSelector } from '../services/selectors';
import { fetchUser, setAuthChecked } from '../services/slices/userSlice';
import { Preloader } from '@ui';

const ProtectedRoute = ({ children, onlyUnAuth = false }) => {
  const dispatch = useDispatch();
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const user = useSelector((state) => state.user.user);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('refreshToken');
    if (token && !isAuthChecked && !user) {
      dispatch(fetchUser())
        .unwrap()
        .catch(() => {
          // Если не удалось получить пользователя, помечаем как проверенное
          dispatch(setAuthChecked(true));
        });
    } else if (!token && !isAuthChecked) {
      // Если нет токена, сразу помечаем как проверенное
      dispatch(setAuthChecked(true));
    }
  }, [dispatch, isAuthChecked, user]);

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
