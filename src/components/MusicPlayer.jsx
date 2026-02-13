import { useEffect, useRef, useState } from "react";

export default function MusicPlayer({ src = "/audio/cancion.mp3" }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const [d, setD] = useState(0);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    const onTime = () => setT(a.currentTime || 0);
    const onMeta = () => setD(a.duration || 0);
    const onEnd = () => setPlaying(false);

    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnd);
    const onStartMusic = async () => {
    const a = audioRef.current;
    if (!a) return;
    try {
    await a.play();
    setPlaying(true);
    } catch {
    setPlaying(false);
  }
};

window.addEventListener("MN_START_MUSIC", onStartMusic);

    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnd);
      window.removeEventListener("MN_START_MUSIC", onStartMusic);

    };
  }, []);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;

    if (!playing) {
      try {
        await a.play();
        setPlaying(true);
      } catch {
        // iOS: si no fue por toque del usuario, bloquea
        setPlaying(false);
      }
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  const pct = d ? Math.min(100, (t / d) * 100) : 0;

  return (
    <div className="player">
      <audio ref={audioRef} src={src} preload="metadata" />
      <button className="playerBtn" onClick={toggle}>
        {playing ? "⏸" : "▶"}
      </button>
      <div className="playerInfo">
        <div className="playerTitle">Nuestra canción 🎵</div>
        <div className="playerBar">
          <div className="playerFill" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}
