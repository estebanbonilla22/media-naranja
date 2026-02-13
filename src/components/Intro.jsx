import { motion, AnimatePresence } from "framer-motion";

export default function Intro({ open, onStart, title = "Para mi media naranja 🍊", subtitle = "Toca para empezar 💛" }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            display: "grid",
            placeItems: "center",
            padding: 18,
            background: "radial-gradient(1200px 800px at 30% 20%, rgba(236,72,153,0.35), transparent 60%), radial-gradient(1000px 700px at 70% 70%, rgba(217,70,239,0.35), transparent 55%), rgba(10,10,18,0.9)",
            backdropFilter: "blur(10px)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onStart}
        >
          <motion.div
            initial={{ y: 18, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 18, scale: 0.96, opacity: 0 }}
            transition={{ type: "spring", stiffness: 160, damping: 16 }}
            style={{
              width: "min(520px, 92vw)",
              borderRadius: 26,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.08)",
              boxShadow: "0 30px 90px rgba(0,0,0,0.45)",
              padding: 18,
              textAlign: "center",
              color: "white",
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: [0.9, 1.06, 1], opacity: 1 }}
              transition={{ duration: 0.7 }}
              style={{ fontSize: 44, marginBottom: 10 }}
            >
              💛
            </motion.div>

            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800 }}>{title}</h1>
            <p style={{ margin: "10px 0 0", opacity: 0.9 }}>{subtitle}</p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              style={{
                marginTop: 16,
                display: "inline-flex",
                gap: 10,
                alignItems: "center",
                padding: "12px 16px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.20)",
                background: "rgba(255,255,255,0.10)",
              }}
            >
              <span style={{ fontWeight: 700 }}>Iniciar</span>
              <span style={{ opacity: 0.85 }}>→</span>
            </motion.div>

            <p style={{ marginTop: 12, fontSize: 12, opacity: 0.7 }}>
              (Necesita un toque para que la música funcione en iPhone)
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
