import { useState, useEffect } from "react"

export default function SplashScreen({ onFinish, duration = 1600 }) {
  const [phase, setPhase] = useState("enter") // "enter" -> "pulse" -> "exit" -> "hidden"

  useEffect(() => {
    // Fase 1: Escala inicial y crecimiento (0 - 600ms)
    const t1 = setTimeout(() => {
      setPhase("pulse")
    }, 600)

    // Fase 2: Reducción a tamaño normal con resplandor (600 - 1100ms)
    const t2 = setTimeout(() => {
      setPhase("exit")
    }, 1100)

    // Fase 3: Desvanecimiento final (1100 - 1500ms)
    const t3 = setTimeout(() => {
      setPhase("hidden")
      if (onFinish) onFinish()
    }, duration)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [duration, onFinish])

  if (phase === "hidden") return null

  const handleSkip = () => {
    setPhase("hidden")
    if (onFinish) onFinish()
  }

  return (
    <div
      role="dialog"
      aria-label="Pantalla de bienvenida"
      onClick={handleSkip}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950 select-none cursor-pointer transition-opacity duration-500 ${
        phase === "exit" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Fondo ambiental sutil con brillo radial */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.15),transparent_70%)] pointer-events-none" />

      {/* Contenedor del Logo con animación de escala */}
      <div
        className={`relative flex flex-col items-center gap-4 transition-all ease-out ${
          phase === "enter"
            ? "scale-75 opacity-0"
            : phase === "pulse"
            ? "scale-110 opacity-100 duration-500"
            : "scale-100 opacity-100 duration-300"
        }`}
      >
        {/* Isotipo gráfico moderno de persiana */}
        <div className="relative flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-0.5 shadow-2xl shadow-blue-500/30">
          <div className="w-full h-full bg-zinc-950 rounded-[14px] flex flex-col items-center justify-center p-3 gap-1 overflow-hidden">
            {/* Tablillas estilizadas */}
            <div className="w-full h-2 rounded bg-blue-500/90 shadow-sm shadow-blue-400/50" />
            <div className="w-full h-2 rounded bg-blue-400/80" />
            <div className="w-full h-2 rounded bg-blue-400/60" />
            <div className="w-full h-2 rounded bg-blue-400/40" />
            <div className="w-3/4 h-1.5 rounded-full bg-indigo-300/40 mt-1" />
          </div>
          {/* Resplandor pulsante */}
          <div className="absolute -inset-1 rounded-2xl bg-blue-500/20 blur-lg -z-10 animate-pulse" />
        </div>

        {/* Marca y Nombre */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-white font-mono font-black text-xs px-2.5 py-1 rounded shadow-md shadow-blue-600/30 tracking-wider">
              COR
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white m-0">
              Metalconf
            </h1>
          </div>
          <p className="text-xs font-mono text-zinc-400 mt-1 tracking-widest uppercase">
            Sistemas de Persianas & Aberturas
          </p>
        </div>
      </div>

      <span className="absolute bottom-8 text-[11px] font-mono text-zinc-500 tracking-wider">
        Click para continuar
      </span>
    </div>
  )
}
