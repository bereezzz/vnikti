import { createSlice } from '@reduxjs/toolkit';

// Интерфейс состояния для таблицы
interface TableState {
    currentPage: number;
    countRows: number;
}

// Создание среза для управления состоянием таблицы
const TableSlice = createSlice({
    name: 'table',
      // Начальное состояние, извлекаемое из localStorage
    initialState: {
        currentPage: localStorage.getItem('tableCurrentPage') || 1,
        countRows: localStorage.getItem('tableCountRows') || 5
    } as TableState,
    reducers: {
        // Действие для установки текущей страницы
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
             // Сохранение текущей страницы в localStorage
            localStorage.setItem('tableCurrentPage', action.payload);
        },
        // Действие для установки количества строк на странице
        setCountRows: (state, action) => {
            state.countRows = action.payload;
            // Сохранение количества строк на странице в localStorage
            localStorage.setItem('tableCountRows', action.payload);
        }
    },
    extraReducers: () => { }
});

export const { setCurrentPage, setCountRows } = TableSlice.actions;
export const TableReducer = TableSlice.reducer;
