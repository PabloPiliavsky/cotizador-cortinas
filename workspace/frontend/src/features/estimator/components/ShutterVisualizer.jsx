import { useState } from "react"

export default function ShutterVisualizer({
  hasGuides, hasVuelo, selectedLama, selectedMotor, width, height,
  selectedGuide, selectedCajon, selectedEje, selectedAccs = []
}) {
  const [openPct, setOpenPct] = useState(30)

  const w = parseFloat(width) || 1.5
  const h = parseFloat(height) || 2.0
  const isWide = w > h

  // Dimensions
  const frameW = isWide ? 124 : 100
  const frameX = isWide ? 18 : 30
  const guideW = selectedGuide ? Math.max(4, selectedGuide.profileWidth * 80) : 5
  const guideLX = frameX - guideW
  const guideRX = frameX + frameW

  // Shutter height & drawer
  const visibleHeight = 150
  const cajonH = selectedCajon ? Math.max(25, selectedCajon.heightAdjustment * 150) : 32
  const slatsQty = Math.max(6, Math.ceil(visibleHeight / 9))
  const activeSlatH = visibleHeight / slatsQty
  const drawnSlatsCount = Math.ceil(slatsQty * (1 - openPct / 100))

  // Slat styles & details
  const isPerf = selectedLama?.name?.toLowerCase().includes("perf")
  const isEsterilla = selectedLama?.name?.toLowerCase().includes("esterilla")

  const nameLower = selectedEje?.name?.toLowerCase() || ""
  const axleR = nameLower.includes("120mm") ? 13 : nameLower.includes("160mm") || nameLower.includes("180mm") || nameLower.includes("250mm") || nameLower.includes("300mm") ? 17 : 8

  const ledY = hasVuelo ? (45 - cajonH / 2) : 32
  const ledX = hasVuelo ? (frameX + frameW - 6) : 80

  const hasCojinete = selectedAccs.some(a => a.code === "FUN012" || a.code === "FUN013")
  const hasPasaCadena = selectedAccs.some(a => a.code === "COR048")

  return (
    <div className="flex flex-col gap-4 bg-zinc-950/40 p-4 border border-zinc-800 rounded-lg items-center w-full">
      <h3 className="text-md font-semibold text-zinc-200">Previsualización Interactiva</h3>
      <div className="relative w-full max-w-[260px] h-80 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center p-4">
        <svg viewBox="0 0 160 220" className="w-full h-full drop-shadow-2xl">
          <defs>
            <linearGradient id="metal" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8e9196" /><stop offset="50%" stopColor="#d1d5db" /><stop offset="100%" stopColor="#4b5563" />
            </linearGradient>
            <linearGradient id="glass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.05" /><stop offset="100%" stopColor="#0284c7" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          <rect x={frameX} y={45} width={frameW} height={visibleHeight} fill="url(#glass)" stroke="#3f3f46" strokeWidth="2" />
          <line x1={frameX + frameW / 2} y1={45} x2={frameX + frameW / 2} y2={45 + visibleHeight} stroke="#3f3f46" strokeWidth="1" strokeDasharray="3,3" />

          {hasGuides && (
            <>
              <rect x={guideLX} y={45} width={guideW} height={visibleHeight} fill="#18181b" stroke="#3f3f46" strokeWidth="0.5" />
              <rect x={guideRX} y={45} width={guideW} height={visibleHeight} fill="#18181b" stroke="#3f3f46" strokeWidth="0.5" />
            </>
          )}

          {/* Cortina de lamas (Detrás del eje o cajón) */}
          <g>
            {Array.from({ length: drawnSlatsCount }).map((_, idx) => {
              const slatY = 45 + idx * activeSlatH
              const slatW = hasGuides ? frameW + (guideW * 2 - 2) : frameW
              const slatX = hasGuides ? frameX - guideW + 1 : frameX
              return (
                <g key={idx}>
                  <rect x={slatX} y={slatY} width={slatW} height={activeSlatH - 0.8} rx="1" fill="url(#metal)" />
                  {isPerf && <line x1={slatX + 6} y1={slatY + activeSlatH / 2} x2={slatX + slatW - 6} y2={slatY + activeSlatH / 2} stroke="#1f2937" strokeWidth="0.8" strokeDasharray="1.5,1.5" />}
                  {isEsterilla && <line x1={slatX + 2} y1={slatY + activeSlatH - 2} x2={slatX + slatW - 2} y2={slatY + activeSlatH - 2} stroke="#111827" strokeWidth="0.5" />}
                </g>
              )
            })}
          </g>

          {/* Eje o cajón compacto (Por delante de las lamas) */}
          {hasVuelo ? (
            <rect x={frameX - 8} y={45 - cajonH} width={frameW + 16} height={cajonH} rx="3" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
          ) : (
            <g>
              <circle cx="80" cy="32" r={axleR} fill="#27272a" stroke="#52525b" strokeWidth="1.5" />
              {hasCojinete && (
                <>
                  <rect x={80 - axleR - 3} y="28" width="3" height="8" fill="#71717a" stroke="#3f3f46" strokeWidth="0.5" />
                  <rect x={80 + axleR} y="28" width="3" height="8" fill="#71717a" stroke="#3f3f46" strokeWidth="0.5" />
                </>
              )}
            </g>
          )}

          {/* Pasa cadena manual */}
          {hasPasaCadena && (
            <path d={`M ${frameX + frameW - 4} 32 L ${frameX + frameW - 4} 120 A 2 2 0 0 1 ${frameX + frameW - 8} 120 L ${frameX + frameW - 8} 32`} fill="none" stroke="#d1d5db" strokeWidth="1" strokeDasharray="2,2" />
          )}

          {/* Luz LED de motorización */}
          {selectedMotor?.code !== "MOT001" && (
            <circle cx={ledX} cy={ledY} r={2.5} fill="#10b981" className="animate-pulse" />
          )}

          {/* Accessories Indicator */}
          {selectedAccs.some(a => a.code === "ACC001") && (
            <g>
              <rect x="8" y="110" width="8" height="18" rx="1.5" fill="#3f3f46" stroke="#f4f4f5" strokeWidth="0.5" />
              <circle cx="12" cy="114" r="1.2" fill="#10b981" />
              <circle cx="12" cy="119" r="1" fill="#a1a1aa" />
              <circle cx="12" cy="123" r="1" fill="#a1a1aa" />
            </g>
          )}
          {selectedAccs.some(a => a.code === "ACC002") && (
            <g>
              <rect x="144" y="110" width="8" height="8" rx="1" fill="#e4e4e7" stroke="#a1a1aa" strokeWidth="0.5" />
              <rect x="146.5" y="112.5" width="3" height="3" rx="0.5" fill="#71717a" />
            </g>
          )}
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
