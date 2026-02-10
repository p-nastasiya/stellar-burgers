import { FC, useEffect } from 'react';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector
} from '../../services/hooks';
import { fetchFeeds } from '@slices';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.feed);

  useEffect(() => {
    dispatch(fetchFeeds());

    // WebSocket подключение для реальных обновлений
    const ws = new WebSocket('wss://norma.nomoreparties.space/orders/all');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // Обновляем данные в сторе
    };

    return () => {
      ws.close();
    };
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
