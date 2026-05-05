import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import Navbar from './components/Navbar';
import ToastNotification from './components/ToastNotification';
import { ProtectedRoute } from './components/ProtectedRoute';

import Home from './pages/Home';
import Shop from './pages/Shop';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';

import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminProducts from './admin/pages/AdminProducts';
import AdminOrders from './admin/pages/AdminOrders';
import AdminStock from './admin/pages/AdminStock';

const AppLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <ToastNotification />
        <Routes>
          {/* Customer Routes */}
          <Route path="/" element={<AppLayout><Home /></AppLayout>} />
          <Route path="/shop" element={<AppLayout><Shop /></AppLayout>} />
          <Route path="/wishlist" element={<AppLayout><Wishlist /></AppLayout>} />
          <Route path="/checkout" element={<AppLayout><Checkout /></AppLayout>} />
          <Route path="/order-confirmation" element={<AppLayout><OrderConfirmation /></AppLayout>} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/products" element={<ProtectedRoute><AdminProducts /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute><AdminOrders /></ProtectedRoute>} />
          <Route path="/admin/stock" element={<ProtectedRoute><AdminStock /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
