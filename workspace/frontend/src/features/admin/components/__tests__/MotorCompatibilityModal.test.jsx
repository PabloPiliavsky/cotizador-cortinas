import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import MotorCompatibilityModal from "../MotorCompatibilityModal"

describe("MotorCompatibilityModal Component", () => {
  const mockAccesorios = [
    { code: "BUR001", name: "Burlete Felpa 7x6", price: 8.5 },
    { code: "ACC_CTRL", name: "Control Remoto 1 Canal", price: 25.0 },
    { code: "ACC_PULS", name: "Pulsador de Pared", price: 15.0 },
  ]

  it("no renderiza nada cuando open es false", () => {
    const { container } = render(
      <MotorCompatibilityModal
        open={false}
        onClose={vi.fn()}
        motorName="Motor 20Nm"
        selectedCodes={[]}
        onSave={vi.fn()}
        accesorios={mockAccesorios}
      />
    )
    expect(container.firstChild).toBeNull()
  })

  it("renderiza correctamente cuando open es true con el título del motor y lista los accesorios", () => {
    render(
      <MotorCompatibilityModal
        open={true}
        onClose={vi.fn()}
        motorName="Motor Tubular Radio 20Nm"
        selectedCodes={["BUR001"]}
        onSave={vi.fn()}
        accesorios={mockAccesorios}
      />
    )

    expect(
      screen.getByText(/Accesorios Compatibles: Motor Tubular Radio 20Nm/i)
    ).toBeInTheDocument()

    expect(screen.getByText("Burlete Felpa 7x6")).toBeInTheDocument()
    expect(screen.getByText("Control Remoto 1 Canal")).toBeInTheDocument()
    expect(screen.getByText("Pulsador de Pared")).toBeInTheDocument()

    // El burlete debe estar marcado inicialmente
    const burleteCheckbox = screen.getByLabelText(/Burlete Felpa 7x6/i)
    expect(burleteCheckbox).toBeChecked()

    // El control remoto no debe estar marcado
    const controlCheckbox = screen.getByLabelText(/Control Remoto 1 Canal/i)
    expect(controlCheckbox).not.toBeChecked()
  })

  it("permite alternar selección de accesorios y confirmar guardado", () => {
    const mockSave = vi.fn()
    const mockClose = vi.fn()

    render(
      <MotorCompatibilityModal
        open={true}
        onClose={mockClose}
        motorName="Motor Tubular"
        selectedCodes={["BUR001"]}
        onSave={mockSave}
        accesorios={mockAccesorios}
      />
    )

    // Marcamos el control remoto
    const controlCheckbox = screen.getByLabelText(/Control Remoto 1 Canal/i)
    fireEvent.click(controlCheckbox)
    expect(controlCheckbox).toBeChecked()

    // Confirmamos la selección
    const confirmButton = screen.getByRole("button", {
      name: /Aplicar Compatibilidades/i,
    })
    fireEvent.click(confirmButton)

    expect(mockSave).toHaveBeenCalledWith(["BUR001", "ACC_CTRL"])
    expect(mockClose).toHaveBeenCalled()
  })

  it("filtra accesorios según el término de búsqueda ingresado", () => {
    render(
      <MotorCompatibilityModal
        open={true}
        onClose={vi.fn()}
        motorName="Motor Test"
        selectedCodes={[]}
        onSave={vi.fn()}
        accesorios={mockAccesorios}
      />
    )

    const searchInput = screen.getByPlaceholderText(/Buscar por nombre o código/i)
    fireEvent.change(searchInput, { target: { value: "Pulsador" } })

    expect(screen.getByText("Pulsador de Pared")).toBeInTheDocument()
    expect(screen.queryByText("Burlete Felpa 7x6")).not.toBeInTheDocument()
    expect(screen.queryByText("Control Remoto 1 Canal")).not.toBeInTheDocument()
  })

  it("permite marcar y desmarcar todos los accesorios filtrados", () => {
    render(
      <MotorCompatibilityModal
        open={true}
        onClose={vi.fn()}
        motorName="Motor Test"
        selectedCodes={[]}
        onSave={vi.fn()}
        accesorios={mockAccesorios}
      />
    )

    const selectAllBtn = screen.getByRole("button", { name: "Marcar filtrados" })
    fireEvent.click(selectAllBtn)

    expect(screen.getByLabelText(/Burlete Felpa 7x6/i)).toBeChecked()
    expect(screen.getByLabelText(/Control Remoto 1 Canal/i)).toBeChecked()
    expect(screen.getByLabelText(/Pulsador de Pared/i)).toBeChecked()

    const clearAllBtn = screen.getByRole("button", { name: "Desmarcar filtrados" })
    fireEvent.click(clearAllBtn)

    expect(screen.getByLabelText(/Burlete Felpa 7x6/i)).not.toBeChecked()
    expect(screen.getByLabelText(/Control Remoto 1 Canal/i)).not.toBeChecked()
    expect(screen.getByLabelText(/Pulsador de Pared/i)).not.toBeChecked()
  })
})
