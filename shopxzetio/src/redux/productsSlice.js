import { createSlice } from '@reduxjs/toolkit';
import initialProducts from '../data/products.json';

const loadState = () => {
  try {
    const serialized = localStorage.getItem('shopxzetio_products');
    if (serialized) {
      const parsed = JSON.parse(serialized);
      if (parsed.items && parsed.items.length > 0) return parsed;
    }
  } catch (e) {
    console.error("Could not load products state", e);
  }
  return { items: initialProducts };
};

const productsSlice = createSlice({
  name: 'products',
  initialState: loadState(),
  reducers: {
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
    editProduct: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index >= 0) {
        state.items[index] = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateStock: (state, action) => {
      const { id, stock } = action.payload;
      const index = state.items.findIndex(item => item.id === id);
      if (index >= 0) {
        state.items[index].stock = stock;
      }
    },
    decreaseStock: (state, action) => {
      action.payload.forEach(({ id, qty }) => {
        const index = state.items.findIndex(item => item.id === id);
        if (index >= 0) {
          state.items[index].stock = Math.max(0, state.items[index].stock - qty);
        }
      });
    }
  }
});

export const { addProduct, editProduct, deleteProduct, updateStock, decreaseStock } = productsSlice.actions;
export default productsSlice.reducer;
