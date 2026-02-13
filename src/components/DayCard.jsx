import { motion } from "framer-motion";
import { isUnlocked } from "../utils/date";

export default function DayCard({ day, onOpen }) {
  const unlocked = isUnlocked(day.unlockDateISO);

  return (
    <motion.button
      onClick={() => onOpen(day, unlocked)}
      className={`card ${unlocked ? "cardUnlocked" : "cardLocked"}`}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="cardTop">
        <div>
          <p className="cardSub">{day.subtitle}</p>
          <h3 className="cardTitle">{day.title}</h3>
          <p className="cardMeta">
            {unlocked ? "Listo para abrir 💌" : `Bloqueado hasta ${day.unlockDateISO}`}
          </p>
        </div>
        <div className="lockBox">{unlocked ? "🔓" : "🔒"}</div>
      </div>

      <div className="shine" />
    </motion.button>
  );
}
