import { FC } from 'react';
import { userSelector, useSelector } from '../../services';
import { AppHeaderUI } from '@ui';

export const AppHeader: FC = () => {
  const user = useSelector(userSelector);

  return <AppHeaderUI userName={user?.name || ''} />;
};
