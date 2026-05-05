import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Heart, ShoppingCart } from 'lucide-react';

export const showToast = (message) => {
  window.dispatchEvent(new CustomEvent('shoptoast', { detail: message }));
};

const ToastNotification = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleToast = (e) => {
      const message = e.detail;
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, 3000);
    };

    window.addEventListener('shoptoast', handleToast);
    return () => window.removeEventListener('shoptoast', handleToast);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            className="bg-card text-foreground border-l-4 border-primary p-4 rounded shadow-lg flex items-center gap-3 min-w-[250px]"
            data-testid={`toast-${toast.id}`}
          >
            <div className="text-primary">
              {toast.message.toLowerCase().includes('cart') ? (
                <ShoppingCart size={20} />
              ) : toast.message.toLowerCase().includes('wishlist') ? (
                <Heart size={20} />
              ) : toast.message.toLowerCase().includes('removed') ? (
                <XCircle size={20} />
              ) : (
                <CheckCircle size={20} />
              )}
            </div>
            <span className="font-sans font-semibold uppercase">{toast.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastNotification;
