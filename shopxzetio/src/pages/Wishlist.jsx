import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { removeFromWishlist } from '../redux/wishlistSlice';
import { addToCart } from '../redux/cartSlice';
import { showToast } from '../components/ToastNotification';
import Footer from '../components/Footer';

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist.items);

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
    showToast('Removed from wishlist!');
  };

  const handleAddToCart = (product) => {
    if (product.stock > 0) {
      dispatch(addToCart({ product, qty: 1 }));
      showToast('Added to cart!');
    }
  };

  return (
    <div className="min-h-screen pt-24 flex flex-col">
      <div className="container mx-auto px-4 md:px-6 flex-grow">
        <h1 className="text-[45px] font-heading font-black text-white uppercase tracking-widest mb-8">WISHLIST</h1>
        
        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Heart size={64} className="text-muted-foreground mb-6" />
            <h2 className="text-[35px] font-heading font-bold text-white mb-4">YOUR WISHLIST IS EMPTY</h2>
            <p className="text-[18px] text-muted-foreground uppercase mb-8 max-w-md">
              Save your favorite gear here and grab them when you're ready to dominate.
            </p>
            <Link 
              to="/shop" 
              className="bg-primary text-primary-foreground px-8 py-3 rounded font-bold uppercase tracking-wider hover:glow-cyan transition-all"
            >
              BROWSE GEAR
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {wishlistItems.map((product) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-card border border-border p-4 rounded-xl flex gap-4 relative group"
              >
                <div className="w-24 h-24 bg-muted rounded overflow-hidden flex-shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-bold truncate pr-8">{product.name}</h3>
                    <div className="text-primary font-bold mt-1">Rs. {product.price.toLocaleString()}</div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      product.stock > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {product.stock > 0 ? 'IN STOCK' : 'OUT OF STOCK'}
                    </span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                      className={`p-2 rounded transition-colors ${
                        product.stock > 0 ? 'bg-primary text-primary-foreground hover:glow-cyan' : 'bg-muted text-muted-foreground cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCart size={16} />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(product.id)}
                  className="absolute top-2 right-2 p-2 text-muted-foreground hover:text-destructive transition-colors bg-background/80 rounded-full"
                >
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
