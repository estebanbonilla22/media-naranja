// src/App.jsx
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import "./styles.css";

import { DAYS } from "./data/days";
import AnimatedBackground from "./components/AnimatedBackground";
import DayCard from "./components/DayCard";
import DayModal from "./components/DayModal";
import MusicPlayer from "./components/MusicPlayer";

import Intro from "./components/Intro";
import HeartsBurst from "./components/HeartsBurst";

// ✅ Para que tú puedas probar todos los días sin esperar
const DEV_UNLOCK_ALL = false; // cuando lo vayas a entregar: false

function toLocalISODate(date = new Date()) {
  // yyyy-mm-dd en hora local
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function App() {
  const todayISO = useMemo(() => toLocalISODate(new Date()), []);

  // Modal
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [shake, setShake] = useState(false);

  // Cinemática
  const [showIntro, setShowIntro] = useState(false);
  const [burst, setBurst] = useState(false);

  // Mostrar intro solo la primera vez en ese dispositivo
  useEffect(() => {
    const seen = localStorage.getItem("MN_SEEN_INTRO");
    setShowIntro(!seen);
  }, []);

  function startExperience() {
    localStorage.setItem("MN_SEEN_INTRO", "1");
    setShowIntro(false);

    // Corazones
    setBurst(true);
    setTimeout(() => setBurst(false), 1600);

    // Arrancar música (iPhone requiere toque)
    window.dispatchEvent(new Event("MN_START_MUSIC"));
  }

  function openDay(day) {
    const unlocked = DEV_UNLOCK_ALL ? true : day.unlockDateISO <= todayISO;

    if (!unlocked) {
      setShake(true);
      setTimeout(() => setShake(false), 450);
      return;
    }

    setSelectedDay(day);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    // limpia la selección después de cerrar para evitar “parpadeos”
    setTimeout(() => setSelectedDay(null), 200);
  }

  return (
    <div className="appRoot">
      <AnimatedBackground />

      {/* Cinemática */}
      <Intro
        open={showIntro}
        onStart={startExperience}
        title="Para mi media naranja 🍊"
        subtitle="Toca para empezar 💛"
      />
      <HeartsBurst show={burst} />

      {/* Player fijo */}
      <MusicPlayer src="/audio/cancion.mp3" />

      <div className="container">
        <header className="topHeader">
          <motion.h1
            className="mainTitle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            Para mi media naranja 🍊
          </motion.h1>
          <p className="subTitle">
            {DEV_UNLOCK_ALL
              ? "Modo prueba activado (puedes abrir todos los días)."
              : `Hoy es ${todayISO}. Abre tu sorpresa cuando llegue el día ✨`}
          </p>
        </header>

        <motion.div
          className={`grid ${shake ? "shake" : ""}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
        >
          {DAYS.map((day) => {
            const unlocked = DEV_UNLOCK_ALL ? true : day.unlockDateISO <= todayISO;

            return (
              <DayCard
                key={day.key}
                day={day}
                unlocked={unlocked}
                onOpen={() => openDay(day)}
                todayISO={todayISO}
              />
            );
          })}
        </motion.div>
      </div>

      <DayModal open={modalOpen} day={selectedDay} onClose={closeModal} />
    </div>
  );
}
