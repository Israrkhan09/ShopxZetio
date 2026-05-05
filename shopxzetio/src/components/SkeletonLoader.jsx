import React from 'react';
import { motion } from 'framer-motion';

const SkeletonLoader = () => {
  const skeletons = Array(6).fill(0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skeletons.map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-card rounded-lg overflow-hidden border border-border p-4 flex flex-col gap-4"
          data-testid={`skeleton-${index}`}
        >
          <div className="w-full h-48 bg-muted rounded animate-pulse" />
          <div className="w-3/4 h-6 bg-muted rounded animate-pulse" />
          <div className="w-1/2 h-4 bg-muted rounded animate-pulse" />
          <div className="flex justify-between items-center mt-2">
            <div className="w-1/3 h-6 bg-muted rounded animate-pulse" />
            <div className="w-1/4 h-6 bg-muted rounded animate-pulse" />
          </div>
          <div className="flex gap-2 mt-4">
            <div className="flex-1 h-10 bg-muted rounded animate-pulse" />
            <div className="flex-1 h-10 bg-muted rounded animate-pulse" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
