import { motion } from "framer-motion";

export default function Seat({ seat, isSelected, onToggle }) {
  if (!seat) return <div className="seat aisle" aria-hidden="true" />;

  return (
    <motion.button
      type="button"
      disabled={seat.occupied}
      onClick={() => onToggle(seat)}
      whileTap={!seat.occupied ? { scale: 0.9 } : undefined}
      className={`seat ${seat.occupied ? "occupied" : ""} ${isSelected ? "selected" : ""}`}
      aria-label={`${seat.id}, ${seat.occupied ? "occupied" : isSelected ? "selected" : "available"}`}
      aria-pressed={isSelected}
    >
      <span>{seat.col}</span>
      <i />
    </motion.button>
  );
}
