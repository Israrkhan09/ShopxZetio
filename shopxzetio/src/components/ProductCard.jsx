import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Heart, Star, Eye, ShoppingCart } from 'lucide-react';
import { addToCart } from '../redux/cartSlice';
import { toggleWishlist } from '../redux/wishlistSlice';
import { showToast } from './ToastNotification';
import QuickViewModal from './QuickViewModal';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlistItems.some((item) => item.id === product.id);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const handleAddToCart = () => {
    if (product.stock > 0) {
      dispatch(addToCart({ product, qty: 1 }));
      showToast('Added to cart!');
    }
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(product));
    showToast(isWishlisted ? 'Removed from wishlist!' : 'Added to wishlist!');
  };

  return (
    <>
      <motion.div
        className="bg-card border border-border hover:border-primary hover:glow-cyan rounded-xl overflow-hidden flex flex-col relative group transition-colors"
        data-testid={`product-card-${product.id}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {/* Badges */}
        {product.badge && (
          <div
            className={`absolute top-3 left-3 z-10 px-2 py-1 text-xs font-bold rounded ${
              product.badge === 'NEW'
                ? 'bg-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                : product.badge === 'TRENDING'
                ? 'bg-primary text-primary-foreground shadow-[0_0_10px_rgba(0,255,255,0.5)]'
                : 'bg-destructive text-white shadow-[0_0_10px_rgba(255,0,0,0.5)]'
            }`}
          >
            {product.badge}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-background/50 backdrop-blur border border-border hover:border-primary transition-colors"
          data-testid={`btn-wishlist-${product.id}`}
        >
          <Heart
            size={18}
            className={`${isWishlisted ? 'fill-destructive text-destructive' : 'text-foreground'}`}
          />
        </button>

        {/* Image */}
        <div className="relative h-48 sm:h-56 overflow-hidden bg-muted">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-heading font-bold text-lg truncate pr-2">{product.name}</h3>
          </div>

          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
          </div>

          <div className="mt-auto pt-4 flex justify-between items-end">
            <div className="text-primary font-bold text-xl">Rs. {product.price.toLocaleString()}</div>
            <div
              className={`text-xs px-2 py-1 rounded-full font-bold ${
                product.stock === 0
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : product.stock <= 5
                  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  : 'bg-green-500/20 text-green-400 border border-green-500/30'
              }`}
            >
              {product.stock === 0 ? 'OUT OF STOCK' : product.stock <= 5 ? `LOW STOCK (${product.stock})` : 'IN STOCK'}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsQuickViewOpen(true)}
              className="border border-primary text-primary hover:bg-primary/10 py-2 rounded font-sans font-bold uppercase flex items-center justify-center gap-1"
              data-testid={`btn-quickview-${product.id}`}
            >
              <Eye size={16} /> VIEW
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`py-2 rounded font-sans font-bold uppercase flex items-center justify-center gap-1 ${
                product.stock > 0
                  ? 'bg-primary text-primary-foreground hover:glow-cyan'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
              data-testid={`btn-addcart-${product.id}`}
            >
              <ShoppingCart size={16} /> {product.stock > 0 ? 'ADD' : 'SOLD'}
            </motion.button>
          </div>
        </div>
      </motion.div>

      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
};

export default ProductCard;
