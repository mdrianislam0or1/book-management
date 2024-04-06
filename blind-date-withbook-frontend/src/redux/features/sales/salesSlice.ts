import { createSlice } from '@reduxjs/toolkit';

const salesSlice = createSlice({
  name: 'sales',
  initialState: {
    sellingProduct: null,
    weeklySales: null,
    dailySales: null,
    monthlySales: null,
    yearlySales: null,
},
  reducers: {
    setSellingProduct: (state, action) => {
      state.sellingProduct = action.payload;
    },
    resetSellingProduct: (state) => {
      state.sellingProduct = null;
    },
    setWeeklySales: (state, action) => {
        state.weeklySales = action.payload;
      },
  
      setDailySales: (state, action) => {
        state.dailySales = action.payload;
      },
  
      setMonthlySales: (state, action) => {
        state.monthlySales = action.payload;
      },
  
      setYearlySales: (state, action) => {
        state.yearlySales = action.payload;
      },
  },
});

export const { setSellingProduct, resetSellingProduct,
    setWeeklySales,
    setDailySales,
    setMonthlySales,
    setYearlySales,
} = salesSlice.actions;

export default salesSlice.reducer;
