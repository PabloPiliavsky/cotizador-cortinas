import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function EstimatorInputs({
  width, setWidth,
  height, setHeight,
  lamas, selectedLama, setSelectedLama,
  hasGuides, setHasGuides,
  guias, selectedGuide, setSelectedGuide,
}) {
  return (
    <div className="flex flex-col gap-4 bg-zinc-950/40 p-4 border border-zinc-800 rounded-lg">
      <h3 className="text-md font-semibold text-zinc-200">Dimensiones Básicas</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-zinc-400">Ancho Inicial (m)</Label>
          <Input type="number" step="0.01" value={width} onChange={(e) => setWidth(e.target.value)} className="bg-zinc-900 border-zinc-800 text-zinc-200" />
        </div>
        <div>
          <Label className="text-zinc-400">Alto Inicial (m)</Label>
          <Input type="number" step="0.01" value={height} onChange={(e) => setHeight(e.target.value)} className="bg-zinc-900 border-zinc-800 text-zinc-200" />
        </div>
      </div>
      
      <div className="border-t border-zinc-800/60 pt-3 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-zinc-300 text-sm cursor-pointer">
          <input type="checkbox" id="guides-check" checked={hasGuides} onChange={(e) => setHasGuides(e.target.checked)} className="rounded border-zinc-800 bg-zinc-900 accent-blue-600" />
          <label htmlFor="guides-check" className="cursor-pointer font-medium">¿Lleva Guías?</label>
        </div>
        {hasGuides && (
          <div className="pl-5">
            <Label className="text-zinc-400 text-xs">Modelo de Guía</Label>
            <select value={selectedGuide?.code || ""} onChange={(e) => setSelectedGuide(guias.find(g => g.code === e.target.value))} className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-2 text-zinc-200 text-sm mt-1">
              {guias.map(g => <option key={g.code} value={g.code}>{g.name} (${g.price}/m)</option>)}
            </select>
          </div>
        )}
      </div>

      <div className="border-t border-zinc-800/60 pt-3">
        <Label className="text-zinc-400">Modelo de Lama/Tablilla</Label>
        <select value={selectedLama?.code || ""} onChange={(e) => setSelectedLama(lamas.find(l => l.code === e.target.value))} className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-2 text-zinc-200 text-sm mt-1">
          {lamas.map(l => <option key={l.code} value={l.code}>{l.name} (${l.price}/m)</option>)}
        </select>
      </div>
    </div>
  )
}

