import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { X, Minus, Plus, Trash2, Gamepad2, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';

const CartDrawer = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0);

  const handleUpdateQty = (id, newQty, stock) => {
    if (newQty >= 1 && newQty <= stock) {
      dispatch(updateQuantity({ id, qty: newQty }));
    }
  };

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            data-testid="cart-overlay"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 20 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-card border-l border-border z-50 flex flex-col shadow-[-10px_0_30px_rgba(0,255,255,0.05)]"
            data-testid="cart-drawer"
          >
            <div className="p-6 border-b border-border flex justify-between items-center bg-background/50">
              <h2 className="text-[22px] font-heading font-bold text-white flex items-center gap-2">
                YOUR LOADOUT <span className="bg-primary text-primary-foreground text-sm px-2 py-0.5 rounded-full no-glow">{cartItems.length}</span>
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-primary">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                  <Gamepad2 size={64} className="mb-4 text-muted-foreground" />
                  <p className="text-xl font-heading mb-2">YOUR CART IS EMPTY</p>
                  <p className="text-sm">Gear up and dominate the game.</p>
                  <button onClick={onClose} className="mt-8 border border-primary text-primary px-6 py-2 rounded font-bold hover:bg-primary/10">
                    RETURN TO BASE
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.product.id} className="flex gap-4 border border-border p-3 rounded-lg bg-background group hover:border-primary/50 transition-colors">
                    <div className="w-20 h-20 bg-muted rounded overflow-hidden flex-shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold truncate pr-2" title={item.product.name}>{item.product.name}</h4>
                        <button
                          onClick={() => dispatch(removeFromCart(item.product.id))}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="text-primary font-bold">Rs. {item.product.price.toLocaleString()}</div>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-border rounded bg-card">
                          <button
                            onClick={() => handleUpdateQty(item.product.id, item.qty - 1, item.product.stock)}
                            className="p-1 hover:text-primary transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-bold">{item.qty}</span>
                          <button
                            onClick={() => handleUpdateQty(item.product.id, item.qty + 1, item.product.stock)}
                            className="p-1 hover:text-primary transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-border bg-background/50 space-y-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>SUBTOTAL</span>
                  <span className="text-primary">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <p className="text-xs text-muted-foreground">Delivery fee calculated at checkout.</p>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={onClose} className="border border-border hover:border-primary text-foreground hover:text-primary py-3 rounded font-bold uppercase transition-colors">
                    CONTINUE
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCheckout}
                    className="bg-primary text-primary-foreground py-3 rounded font-bold uppercase flex items-center justify-center gap-2 hover:glow-cyan"
                  >
                    CHECKOUT <ArrowRight size={18} />
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
