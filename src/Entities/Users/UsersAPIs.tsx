import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {User} from "./UsersSlice"
import { Card } from '../Cards/CardSlice';

//Базовый url
const BASE_URL = 'http://localhost:3001';
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const UsersAPIs = createApi({
  baseQuery,
  endpoints: (builder) => ({

    // Получение пользователей
    getUsers: builder.query<User[], void>({
      query: () => 'users',
    }),

    //Создание пользователей
    createUser: builder.mutation<User, Partial<User>>({
      query: (user) => ({
        url: 'users',
        method: 'POST',
        body: user,
      }),
    }),

    //Обновление пользователя
    updateUser: builder.mutation<User, { id: number; user: Partial<User> }>({
      query: ({ id, user }) => ({
        url: `users/${id}`,
        method: 'PUT',
        body: user,
      }),
    }),

    // Удаление пользователя
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
    }),
    // Получение карточек
    getCards: builder.query<Card[], void>({
      query: () => 'cards',
    }),

    // Создание карт
    createCard: builder.mutation<Card, Partial<Card>>({
      query: (card) => ({
        url: 'cards',
        method: 'POST',
        body: card,
      }),
    }),

    // Обновление карты
    updateCard: builder.mutation<Card, { id: number; card: Partial<Card> }>({
      query: ({ id, card }) => ({
        url: `cards/${id}`,
        method: 'PUT',
        body: card,
      }),
    }),

    //Удаление карточки
    deleteCard: builder.mutation<void, number>({
      query: (id) => ({
        url: `cards/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetUsersQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation,useGetCardsQuery, useCreateCardMutation, useUpdateCardMutation, useDeleteCardMutation } = UsersAPIs;
