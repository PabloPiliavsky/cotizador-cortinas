import { describe, it, expect, vi, beforeEach } from "vitest"
import { renderHook, act } from "@testing-library/react"
import useBudgetHistory from "../useBudgetHistory"

// Mocks de Firestore
const mockSetDoc = vi.fn()
const mockDeleteDoc = vi.fn()
const mockDoc = vi.fn((db, col, id) => ({ path: `${col}/${id}` }))
let triggerSnapshotCallback = null

vi.mock("firebase/firestore", () => ({
  collection: vi.fn(),
  doc: (...args) => mockDoc(...args),
  setDoc: (...args) => mockSetDoc(...args),
  deleteDoc: (...args) => mockDeleteDoc(...args),
  onSnapshot: vi.fn((colRef, onNext) => {
    triggerSnapshotCallback = onNext
    return vi.fn() // unsubscribe
  }),
}))

vi.mock("@/lib/firebase", () => ({
  db: {},
}))

describe("useBudgetHistory hook", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    triggerSnapshotCallback = null
  })

  it("actualiza la lista de historial reactivamente cuando Firestore emite un snapshot", () => {
    const { result } = renderHook(() => useBudgetHistory())

    expect(result.current.historyLoading).toBe(true)

    // Simular llegada de documentos desde Firestore
    act(() => {
      triggerSnapshotCallback({
        docs: [
          {
            id: "b1",
            data: () => ({
              client: "Cliente Antiguo",
              createdAt: "2026-01-01T10:00:00Z",
              grandTotal: 500,
            }),
          },
          {
            id: "b2",
            data: () => ({
              client: "Cliente Reciente",
              createdAt: "2026-06-01T10:00:00Z",
              grandTotal: 750,
            }),
          },
        ],
      })
    })

    expect(result.current.historyLoading).toBe(false)
    expect(result.current.history).toHaveLength(2)
    // Debe ordenarse descendente por createdAt
    expect(result.current.history[0].client).toBe("Cliente Reciente")
    expect(result.current.history[1].client).toBe("Cliente Antiguo")
  })

  it("invoca setDoc con id generado y metadata de fecha al guardar presupuesto", async () => {
    mockSetDoc.mockResolvedValueOnce()
    const { result } = renderHook(() => useBudgetHistory())

    await act(async () => {
      await result.current.saveBudget({
        client: "Constructora Modelo",
        grandTotal: 1200,
        items: [],
      })
    })

    expect(mockSetDoc).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        client: "Constructora Modelo",
        grandTotal: 1200,
        createdAt: expect.any(String),
        date: expect.any(String),
      })
    )
  })

  it("invoca deleteDoc con el id seleccionado al eliminar presupuesto", async () => {
    mockDeleteDoc.mockResolvedValueOnce()
    const { result } = renderHook(() => useBudgetHistory())

    await act(async () => {
      await result.current.deleteBudget("presupuesto-123")
    })

    expect(mockDeleteDoc).toHaveBeenCalledWith(
      expect.objectContaining({ path: "budget_history/presupuesto-123" })
    )
  })
})
