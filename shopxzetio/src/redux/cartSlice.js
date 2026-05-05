import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
  try {
    const serialized = localStorage.getItem('shopxzetio_cart');
    if (serialized) {
      return JSON.parse(serialized);
    }
  } catch (e) {
    console.error("Could not load cart state", e);
  }
  return { items: [] };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadState(),
  reducers: {
    addToCart: (state, action) => {
      const { product, qty } = action.payload;
      const existing = state.items.find(item => item.product.id === product.id);
      if (existing) {
        existing.qty += qty;
      } else {
        state.items.push({ product, qty });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.product.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, qty } = action.payload;
      const existing = state.items.find(item => item.product.id === id);
      if (existing) {
        existing.qty = qty;
      }
    },
    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
