import { useState } from "react"

export default function ShutterVisualizer({ hasGuides, hasVuelo, selectedLama }) {
  const [openPct, setOpenPct] = useState(30)

  const visibleHeight = 160
  const slatsCount = Math.max(5, Math.ceil(visibleHeight / 10))
  const slatsArray = Array.from({ length: slatsCount })

  const heightFactor = 1 - openPct / 100
  const activeSlatHeight = visibleHeight / slatsCount
  const drawnSlatsCount = Math.ceil(slatsCount * heightFactor)

  return (
    <div className="flex flex-col gap-4 bg-zinc-950/40 p-4 border border-zinc-800 rounded-lg items-center">
      <h3 className="text-md font-semibold text-zinc-200">Previsualización Interactiva</h3>
      <div className="relative w-64 h-80 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center p-4">
        <svg viewBox="0 0 160 220" className="w-full h-full drop-shadow-lg">
          <defs>
            <linearGradient id="metal" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#71717a" />
              <stop offset="50%" stopColor="#a1a1aa" />
              <stop offset="100%" stopColor="#52525b" />
            </linearGradient>
            <linearGradient id="glass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <rect x="25" y="45" width="110" height="160" fill="url(#glass)" stroke="#3f3f46" strokeWidth="2" />
          <line x1="80" y1="45" x2="80" y2="205" stroke="#3f3f46" strokeWidth="1" strokeDasharray="2,2" />
          {hasGuides && (
            <>
              <rect x="20" y="45" width="6" height="160" fill="#27272a" />
              <rect x="134" y="45" width="6" height="160" fill="#27272a" />
            </>
          )}
          {hasVuelo ? (
            <rect x="15" y="10" width="130" height="35" rx="3" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
          ) : (
            <circle cx="80" cy="27" r="10" fill="#27272a" />
          )}
          <g>
            {slatsArray.slice(0, drawnSlatsCount).map((_, idx) => (
              <rect
                key={idx}
                x={hasGuides ? 23 : 25}
                y={45 + idx * activeSlatHeight}
                width={hasGuides ? 114 : 110}
                height={activeSlatHeight - 1}
                rx="1"
                fill="url(#metal)"
                className="transition-all duration-300"
              />
            ))}
          </g>
        </svg>
      </div>
      <div className="w-full flex flex-col gap-1 px-4">
        <label className="text-xs text-zinc-400 flex justify-between">
          <span>Control de Apertura:</span>
          <span className="font-mono text-zinc-200">{openPct}%</span>
        </label>
        <input type="range" min="0" max="100" value={openPct} onChange={(e) => setOpenPct(Number(e.target.value))} className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500" />
      </div>
    </div>
  )
}
