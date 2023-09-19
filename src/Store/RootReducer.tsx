import { combineReducers } from '@reduxjs/toolkit';
import { TableReducer } from '../Features/TableFeature/TableSlice';
import { UserReducer } from '../Entities/Users/UsersSlice'
import { UsersAPIs } from '../Entities/Users/UsersAPIs';
import { CardAPIs } from '../Entities/Cards/CardAPIs';
import { CardReducer } from '../Entities/Cards/CardSlice';
import { TableCardReducer } from '../Features/TableCardFeature/TableCardSlice';

;
const RootReducer = combineReducers({
  table: TableReducer,
  user: UserReducer,
  api: UsersAPIs.reducer,
  //apiCard:CardAPIs.reducer,
  card:CardReducer,
  tableCard:TableCardReducer,

},

);

export type RootState = ReturnType<typeof RootReducer>;

export default RootReducer;
