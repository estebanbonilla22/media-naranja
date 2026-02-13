// Devuelve fecha "YYYY-MM-DD" usando hora de Bogotá
export function getBogotaISODate() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const y = parts.find(p => p.type === "year").value;
  const m = parts.find(p => p.type === "month").value;
  const d = parts.find(p => p.type === "day").value;

  return `${y}-${m}-${d}`;
}

export function isUnlocked(unlockDateISO) {
  const today = getBogotaISODate();
  return today >= unlockDateISO;
}
