import { useState } from "react"
import { useBudget } from "../../../shared/providers/BudgetContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { generatePDF } from "../../../shared/utils/pdfGenerator"

export default function EstimatorSummary({
  items = [],
  marginFactor = 1,
  selectedMarginId,
  setSelectedMarginId,
  customMarginPercentage,
  setCustomMarginPercentage,
  margins = [],
  isBlocked,
  clearBudget,
}) {
  const { saveBudget } = useBudget()
  const [client, setClient] = useState("")

  // Calcular el total general sumando el total marcado de cada cortina en la lista
  const grandTotal = items.reduce((sum, item) => sum + ((item.calcs?.total || 0) * marginFactor * item.qty), 0)

  const activeMargin = margins.find(m => m.id === selectedMarginId)
  const activeMarginName = selectedMarginId === "custom" 
    ? "Personalizado" 
    : activeMargin?.name || margins[0]?.name || "Gremio"

  const handleSave = () => {
    if (!client || items.length === 0 || isBlocked) return
    saveBudget({
      client,
      items,
      marginName: activeMarginName,
      marginFactor,
      grandTotal,
    })
    setClient("")
    clearBudget()
  }

  const handleExport = () => {
    if (items.length === 0 || isBlocked) return
    generatePDF({
      client,
      items,
      marginName: activeMarginName,
      marginFactor,
    })
  }

  return (
    <div className="flex flex-col gap-4 bg-zinc-950/60 p-4 border border-zinc-800 rounded-lg">
      <h3 className="text-md font-semibold text-zinc-200">Resumen y Desglose de Costos</h3>
      
      {isBlocked && (
        <div className="bg-amber-950/30 border border-amber-800/40 p-2.5 rounded text-amber-200 text-xs font-medium">
          🔒 Guardado Bloqueado: Activa el burlete obligatorio en la configuración actual.
        </div>
      )}

      {/* Selectores de Márgenes (Sin porcentajes visibles) */}
      <div className="flex flex-col gap-2 border-b border-zinc-800 pb-3">
        <span className="text-xs text-zinc-400 font-semibold">Tarifa / Margen</span>
        <div className="flex flex-wrap gap-2">
          {margins.map(m => (
            <label key={m.id} className={`flex items-center gap-1.5 text-xs px-2.5 py-1.5 border rounded cursor-pointer transition-colors ${
              selectedMarginId === m.id 
                ? "bg-zinc-100 text-zinc-950 border-zinc-100" 
                : "bg-zinc-900/60 text-zinc-300 border-zinc-800 hover:bg-zinc-800"
            }`}>
              <input type="radio" name="margin" checked={selectedMarginId === m.id} onChange={() => setSelectedMarginId(m.id)} className="hidden" />
              <span>{m.name}</span>
            </label>
          ))}
          <label className={`flex items-center gap-1.5 text-xs px-2.5 py-1.5 border rounded cursor-pointer transition-colors ${
            selectedMarginId === "custom" 
              ? "bg-zinc-100 text-zinc-950 border-zinc-100" 
              : "bg-zinc-900/60 text-zinc-300 border-zinc-800 hover:bg-zinc-800"
          }`}>
            <input type="radio" name="margin" checked={selectedMarginId === "custom"} onChange={() => setSelectedMarginId("custom")} className="hidden" />
            <span>Personalizado</span>
          </label>
        </div>

        {selectedMarginId === "custom" && (
          <div className="mt-2 flex gap-2 items-center">
            <span className="text-xs text-zinc-400">Porcentaje:</span>
            <Input type="number" min="0" value={customMarginPercentage} onChange={(e) => setCustomMarginPercentage(parseFloat(e.target.value) || 0)} className="bg-zinc-900 border-zinc-800 text-zinc-200 h-7 text-xs w-20" />
            <span className="text-xs text-zinc-400">%</span>
          </div>
        )}
      </div>

      {/* Listado resumido de ítems cotizados */}
      <div className="flex flex-col gap-2 max-h-40 overflow-y-auto text-xs text-zinc-400 border-b border-zinc-800 pb-3">
        {items.length === 0 ? (
          <span className="text-zinc-500 italic text-center py-2">No hay cortinas en el presupuesto</span>
        ) : (
          items.map(item => (
            <div key={item.id} className="flex justify-between">
              <span>{item.name} ({item.qty} un)</span>
              <span className="font-mono text-zinc-300">${((item.calcs?.total || 0) * marginFactor * item.qty).toFixed(2)}</span>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-between items-center text-lg font-bold text-blue-400">
        <span>Gran Total:</span>
        <span className="font-mono text-xl">${grandTotal.toFixed(2)} USD</span>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <Input placeholder="Nombre del Cliente / Referencia" value={client} onChange={(e) => setClient(e.target.value)} className="bg-zinc-900 border-zinc-800 text-zinc-200" />
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={handleSave} disabled={!client || items.length === 0 || isBlocked} className="bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-50">Guardar Presupuesto</Button>
          <Button onClick={handleExport} disabled={items.length === 0 || isBlocked} className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 disabled:opacity-50">Exportar PDF</Button>
        </div>
      </div>
    </div>
  )
}
