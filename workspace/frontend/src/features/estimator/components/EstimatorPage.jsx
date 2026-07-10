import { useState, useEffect } from "react"
import { useBudget } from "../../../shared/providers/BudgetContext"
import useShutterCalculations from "../hooks/useShutterCalculations"
import EstimatorInputs from "./EstimatorInputs"
import EstimatorOptions from "./EstimatorOptions"
import EstimatorSummary from "./EstimatorSummary"
import ShutterVisualizer from "./ShutterVisualizer"
import HistoryList from "./HistoryList"

export default function EstimatorPage() {
  const { lamas, ejes, guias, cajones, motores, accesorios } = useBudget()

  const [width, setWidth] = useState("1.50")
  const [height, setHeight] = useState("2.00")
  const [hasGuides, setHasGuides] = useState(true)
  const [hasVuelo, setHasVuelo] = useState(true)

  const [selectedLama, setSelectedLama] = useState(null)
  const [selectedEje, setSelectedEje] = useState(null)
  const [selectedGuide, setSelectedGuide] = useState(null)
  const [selectedCajon, setSelectedCajon] = useState(null)
  const [selectedMotor, setSelectedMotor] = useState(null)
  const [selectedAccs, setSelectedAccs] = useState([])

  useEffect(() => {
    if (lamas?.length) setSelectedLama(lamas[0])
    if (ejes?.length) setSelectedEje(ejes[0])
    if (guias?.length) setSelectedGuide(guias[0])
    if (cajones?.length) setSelectedCajon(cajones[0])
    if (motores?.length) setSelectedMotor(motores[0])
  }, [lamas, ejes, guias, cajones, motores])

  const calcs = useShutterCalculations({
    width, height, hasGuides, selectedGuide, hasVuelo, selectedCajon,
    selectedLama, selectedEje, selectedMotor, selectedAccs
  })

  const details = { width, height, hasGuides, selectedGuide, hasVuelo, selectedCajon, selectedLama, selectedEje, selectedMotor }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto p-4">
      <div className="lg:col-span-2 flex flex-col gap-6">
        <EstimatorInputs width={width} setWidth={setWidth} height={height} setHeight={setHeight} lamas={lamas} selectedLama={selectedLama} setSelectedLama={setSelectedLama} ejes={ejes} selectedEje={selectedEje} setSelectedEje={setSelectedEje} hasGuides={hasGuides} setHasGuides={setHasGuides} />
        <EstimatorOptions hasGuides={hasGuides} setHasGuides={setHasGuides} guias={guias} selectedGuide={selectedGuide} setSelectedGuide={setSelectedGuide} hasVuelo={hasVuelo} setHasVuelo={setHasVuelo} cajones={cajones} selectedCajon={selectedCajon} setSelectedCajon={setSelectedCajon} motores={motores} selectedMotor={selectedMotor} setSelectedMotor={setSelectedMotor} accesorios={accesorios} selectedAccs={selectedAccs} setSelectedAccs={setSelectedAccs} />
        <HistoryList />
      </div>
      <div className="flex flex-col gap-6">
        <ShutterVisualizer hasGuides={hasGuides} hasVuelo={hasVuelo} selectedLama={selectedLama} selectedMotor={selectedMotor} width={width} height={height} selectedGuide={selectedGuide} selectedCajon={selectedCajon} selectedEje={selectedEje} selectedAccs={selectedAccs} />
        <EstimatorSummary calcs={calcs} details={details} />
      </div>
    </div>
  )
}
