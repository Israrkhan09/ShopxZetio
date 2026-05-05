import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
  try {
    const serialized = localStorage.getItem('shopxzetio_admin');
    if (serialized) {
      return JSON.parse(serialized);
    }
  } catch (e) {
    console.error("Could not load admin state", e);
  }
  return { isAuthenticated: false };
};

const adminSlice = createSlice({
  name: 'admin',
  initialState: loadState(),
  reducers: {
    login: (state, action) => {
      const { username, password } = action.payload;
      if (username === 'admin' && password === 'shopxzetio123') {
        state.isAuthenticated = true;
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
    }
  }
});

export const { login, logout } = adminSlice.actions;
export default adminSlice.reducer;
