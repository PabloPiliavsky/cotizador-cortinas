import { useMemo } from "react"

export default function useShutterCalculations({
  width,
  height,
  hasGuides,
  selectedGuide,
  hasVuelo,
  selectedCajon,
  selectedLama,
  selectedEje,
  selectedMotor,
  selectedAccs,
  addVueloMeasure,
}) {
  return useMemo(() => {
    const wInit = parseFloat(width) || 0
    const hInit = parseFloat(height) || 0

    const guideWidth = hasGuides && selectedGuide ? selectedGuide.profileWidth : 0
    const wFinal = wInit + guideWidth * 2

    // Si lleva vuelo y se decide sumar medida de vuelo, se suman 0.40m fijos al alto final.
    const hFinal = hInit + (hasVuelo && addVueloMeasure ? 0.40 : 0)

    const usefulH = selectedLama ? selectedLama.usefulHeight : 0.05
    const slatsQty = usefulH > 0 ? Math.ceil(hFinal / usefulH) : 0

    const guideLen = hasGuides ? hFinal * 2 : 0

    const slatsCost = slatsQty * wFinal * (selectedLama?.price || 0)
    const guidesCost = hasGuides ? guideLen * (selectedGuide?.price || 0) : 0
    
    // El eje y cajón se cobran siempre que lleva vuelo (hasVuelo === true)
    const ejeCost = hasVuelo && selectedEje ? selectedEje.price : 0
    const cajonCost = hasVuelo && selectedCajon ? selectedCajon.price : 0
    
    const motorCost = selectedMotor ? selectedMotor.price : 0
    const accsCost = selectedAccs.reduce((sum, item) => sum + item.price, 0)
    const total = slatsCost + guidesCost + ejeCost + cajonCost + motorCost + accsCost

    return {
      wFinal,
      hFinal,
      slatsQty,
      guideLen,
      slatsCost,
      guidesCost,
      ejeCost,
      cajonCost,
      motorCost,
      accsCost,
      total,
    }
  }, [
    width,
    height,
    hasGuides,
    selectedGuide,
    hasVuelo,
    selectedCajon,
    selectedLama,
    selectedEje,
    selectedMotor,
    selectedAccs,
    addVueloMeasure,
  ])
}

