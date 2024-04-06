import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  bookId: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
  buyerName: string;
  contactNumber: string;
  sellingDate: Date;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  buyerName: "",
  contactNumber: "",
  sellingDate: new Date(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartData: (state, action: PayloadAction<Partial<CartState>>) => {
      return { ...state, ...action.payload };
    },
    resetCartData: () => initialState,
    addToCart: (state, action: PayloadAction<string>) => {
      const bookId = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.bookId === bookId
      );
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity++;
      } else {
        state.items.push({ bookId, quantity: 1 });
      }
    },
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ bookId: string; quantity: number }>
    ) => {
      const { bookId, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.bookId === bookId
      );
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity = quantity;
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const bookIdToRemove = action.payload;
      state.items = state.items.filter(
        (item) => item.bookId !== bookIdToRemove
      );
    },
  },
});

export const {
  setCartData,
  resetCartData,
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
