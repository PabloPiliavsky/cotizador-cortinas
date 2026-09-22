import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import EstimatorSummary from "../EstimatorSummary"

// Mock del contexto de presupuesto con alias @/
const mockSaveBudget = vi.fn()
vi.mock("@/shared/providers/BudgetContext", () => ({
  useBudget: () => ({
    saveBudget: mockSaveBudget,
  }),
}))

// Mock de generador PDF con alias @/
const mockGeneratePDF = vi.fn()
vi.mock("@/shared/utils/pdfGenerator", () => ({
  generatePDF: (...args) => mockGeneratePDF(...args),
}))

describe("EstimatorSummary Component", () => {
  const mockMargins = [
    { id: "base", name: "Base", percentage: 0 },
    { id: "gremio", name: "Gremio", percentage: 20 },
  ]

  const mockItems = [
    {
      id: "1",
      name: "C1",
      qty: 2,
      calcs: { total: 100 },
    },
    {
      id: "2",
      name: "C2",
      qty: 1,
      calcs: { total: 150 },
    },
  ]

  it("calcula y formatea correctamente el Gran Total aplicando el factor de margen y cantidades", () => {
    // Total sin margen: (100 * 2) + (150 * 1) = 350
    // Con margen factor 1.20: 350 * 1.20 = 420.00 USD
    render(
      <EstimatorSummary
        items={mockItems}
        marginFactor={1.2}
        selectedMarginId="gremio"
        setSelectedMarginId={vi.fn()}
        customMarginPercentage={0}
        setCustomMarginPercentage={vi.fn()}
        margins={mockMargins}
        isBlocked={false}
        clearBudget={vi.fn()}
      />
    )

    expect(screen.getByText("$420.00 USD")).toBeInTheDocument()
    // Cortina 1: 100 * 1.2 * 2 = 240.00
    expect(screen.getByText("$240.00")).toBeInTheDocument()
    // Cortina 2: 150 * 1.2 * 1 = 180.00
    expect(screen.getByText("$180.00")).toBeInTheDocument()
  })

  it("deshabilita el guardado y muestra aviso cuando el presupuesto está bloqueado por falta de burlete", () => {
    render(
      <EstimatorSummary
        items={mockItems}
        marginFactor={1.0}
        selectedMarginId="base"
        setSelectedMarginId={vi.fn()}
        customMarginPercentage={0}
        setCustomMarginPercentage={vi.fn()}
        margins={mockMargins}
        isBlocked={true}
        clearBudget={vi.fn()}
      />
    )

    expect(
      screen.getByText(/Guardado Bloqueado: Activa el burlete obligatorio/i)
    ).toBeInTheDocument()

    const saveButton = screen.getByRole("button", { name: /Guardar Presupuesto/i })
    expect(saveButton).toBeDisabled()

    const exportButton = screen.getByRole("button", { name: /Exportar PDF/i })
    expect(exportButton).toBeDisabled()
  })

  it("permite guardar el presupuesto cuando se ingresa el cliente y no está bloqueado", () => {
    const mockClear = vi.fn()
    render(
      <EstimatorSummary
        items={mockItems}
        marginFactor={1.0}
        selectedMarginId="base"
        setSelectedMarginId={vi.fn()}
        customMarginPercentage={0}
        setCustomMarginPercentage={vi.fn()}
        margins={mockMargins}
        isBlocked={false}
        clearBudget={mockClear}
      />
    )

    const clientInput = screen.getByPlaceholderText(/Nombre del Cliente/i)
    const saveButton = screen.getByRole("button", { name: /Guardar Presupuesto/i })

    // Inicialmente disabled porque client está vacío
    expect(saveButton).toBeDisabled()

    // Escribir nombre de cliente
    fireEvent.change(clientInput, { target: { value: "Juan Perez" } })
    expect(saveButton).not.toBeDisabled()

    // Click en guardar
    fireEvent.click(saveButton)

    expect(mockSaveBudget).toHaveBeenCalledWith(
      expect.objectContaining({
        client: "Juan Perez",
        items: mockItems,
        marginFactor: 1.0,
      })
    )
    expect(mockClear).toHaveBeenCalled()
  })
})
