import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, color = "text-primary", delay = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-card border border-border rounded-xl p-6 relative overflow-hidden group hover:border-primary transition-colors"
    >
      <div className="absolute -right-6 -top-6 opacity-5 group-hover:opacity-10 transition-opacity">
        <Icon size={120} className={color} />
      </div>
      
      <div className="relative z-10 flex items-start justify-between mb-4">
        <div className={`p-3 rounded bg-background border border-border ${color}`}>
          <Icon size={24} />
        </div>
      </div>
      
      <div className="relative z-10">
        <h3 className="text-sm font-bold uppercase text-muted-foreground tracking-wider mb-1">{title}</h3>
        <div className={`text-3xl font-heading font-black ${color}`}>{value}</div>
      </div>
    </motion.div>
  );
};

export default StatCard;
