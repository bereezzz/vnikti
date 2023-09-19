import { configureStore } from '@reduxjs/toolkit';
import  RootReducer  from "./RootReducer"
import { UsersAPIs } from '../Entities/Users/UsersAPIs';

const Store = configureStore({
    reducer: RootReducer, 
    middleware: (getDefaultMiddleware) => {
        return [...getDefaultMiddleware(), UsersAPIs.middleware];
      },
  });


export default Store;