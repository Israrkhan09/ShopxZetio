import { createSlice } from '@reduxjs/toolkit';
import initialOrders from '../data/orders.json';

const loadState = () => {
  try {
    const serialized = localStorage.getItem('shopxzetio_orders');
    if (serialized) {
      const parsed = JSON.parse(serialized);
      if (parsed.items && parsed.items.length > 0) return parsed;
    }
  } catch (e) {
    console.error("Could not load orders state", e);
  }
  return { items: initialOrders };
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState: loadState(),
  reducers: {
    addOrder: (state, action) => {
      state.items.unshift(action.payload); // add to top
    },
    updateOrderStatus: (state, action) => {
      const { id, status } = action.payload;
      const order = state.items.find(item => item.id === id);
      if (order) {
        order.status = status;
      }
    }
  }
});

export const { addOrder, updateOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer;
