import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';

const FilterSidebar = ({ filters, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false); // Mobile toggle
  const [sections, setSections] = useState({
    category: true,
    price: true,
    rating: true
  });

  const toggleSection = (section) => {
    setSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCategoryChange = (cat) => {
    const newCategories = filters.categories.includes(cat)
      ? filters.categories.filter(c => c !== cat)
      : [...filters.categories, cat];
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handlePriceChange = (e) => {
    onFilterChange({ ...filters, priceRange: parseInt(e.target.value) });
  };

  const handleRatingChange = (rating) => {
    onFilterChange({ ...filters, rating });
  };

  const clearFilters = () => {
    onFilterChange({
      categories: [],
      priceRange: 50000,
      rating: 0
    });
  };

  const categoriesList = ['Headphones', 'Earbuds', 'Splitters', 'Cooling Fans', 'Mobile Accessories'];

  const SidebarContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-border">
        <h3 className="font-heading font-bold text-lg flex items-center gap-2">
          <Filter size={18} className="text-primary" /> FILTERS
        </h3>
        <button onClick={clearFilters} className="text-xs text-muted-foreground hover:text-primary uppercase">
          Clear All
        </button>
      </div>

      {/* Category Section */}
      <div className="border-b border-border pb-6">
        <button onClick={() => toggleSection('category')} className="flex justify-between items-center w-full mb-4 group">
          <h4 className="font-bold uppercase text-sm group-hover:text-primary transition-colors">Category</h4>
          {sections.category ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        <AnimatePresence>
          {sections.category && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-3 overflow-hidden">
              {categoriesList.map(cat => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-5 h-5">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(cat)}
                      onChange={() => handleCategoryChange(cat)}
                      className="appearance-none w-5 h-5 border border-border rounded bg-background checked:bg-primary checked:border-primary transition-colors cursor-pointer"
                    />
                    {filters.categories.includes(cat) && <div className="absolute w-2 h-2 bg-black rounded-sm pointer-events-none" />}
                  </div>
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{cat}</span>
                </label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Price Section */}
      <div className="border-b border-border pb-6">
        <button onClick={() => toggleSection('price')} className="flex justify-between items-center w-full mb-4 group">
          <h4 className="font-bold uppercase text-sm group-hover:text-primary transition-colors">Max Price</h4>
          {sections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        <AnimatePresence>
          {sections.price && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pt-2">
              <input
                type="range"
                min="0"
                max="50000"
                step="500"
                value={filters.priceRange}
                onChange={handlePriceChange}
                className="w-full h-1 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground font-bold">
                <span>Rs. 0</span>
                <span className="text-primary">Rs. {filters.priceRange.toLocaleString()}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Rating Section */}
      <div>
        <button onClick={() => toggleSection('rating')} className="flex justify-between items-center w-full mb-4 group">
          <h4 className="font-bold uppercase text-sm group-hover:text-primary transition-colors">Min Rating</h4>
          {sections.rating ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        <AnimatePresence>
          {sections.rating && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-3 overflow-hidden">
              {[4, 3, 2, 1].map(rating => (
                <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-5 h-5 rounded-full border border-border">
                    <input
                      type="radio"
                      name="rating"
                      checked={filters.rating === rating}
                      onChange={() => handleRatingChange(rating)}
                      className="appearance-none w-full h-full rounded-full border border-transparent checked:border-primary transition-colors cursor-pointer"
                    />
                    {filters.rating === rating && <div className="absolute w-2.5 h-2.5 bg-primary rounded-full pointer-events-none" />}
                  </div>
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-1">
                    {rating} <span className="text-yellow-400">★</span> & Up
                  </span>
                </label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  return (
    <>
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-card border border-border p-4 rounded-lg flex items-center justify-between font-bold uppercase hover:border-primary transition-colors"
        >
          <span className="flex items-center gap-2"><Filter size={18} /> FILTER GEAR</span>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-card border border-border p-6 rounded-lg mb-6 overflow-hidden"
          >
            <SidebarContent />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 shrink-0 bg-card border border-border p-6 rounded-xl sticky top-24 h-[calc(100vh-120px)] overflow-y-auto">
        <SidebarContent />
      </div>
    </>
  );
};

export default FilterSidebar;
