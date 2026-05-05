import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import wishlistReducer from './wishlistSlice';
import productsReducer from './productsSlice';
import ordersReducer from './ordersSlice';
import adminReducer from './adminSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    products: productsReducer,
    orders: ordersReducer,
    admin: adminReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('shopxzetio_cart', JSON.stringify(state.cart));
  localStorage.setItem('shopxzetio_wishlist', JSON.stringify(state.wishlist));
  localStorage.setItem('shopxzetio_products', JSON.stringify(state.products));
  localStorage.setItem('shopxzetio_orders', JSON.stringify(state.orders));
  localStorage.setItem('shopxzetio_admin', JSON.stringify(state.admin));
});
