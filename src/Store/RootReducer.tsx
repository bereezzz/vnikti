import { combineReducers } from '@reduxjs/toolkit';
import { TableReducer } from '../Features/TableFeature/TableSlice';
import { UserReducer } from '../Entities/Users/UsersSlice'
import { UsersAPIs } from '../Entities/Users/UsersAPIs';
import { CardReducer } from '../Entities/Cards/CardSlice';
import { TableCardReducer } from '../Features/TableCardFeature/TableCardSlice';

// Комбинирование всех редюсеров в корневой редюсер
const RootReducer = combineReducers({
  table: TableReducer, // Редюсер для таблицы людей
  user: UserReducer,  // Редюсер для людей
  api: UsersAPIs.reducer, // Редюсер для API
  card:CardReducer,  // Редюсер для карточек
  tableCard:TableCardReducer, // Редюсер для таблицы карточек
},
);
// Определение типа состояния корневого редюсера
export type RootState = ReturnType<typeof RootReducer>;
export default RootReducer;
