import { AnimatePresence, motion } from "framer-motion";

export default function BookingSummary({ selectedSeats, onRemove, onConfirm }) {
  const total = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  const canConfirm = selectedSeats.length >= 4;

  return (
    <div className="booking-bar">
      <div className="selected-list">
        <AnimatePresence initial={false}>
          {selectedSeats.map((seat) => (
            <motion.button
              key={seat.id}
              type="button"
              className="selected-chip"
              onClick={() => onRemove(seat.id)}
              initial={{ opacity: 0, scale: .8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: .8 }}
            >
              {seat.id}<span>×</span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
      <div className="booking-total">
        <div><span>TOTAL</span><strong>${total.toLocaleString("en-US")}</strong></div>
        <button type="button" disabled={!canConfirm} onClick={onConfirm}>Confirm ({selectedSeats.length})</button>
      </div>
    </div>
  );
}
