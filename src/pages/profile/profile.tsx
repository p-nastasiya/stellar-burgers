import { FC, SyntheticEvent, useState, useEffect, useMemo } from 'react';
import { ProfileUI } from '@ui-pages';
import { useSelector } from '../../services/store';
import { userSelector } from '../../services/selectors';

export const Profile: FC = () => {
  const user = useSelector(userSelector);

  // Состояние формы
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Обновляем форму только один раз при загрузке пользователя
  useEffect(() => {
    if (user && (!formValue.name || !formValue.email)) {
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
    }
  }, [user]); // user - единственная зависимость

  // Проверяем, изменилась ли форма
  const isFormChanged = useMemo(() => {
    if (!user) return false;
    return (
      formValue.name !== user.name ||
      formValue.email !== user.email ||
      !!formValue.password
    );
  }, [formValue, user]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    // TODO: добавить логику сохранения
    console.log('Сохранение данных:', formValue);
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    if (user) {
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value
    });
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
