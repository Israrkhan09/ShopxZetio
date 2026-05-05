import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Truck, Users, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import StatsCounter from '../components/StatsCounter';
import Footer from '../components/Footer';
import { Headphones, Music2, Cpu, Smartphone, Shuffle } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const products = useSelector(state => state.products.items);
  const trendingProducts = products.filter(p => p.isTrending).slice(0, 4);

  const categories = [
    { name: 'Headphones', icon: Headphones },
    { name: 'Earbuds', icon: Music2 },
    { name: 'Splitters', icon: Shuffle },
    { name: 'Cooling Fans', icon: Cpu },
    { name: 'Mobile Accessories', icon: Smartphone }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-80px)] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 particle-bg" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-0" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center md:text-left"
          >
            <h1 className="text-[45px] font-heading font-black text-white mb-6 leading-tight">
              PRO GEAR FOR <br/><span className="text-primary">GAMERS</span>
            </h1>
            <p className="text-[18px] text-muted-foreground mb-10 max-w-lg mx-auto md:mx-0 font-sans uppercase tracking-widest">
              Pakistan's Elite Gaming Accessory Store. Dominate the game with premium equipment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link 
                to="/shop" 
                className="bg-primary text-primary-foreground px-8 py-4 rounded font-bold uppercase tracking-wider hover:glow-cyan transition-all flex items-center justify-center gap-2"
                data-testid="hero-btn-shop"
              >
                SHOP NOW <ArrowRight size={20} />
              </Link>
              <button 
                onClick={() => {
                  document.getElementById('categories').scrollIntoView({ behavior: 'smooth' });
                }}
                className="border border-primary text-primary px-8 py-4 rounded font-bold uppercase tracking-wider hover:bg-primary/10 transition-colors"
                data-testid="hero-btn-categories"
              >
                VIEW CATEGORIES
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 hidden md:flex justify-center"
          >
            <motion.img 
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800" 
              alt="Premium Headset" 
              className="w-full max-w-md rounded-2xl shadow-[0_0_50px_rgba(0,255,255,0.2)] object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-y border-border bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-4">
              <Shield size={48} className="text-primary mb-4" />
              <h3 className="font-heading font-bold text-[18px] mb-2 text-white">GENUINE GEAR</h3>
              <p className="text-muted-foreground uppercase text-[18px] tracking-wider">100% authentic products</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <Truck size={48} className="text-primary mb-4" />
              <h3 className="font-heading font-bold text-[18px] mb-2 text-white">FAST DEPLOYMENT</h3>
              <p className="text-muted-foreground uppercase text-[18px] tracking-wider">Nationwide delivery</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <Users size={48} className="text-primary mb-4" />
              <h3 className="font-heading font-bold text-[18px] mb-2 text-white">TRUSTED COMMUNITY</h3>
              <p className="text-muted-foreground uppercase text-[18px] tracking-wider">Join thousands of gamers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-[35px] font-heading font-black text-white mb-4">BROWSE ARSENAL</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <CategoryCard 
                  category={cat.name} 
                  icon={cat.icon} 
                  onClick={() => navigate(`/shop?category=${cat.name}`)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hot Drops (Trending) */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-[35px] font-heading font-black text-white mb-4">HOT DROPS</h2>
              <div className="w-24 h-1 bg-primary rounded"></div>
            </div>
            <Link 
              to="/shop" 
              className="hidden md:flex items-center gap-2 text-primary font-bold uppercase hover:glow-text transition-all"
            >
              VIEW ALL <ArrowRight size={20} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 text-primary border border-primary px-6 py-3 rounded font-bold uppercase"
            >
              VIEW ALL GEAR <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <StatsCounter />
      
      <Footer />
    </div>
  );
};

export default Home;
