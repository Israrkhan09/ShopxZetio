import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import FilterSidebar from '../components/FilterSidebar';
import ProductCard from '../components/ProductCard';
import SkeletonLoader from '../components/SkeletonLoader';
import Footer from '../components/Footer';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const allProducts = useSelector(state => state.products.items);
  
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('Default');
  const [filters, setFilters] = useState({
    categories: searchParams.get('category') ? [searchParams.get('category')] : [],
    priceRange: 50000,
    rating: 0
  });

  useEffect(() => {
    // Fake loading delay
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setFilters(prev => ({ ...prev, categories: [category] }));
    }
  }, [searchParams]);

  // Filter and sort products
  let filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filters.categories.length === 0 || filters.categories.includes(product.category);
    const matchesPrice = product.price <= filters.priceRange;
    const matchesRating = product.rating >= filters.rating;
    
    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });

  if (sortOption === 'Price Low-High') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'Price High-Low') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === 'Newest') {
    filteredProducts.sort((a, b) => (b.isNew === a.isNew) ? 0 : b.isNew ? 1 : -1);
  } else if (sortOption === 'Top Rated') {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Update URL if single category is selected
    if (newFilters.categories.length === 1) {
      setSearchParams({ category: newFilters.categories[0] });
    } else if (newFilters.categories.length === 0) {
      searchParams.delete('category');
      setSearchParams(searchParams);
    }
  };

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4 md:px-6 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-[45px] font-heading font-black text-white uppercase tracking-widest">ARMORY</h1>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="SEARCH GEAR..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 bg-card border border-border rounded px-4 py-2 pl-10 focus:outline-none focus:border-primary font-sans uppercase text-sm transition-colors"
              />
              <Search size={18} className="absolute left-3 top-2.5 text-muted-foreground" />
            </div>
            
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-card border border-border rounded px-4 py-2 focus:outline-none focus:border-primary font-sans uppercase text-sm cursor-pointer"
            >
              <option>Default</option>
              <option>Price Low-High</option>
              <option>Price High-Low</option>
              <option>Newest</option>
              <option>Top Rated</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
          
          <div className="flex-1">
            <div className="mb-4 text-muted-foreground font-bold uppercase text-sm">
              SHOWING {filteredProducts.length} PRODUCTS
            </div>
            
            {isLoading ? (
              <SkeletonLoader />
            ) : filteredProducts.length === 0 ? (
              <div className="bg-card border border-border p-12 rounded-xl text-center flex flex-col items-center">
                <Search size={48} className="text-muted-foreground mb-4" />
                <h3 className="text-2xl font-heading font-bold mb-2">NO GEAR FOUND</h3>
                <p className="text-muted-foreground mb-6 uppercase">Adjust your filters to find what you need.</p>
                <button 
                  onClick={() => {
                    setFilters({ categories: [], priceRange: 50000, rating: 0 });
                    setSearchQuery('');
                  }}
                  className="border border-primary text-primary px-6 py-2 rounded font-bold uppercase hover:bg-primary/10 transition-colors"
                >
                  CLEAR FILTERS
                </button>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
