import { describe, it, expect, vi, beforeEach } from "vitest"
import { generatePDF } from "../pdfGenerator"

const { mockSave } = vi.hoisted(() => ({
  mockSave: vi.fn(),
}))

vi.mock("jspdf", () => {
  return {
    jsPDF: class {
      constructor() {
        this.save = mockSave
        this.text = vi.fn()
        this.rect = vi.fn()
        this.circle = vi.fn()
        this.line = vi.fn()
        this.addPage = vi.fn()
        this.setFont = vi.fn()
        this.setFontSize = vi.fn()
        this.setTextColor = vi.fn()
        this.setFillColor = vi.fn()
        this.setDrawColor = vi.fn()
      }
    },
  }
})

describe("pdfGenerator", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("genera el archivo PDF exitosamente para un presupuesto con una cortina", () => {
    const mockData = {
      client: "Empresa Constructora SRL",
      marginName: "Gremio",
      marginFactor: 1.2,
      items: [
        {
          id: "1",
          name: "C1",
          width: "1.50",
          height: "2.00",
          qty: 2,
          hasGuides: true,
          hasVuelo: true,
          selectedLama: { name: "Lama Aluminio 45" },
          selectedGuide: { name: "Guía H25" },
          selectedCajon: { name: "Cajón 155" },
          selectedEje: { name: "Eje 60" },
          selectedMotor: { name: "Motor 20Nm" },
          calcs: {
            wFinal: 1.56,
            hFinal: 2.0,
            slatsCost: 100,
            guidesCost: 30,
            cajonCost: 40,
            ejeCost: 20,
            motorCost: 80,
            accsCost: 10,
            total: 280,
          },
        },
      ],
    }

    expect(() => generatePDF(mockData)).not.toThrow()
    expect(mockSave).toHaveBeenCalledWith("Presupuesto_Empresa_Constructora_SRL.pdf")
  })

  it("soporta tanto formato plano de propiedades como objeto details anidado sin fallar", () => {
    const mockDataConDetails = {
      client: "Cliente Test",
      marginName: "Base",
      marginFactor: 1.0,
      items: [
        {
          id: "1",
          name: "C1",
          width: "1.20",
          height: "1.50",
          qty: 1,
          details: {
            hasGuides: false,
            hasVuelo: false,
            selectedLama: { name: "Lama Microperforada" },
            selectedGuide: null,
            selectedCajon: null,
            selectedEje: null,
            selectedMotor: null,
          },
          calcs: {
            wFinal: 1.2,
            hFinal: 1.5,
            slatsCost: 80,
            guidesCost: 0,
            cajonCost: 0,
            ejeCost: 0,
            motorCost: 0,
            accsCost: 0,
            total: 80,
          },
        },
      ],
    }

    expect(() => generatePDF(mockDataConDetails)).not.toThrow()
    expect(mockSave).toHaveBeenCalledWith("Presupuesto_Cliente_Test.pdf")
  })
})
