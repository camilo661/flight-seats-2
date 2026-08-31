// Flight configuration and deterministic seat availability.
export const FLIGHT = {
  origin: "BOG",
  destination: "MDE",
  date: "12 SEP",
  aircraft: "A320neo",
  flightNumber: "A329NEO",
  passenger: "JR",
};

export const MIN_SEATS = 4;

function seededOccupied(key, ratio) {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash << 5) - hash + key.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash % 100) / 100 < ratio;
}

export const CABINS = [
  {
    id: "business",
    label: "Business",
    section: "Section 1",
    price: 480,
    rows: ["A", "B", "C", "D", "E", "F"],
    rowNumbers: [1, 2, 3, 4, 5, 6],
    columns: ["1", "2", "3", "4", "5", "6", "7", "8"],
    color: "#4F39F5",
    description: "Extra space, priority boarding and premium service",
    capacity: 35,
  },
  {
    id: "premium",
    label: "Premium",
    section: "Section 2",
    price: 260,
    rows: ["A", "B", "C", "D", "E", "F"],
    rowNumbers: [9, 10, 11, 12, 13, 14, 15, 16],
    columns: ["A", "B", "C", "D", "E", "F"],
    color: "#4F39F5",
    description: "Extra legroom and enhanced comfort",
    capacity: 44,
  },
  {
    id: "economy",
    label: "Economy",
    section: "Section 3",
    price: 95,
    rows: ["A", "B", "C", "D", "E", "F"],
    rowNumbers: Array.from({ length: 16 }, (_, i) => i + 20),
    columns: ["A", "B", "C", "D", "E", "F"],
    color: "#4F39F5",
    description: "Comfortable standard seating for every journey",
    capacity: 96,
  },
];

export function buildSeatMap(cabin) {
  return cabin.rowNumbers.map((row, ri) =>
    cabin.columns.map((col, ci) => {
      const id = cabin.id === "business" ? `${col}${cabin.rows[ri]}` : `${row}${col}`;
      const occupied =
        // Keep the reference selections available.
        (cabin.id === "business" && ["1A", "1B", "1C", "1D"].includes(id)) ||
        (cabin.id !== "business" && ["9A", "9B", "9C", "9D"].includes(id))
          ? false
          : seededOccupied(`${cabin.id}-${id}`, cabin.id === "business" ? 0.3 : 0.4);

      return {
        id,
        row,
        col: cabin.id === "business" ? cabin.rows[ri] : col,
        cabinId: cabin.id,
        price: cabin.price,
        occupied,
      };
    })
  );
}

export function cabinById(id) {
  return CABINS.find((cabin) => cabin.id === id);
}
