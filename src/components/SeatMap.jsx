import { AnimatePresence, motion } from "framer-motion";
import Seat from "./Seat";
import { buildSeatMap } from "../data/seatData";

export default function SeatMap({ cabin, selectedIds, onToggle }) {
  const rows = buildSeatMap(cabin);
  const isBusiness = cabin.id === "business";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={cabin.id}
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -8 }}
        transition={{ duration: .18 }}
        className="seat-map-inner"
      >
        <div className="seat-heading">
          <div>
            <h2>{cabin.section} ({cabin.label} Class)</h2>
          </div>
          <div className="seat-meta">{cabin.capacity} seats · ${cabin.price} / seat</div>
        </div>

        <div className={`seat-grid ${isBusiness ? "business-grid" : ""}`}>
          <div className="row-labels">
            <span />
            {rows.map((_, i) => <span key={i}>{isBusiness ? cabin.rows[i] : cabin.rowNumbers[i]}</span>)}
          </div>
          <div className="seat-table">
            <div className="column-labels">
              {isBusiness
                ? ["1","2","3","4","5","6","7","8"].map((n) => <span key={n}>{n}</span>)
                : cabin.columns.map((c) => <span key={c}>{c}</span>)}
            </div>
            {rows.map((row, ri) => (
              <div className="seat-row" key={ri}>
                {row.map((seat, ci) => (
                  <span key={seat.id} className="seat-slot">
                    <Seat seat={seat} isSelected={selectedIds.has(seat.id)} onToggle={onToggle} />
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="cabin-edge left" />
          <div className="cabin-edge right" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
