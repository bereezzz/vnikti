import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Интерфейс для пользователя
export interface User {
  id: number;
  name: string;
  email: string;
}


// Интерфейс для состояния пользователей
interface UserState {
  users: User[];
}

// Начальное состояние
const initialState: UserState = {
  users: [],
};

// Асинхронное действие для создания пользователя
export const createUser = createAsyncThunk('user/createUser', async (newUser: Partial<User>) => {
  const response = await fetch('http://localhost:3001/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create user');
  }

  return response.json();
});

// Создание среза для пользователей
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
     // Действие для установки списка пользователей
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },    
  },
});

export const { setUsers } = userSlice.actions;
export const UserReducer = userSlice.reducer;
