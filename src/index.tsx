import React, { useEffect } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './services/store';
import App from './components/app/app';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

const root = ReactDOMClient.createRoot(rootElement);

const Root = () => {
  useEffect(() => {
    // Проверяем наличие токена при загрузке приложения
    const token = localStorage.getItem('refreshToken');
    if (token) {
      // Здесь можно добавить автоматическую проверку токена
    }
  }, []);

  return (
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
};

root.render(<Root />);
