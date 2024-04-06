/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

type Book = {
  name: string;
  price: number;
  quantity: number;
  releaseDate: string;
  author: string;
  isbn: string;
  genre: string;
  publisher: string;
  series: string;
  language: string;
  format: string;
  pageCount: number;
};

const initialState: Book = {
  name: '',
  price: 0,
  quantity: 0,
  releaseDate: '',
  author: '',
  isbn: '',
  genre: '',
  publisher: '',
  series: '',
  language: '',
  format: '',
  pageCount: 0,
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setBookData: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetBookData: () => initialState,
  },
});

export const { setBookData, resetBookData } = bookSlice.actions;

export default bookSlice.reducer;
