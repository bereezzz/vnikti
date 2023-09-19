import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {User} from "./UsersSlice"
import { Card } from '../Cards/CardSlice';
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
    getCards: builder.query<Card[], void>({
      query: () => 'cards',
    }),
    createCard: builder.mutation<Card, Partial<Card>>({
      query: (card) => ({
        url: 'cards',
        method: 'POST',
        body: card,
      }),
    }),
    updateCard: builder.mutation<Card, { id: number; card: Partial<Card> }>({
      query: ({ id, card }) => ({
        url: `cards/${id}`,
        method: 'PUT',
        body: card,
      }),
    }),
    deleteCard: builder.mutation<void, number>({
      query: (id) => ({
        url: `cards/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetUsersQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation,useGetCardsQuery, useCreateCardMutation, useUpdateCardMutation, useDeleteCardMutation } = UsersAPIs;
