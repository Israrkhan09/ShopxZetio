import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { X, ShoppingCart, Heart, Star, Minus, Plus } from 'lucide-react';
import { addToCart } from '../redux/cartSlice';
import { toggleWishlist } from '../redux/wishlistSlice';
import { showToast } from './ToastNotification';

const QuickViewModal = ({ product, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlistItems.some((item) => item.id === product.id);
  const [qty, setQty] = useState(1);

  if (!isOpen) return null;

  const handleAddToCart = () => {
    if (product.stock > 0) {
      dispatch(addToCart({ product, qty }));
      showToast('Added to cart!');
      onClose();
    }
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(product));
    showToast(isWishlisted ? 'Removed from wishlist!' : 'Added to wishlist!');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            data-testid="modal-overlay"
          />
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="bg-card border border-border rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 flex flex-col md:flex-row shadow-[0_0_50px_rgba(0,255,255,0.1)]"
            data-testid={`quickview-${product.id}`}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 bg-background/50 backdrop-blur rounded-full text-muted-foreground hover:text-primary border border-transparent hover:border-primary transition-colors"
            >
              <X size={24} />
            </button>

            <div className="w-full md:w-1/2 relative bg-muted min-h-[300px]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover absolute inset-0"
              />
              {product.badge && (
                <div
                  className={`absolute top-4 left-4 z-10 px-3 py-1 text-sm font-bold rounded ${
                    product.badge === 'NEW'
                      ? 'bg-blue-500 text-white'
                      : product.badge === 'TRENDING'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-destructive text-white'
                  }`}
                >
                  {product.badge}
                </div>
              )}
            </div>

            <div className="w-full md:w-1/2 p-8 flex flex-col">
              <h2 className="text-3xl font-heading font-bold mb-2">{product.name}</h2>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({product.reviews} REVIEWS)</span>
              </div>

              <div className="text-3xl font-bold text-primary mb-6">
                Rs. {product.price.toLocaleString()}
              </div>

              <p className="text-muted-foreground mb-8 leading-relaxed">
                {product.description}
              </p>

              <div className="mt-auto space-y-6">
                <div className="flex items-center gap-4">
                  <span className="font-bold uppercase">STOCK:</span>
                  <span
                    className={`font-bold px-3 py-1 rounded ${
                      product.stock === 0
                        ? 'bg-red-500/20 text-red-400'
                        : product.stock <= 5
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-green-500/20 text-green-400'
                    }`}
                  >
                    {product.stock === 0
                      ? 'OUT OF STOCK'
                      : product.stock <= 5
                      ? `LOW STOCK — ONLY ${product.stock} LEFT`
                      : `${product.stock} AVAILABLE`}
                  </span>
                </div>

                {product.stock > 0 && (
                  <div className="flex items-center gap-4">
                    <span className="font-bold uppercase">QUANTITY:</span>
                    <div className="flex items-center border border-border rounded">
                      <button
                        onClick={() => setQty(Math.max(1, qty - 1))}
                        className="p-2 hover:bg-muted hover:text-primary transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-12 text-center font-bold">{qty}</span>
                      <button
                        onClick={() => setQty(Math.min(product.stock, qty + 1))}
                        className="p-2 hover:bg-muted hover:text-primary transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className={`py-4 rounded font-bold uppercase flex items-center justify-center gap-2 text-lg ${
                      product.stock > 0
                        ? 'bg-primary text-primary-foreground hover:glow-cyan'
                        : 'bg-muted text-muted-foreground cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart size={20} /> {product.stock > 0 ? 'ADD TO CART' : 'SOLD OUT'}
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleToggleWishlist}
                    className={`py-4 rounded font-bold uppercase flex items-center justify-center gap-2 text-lg border ${
                      isWishlisted
                        ? 'border-destructive text-destructive hover:bg-destructive/10'
                        : 'border-border text-foreground hover:border-primary hover:text-primary'
                    }`}
                  >
                    <Heart size={20} className={isWishlisted ? 'fill-destructive' : ''} /> 
                    {isWishlisted ? 'WISHLISTED' : 'WISHLIST'}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuickViewModal;
