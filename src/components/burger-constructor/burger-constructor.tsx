import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  constructorBunSelector,
  constructorIngredientsSelector,
  orderSelector,
  orderLoadingSelector,
  orderModalDataSelector
} from '@selectors';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  clearConstructor,
  clearOrder,
  createOrder,
  setOrderModalData
} from '@slices';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const bun = useSelector(constructorBunSelector);
  const ingredients = useSelector(constructorIngredientsSelector);
  const order = useSelector(orderSelector);
  const orderRequest = useSelector(orderLoadingSelector);
  const orderModalData = useSelector(orderModalDataSelector);

  const onOrderClick = () => {
    if (!bun || orderRequest) return;

    const ingredientIds = [
      bun._id,
      ...ingredients.map((item) => item._id),
      bun._id
    ];

    dispatch(createOrder(ingredientIds)).then((action: { payload: any }) => {
      if (createOrder.fulfilled.match(action)) {
        dispatch(setOrderModalData(action.payload));
        dispatch(clearConstructor());
      }
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
