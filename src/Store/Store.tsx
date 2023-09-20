import { configureStore } from '@reduxjs/toolkit';
import RootReducer from "./RootReducer"
import { UsersAPIs } from '../Entities/Users/UsersAPIs';

// Настройка хранилища Redux
const Store = configureStore({
  reducer: RootReducer, // Подключение корневого редюсера
  middleware: (getDefaultMiddleware) => {
    // Добавление middleware, в данном случае, middleware для работы с API пользователей
    return [...getDefaultMiddleware(), UsersAPIs.middleware];
  },
});

export default Store;