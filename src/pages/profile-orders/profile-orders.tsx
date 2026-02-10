import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services';
import { fetchUserOrders } from '@actions';
import { ProfileOrdersUI } from '@ui-pages';
import { Preloader } from '@ui';
import { useNavigate } from 'react-router-dom';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const orders = useSelector((state) => state.user.orders);
  const isLoading = useSelector((state) => state.user.isLoading);
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    // Перенаправляем если пользователь не авторизован
    if (!user) {
      navigate('/login');
      return;
    }

    if (user) {
      dispatch(fetchUserOrders());
    }
  }, [dispatch, user, navigate]);

  // Показываем прелоадер при загрузке
  if (isLoading) {
    return <Preloader />;
  }

  // Показываем ошибку если есть
  if (error) {
    console.error('Ошибка загрузки заказов:', error);
    return <div>Ошибка загрузки заказов</div>;
  }

  return <ProfileOrdersUI orders={orders || []} />;
};
