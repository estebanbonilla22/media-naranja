import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeartsBurst({ show }) {
  const hearts = useMemo(() => {
    return Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      left: Math.random() * 90 + 5,
      delay: Math.random() * 0.25,
      size: Math.random() * 20 + 16,
      drift: (Math.random() - 0.5) * 120,
    }));
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 998 }}>
          {hearts.map((h) => (
            <motion.div
              key={h.id}
              initial={{ opacity: 0, y: 40, x: 0, scale: 0.9 }}
              animate={{ opacity: 1, y: -420, x: h.drift, scale: 1.1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.35, delay: h.delay, ease: "easeOut" }}
              style={{
                position: "absolute",
                bottom: 40,
                left: `${h.left}%`,
                fontSize: h.size,
                filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.35))",
              }}
            >
              💖
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
