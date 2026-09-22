import { describe, it, expect } from "vitest"
import { renderHook } from "@testing-library/react"
import useShutterCalculations from "../useShutterCalculations"

describe("useShutterCalculations", () => {
  const mockLama = {
    code: "LAM001",
    name: "Lama Aluminio 45mm",
    usefulHeight: 0.045,
    price: 15.5,
  }

  const mockGuide = {
    code: "GUI001",
    name: "Guía Estándar",
    profileWidth: 0.03, // 3cm por perfil
    price: 10,
  }

  const mockCajon = {
    code: "CAJ001",
    name: "Cajón Compacto 155",
    price: 45,
  }

  const mockEje = {
    code: "EJE001",
    name: "Eje Octogonal 60",
    price: 25,
  }

  const mockMotor = {
    code: "MOT001",
    name: "Motor Tubular 20Nm",
    price: 80,
  }

  const mockAccs = [
    { code: "ACC001", name: "Soporte", price: 5 },
    { code: "BUR001", name: "Burlete", price: 8 },
  ]

  it("calcula correctamente el camino feliz con guías y vuelo sin sumar medida al alto", () => {
    const { result } = renderHook(() =>
      useShutterCalculations({
        width: "1.50",
        height: "2.00",
        hasGuides: true,
        selectedGuide: mockGuide,
        hasVuelo: true,
        selectedCajon: mockCajon,
        selectedLama: mockLama,
        selectedEje: mockEje,
        selectedMotor: mockMotor,
        selectedAccs: mockAccs,
        addVueloMeasure: false,
      })
    )

    // wFinal = 1.50 + (0.03 * 2) = 1.56
    expect(result.current.wFinal).toBeCloseTo(1.56, 4)
    // hFinal = 2.00 (sin sumar 0.40)
    expect(result.current.hFinal).toBeCloseTo(2.00, 4)
    // slatsQty = Math.ceil(2.00 / 0.045) = Math.ceil(44.444) = 45
    expect(result.current.slatsQty).toBe(45)
    // guideLen = 2.00 * 2 = 4.00
    expect(result.current.guideLen).toBeCloseTo(4.00, 4)

    // slatsCost = 45 * 1.56 * 15.50 = 1088.10
    const expectedSlatsCost = 45 * 1.56 * 15.5
    expect(result.current.slatsCost).toBeCloseTo(expectedSlatsCost, 2)

    // guidesCost = 4.00 * 10 = 40.00
    expect(result.current.guidesCost).toBeCloseTo(40, 2)
    // cajonCost y ejeCost aplican porque hasVuelo === true
    expect(result.current.cajonCost).toBe(45)
    expect(result.current.ejeCost).toBe(25)
    // motorCost
    expect(result.current.motorCost).toBe(80)
    // accsCost = 5 + 8 = 13
    expect(result.current.accsCost).toBe(13)

    const expectedTotal =
      expectedSlatsCost + 40 + 45 + 25 + 80 + 13
    expect(result.current.total).toBeCloseTo(expectedTotal, 2)
  })

  it("añade exactamente 0.40m al alto final cuando addVueloMeasure es true", () => {
    const { result } = renderHook(() =>
      useShutterCalculations({
        width: "1.00",
        height: "1.60",
        hasGuides: false,
        selectedGuide: null,
        hasVuelo: true,
        selectedCajon: mockCajon,
        selectedLama: mockLama,
        selectedEje: mockEje,
        selectedMotor: null,
        selectedAccs: [],
        addVueloMeasure: true,
      })
    )

    // Sin guías: wFinal = 1.00
    expect(result.current.wFinal).toBe(1.00)
    // Con vuelo y addVueloMeasure: hFinal = 1.60 + 0.40 = 2.00
    expect(result.current.hFinal).toBeCloseTo(2.00, 4)
    // slatsQty = Math.ceil(2.00 / 0.045) = 45
    expect(result.current.slatsQty).toBe(45)
    // guideLen = 0 (hasGuides false)
    expect(result.current.guideLen).toBe(0)
    expect(result.current.guidesCost).toBe(0)
  })

  it("no cobra cajón ni eje si hasVuelo es false", () => {
    const { result } = renderHook(() =>
      useShutterCalculations({
        width: "1.20",
        height: "1.80",
        hasGuides: true,
        selectedGuide: mockGuide,
        hasVuelo: false,
        selectedCajon: mockCajon,
        selectedLama: mockLama,
        selectedEje: mockEje,
        selectedMotor: null,
        selectedAccs: [],
        addVueloMeasure: true, // Debe ignorarse porque hasVuelo es false
      })
    )

    expect(result.current.hFinal).toBe(1.80)
    expect(result.current.cajonCost).toBe(0)
    expect(result.current.ejeCost).toBe(0)
  })

  it("maneja casos de borde con medidas vacías o valores inválidos de forma segura", () => {
    const { result } = renderHook(() =>
      useShutterCalculations({
        width: "",
        height: "abc",
        hasGuides: false,
        selectedGuide: null,
        hasVuelo: false,
        selectedCajon: null,
        selectedLama: null,
        selectedEje: null,
        selectedMotor: null,
        selectedAccs: [],
        addVueloMeasure: false,
      })
    )

    expect(result.current.wFinal).toBe(0)
    expect(result.current.hFinal).toBe(0)
    expect(result.current.slatsQty).toBe(0)
    expect(result.current.total).toBe(0)
  })
})
