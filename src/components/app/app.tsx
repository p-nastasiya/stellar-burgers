import React, { useEffect, FC } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchIngredients } from '@actions';
import { fetchUser } from '@slices/userSlice';
import { ingredientsLoadingSelector, isAuthCheckedSelector } from '@selectors';

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
import { Preloader } from '@ui';

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
const AppLoader: FC<{ children: React.ReactNode }> = ({ children }) => {
  const isLoading = useSelector(ingredientsLoadingSelector);
  const isAuthChecked = useSelector(isAuthCheckedSelector);

  // Показываем прелоадер, пока загружаются ингредиенты или проверяется авторизация
  if (isLoading || !isAuthChecked) {
    return <Preloader />;
  }

  return <>{children}</>;
};

// Внутренний компонент App
const AppContent = () => {
  const location = useLocation();
  const background = location.state?.background;

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        {/* {/* Основные публичные маршруты */}
        {/*<Route path='/feed' element={<Feed />} /> */}

        {/* Маршруты для неавторизованных пользователей (только для гостей) */}
        {/*<Route
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
        /> */}

        {/* Маршруты для авторизованных пользователей (требуют аутентификации) */}
        {/*<Route
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
        /> */}

        {/* Детальные страницы (могут открываться как отдельные страницы) */}
        {/*<Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route
          path='/profile/orders/:number'
          element={
            <OnlyAuth>
              <OrderInfo />
            </OnlyAuth>
          }
        /> */}

        {/* Резервный маршрут для 404 ошибки */}
        {/*<Route path='*' element={<NotFound404 />} />*/}
      </Routes>

      {/* Модальные окна, которые отображаются поверх основного контента 
    при наличии фона (background) из истории навигации */}
      {/*{background && (
        <Routes>*/}
      {/* Те же маршруты, но с модальными версиями компонентов */}
      {/*<Route path='/ingredients/:id' element={<IngredientDetailsModal />} />
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
      )}*/}
    </div>
  );
};

// Главный компонент App
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Загружаем ингредиенты при старте приложения
    dispatch(fetchIngredients());
    // Проверяем авторизацию пользователя
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <AppLoader>
        <AppContent />
      </AppLoader>
    </BrowserRouter>
  );
};

export default App;
