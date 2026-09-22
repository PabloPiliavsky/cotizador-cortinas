import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AccessoryChecklist from "./AccessoryChecklist"

export default function MotorCompatibilityModal({
  open,
  onClose,
  motorName = "Motor",
  selectedCodes = [],
  onSave,
  accesorios = [],
}) {
  const [currentSelected, setCurrentSelected] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")

  useEffect(() => {
    if (open) {
      setCurrentSelected(Array.isArray(selectedCodes) ? [...selectedCodes] : [])
      setSearchTerm("")
      setFilterCategory("all")
    }
  }, [open, selectedCodes])

  const filteredAccesorios = useMemo(() => {
    return accesorios.filter((acc) => {
      const matchesSearch =
        acc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        acc.code.toLowerCase().includes(searchTerm.toLowerCase())

      if (!matchesSearch) return false
      if (filterCategory === "burletes") {
        return acc.code.startsWith("BUR") || acc.name.toLowerCase().includes("burlete")
      }
      if (filterCategory === "electricos") {
        return (
          acc.name.toLowerCase().includes("control") ||
          acc.name.toLowerCase().includes("pulsador") ||
          acc.name.toLowerCase().includes("tecla") ||
          acc.code.startsWith("ACC")
        )
      }
      return true
    })
  }, [accesorios, searchTerm, filterCategory])

  if (!open) return null

  const handleToggle = (code) => {
    setCurrentSelected((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    )
  }

  const handleSelectAll = () => {
    const allCodes = filteredAccesorios.map((a) => a.code)
    setCurrentSelected((prev) => Array.from(new Set([...prev, ...allCodes])))
  }

  const handleClearAll = () => {
    const currentFilteredCodes = new Set(filteredAccesorios.map((a) => a.code))
    setCurrentSelected((prev) => prev.filter((code) => !currentFilteredCodes.has(code)))
  }

  const handleConfirm = () => {
    if (onSave) onSave(currentSelected)
    onClose()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-xl max-h-[90vh] flex flex-col rounded-xl bg-zinc-950 border border-zinc-800 shadow-2xl">
        <div className="flex items-center justify-between border-b border-zinc-800 p-4">
          <div>
            <h3 id="modal-title" className="text-base font-bold text-zinc-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Accesorios Compatibles: {motorName}
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Marca los componentes autorizados para operar con este motor.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white hover:bg-zinc-800 p-1.5 rounded-md text-sm font-bold transition-colors"
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </div>

        <div className="p-4 border-b border-zinc-800/80 flex flex-col gap-3 bg-zinc-900/30">
          <Input
            placeholder="Buscar por nombre o código..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-zinc-900 border-zinc-800 text-zinc-200 text-xs h-9 hover:border-zinc-700 focus:border-blue-500 transition-colors"
          />
          <div className="flex justify-between items-center flex-wrap gap-2 text-xs">
            <div className="flex gap-1.5">
              {["all", "burletes", "electricos"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilterCategory(cat)}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    filterCategory === cat
                      ? "bg-blue-600 text-white font-medium"
                      : "bg-zinc-900 text-zinc-300 border border-zinc-800 hover:bg-zinc-800 hover:text-white"
                  }`}
                >
                  {cat === "all" ? "Todos" : cat === "burletes" ? "Burletes" : "Controles / Mandos"}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-[11px] text-blue-400 hover:text-blue-300 hover:underline cursor-pointer"
              >
                Marcar filtrados
              </button>
              <span className="text-zinc-600">|</span>
              <button
                type="button"
                onClick={handleClearAll}
                className="text-[11px] text-zinc-400 hover:text-zinc-200 hover:underline cursor-pointer"
              >
                Desmarcar filtrados
              </button>
            </div>
          </div>
        </div>

        <AccessoryChecklist
          accesorios={filteredAccesorios}
          currentSelected={currentSelected}
          onToggle={handleToggle}
        />

        <div className="border-t border-zinc-800 p-4 flex items-center justify-between bg-zinc-900/40">
          <span className="text-xs text-zinc-400 font-medium">
            Seleccionados:{" "}
            <strong className="text-blue-400 font-mono text-sm">{currentSelected.length}</strong> de{" "}
            {accesorios.length}
          </span>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleConfirm}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-md shadow-blue-600/20 transition-all active:scale-[0.98]"
            >
              Aplicar Compatibilidades
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
