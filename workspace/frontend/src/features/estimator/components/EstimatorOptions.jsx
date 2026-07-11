import { Label } from "@/components/ui/label"

export default function EstimatorOptions({
  hasVuelo, setHasVuelo,
  addVueloMeasure, setAddVueloMeasure,
  cajones, selectedCajon, setSelectedCajon,
  ejes, selectedEje, setSelectedEje,
  motores, selectedMotor, setSelectedMotor,
  accesorios, selectedAccs, setSelectedAccs,
  selectedLama,
}) {
  const handleAccChange = (acc, checked) => {
    setSelectedAccs(prev => checked ? [...prev, acc] : prev.filter(a => a.code !== acc.code))
  }

  // Validar si la lama seleccionada requiere un burlete y no hay ningún burlete (código BUR) seleccionado
  const hasAnyGasketSelected = selectedAccs.some(a => a.code.startsWith("BUR"))
  const isGasketRequiredButMissing = selectedLama?.requiredGasketCode && !hasAnyGasketSelected

  return (
    <div className="flex flex-col gap-4 bg-zinc-950/40 p-4 border border-zinc-800 rounded-lg">
      <h3 className="text-md font-semibold text-zinc-200">Opciones Adicionales</h3>
      
      {isGasketRequiredButMissing && (
        <div className="bg-amber-950/40 border border-amber-800/60 p-3 rounded-md text-amber-200 text-xs">
          ⚠️ **Atención**: La lama seleccionada requiere obligatoriamente un <strong>Burlete</strong>. Por favor, selecciona al menos un tipo de burlete en los accesorios a continuación.
        </div>
      )}

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-zinc-300 text-sm cursor-pointer">
          <input type="checkbox" id="vuelo-check" checked={hasVuelo} onChange={(e) => {
            setHasVuelo(e.target.checked)
            if (!e.target.checked) setAddVueloMeasure(false)
          }} className="rounded border-zinc-800 bg-zinc-900 accent-blue-600" />
          <label htmlFor="vuelo-check" className="cursor-pointer font-medium">¿Lleva Vuelo?</label>
        </div>

        {hasVuelo && (
          <div className="pl-5 flex flex-col gap-3 border-l border-zinc-800/80">
            <div className="flex items-center gap-2 text-zinc-400 text-xs cursor-pointer">
              <input type="checkbox" id="add-vuelo-measure" checked={addVueloMeasure} onChange={(e) => setAddVueloMeasure(e.target.checked)} className="rounded border-zinc-800 bg-zinc-900 accent-blue-600" />
              <label htmlFor="add-vuelo-measure" className="cursor-pointer">¿Sumar medida de vuelo al alto (+40 cm)?</label>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1">
              <div>
                <Label className="text-zinc-400 text-xs">Modelo de Cajón (Vuelo)</Label>
                <select value={selectedCajon?.code || ""} onChange={(e) => setSelectedCajon(cajones.find(c => c.code === e.target.value))} className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-2 text-zinc-200 text-sm mt-1">
                  {cajones.map(c => <option key={c.code} value={c.code}>{c.name} (${c.price})</option>)}
                </select>
              </div>
              <div>
                <Label className="text-zinc-400 text-xs">Modelo de Eje/Tubo</Label>
                <select value={selectedEje?.code || ""} onChange={(e) => setSelectedEje(ejes.find(x => x.code === e.target.value))} className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-2 text-zinc-200 text-sm mt-1">
                  {ejes.map(x => <option key={x.code} value={x.code}>{x.name} (${x.price})</option>)}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-zinc-800/60 pt-3">
        <Label className="text-zinc-400">Motorización</Label>
        <select value={selectedMotor?.code || ""} onChange={(e) => {
          const m = motores.find(mt => mt.code === e.target.value)
          setSelectedMotor(m)
          setSelectedAccs(prev => prev.filter(a => m.compatibleAcc?.includes(a.code)))
        }} className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-2 text-zinc-200 text-sm mt-1">
          {motores.map(m => <option key={m.code} value={m.code}>{m.name} (${m.price})</option>)}
        </select>
      </div>

      <div className="flex flex-col gap-2 border-t border-zinc-800/60 pt-3">
        <Label className="text-zinc-400">Accesorios y Componentes</Label>
        <div className="grid grid-cols-2 gap-2">
          {accesorios.map(acc => {
            const isCompatible = selectedMotor?.compatibleAcc?.includes(acc.code)
            return (
              <label key={acc.code} className={`flex items-center gap-2 text-xs p-2 border rounded transition-opacity ${
                isCompatible 
                  ? "bg-zinc-900/60 border-zinc-800/80 text-zinc-300 cursor-pointer" 
                  : "bg-zinc-900/20 border-zinc-900/40 text-zinc-600 cursor-not-allowed opacity-40"
              }`}>
                <input 
                  type="checkbox" 
                  disabled={!isCompatible}
                  checked={selectedAccs.some(a => a.code === acc.code)} 
                  onChange={(e) => handleAccChange(acc, e.target.checked)} 
                  className="rounded border-zinc-800 bg-zinc-900 accent-blue-600 disabled:opacity-50" 
                />
                <span>{acc.name} (+${acc.price})</span>
              </label>
            )
          })}
        </div>
      </div>
    </div>
  )
}


