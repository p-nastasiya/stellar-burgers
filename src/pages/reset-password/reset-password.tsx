import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate, useLocation } from 'react-router-dom';
import { resetPassword } from '../../services/slices/userSlice';
import { userErrorSelector } from '../../services/selectors';
import { ResetPasswordUI } from '@ui-pages';

export const ResetPassword: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const error = useSelector(userErrorSelector);

  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  // Проверяем, можно ли сбрасывать пароль
  useEffect(() => {
    const canReset = localStorage.getItem('resetPassword');
    if (!canReset) {
      navigate('/forgot-password', { replace: true });
    }

    // return () => {
    //   dispatch(clearError());
    // };
  }, [dispatch, navigate]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (password && token) {
      dispatch(resetPassword({ password, token }))
        .unwrap()
        .then(() => {
          localStorage.removeItem('resetPassword');
          navigate('/login');
        });
    }
  };

  return (
    <ResetPasswordUI
      errorText={error || ''}
      password={password}
      setPassword={setPassword}
      token={token}
      setToken={setToken}
      handleSubmit={handleSubmit}
    />
  );
};
