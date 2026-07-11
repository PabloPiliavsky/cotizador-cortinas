import { useState, useEffect } from "react"
import { useBudget } from "../../../shared/providers/BudgetContext"
import useShutterCalculations from "../hooks/useShutterCalculations"
import EstimatorInputs from "./EstimatorInputs"
import EstimatorOptions from "./EstimatorOptions"
import EstimatorSummary from "./EstimatorSummary"
import ShutterVisualizer from "./ShutterVisualizer"
import HistoryList from "./HistoryList"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function EstimatorPage() {
  const { lamas, ejes, guias, cajones, motores, accesorios, margins } = useBudget()

  const [width, setWidth] = useState("1.50")
  const [height, setHeight] = useState("2.00")
  const [hasGuides, setHasGuides] = useState(true)
  const [hasVuelo, setHasVuelo] = useState(true)
  const [addVueloMeasure, setAddVueloMeasure] = useState(false)

  const [selectedLama, setSelectedLama] = useState(null)
  const [selectedEje, setSelectedEje] = useState(null)
  const [selectedGuide, setSelectedGuide] = useState(null)
  const [selectedCajon, setSelectedCajon] = useState(null)
  const [selectedMotor, setSelectedMotor] = useState(null)
  const [selectedAccs, setSelectedAccs] = useState([])

  // Lista de cortinas y control de la cortina actual
  const [curtainName, setCurtainName] = useState("C1")
  const [quantity, setQuantity] = useState(1)
  const [budgetItems, setBudgetItems] = useState([])

  // Control de Márgenes
  const [selectedMarginId, setSelectedMarginId] = useState("gremio")
  const [customMarginPercentage, setCustomMarginPercentage] = useState(0)

  const handleLamaChange = (lama) => {
    setSelectedLama(lama)
    if (lama?.requiredGasketCode) {
      const gasket = accesorios.find(a => a.code === lama.requiredGasketCode)
      if (gasket) {
        setSelectedAccs(prev => {
          if (prev.some(a => a.code === gasket.code)) return prev
          return [...prev, gasket]
        })
      }
    } else {
      setSelectedAccs(prev => prev.filter(a => a.code !== "BUR001" && a.code !== "BUR002"))
    }
  }

  useEffect(() => {
    if (lamas?.length) handleLamaChange(lamas[0])
    if (ejes?.length) setSelectedEje(ejes[0])
    if (guias?.length) setSelectedGuide(guias[0])
    if (cajones?.length) setSelectedCajon(cajones[0])
    if (motores?.length) setSelectedMotor(motores[0])
  }, [lamas, ejes, guias, cajones, motores])

  const calcs = useShutterCalculations({
    width, height, hasGuides, selectedGuide, hasVuelo, selectedCajon,
    selectedLama, selectedEje, selectedMotor, selectedAccs, addVueloMeasure
  })

  // Obtener factor de recargo actual
  const activeMargin = margins?.find(m => m.id === selectedMarginId)
  const activeMarginPercent = selectedMarginId === "custom" 
    ? parseFloat(customMarginPercentage) || 0
    : activeMargin?.percentage || 0
  const marginFactor = 1 + activeMarginPercent / 100

  // Validación de burlete obligatorio
  const hasAnyGasketSelected = selectedAccs.some(a => a.code.startsWith("BUR"))
  const isGasketRequiredButMissing = selectedLama?.requiredGasketCode && !hasAnyGasketSelected

  const handleAddCurtain = () => {
    if (isGasketRequiredButMissing || !curtainName) return
    const newItem = {
      id: Date.now().toString(),
      name: curtainName,
      width,
      height,
      qty: parseInt(quantity) || 1,
      calcs,
      details: { width, height, hasGuides, selectedGuide, hasVuelo, selectedCajon, selectedLama, selectedEje, selectedMotor, addVueloMeasure }
    }
    setBudgetItems(prev => [...prev, newItem])
    
    // Autoincrementar nombre de la cortina para la siguiente
    const nextNum = budgetItems.length + 2
    setCurtainName(`C${nextNum}`)
    setQuantity(1)
  }

  const handleRemoveCurtain = (id) => {
    setBudgetItems(prev => prev.filter(item => item.id !== id))
  }

  const handleClearBudget = () => {
    setBudgetItems([])
    setCurtainName("C1")
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto p-4">
      <div className="lg:col-span-2 flex flex-col gap-6">
        {/* Editor de Cortina Actual */}
        <div className="bg-zinc-950/40 p-4 border border-zinc-800 rounded-lg flex flex-col gap-4">
          <h3 className="text-md font-semibold text-zinc-200">Configuración de Cortina</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-zinc-400 text-xs">Identificador / Referencia Cortina</Label>
              <Input value={curtainName} onChange={(e) => setCurtainName(e.target.value)} className="bg-zinc-900 border-zinc-800 text-zinc-200 mt-1" />
            </div>
            <div>
              <Label className="text-zinc-400 text-xs">Cantidad</Label>
              <Input type="number" min="1" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value) || 1)} className="bg-zinc-900 border-zinc-800 text-zinc-200 mt-1" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EstimatorInputs width={width} setWidth={setWidth} height={height} setHeight={setHeight} lamas={lamas} selectedLama={selectedLama} setSelectedLama={handleLamaChange} hasGuides={hasGuides} setHasGuides={setHasGuides} guias={guias} selectedGuide={selectedGuide} setSelectedGuide={setSelectedGuide} />
            <EstimatorOptions hasVuelo={hasVuelo} setHasVuelo={setHasVuelo} addVueloMeasure={addVueloMeasure} setAddVueloMeasure={setAddVueloMeasure} cajones={cajones} selectedCajon={selectedCajon} setSelectedCajon={setSelectedCajon} ejes={ejes} selectedEje={selectedEje} setSelectedEje={setSelectedEje} motores={motores} selectedMotor={selectedMotor} setSelectedMotor={setSelectedMotor} accesorios={accesorios} selectedAccs={selectedAccs} setSelectedAccs={setSelectedAccs} selectedLama={selectedLama} />
          </div>

          <Button onClick={handleAddCurtain} disabled={isGasketRequiredButMissing || !curtainName} className="bg-blue-600 hover:bg-blue-500 text-white font-medium self-end">
            Agregar Cortina al Presupuesto
          </Button>
        </div>

        {/* Listado de Cortinas del Presupuesto actual */}
        {budgetItems.length > 0 && (
          <div className="bg-zinc-950/40 p-4 border border-zinc-800 rounded-lg flex flex-col gap-3">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
              <h3 className="text-md font-semibold text-zinc-200">Cortinas en este Presupuesto</h3>
              <Button size="sm" variant="destructive" onClick={handleClearBudget}>Limpiar Lista</Button>
            </div>
            <div className="flex flex-col gap-3">
              {budgetItems.map(item => {
                const totalItemUnit = (item.calcs.total * marginFactor)
                
                const slatsWithMargin = item.calcs.slatsCost * marginFactor
                const guidesWithMargin = item.calcs.guidesCost * marginFactor
                const ejeWithMargin = item.calcs.ejeCost * marginFactor
                const cajonWithMargin = item.calcs.cajonCost * marginFactor
                const motorWithMargin = item.calcs.motorCost * marginFactor
                const accsWithMargin = item.calcs.accsCost * marginFactor

                return (
                  <div key={item.id} className="flex flex-col p-4 border border-zinc-800 bg-zinc-900/30 rounded-md gap-3">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <span className="text-zinc-200 font-bold text-sm">{item.name} ({item.qty} un)</span>
                        <span className="text-zinc-400 text-xs mt-0.5">Medidas: {item.width}m x {item.height}m (Final: {item.calcs.wFinal.toFixed(2)}m x {item.calcs.hFinal.toFixed(2)}m)</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-end">
                          <span className="text-zinc-400 text-xs">Unitario: ${totalItemUnit.toFixed(2)}</span>
                          <span className="font-mono text-blue-400 font-bold text-sm">Subtotal: ${(totalItemUnit * item.qty).toFixed(2)} USD</span>
                        </div>
                        <Button size="xs" variant="destructive" onClick={() => handleRemoveCurtain(item.id)}>Quitar</Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 bg-zinc-950/20 p-2.5 rounded border border-zinc-800/40 text-xs text-zinc-400">
                      <div><span className="text-zinc-500">Lamas:</span> <span className="font-mono">${slatsWithMargin.toFixed(2)}</span></div>
                      {guidesWithMargin > 0 && <div><span className="text-zinc-500">Guías:</span> <span className="font-mono">${guidesWithMargin.toFixed(2)}</span></div>}
                      {cajonWithMargin > 0 && <div><span className="text-zinc-500">Cajón:</span> <span className="font-mono">${cajonWithMargin.toFixed(2)}</span></div>}
                      {ejeWithMargin > 0 && <div><span className="text-zinc-500">Eje:</span> <span className="font-mono">${ejeWithMargin.toFixed(2)}</span></div>}
                      {motorWithMargin > 0 && <div><span className="text-zinc-500">Motor:</span> <span className="font-mono">${motorWithMargin.toFixed(2)}</span></div>}
                      {accsWithMargin > 0 && <div><span className="text-zinc-500">Accs:</span> <span className="font-mono">${accsWithMargin.toFixed(2)}</span></div>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <HistoryList />
      </div>

      <div className="flex flex-col gap-6">
        <ShutterVisualizer hasGuides={hasGuides} hasVuelo={hasVuelo} selectedLama={selectedLama} selectedMotor={selectedMotor} width={width} height={height} selectedGuide={selectedGuide} selectedCajon={selectedCajon} selectedEje={selectedEje} selectedAccs={selectedAccs} />
        
        <EstimatorSummary 
          items={budgetItems}
          marginFactor={marginFactor}
          selectedMarginId={selectedMarginId}
          setSelectedMarginId={setSelectedMarginId}
          customMarginPercentage={customMarginPercentage}
          setCustomMarginPercentage={setCustomMarginPercentage}
          margins={margins}
          isBlocked={isGasketRequiredButMissing}
          clearBudget={handleClearBudget}
        />
      </div>
    </div>
  )
}



