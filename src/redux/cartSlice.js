import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
  userDetails: null, // Stores logged-in user info
  orderHistory: [],  // Stores past completed orders
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === newItem.id);
      
      state.totalQuantity++;
      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          image: newItem.image,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
      state.totalAmount = state.cartItems.reduce((total, item) => total + item.totalPrice, 0);
    },
    increaseQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + existingItem.price;
        state.totalQuantity++;
        state.totalAmount = state.cartItems.reduce((total, item) => total + item.totalPrice, 0);
      }
    },
    decreaseQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
        } else {
          existingItem.quantity--;
          existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
        }
        state.totalQuantity--;
        state.totalAmount = state.cartItems.reduce((total, item) => total + item.totalPrice, 0);
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
        state.totalAmount = state.cartItems.reduce((total, item) => total + item.totalPrice, 0);
      }
    },
    clearCart(state) {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
    // NEW: Save User Details
    saveUserDetails(state, action) {
      state.userDetails = action.payload;
    },
    // NEW: Save Completed Order to History
    addOrderToHistory(state, action) {
      state.orderHistory.unshift(action.payload); // unshift adds to the top of the list
    }
  },
});

export const { 
  addToCart, 
  increaseQuantity, 
  decreaseQuantity, 
  removeFromCart, 
  clearCart,
  saveUserDetails,
  addOrderToHistory
} = cartSlice.actions;

export default cartSlice.reducer;
