import { motion } from "framer-motion";
import { CABINS } from "../data/seatData";

const ZONES = [
  { id: "business", left: "16%", width: "22%", label: "BUSINESS" },
  { id: "premium", left: "39%", width: "25%", label: "PREMIUM" },
  { id: "economy", left: "65%", width: "28%", label: "ECONOMY" },
];

export default function PlaneVisualization({ activeCabin, onSelect }) {
  const cabin = CABINS.find((c) => c.id === activeCabin);

  return (
    <div className="plane-stage">
      <div className="plane-controls">
        <button aria-label="Rotate aircraft">◇</button>
        <button aria-label="Toggle view">◒</button>
      </div>
      <div className="plane-art">
        <motion.div
          className="plane-motion"
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 920 230" role="img" aria-label="Aircraft cabin layout">
            <defs>
              <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ffffff" />
                <stop offset=".5" stopColor="#f5f5f8" />
                <stop offset="1" stopColor="#e3e4e9" />
              </linearGradient>
              <linearGradient id="wing" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#f4f4f7" />
                <stop offset="1" stopColor="#dfe1e7" />
              </linearGradient>
            </defs>
            <path d="M130 106 C130 83 151 67 180 64 L790 64 C817 64 836 81 839 106 C836 131 817 148 790 148 L180 148 C151 145 130 129 130 106Z" fill="url(#body)" />
            <path d="M500 64 L615 20 L682 20 L605 106 L682 192 L615 192 L500 148Z" fill="url(#wing)" opacity=".9" />
            <path d="M680 64 L775 36 L808 36 L748 106 L808 176 L775 176 L680 148Z" fill="#e5e6eb" opacity=".8" />
            <path d="M130 106 C130 83 151 67 180 64 L205 64 L205 148 L180 148 C151 145 130 129 130 106Z" fill="#ececf1" />
            {Array.from({ length: 30 }).map((_, i) => (
              <circle key={i} cx={185 + i * 19.3} cy="106" r="2.5" fill="#aeb2bf" />
            ))}
            <rect x="151" y="100" width="25" height="12" rx="6" fill="#b7bac5" opacity=".85" />
          </svg>

          {ZONES.map((zone) => {
            const zoneCabin = CABINS.find((c) => c.id === zone.id);
            const active = zone.id === activeCabin;
            return (
              <button
                key={zone.id}
                className={`plane-zone ${active ? "active" : ""}`}
                style={{ left: zone.left, width: zone.width }}
                onClick={() => onSelect(zone.id)}
                aria-label={`Select ${zoneCabin.label} class`}
              >
                {active && <span className="zone-label">{zone.label}</span>}
              </button>
            );
          })}
        </motion.div>
      </div>
      <div className="plane-mobile-label">{cabin.label}</div>
    </div>
  );
}
