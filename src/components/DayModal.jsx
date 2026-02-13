import { useMemo, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";


function launchConfetti() {
  const end = Date.now() + 1200;
  (function frame() {
    confetti({ particleCount: 6, spread: 80, origin: { y: 0.72 } });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

export default function DayModal({ open, day, onClose }) {
    useEffect(() => {
  if (!open) return;

  const prev = document.body.style.overflow;
  document.body.style.overflow = "hidden";

  return () => {
    document.body.style.overflow = prev;
  };
}, [open]);

  const [index, setIndex] = useState(0);

  const photos = useMemo(() => day?.photos ?? [], [day]);
  const hasPhotos = photos.length > 0;
  const current = hasPhotos ? photos[index] : null;

  // cuando cambias de día, vuelve a la primera foto
  useEffect(() => {
    setIndex(0);
  }, [day?.key]);

  function prev() {
    if (!hasPhotos) return;
    setIndex((i) => (i - 1 + photos.length) % photos.length);
  }

  function next() {
    if (!hasPhotos) return;
    setIndex((i) => (i + 1) % photos.length);
  }

  if (!day) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modalWrap"
          initial={{ opacity: 0 }}
          animate={{ y: 0, scale: [0.94,1.04,1], opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            className="modalBackdrop"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="modalPanel"
            initial={{ y: 30, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 30, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
          >
            <div className="modalHeader">
              <div>
                <h2 className="modalTitle">{day.title}</h2>
                <p className="modalSub">{day.subtitle}</p>
              </div>

              <button className="btnGhost" onClick={onClose}>
                Cerrar
              </button>
            </div>

            <div className="modalBody">
              {/* CARTA */}
              <motion.div
                className="box"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.12 } },
                }}
              >
                <h3 className="boxTitle">💌 Carta</h3>
                <div className="boxText">
                  {day.letter.map((line, idx) => (
                    <motion.p
                      key={idx}
                      variants={{
                        hidden: { opacity: 0, y: 8 },
                        show: { opacity: 1, y: 0 },
                      }}
                    >
                      {line}
                    </motion.p>
                  ))}
                </div>
              </motion.div>

              {/* FOTOS REALES */}
              <div className="box">
                <div className="galleryTop">
                  <h3 className="boxTitle" style={{ margin: 0 }}>📸 Fotos</h3>

                  {hasPhotos && (
                    <div className="galleryBtns">
                      <button className="btnGhost" onClick={prev}>←</button>
                      <button className="btnGhost" onClick={next}>→</button>
                    </div>
                  )}
                </div>

                {!hasPhotos ? (
                  <p className="muted" style={{ marginTop: 10 }}>
                    No hay fotos aún en este día. Revisa que existan rutas en <b>days.js</b>.
                  </p>
                ) : (
                  <>
                    <div className="galleryFrame">
  <AnimatePresence mode="wait">
    <motion.img
      key={current}
      src={current}
      alt="foto"
      className="galleryImg"
      initial={{ opacity: 0, scale: 0.98, x: 18 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.98, x: -18 }}
      transition={{ duration: 0.22 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.18}
      onDragEnd={(e, info) => {
        const swipe = info.offset.x;
        const threshold = 70;

        if (swipe > threshold) prev();       // swipe derecha -> foto anterior
        else if (swipe < -threshold) next(); // swipe izquierda -> siguiente
      }}
    />
  </AnimatePresence>
</div>


                    <p className="muted" style={{ marginTop: 10 }}>
                      {index + 1} / {photos.length}
                    </p>

                    <div className="thumbs">
                      {photos.map((p, i) => (
                        <button
                          key={p}
                          className={`thumb ${i === index ? "thumbActive" : ""}`}
                          onClick={() => setIndex(i)}
                          title={`Foto ${i + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* FINAL */}
              {day.finale && (
                <div className="box finale">
                  <h3 className="boxTitle">🎉 Final</h3>
                  <p className="muted">Dale al botón para la sorpresa final ✨</p>

                  <button className="btnPrimary" onClick={launchConfetti}>
                    Lanzar confetti 💥
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
