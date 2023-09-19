import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: number;
  name: string;
  email: string;
}

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};
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
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    
  },
});

export const { setUsers } = userSlice.actions;
export const { addUser } = userSlice.actions;
export const UserReducer = userSlice.reducer;
