
import { createSlice } from '@reduxjs/toolkit';


interface TableState {
    currentPageCard:  number;
    countRowsCard: number;
}


const TableCardSlice = createSlice({
    name: 'tableCard',
    initialState: {
        currentPageCard: localStorage.getItem('tableCardCurrentPage') || 1,
        countRowsCard:localStorage.getItem('tableCardCountRows') || 5
    } as TableState, 
    reducers: {
        setCurrentPageCard: (state, action) => {
            state.currentPageCard = action.payload;
            localStorage.setItem('tableCardCurrentPage', action.payload);
        },
        setCountRowsCard:(state, action) =>{
            state.countRowsCard = action.payload;
            localStorage.setItem('tableCardCountRows', action.payload);
        }
    
    },
    extraReducers:()=>{}
});


export const { setCurrentPageCard, setCountRowsCard } = TableCardSlice.actions;

export const TableCardReducer = TableCardSlice.reducer;
