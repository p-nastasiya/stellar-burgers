import React, { useEffect, FC } from 'react';
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector
} from '../../services/hooks';
import { fetchIngredients } from '@actions';
//import { fetchUser, setAuthChecked } from '@slices/userSlice';

import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { OnlyAuth, OnlyUnAuth } from '../protected-route';
import {
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { ConstructorPage } from '../../pages/constructor-page/constructor-page';
import { Modal } from '@components';
import { IngredientDetails } from '@components';
import { OrderInfo } from '@components';
//import { Preloader } from '@ui';
//import { ingredientsLoadingSelector, isAuthCheckedSelector } from '@selectors';

// Компонент для отображения ингредиента в модалке
const IngredientDetailsModal: FC = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <Modal title='Детали ингредиента' onClose={handleClose}>
      <IngredientDetails />
    </Modal>
  );
};

// Компонент для отображения заказа в модалке
const OrderInfoModal: FC = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <Modal title='' onClose={handleClose}>
      <OrderInfo />
    </Modal>
  );
};

// Компонент-обертка для отображения прелоадера
//const AppLoader: FC<{ children: React.ReactNode }> = ({ children }) => {

// Показываем прелоадер, пока загружаются ингредиенты или проверяется авторизация

//   return <>{children}</>;
// };

// Внутренний компонент App
const AppContent = () => {
  const location = useLocation();
  const background = location.state?.background;
  const dispatch = useDispatch();
  //const isLoading = useSelector(ingredientsLoadingSelector);

  useEffect(() => {
    dispatch(fetchIngredients())
      .unwrap()
      .catch((error) => {
        console.error('Ошибка загрузки ингредиентов:', error);
        setApiError(
          'Не удалось загрузить ингредиенты. Проверьте подключение к интернету.'
        );
      });
  }, [dispatch]);

  // if (isLoading) {
  //   return <Preloader />;
  // }
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        {/* {/* Основные публичные маршруты */}
        <Route path='/feed' element={<Feed />} />

        {/* Маршруты для неавторизованных пользователей (только для гостей) */}
        <Route
          path='/login'
          element={
            <OnlyUnAuth>
              <Login />
            </OnlyUnAuth>
          }
        />
        <Route
          path='/register'
          element={
            <OnlyUnAuth>
              <Register />
            </OnlyUnAuth>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <OnlyUnAuth>
              <ForgotPassword />
            </OnlyUnAuth>
          }
        />
        <Route
          path='/reset-password'
          element={
            <OnlyUnAuth>
              <ResetPassword />
            </OnlyUnAuth>
          }
        />

        {/* Маршруты для авторизованных пользователей (требуют аутентификации) */}
        <Route
          path='/profile'
          element={
            <OnlyAuth>
              <Profile />
            </OnlyAuth>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <OnlyAuth>
              <ProfileOrders />
            </OnlyAuth>
          }
        />

        {/* Детальные страницы (могут открываться как отдельные страницы) */}
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route
          path='/profile/orders/:number'
          element={
            <OnlyAuth>
              <OrderInfo />
            </OnlyAuth>
          }
        />

        {/* Резервный маршрут для 404 ошибки */}
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* Модальные окна, которые отображаются поверх основного контента 
    при наличии фона (background) из истории навигации */}
      {background && (
        <Routes>
          {/* Те же маршруты, но с модальными версиями компонентов */}
          <Route path='/ingredients/:id' element={<IngredientDetailsModal />} />
          <Route path='/feed/:number' element={<OrderInfoModal />} />
          <Route
            path='/profile/orders/:number'
            element={
              <OnlyAuth>
                <OrderInfoModal />
              </OnlyAuth>
            }
          />
        </Routes>
      )}
    </div>
  );
};

// Главный компонент App
const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;
function setApiError(arg0: string) {
  throw new Error('Function not implemented.');
}
