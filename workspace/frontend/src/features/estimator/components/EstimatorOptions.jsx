import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function EstimatorOptions({
  hasGuides, setHasGuides,
  guias, selectedGuide, setSelectedGuide,
  hasVuelo, setHasVuelo,
  cajones, selectedCajon, setSelectedCajon,
  motores, selectedMotor, setSelectedMotor,
  accesorios, selectedAccs, setSelectedAccs,
}) {
  const currentCompAccs = accesorios.filter(acc => selectedMotor?.compatibleAcc?.includes(acc.code))

  const handleAccChange = (acc, checked) => {
    setSelectedAccs(prev => checked ? [...prev, acc] : prev.filter(a => a.code !== acc.code))
  }

  return (
    <div className="flex flex-col gap-4 bg-zinc-950/40 p-4 border border-zinc-800 rounded-lg">
      <h3 className="text-md font-semibold text-zinc-200">Opciones Adicionales</h3>
      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-zinc-300 text-sm cursor-pointer">
          <input type="checkbox" checked={hasGuides} onChange={(e) => setHasGuides(e.target.checked)} className="rounded border-zinc-800 bg-zinc-900 accent-blue-600" />
          ¿Lleva Guías?
        </label>
        <label className="flex items-center gap-2 text-zinc-300 text-sm cursor-pointer">
          <input type="checkbox" checked={hasVuelo} onChange={(e) => setHasVuelo(e.target.checked)} className="rounded border-zinc-800 bg-zinc-900 accent-blue-600" />
          ¿Lleva Vuelo?
        </label>
      </div>
      {hasGuides && (
        <div>
          <Label className="text-zinc-400">Modelo de Guía</Label>
          <select value={selectedGuide?.code || ""} onChange={(e) => setSelectedGuide(guias.find(g => g.code === e.target.value))} className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-2 text-zinc-200 text-sm">
            {guias.map(g => <option key={g.code} value={g.code}>{g.name} (${g.price}/m)</option>)}
          </select>
        </div>
      )}
      {hasVuelo && (
        <div>
          <Label className="text-zinc-400">Modelo de Cajón (Vuelo)</Label>
          <select value={selectedCajon?.code || ""} onChange={(e) => setSelectedCajon(cajones.find(c => c.code === e.target.value))} className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-2 text-zinc-200 text-sm">
            {cajones.map(c => <option key={c.code} value={c.code}>{c.name} (${c.price})</option>)}
          </select>
        </div>
      )}
      <div>
        <Label className="text-zinc-400">Motorización</Label>
        <select value={selectedMotor?.code || ""} onChange={(e) => {
          const m = motores.find(mt => mt.code === e.target.value); setSelectedMotor(m); setSelectedAccs([])
        }} className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-2 text-zinc-200 text-sm">
          {motores.map(m => <option key={m.code} value={m.code}>{m.name} (${m.price})</option>)}
        </select>
      </div>
      {currentCompAccs.length > 0 && (
        <div className="flex flex-col gap-2">
          <Label className="text-zinc-400">Accesorios Compatibles</Label>
          <div className="grid grid-cols-2 gap-2">
            {currentCompAccs.map(acc => (
              <label key={acc.code} className="flex items-center gap-2 text-zinc-300 text-xs cursor-pointer bg-zinc-900/60 p-2 border border-zinc-800/80 rounded">
                <input type="checkbox" checked={selectedAccs.some(a => a.code === acc.code)} onChange={(e) => handleAccChange(acc, e.target.checked)} className="rounded border-zinc-800 bg-zinc-900 accent-blue-600" />
                {acc.name} (+${acc.price})
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
