import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function EstimatorInputs({
  width, setWidth,
  height, setHeight,
  lamas, selectedLama, setSelectedLama,
  ejes, selectedEje, setSelectedEje,
  hasGuides,
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
      <div>
        <Label className="text-zinc-400">Modelo de Lama/Tablilla</Label>
        <select value={selectedLama?.code || ""} onChange={(e) => setSelectedLama(lamas.find(l => l.code === e.target.value))} className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-2 text-zinc-200 text-sm">
          {lamas.map(l => <option key={l.code} value={l.code}>{l.name} (${l.price}/m)</option>)}
        </select>
      </div>
      {hasGuides && (
        <div>
          <Label className="text-zinc-400">Modelo de Eje/Tubo</Label>
          <select value={selectedEje?.code || ""} onChange={(e) => setSelectedEje(ejes.find(x => x.code === e.target.value))} className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-2 text-zinc-200 text-sm">
            {ejes.map(x => <option key={x.code} value={x.code}>{x.name} (${x.price})</option>)}
          </select>
        </div>
      )}
    </div>
  )
}
