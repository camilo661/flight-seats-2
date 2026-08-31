import { motion, AnimatePresence } from "framer-motion";

export default function ConfirmModal({ open, selectedSeats, onClose }) {
  const total = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div className="confirm-card" role="dialog" aria-modal="true" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} onClick={(e) => e.stopPropagation()}>
            <div className="confirm-icon">✓</div>
            <h2>Seats confirmed</h2>
            <p>Your seats are reserved for BOG → MDE.</p>
            <div className="confirm-seats">{selectedSeats.map((seat) => <span key={seat.id}>{seat.id}</span>)}</div>
            <strong>${total.toLocaleString("en-US")}</strong>
            <button onClick={onClose}>Done</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
