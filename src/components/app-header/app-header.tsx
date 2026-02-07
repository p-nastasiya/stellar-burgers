import { FC } from 'react';
import { useSelector } from '../../services/store';
import { userSelector } from '../../services/selectors';
import { AppHeaderUI } from '@ui';

export const AppHeader: FC = () => {
  const user = useSelector(userSelector);

  return <AppHeaderUI userName={user?.name || ''} />;
};
