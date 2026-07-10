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
}) {
  return useMemo(() => {
    const wInit = parseFloat(width) || 0
    const hInit = parseFloat(height) || 0

    const guideWidth = hasGuides && selectedGuide ? selectedGuide.profileWidth : 0
    const wFinal = wInit + guideWidth * 2

    const cajonHeight = hasVuelo && selectedCajon ? selectedCajon.heightAdjustment : 0
    const hFinal = hInit + cajonHeight

    const usefulH = selectedLama ? selectedLama.usefulHeight : 0.05
    const slatsQty = usefulH > 0 ? Math.ceil(hFinal / usefulH) : 0

    const guideLen = hasGuides ? hFinal * 2 : 0

    const slatsCost = slatsQty * wFinal * (selectedLama?.price || 0)
    const guidesCost = hasGuides ? guideLen * (selectedGuide?.price || 0) : 0
    const ejeCost = hasGuides && selectedEje ? selectedEje.price : 0
    const motorCost = selectedMotor ? selectedMotor.price : 0
    const accsCost = selectedAccs.reduce((sum, item) => sum + item.price, 0)
    const total = slatsCost + guidesCost + ejeCost + motorCost + accsCost

    return {
      wFinal,
      hFinal,
      slatsQty,
      guideLen,
      slatsCost,
      guidesCost,
      ejeCost,
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
  ])
}
