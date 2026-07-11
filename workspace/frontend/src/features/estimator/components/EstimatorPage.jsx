import { useState, useEffect } from "react"
import { useBudget } from "../../../shared/providers/BudgetContext"
import useShutterCalculations from "../hooks/useShutterCalculations"
import EstimatorInputs from "./EstimatorInputs"
import EstimatorOptions from "./EstimatorOptions"
import EstimatorSummary from "./EstimatorSummary"
import ShutterVisualizer from "./ShutterVisualizer"
import HistoryList from "./HistoryList"
import CurtainTabs from "./CurtainTabs"
import CurtainBreakdown from "./CurtainBreakdown"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function EstimatorPage() {
  const { lamas, ejes, guias, cajones, motores, accesorios, margins } = useBudget()

  // Lista de cortinas (iniciamos con una por defecto)
  const [budgetItems, setBudgetItems] = useState([
    {
      id: "1",
      name: "C1",
      width: "1.50",
      height: "2.00",
      qty: 1,
      hasGuides: true,
      hasVuelo: true,
      addVueloMeasure: false,
      selectedLama: null,
      selectedEje: null,
      selectedGuide: null,
      selectedCajon: null,
      selectedMotor: null,
      selectedAccs: [],
    }
  ])
  
  const [activeItemId, setActiveItemId] = useState("1")

  // Control de Márgenes
  const [selectedMarginId, setSelectedMarginId] = useState("gremio")
  const [customMarginPercentage, setCustomMarginPercentage] = useState(0)

  // Sincronizar lamas y modelos iniciales en la primera cortina si no están asignados
  useEffect(() => {
    if (lamas?.length && ejes?.length && guias?.length && cajones?.length && motores?.length) {
      setBudgetItems(prev => prev.map(item => {
        if (!item.selectedLama) {
          return {
            ...item,
            selectedLama: lamas[0],
            selectedEje: ejes[0],
            selectedGuide: guias[0],
            selectedCajon: cajones[0],
            selectedMotor: motores[0],
          }
        }
        return item
      }))
    }
  }, [lamas, ejes, guias, cajones, motores])

  // Obtener la cortina activa actual
  const activeItem = budgetItems.find(item => item.id === activeItemId) || budgetItems[0]

  // Cálculo reactivo de la cortina activa
  const calcs = useShutterCalculations({
    width: activeItem?.width || "1.50",
    height: activeItem?.height || "2.00",
    hasGuides: activeItem?.hasGuides ?? true,
    selectedGuide: activeItem?.selectedGuide,
    hasVuelo: activeItem?.hasVuelo ?? true,
    selectedCajon: activeItem?.selectedCajon,
    selectedLama: activeItem?.selectedLama,
    selectedEje: activeItem?.selectedEje,
    selectedMotor: activeItem?.selectedMotor,
    selectedAccs: activeItem?.selectedAccs || [],
    addVueloMeasure: activeItem?.addVueloMeasure ?? false,
  })

  // Sincronizar los cálculos calculados en el objeto de la cortina activa
  useEffect(() => {
    if (activeItem && calcs) {
      setBudgetItems(prev => prev.map(item => {
        if (item.id === activeItem.id) {
          // Solo actualizar si el total o medidas finales cambiaron para evitar loops de re-renderizado
          if (item.calcs?.total !== calcs.total || item.calcs?.wFinal !== calcs.wFinal) {
            return { ...item, calcs }
          }
        }
        return item
      }))
    }
  }, [calcs, activeItemId])

  // Manejadores para actualizar las propiedades de la cortina seleccionada
  const updateActiveItem = (key, value) => {
    setBudgetItems(prev => prev.map(item => {
      if (item.id === activeItemId) {
        return { ...item, [key]: value }
      }
      return item
    }))
  }

  const handleLamaChange = (lama) => {
    if (!activeItem) return
    let nextAccs = activeItem.selectedAccs || []

    if (lama?.requiredGasketCode) {
      const gasket = accesorios.find(a => a.code === lama.requiredGasketCode)
      if (gasket && !nextAccs.some(a => a.code === gasket.code)) {
        nextAccs = [...nextAccs, gasket]
      }
    } else {
      nextAccs = nextAccs.filter(a => a.code !== "BUR001" && a.code !== "BUR002")
    }

    setBudgetItems(prev => prev.map(item => {
      if (item.id === activeItemId) {
        return { ...item, selectedLama: lama, selectedAccs: nextAccs }
      }
      return item
    }))
  }

  // Obtener factor de recargo actual
  const activeMargin = margins?.find(m => m.id === selectedMarginId)
  const activeMarginPercent = selectedMarginId === "custom" 
    ? parseFloat(customMarginPercentage) || 0
    : activeMargin?.percentage || 0
  const marginFactor = 1 + activeMarginPercent / 100

  // Validación de burlete obligatorio en la cortina activa
  const hasAnyGasketSelected = activeItem?.selectedAccs?.some(a => a.code.startsWith("BUR")) || false
  const isGasketRequiredButMissing = !!(activeItem?.selectedLama?.requiredGasketCode && !hasAnyGasketSelected)

  const handleAddDesign = () => {
    const nextNum = budgetItems.length + 1
    const newId = Date.now().toString()
    const newItem = {
      id: newId,
      name: `C${nextNum}`,
      width: "1.50",
      height: "2.00",
      qty: 1,
      hasGuides: true,
      hasVuelo: true,
      addVueloMeasure: false,
      selectedLama: lamas?.[0] || null,
      selectedEje: ejes?.[0] || null,
      selectedGuide: guias?.[0] || null,
      selectedCajon: cajones?.[0] || null,
      selectedMotor: motores?.[0] || null,
      selectedAccs: [],
      calcs: null,
    }
    setBudgetItems(prev => [...prev, newItem])
    setActiveItemId(newId)
  }

  const handleRemoveCurtain = (id, e) => {
    e.stopPropagation()
    if (budgetItems.length <= 1) return // Mantener al menos una
    setBudgetItems(prev => prev.filter(item => item.id !== id))
    if (activeItemId === id) {
      const remaining = budgetItems.filter(item => item.id !== id)
      setActiveItemId(remaining[0].id)
    }
  }

  const handleClearBudget = () => {
    const defaultId = Date.now().toString()
    setBudgetItems([
      {
        id: defaultId,
        name: "C1",
        width: "1.50",
        height: "2.00",
        qty: 1,
        hasGuides: true,
        hasVuelo: true,
        addVueloMeasure: false,
        selectedLama: lamas?.[0] || null,
        selectedEje: ejes?.[0] || null,
        selectedGuide: guias?.[0] || null,
        selectedCajon: cajones?.[0] || null,
        selectedMotor: motores?.[0] || null,
        selectedAccs: [],
        calcs: null,
      }
    ])
    setActiveItemId(defaultId)
  }

  if (!activeItem) return null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto p-4">
      <div className="lg:col-span-2 flex flex-col gap-6">
        
        {/* Pestañas de Navegación de Cortinas */}
        <CurtainTabs 
          budgetItems={budgetItems}
          activeItemId={activeItemId}
          setActiveItemId={setActiveItemId}
          handleAddDesign={handleAddDesign}
          handleRemoveCurtain={handleRemoveCurtain}
          handleClearBudget={handleClearBudget}
        />

        {/* Editor de Cortina Seleccionada */}
        <div className="bg-zinc-950/40 p-4 border border-zinc-800 rounded-lg flex flex-col gap-4">
          <h3 className="text-md font-semibold text-zinc-200">Configuración de {activeItem.name}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-zinc-400 text-xs">Identificador / Referencia Cortina</Label>
              <Input 
                value={activeItem.name} 
                onChange={(e) => updateActiveItem("name", e.target.value)} 
                className="bg-zinc-900 border-zinc-800 text-zinc-200 mt-1" 
              />
            </div>
            <div>
              <Label className="text-zinc-400 text-xs">Cantidad</Label>
              <Input 
                type="number" 
                min="1" 
                value={activeItem.qty} 
                onChange={(e) => updateActiveItem("qty", parseInt(e.target.value) || 1)} 
                className="bg-zinc-900 border-zinc-800 text-zinc-200 mt-1" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EstimatorInputs 
              width={activeItem.width} 
              setWidth={(w) => updateActiveItem("width", w)} 
              height={activeItem.height} 
              setHeight={(h) => updateActiveItem("height", h)} 
              lamas={lamas} 
              selectedLama={activeItem.selectedLama} 
              setSelectedLama={handleLamaChange} 
              hasGuides={activeItem.hasGuides} 
              setHasGuides={(g) => updateActiveItem("hasGuides", g)} 
              guias={guias} 
              selectedGuide={activeItem.selectedGuide} 
              setSelectedGuide={(g) => updateActiveItem("selectedGuide", g)} 
            />
            <EstimatorOptions 
              hasVuelo={activeItem.hasVuelo} 
              setHasVuelo={(v) => updateActiveItem("hasVuelo", v)} 
              addVueloMeasure={activeItem.addVueloMeasure} 
              setAddVueloMeasure={(v) => updateActiveItem("addVueloMeasure", v)} 
              cajones={cajones} 
              selectedCajon={activeItem.selectedCajon} 
              setSelectedCajon={(c) => updateActiveItem("selectedCajon", c)} 
              ejes={ejes} 
              selectedEje={activeItem.selectedEje} 
              setSelectedEje={(x) => updateActiveItem("selectedEje", x)} 
              motores={motores} 
              selectedMotor={activeItem.selectedMotor} 
              setSelectedMotor={(m) => updateActiveItem("selectedMotor", m)} 
              accesorios={accesorios} 
              selectedAccs={activeItem.selectedAccs || []} 
              setSelectedAccs={(accs) => updateActiveItem("selectedAccs", typeof accs === 'function' ? accs(activeItem.selectedAccs || []) : accs)} 
              selectedLama={activeItem.selectedLama} 
            />
          </div>
        </div>

        {/* Desglose Detallado en Pantalla de todos los diseños */}
        <CurtainBreakdown 
          budgetItems={budgetItems}
          activeItemId={activeItemId}
          setActiveItemId={setActiveItemId}
          marginFactor={marginFactor}
        />

        <HistoryList />
      </div>

      <div className="flex flex-col gap-6">
        <ShutterVisualizer 
          hasGuides={activeItem.hasGuides} 
          hasVuelo={activeItem.hasVuelo} 
          selectedLama={activeItem.selectedLama} 
          selectedMotor={activeItem.selectedMotor} 
          width={activeItem.width} 
          height={activeItem.height} 
          selectedGuide={activeItem.selectedGuide} 
          selectedCajon={activeItem.selectedCajon} 
          selectedEje={activeItem.selectedEje} 
          selectedAccs={activeItem.selectedAccs || []} 
        />
        
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



