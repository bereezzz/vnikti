import { combineReducers } from '@reduxjs/toolkit';
import { TableReducer } from '../Features/TableFeature/TableSlice';
import { UserReducer } from '../Entities/Users/UsersSlice'
import { UsersAPIs } from '../Entities/Users/UsersAPIs';

const RootReducer = combineReducers({
  table: TableReducer,
  user: UserReducer,
  api: UsersAPIs.reducer,
},

);

export type RootState = ReturnType<typeof RootReducer>;

export default RootReducer;
