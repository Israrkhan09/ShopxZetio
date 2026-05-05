import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Package, ArrowRight } from 'lucide-react';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!location.state || !location.state.orderId) {
      navigate('/');
    }
    setMounted(true);
  }, [location, navigate]);

  if (!location.state || !mounted) return null;

  const { orderId, customerName, totalAmount } = location.state;

  return (
    <div className="min-h-screen pt-24 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0 particle-bg opacity-50" />
      
      <div className="container mx-auto px-4 z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl mx-auto bg-card border border-border p-8 md:p-12 rounded-2xl text-center shadow-[0_0_50px_rgba(0,255,255,0.1)]"
        >
          <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-primary/50 relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
              className="absolute inset-0 bg-primary rounded-full blur-md opacity-30"
            />
            <Check size={48} className="text-primary" />
          </div>

          <h1 className="text-[45px] font-heading font-black text-white mb-4">MISSION ACCOMPLISHED</h1>
          <p className="text-[18px] text-muted-foreground uppercase tracking-wider mb-8">
            ORDER PLACED SUCCESSFULLY
          </p>

          <div className="bg-background border border-border rounded-lg p-6 mb-8 text-left space-y-4">
            <div className="flex items-center gap-3 text-primary mb-4 border-b border-border pb-4">
              <Package size={20} />
              <span className="font-bold uppercase tracking-wider">ORDER DETAILS</span>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground uppercase font-bold">ORDER ID</span>
              <span className="font-mono bg-muted px-2 py-1 rounded">{orderId}</span>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground uppercase font-bold">RECRUIT</span>
              <span className="font-bold">{customerName}</span>
            </div>
            
            <div className="flex justify-between items-center text-sm border-t border-border pt-4 mt-2">
              <span className="text-muted-foreground uppercase font-bold">TOTAL DEPLOYED</span>
              <span className="font-bold text-primary text-lg">Rs. {totalAmount?.toLocaleString()}</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-8">
            A confirmation comm has been sent to your terminal. Our team is preparing your gear for deployment.
          </p>

          <Link 
            to="/shop" 
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded font-bold uppercase tracking-wider hover:glow-cyan transition-all w-full justify-center"
          >
            RETURN TO SHOP <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
