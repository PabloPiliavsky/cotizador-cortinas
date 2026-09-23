import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import ConfigCrud from "../ConfigCrud"

const authMock = vi.hoisted(() => ({
  isMaster: false,
}))

vi.mock("@/shared/providers/AuthContext", () => ({
  useAuth: () => ({ isMaster: authMock.isMaster }),
}))

vi.mock("@/shared/providers/BudgetContext", () => ({
  useBudget: () => ({
    lamas: [],
    ejes: [],
    guias: [],
    cajones: [],
    motores: [],
    accesorios: [],
    margins: [],
    createItem: vi.fn(),
    updateItem: vi.fn(),
    deleteItem: vi.fn(),
  }),
}))

describe("ConfigCrud Component", () => {
  it("muestra aviso de solo lectura y oculta la pestaña de usuarios a un empleado", () => {
    authMock.isMaster = false
    render(<ConfigCrud />)

    expect(screen.getByText(/Modo consulta: Tu usuario opera con permisos de/i)).toBeInTheDocument()
    expect(screen.queryByRole("tab", { name: /usuarios db/i })).not.toBeInTheDocument()
  })

  it("habilita la pestaña de usuarios DB cuando el usuario es master", () => {
    authMock.isMaster = true
    render(<ConfigCrud />)

    expect(screen.queryByText(/Modo consulta: Tu usuario opera con permisos de/i)).not.toBeInTheDocument()
    expect(screen.getByRole("tab", { name: /usuarios db/i })).toBeInTheDocument()
  })
})
