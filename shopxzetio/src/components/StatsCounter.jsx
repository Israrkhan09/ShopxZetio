import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CountUp = ({ target, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const increment = target / (duration * 60); // 60fps
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [target, duration, isInView]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const StatsCounter = () => {
  const stats = [
    { label: "ORDERS DELIVERED", value: 500, suffix: "+" },
    { label: "HAPPY GAMERS", value: 1000, suffix: "+" },
    { label: "ELITE PRODUCTS", value: 50, suffix: "+" }
  ];

  return (
    <div className="py-20 border-y border-border bg-card/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920')] opacity-5 bg-cover bg-center mix-blend-screen" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-6"
            >
              <div className="text-5xl md:text-6xl font-heading font-black text-primary mb-2">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-lg font-bold tracking-widest text-muted-foreground uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsCounter;
