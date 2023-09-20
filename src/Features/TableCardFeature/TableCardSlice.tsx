import { createSlice } from '@reduxjs/toolkit';

// Интерфейс состояния для таблицы карточек
interface TableState {
    currentPageCard:  number;
    countRowsCard: number;
}

// Создание среза для управления состоянием таблицы карточек
const TableCardSlice = createSlice({
    name: 'tableCard',
    // Начальное состояние, извлекаемое из localStorage
    initialState: {
        currentPageCard: localStorage.getItem('tableCardCurrentPage') || 1,
        countRowsCard:localStorage.getItem('tableCardCountRows') || 5
    } as TableState, 
    reducers: {
          // Действие для установки текущей страницы
        setCurrentPageCard: (state, action) => {
            state.currentPageCard = action.payload;
             // Сохранение текущей страницы в localStorage
            localStorage.setItem('tableCardCurrentPage', action.payload);
        },
        // Действие для установки количества строк на странице
        setCountRowsCard:(state, action) =>{
            state.countRowsCard = action.payload;
            // Сохранение количества строк на странице в localStorage
            localStorage.setItem('tableCardCountRows', action.payload);
        }
    },
    extraReducers:()=>{}
});


export const { setCurrentPageCard, setCountRowsCard } = TableCardSlice.actions;

export const TableCardReducer = TableCardSlice.reducer;
