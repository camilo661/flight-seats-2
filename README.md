# Seat Deck — Selección de asientos de vuelo

Sistema de compra y venta de puestos de avión con 3 cabinas (Ejecutiva,
Premium, Económica), selección mínima de 4 asientos, cálculo de valor total
en tiempo real y un selector de fuselaje animado para moverse entre cabinas.

Código en inglés (componentes, variables, lógica). Los textos de cara al
usuario (etiquetas, botones, mensajes) están en español, como se pidió.

## Requisitos previos

- Node.js 18 o superior (recomendado 20+)
- npm (viene incluido con Node)

Verifica en la terminal (Mac):

```bash
node -v
npm -v
```

Si no tienes Node instalado: `brew install node`

## Instalación y ejecución (Mac)

1. Descomprime la carpeta `flight-seats` donde quieras tenerla.
2. Abre Terminal y entra a la carpeta:
   ```bash
   cd ruta/a/flight-seats
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
5. Abre en el navegador la URL que aparece en la terminal
   (normalmente `http://localhost:5173`). También funciona abriéndolo
   desde el celular en la misma red usando la IP que muestra la terminal
   (Vite la imprime como "Network").

## Compilar para producción / subir a un sitio web

```bash
npm run build
```

Esto genera la carpeta `dist/` con el sitio ya optimizado, lista para subir
a cualquier hosting (Vercel, Netlify, un servidor propio, etc.). Para
previsualizar esa build localmente:

```bash
npm run preview
```

## Estructura del proyecto

```
flight-seats/
├── index.html
├── package.json
├── tailwind.config.js
├── src/
│   ├── App.jsx                    # Orquesta el flujo de compra
│   ├── index.css                  # Tailwind + estilos base
│   ├── data/
│   │   └── seatData.js            # Cabinas, precios, mapa de asientos
│   └── components/
│       ├── PlaneVisualization.jsx # Fuselaje animado (selector de cabina)
│       ├── CabinSwitcher.jsx      # Pestañas Ejecutiva/Premium/Económica
│       ├── SeatMap.jsx            # Cuadrícula de asientos por cabina
│       ├── Seat.jsx               # Botón de asiento individual
│       ├── BookingSummary.jsx     # Barra inferior: chips, total, confirmar
│       └── ConfirmModal.jsx       # Confirmación de compra
```

## Cómo funciona

- **Cambiar de cabina**: toca una zona del avión animado (la cápsula
  luminosa se desliza con resorte) o usa las pestañas de abajo — están
  sincronizadas.
- **Seleccionar asientos**: toca cualquier asiento disponible; los
  ocupados están bloqueados. Puedes seleccionar asientos de varias
  cabinas a la vez.
- **Mínimo de asientos**: el botón "Confirmar" se activa solo con 4 o
  más asientos seleccionados (configurable en `MIN_SEATS`,
  `src/data/seatData.js`).
- **Precio en tiempo real**: el total en la barra inferior se recalcula
  en cada toque, sumando el precio propio de cada cabina.
- **Ajustar precios / filas / distribución**: todo vive en
  `src/data/seatData.js` (arreglo `CABINS`) — cambia `price`, `rows` o
  `columns` (usa `null` para representar el pasillo) y el resto de la
  interfaz se adapta sola.

## Diseño

Paleta "vuelo nocturno": azul noche profundo con acento ámbar (luces de
pista) y verde-teal para premium, tipografía Space Grotesk (display/UI) +
IBM Plex Mono (códigos de asiento y datos), inspirado en el lenguaje visual
de un pase de embarque (perforaciones, monoespaciado para los datos).
Pensado mobile-first; en pantallas más anchas la tarjeta se centra con un
ancho máximo, y también sirve para abrir el sistema desde un sitio web.


## Visual refresh
The interface was rebuilt to closely follow the supplied desktop and mobile references:
- Light aircraft-seat-planning canvas with dotted background and wing/fuselage SVG.
- Business, Premium and Economy section tabs.
- Desktop 3D Rendering panel and responsive mobile layout.
- Reference-style seat shapes, availability states, purple selections and lime confirmation CTA.
- English UI copy and corrected spelling throughout.
