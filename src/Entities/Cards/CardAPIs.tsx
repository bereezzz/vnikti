import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {Card} from "./CardSlice"
const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:3001' });

export const CardAPIs = createApi({
  baseQuery,
  endpoints: (builder) => ({
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

// export const { useGetCardsQuery, useCreateCardMutation, useUpdateCardMutation, useDeleteCardMutation } = CardAPIs;
