import React from 'react';
import { motion } from 'framer-motion';

const CategoryCard = ({ category, icon: Icon, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="bg-card border border-border hover:border-primary hover:glow-cyan p-6 rounded-xl flex flex-col items-center justify-center gap-4 transition-colors w-full group"
      data-testid={`category-card-${category}`}
    >
      <div className="text-foreground group-hover:text-primary transition-colors">
        <Icon size={48} />
      </div>
      <h3 className="font-heading text-lg text-center">{category}</h3>
    </motion.button>
  );
};

export default CategoryCard;
