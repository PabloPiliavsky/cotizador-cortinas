import { useState } from "react"
import { useBudget } from "@/shared/providers/BudgetContext"
import useCurtainManager from "../hooks/useCurtainManager"
import CurtainTabs from "./CurtainTabs"
import CurtainEditorCard from "./CurtainEditorCard"
import CurtainBreakdown from "./CurtainBreakdown"
import HistoryList from "./HistoryList"
import ShutterVisualizer from "./ShutterVisualizer"
import EstimatorSummary from "./EstimatorSummary"

export default function EstimatorPage() {
  const { margins } = useBudget()
  const {
    budgetItems,
    activeItem,
    activeItemId,
    setActiveItemId,
    updateActiveItem,
    handleLamaChange,
    handleAddDesign,
    handleRemoveCurtain,
    handleClearBudget,
    isGasketRequiredButMissing,
    lamas,
    guias,
    cajones,
    ejes,
    motores,
    accesorios,
  } = useCurtainManager()

  const [selectedMarginId, setSelectedMarginId] = useState("gremio")
  const [customMarginPercentage, setCustomMarginPercentage] = useState(0)

  const activeMargin = margins?.find((m) => m.id === selectedMarginId)
  const activeMarginPercent =
    selectedMarginId === "custom"
      ? parseFloat(customMarginPercentage) || 0
      : activeMargin?.percentage || 0
  const marginFactor = 1 + activeMarginPercent / 100

  if (!activeItem) return null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto p-4">
      <div className="lg:col-span-2 flex flex-col gap-6">
        <CurtainTabs
          budgetItems={budgetItems}
          activeItemId={activeItemId}
          setActiveItemId={setActiveItemId}
          handleAddDesign={handleAddDesign}
          handleRemoveCurtain={handleRemoveCurtain}
          handleClearBudget={handleClearBudget}
        />

        <CurtainEditorCard
          activeItem={activeItem}
          updateActiveItem={updateActiveItem}
          handleLamaChange={handleLamaChange}
          lamas={lamas}
          guias={guias}
          cajones={cajones}
          ejes={ejes}
          motores={motores}
          accesorios={accesorios}
        />

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
