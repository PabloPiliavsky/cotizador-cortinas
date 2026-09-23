import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import EditElementModal from "../EditElementModal"

describe("EditElementModal Component", () => {
  it("no renderiza nada cuando open es false", () => {
    const { container } = render(
      <EditElementModal
        open={false}
        item={{ code: "L01", name: "Lama 45", price: 10 }}
        type="lama"
        onClose={vi.fn()}
        onSave={vi.fn()}
      />
    )
    expect(container.firstChild).toBeNull()
  })

  it("renderiza con valores precargados y permite guardar cambios", async () => {
    const mockSave = vi.fn().mockResolvedValue()
    const mockClose = vi.fn()
    const mockItem = { code: "L01", name: "Lama Alum 45", usefulHeight: 0.045, price: 12.5, requiredGasketCode: "" }

    render(
      <EditElementModal
        open={true}
        item={mockItem}
        type="lama"
        onClose={mockClose}
        onSave={mockSave}
      />
    )

    expect(screen.getByText("Editar Elemento")).toBeInTheDocument()
    expect(screen.getByText("ID: L01")).toBeInTheDocument()

    const nameInput = screen.getByLabelText(/nombre/i)
    fireEvent.change(nameInput, { target: { value: "Lama Alum 45 Reforzada" } })

    const priceInput = screen.getByLabelText(/precio/i)
    fireEvent.change(priceInput, { target: { value: "15.75" } })

    const saveBtn = screen.getByRole("button", { name: /guardar cambios/i })
    fireEvent.click(saveBtn)

    await waitFor(() => {
      expect(mockSave).toHaveBeenCalledWith("L01", expect.objectContaining({
        name: "Lama Alum 45 Reforzada",
        price: 15.75,
      }))
      expect(mockClose).toHaveBeenCalledTimes(1)
    })
  })

  it("llama a onClose al hacer clic en Cancelar", () => {
    const mockClose = vi.fn()
    render(
      <EditElementModal
        open={true}
        item={{ id: "gremio", name: "Gremio", percentage: 50 }}
        type="margen"
        onClose={mockClose}
        onSave={vi.fn()}
      />
    )

    const cancelBtn = screen.getByRole("button", { name: /cancelar/i })
    fireEvent.click(cancelBtn)

    expect(mockClose).toHaveBeenCalledTimes(1)
  })
})
