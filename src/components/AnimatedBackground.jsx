import { motion } from "framer-motion";

function FloatingHeart({ delay = 0, x = 0, size = 22 }) {
  return (
    <motion.div
      className="absolute select-none"
      style={{ left: `${x}%`, bottom: "-12%", fontSize: size, color: "rgba(255,255,255,0.28)" }}
      initial={{ opacity: 0, y: 0, scale: 0.85 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [-10, -950],
        scale: [0.85, 1.1, 0.9],
      }}
      transition={{
        duration: 11,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      ♥
    </motion.div>
  );
}

export default function AnimatedBackground() {
  return (
    <div className="bgWrap">
      <div className="bgBase" />

      <motion.div
        className="orb orb1"
        animate={{ x: [0, 90, 0], y: [0, 70, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="orb orb2"
        animate={{ x: [0, -95, 0], y: [0, -80, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="hearts">
        <FloatingHeart delay={0} x={12} size={22} />
        <FloatingHeart delay={2} x={28} size={18} />
        <FloatingHeart delay={4} x={45} size={24} />
        <FloatingHeart delay={6} x={63} size={19} />
        <FloatingHeart delay={1} x={80} size={26} />
        <FloatingHeart delay={3} x={92} size={17} />
      </div>

      <div className="bgVignette" />
    </div>
  );
}
