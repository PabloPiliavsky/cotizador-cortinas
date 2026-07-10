import { useState } from "react"
import { useBudget } from "../../../shared/providers/BudgetContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { generatePDF } from "../../../shared/utils/pdfGenerator"

export default function EstimatorSummary({ calcs, details }) {
  const { saveBudget } = useBudget()
  const [client, setClient] = useState("")

  const handleSave = () => {
    if (!client) return
    saveBudget({ client, details, calcs })
    setClient("")
  }

  const handleExport = () => {
    generatePDF({ client, details, calcs })
  }

  return (
    <div className="flex flex-col gap-4 bg-zinc-950/60 p-4 border border-zinc-800 rounded-lg">
      <h3 className="text-md font-semibold text-zinc-200">Resumen y Desglose de Costos</h3>
      <div className="flex flex-col gap-2 text-sm text-zinc-300 border-b border-zinc-800 pb-3">
        <div className="flex justify-between"><span>Medidas Finales:</span><span className="font-mono text-zinc-100">{calcs.wFinal.toFixed(2)}m x {calcs.hFinal.toFixed(2)}m</span></div>
        <div className="flex justify-between"><span>Lamas Necesarias:</span><span className="font-mono text-zinc-100">{calcs.slatsQty} un</span></div>
        <div className="flex justify-between"><span>Guías Necesarias:</span><span className="font-mono text-zinc-100">{calcs.guideLen.toFixed(2)}m</span></div>
      </div>
      <div className="flex flex-col gap-2 text-xs text-zinc-400 border-b border-zinc-800 pb-3">
        <div className="flex justify-between"><span>Costo Lamas:</span><span className="font-mono text-zinc-300">${calcs.slatsCost.toFixed(2)} USD</span></div>
        {calcs.guidesCost > 0 && <div className="flex justify-between"><span>Costo Guías:</span><span className="font-mono text-zinc-300">${calcs.guidesCost.toFixed(2)} USD</span></div>}
        {calcs.ejeCost > 0 && <div className="flex justify-between"><span>Costo Eje/Tubo:</span><span className="font-mono text-zinc-300">${calcs.ejeCost.toFixed(2)} USD</span></div>}
        {calcs.motorCost > 0 && <div className="flex justify-between"><span>Costo Motor:</span><span className="font-mono text-zinc-300">${calcs.motorCost.toFixed(2)} USD</span></div>}
        {calcs.accsCost > 0 && <div className="flex justify-between"><span>Costo Accesorios:</span><span className="font-mono text-zinc-300">${calcs.accsCost.toFixed(2)} USD</span></div>}
      </div>
      <div className="flex justify-between items-center text-lg font-bold text-blue-400">
        <span>Total Estimado:</span>
        <span className="font-mono text-xl">${calcs.total.toFixed(2)} USD</span>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <Input placeholder="Nombre del Cliente / Referencia" value={client} onChange={(e) => setClient(e.target.value)} className="bg-zinc-900 border-zinc-800 text-zinc-200" />
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={handleSave} disabled={!client} className="bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-50">Guardar</Button>
          <Button onClick={handleExport} className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200">Exportar PDF</Button>
        </div>
      </div>
    </div>
  )
}
