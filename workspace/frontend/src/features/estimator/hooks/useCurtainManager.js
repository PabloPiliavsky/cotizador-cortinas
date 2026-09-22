import { useState, useEffect } from "react"
import { useBudget } from "@/shared/providers/BudgetContext"
import useShutterCalculations from "./useShutterCalculations"

const INITIAL_ITEM = {
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

export default function useCurtainManager() {
  const { lamas, ejes, guias, cajones, motores, accesorios } = useBudget()
  const [budgetItems, setBudgetItems] = useState([INITIAL_ITEM])
  const [activeItemId, setActiveItemId] = useState("1")

  // Sincronizar catálogo maestro en la cortina inicial
  useEffect(() => {
    if (lamas?.length && ejes?.length && guias?.length && cajones?.length && motores?.length) {
      setBudgetItems((prev) =>
        prev.map((item) => {
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
        })
      )
    }
  }, [lamas, ejes, guias, cajones, motores])

  const activeItem = budgetItems.find((item) => item.id === activeItemId) || budgetItems[0]

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

  // Sincronizar cálculos reactivos en el item activo
  useEffect(() => {
    if (activeItem && calcs) {
      setBudgetItems((prev) =>
        prev.map((item) => {
          if (item.id === activeItem.id) {
            if (item.calcs?.total !== calcs.total || item.calcs?.wFinal !== calcs.wFinal) {
              return { ...item, calcs }
            }
          }
          return item
        })
      )
    }
  }, [calcs, activeItemId])

  const updateActiveItem = (key, value) => {
    setBudgetItems((prev) =>
      prev.map((item) => (item.id === activeItemId ? { ...item, [key]: value } : item))
    )
  }

  const handleLamaChange = (lama) => {
    if (!activeItem) return
    let nextAccs = activeItem.selectedAccs || []
    if (lama?.requiredGasketCode) {
      const gasket = accesorios.find((a) => a.code === lama.requiredGasketCode)
      if (gasket && !nextAccs.some((a) => a.code === gasket.code)) {
        nextAccs = [...nextAccs, gasket]
      }
    } else {
      nextAccs = nextAccs.filter((a) => a.code !== "BUR001" && a.code !== "BUR002")
    }
    setBudgetItems((prev) =>
      prev.map((item) =>
        item.id === activeItemId
          ? { ...item, selectedLama: lama, selectedAccs: nextAccs }
          : item
      )
    )
  }

  const handleAddDesign = () => {
    const nextNum = budgetItems.length + 1
    const newId = Date.now().toString()
    const newItem = {
      ...INITIAL_ITEM,
      id: newId,
      name: `C${nextNum}`,
      selectedLama: lamas?.[0] || null,
      selectedEje: ejes?.[0] || null,
      selectedGuide: guias?.[0] || null,
      selectedCajon: cajones?.[0] || null,
      selectedMotor: motores?.[0] || null,
      calcs: null,
    }
    setBudgetItems((prev) => [...prev, newItem])
    setActiveItemId(newId)
  }

  const handleRemoveCurtain = (id, e) => {
    e.stopPropagation()
    if (budgetItems.length <= 1) return
    setBudgetItems((prev) => prev.filter((item) => item.id !== id))
    if (activeItemId === id) {
      const remaining = budgetItems.filter((item) => item.id !== id)
      setActiveItemId(remaining[0].id)
    }
  }

  const handleClearBudget = () => {
    const defaultId = Date.now().toString()
    setBudgetItems([{ ...INITIAL_ITEM, id: defaultId, calcs: null }])
    setActiveItemId(defaultId)
  }

  const hasAnyGasket = activeItem?.selectedAccs?.some((a) => a.code.startsWith("BUR")) || false
  const isGasketRequiredButMissing = !!(
    activeItem?.selectedLama?.requiredGasketCode && !hasAnyGasket
  )

  return {
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
  }
}
