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
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="width-input" className="text-zinc-400 text-sm font-medium">Ancho Inicial (m)</Label>
          <Input
            id="width-input"
            type="number"
            step="0.01"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="h-9 bg-zinc-900 border-zinc-800 text-zinc-200 rounded-md hover:border-zinc-700 focus:border-blue-500 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="height-input" className="text-zinc-400 text-sm font-medium">Alto Inicial (m)</Label>
          <Input
            id="height-input"
            type="number"
            step="0.01"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="h-9 bg-zinc-900 border-zinc-800 text-zinc-200 rounded-md hover:border-zinc-700 focus:border-blue-500 transition-colors"
          />
        </div>
      </div>
      
      <div className="border-t border-zinc-800/60 pt-3 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-zinc-300 text-sm cursor-pointer">
          <input
            type="checkbox"
            id="guides-check"
            checked={hasGuides}
            onChange={(e) => setHasGuides(e.target.checked)}
            className="rounded border-zinc-800 bg-zinc-900 accent-blue-600 h-4 w-4 cursor-pointer"
          />
          <label htmlFor="guides-check" className="cursor-pointer font-medium text-sm text-zinc-300">
            ¿Lleva Guías?
          </label>
        </div>
        {hasGuides && (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="guide-select" className="text-zinc-400 text-sm font-medium">Modelo de Guía</Label>
            <select
              id="guide-select"
              value={selectedGuide?.code || ""}
              onChange={(e) => setSelectedGuide(guias.find(g => g.code === e.target.value))}
              className="h-9 w-full bg-zinc-900 border border-zinc-800 rounded-md px-3 text-sm text-zinc-200 hover:border-zinc-700 focus:border-blue-500 focus:outline-none transition-colors"
            >
              {guias.map(g => (
                <option key={g.code} value={g.code}>{g.name} (${g.price}/m)</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="border-t border-zinc-800/60 pt-3 flex flex-col gap-1.5">
        <Label htmlFor="lama-select" className="text-zinc-400 text-sm font-medium">Modelo de Lama/Tablilla</Label>
        <select
          id="lama-select"
          value={selectedLama?.code || ""}
          onChange={(e) => setSelectedLama(lamas.find(l => l.code === e.target.value))}
          className="h-9 w-full bg-zinc-900 border border-zinc-800 rounded-md px-3 text-sm text-zinc-200 hover:border-zinc-700 focus:border-blue-500 focus:outline-none transition-colors"
        >
          {lamas.map(l => (
            <option key={l.code} value={l.code}>{l.name} (${l.price}/m)</option>
          ))}
        </select>
      </div>
    </div>
  )
}
