import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  isLoading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.isLoading = true;
      state.cart.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cart));
      state.isLoading = false;
    },
    deleteItem(state, action) {
      // payload = pizzaId
      state.cart = state.cart.filter(
        (item) => item.image_id !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    clearCart(state) {
      state.cart = [];
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});

export const {
  addItem,
  deleteItem,

  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart;
export const getIsLoading = (state) => state.cart.isLoading;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

// 'reselect'
