import { motion } from "framer-motion";
import { CABINS } from "../data/seatData";

export default function CabinSwitcher({ activeCabin, onSelect }) {
  return (
    <div className="cabin-tabs">
      {CABINS.map((cabin, index) => {
        const active = cabin.id === activeCabin;
        return (
          <button key={cabin.id} type="button" onClick={() => onSelect(cabin.id)} aria-pressed={active}>
            {active && <motion.span layoutId="active-cabin" className="active-pill" />}
            <span>{index + 1}</span>
          </button>
        );
      })}
    </div>
  );
}
