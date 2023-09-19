import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {User} from "./UsersSlice"
const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:3001' });

export const UsersAPIs = createApi({
  baseQuery,
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => 'users',
    }),
    createUser: builder.mutation<User, Partial<User>>({
      query: (user) => ({
        url: 'users',
        method: 'POST',
        body: user,
      }),
    }),
    updateUser: builder.mutation<User, { id: number; user: Partial<User> }>({
      query: ({ id, user }) => ({
        url: `users/${id}`,
        method: 'PUT',
        body: user,
      }),
    }),
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetUsersQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation } = UsersAPIs;
