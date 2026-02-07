import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  constructorBunSelector,
  constructorIngredientsSelector,
  orderSelector,
  orderLoadingSelector,
  orderModalDataSelector,
  userSelector
} from '../../services/selectors';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  clearOrder,
  createOrder,
  setOrderModalData
} from '../../services/slices/orderSlice';
import { clearConstructor } from '../../services/slices/constructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bun = useSelector(constructorBunSelector);
  const ingredients = useSelector(constructorIngredientsSelector);
  const order = useSelector(orderSelector);
  const orderRequest = useSelector(orderLoadingSelector);
  const orderModalData = useSelector(orderModalDataSelector);
  const user = useSelector(userSelector);

  const onOrderClick = () => {
    // Проверяем авторизацию
    if (!user) {
      navigate('/login');
      return;
    }

    if (!bun || orderRequest) return;

    const ingredientIds = [
      bun._id,
      ...ingredients.map((item) => item._id),
      bun._id
    ];

    dispatch(createOrder(ingredientIds))
      .unwrap()
      .then((orderData) => {
        dispatch(setOrderModalData(orderData));
        dispatch(clearConstructor());
      })
      .catch((error) => {
        console.error('Ошибка создания заказа:', error);
      });
  };

  const closeOrderModal = () => {
    dispatch(setOrderModalData(null));
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [bun, ingredients]
  );

  const constructorItems = { bun, ingredients };

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
