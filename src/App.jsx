import { useMemo, useState } from "react";
import PlaneVisualization from "./components/PlaneVisualization";
import CabinSwitcher from "./components/CabinSwitcher";
import SeatMap from "./components/SeatMap";
import BookingSummary from "./components/BookingSummary";
import ConfirmModal from "./components/ConfirmModal";
import { CABINS, FLIGHT, cabinById } from "./data/seatData";

const INITIAL_SELECTION = [
  { id: "1A", cabinId: "business", price: 480 },
  { id: "1B", cabinId: "business", price: 480 },
  { id: "1C", cabinId: "business", price: 480 },
  { id: "1D", cabinId: "business", price: 480 },
];

export default function App() {
  const [activeCabinId, setActiveCabinId] = useState("business");
  const [selectedSeats, setSelectedSeats] = useState(INITIAL_SELECTION);
  const [showConfirm, setShowConfirm] = useState(false);

  const activeCabin = useMemo(() => cabinById(activeCabinId), [activeCabinId]);
  const selectedIds = useMemo(() => new Set(selectedSeats.map((s) => s.id)), [selectedSeats]);

  function toggleSeat(seat) {
    setSelectedSeats((prev) => {
      const exists = prev.some((s) => s.id === seat.id && s.cabinId === seat.cabinId);
      if (exists) return prev.filter((s) => !(s.id === seat.id && s.cabinId === seat.cabinId));
      if (prev.length >= 8) return prev;
      return [...prev, { id: seat.id, cabinId: seat.cabinId, price: seat.price }];
    });
  }

  function removeSeat(id) {
    setSelectedSeats((prev) => prev.filter((seat) => seat.id !== id));
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <h1>Choose Seats</h1>
          <p>{FLIGHT.origin} → {FLIGHT.destination} · {FLIGHT.aircraft} · {FLIGHT.date}</p>
        </div>
        <div className="topbar-actions">
          <span className="checkin"><i /> Check-in open</span>
          <span className="avatar">JR<span className="status-dot" /></span>
        </div>
      </header>

      <section className="plane-panel">
        <PlaneVisualization activeCabin={activeCabinId} onSelect={setActiveCabinId} />
      </section>

      <div className="section-toolbar">
        <div className="section-tabs">
          <span className="toolbar-label">SECTIONS</span>
          <CabinSwitcher activeCabin={activeCabinId} onSelect={setActiveCabinId} />
        </div>
        <div className="legend">
          <span><i className="available" /> Available</span>
          <span><i className="occupied" /> Occupied</span>
          <span><i className="selected" /> Your selection</span>
        </div>
      </div>

      <main className="workspace">
        <aside className="render-card">
          <div className="render-icon">
            {Array.from({ length: 9 }).map((_, i) => <i key={i} />)}
          </div>
          <span className="expand">↗</span>
          <div className="render-copy">
            <h2>3D Rendering</h2>
            <p>Explore the aircraft cabin in 3D and feel what awaits you on board.</p>
          </div>
        </aside>

        <section className="seat-card">
          <SeatMap
            cabin={activeCabin}
            selectedIds={selectedIds}
            onToggle={toggleSeat}
          />
          <BookingSummary
            selectedSeats={selectedSeats}
            onRemove={removeSeat}
            onConfirm={() => setShowConfirm(true)}
          />
        </section>
      </main>

      <ConfirmModal
        open={showConfirm}
        selectedSeats={selectedSeats}
        onClose={() => {
          setShowConfirm(false);
          setSelectedSeats([]);
        }}
      />
    </div>
  );
}
