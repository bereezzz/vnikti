import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Card {
  id: number;
  name: string;
  number: string;
}

interface CardState {
  cards: Card[];
}

const initialState: CardState = {
  cards: [],
};
export const createCard = createAsyncThunk('card/createCard', async (newCard: Partial<Card>) => {
  const response = await fetch('http://localhost:3001/cards', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCard),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create card');
  }

  return response.json();
});
const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setCards: (state, action: PayloadAction<Card[]>) => {
      state.cards = action.payload;
    },
    addCard: (state, action: PayloadAction<Card>) => {
      state.cards.push(action.payload);
    },

  },
});

export const { setCards } = cardSlice.actions;
export const { addCard } = cardSlice.actions;
export const CardReducer = cardSlice.reducer;
