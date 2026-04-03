import { motion } from 'motion/react';
import { useMemo } from 'react';

export default function Snowfall() {
  const snowflakes = useMemo(() => {
    return Array.from({ length: 120 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 20,
      opacity: Math.random() * 0.6 + 0.2,
      blur: Math.random() * 1.5 + 0.5,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-1 overflow-hidden">
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          initial={{ y: -20, opacity: 0 }}
          animate={{ 
            y: '110vh',
            opacity: [0, flake.opacity, flake.opacity, 0],
            x: ['-30px', '30px', '-30px']
          }}
          transition={{
            y: {
              duration: flake.duration,
              repeat: Infinity,
              ease: "linear",
              delay: flake.delay,
            },
            opacity: {
              duration: flake.duration,
              repeat: Infinity,
              ease: "linear",
              delay: flake.delay,
            },
            x: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }
          }}
          style={{
            position: 'absolute',
            left: flake.left,
            width: flake.size,
            height: flake.size,
            backgroundColor: 'white',
            borderRadius: '50%',
            filter: `blur(${flake.blur}px)`,
            boxShadow: `0 0 10px rgba(255, 255, 255, ${flake.opacity})`,
          }}
        />
      ))}
    </div>
  );
}
