
import { createSlice } from '@reduxjs/toolkit';


interface TableState {
    currentPage:  number;
    countRows: number;
}


const TableSlice = createSlice({
    name: 'table',
    initialState: {
        currentPage: localStorage.getItem('tableCurrentPage') || 1,
        countRows:localStorage.getItem('tableCountRows') || 5
    } as TableState, 
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
            localStorage.setItem('tableCurrentPage', action.payload);
        },
        setCountRows:(state, action) =>{
            state.countRows = action.payload;
            localStorage.setItem('tableCountRows', action.payload);
        }
    
    },
    extraReducers:()=>{}
});


export const { setCurrentPage, setCountRows } = TableSlice.actions;

export const TableReducer = TableSlice.reducer;
