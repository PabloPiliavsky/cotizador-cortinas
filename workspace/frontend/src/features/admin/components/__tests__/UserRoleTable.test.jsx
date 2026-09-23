import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import UserRoleTable from "../UserRoleTable"

const mockUsers = [
  { uid: "u1", email: "admin@propulsa.com", displayName: "Admin Propulsa", role: "master" },
  { uid: "u2", email: "empleado@metalconf.com", displayName: "Empleado Juan", role: "empleado" },
]

const userServiceMocks = vi.hoisted(() => ({
  subscribeToAllUsers: vi.fn(),
  updateUserRole: vi.fn(),
  ROLES: { MASTER: "master", EMPLEADO: "empleado" },
}))

vi.mock("@/features/auth/services/userService", () => userServiceMocks)
vi.mock("@/shared/providers/AuthContext", () => ({
  useAuth: () => ({ user: { uid: "u1", email: "admin@propulsa.com" } }),
}))

describe("UserRoleTable Component", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    userServiceMocks.subscribeToAllUsers.mockImplementation((callback) => {
      callback(mockUsers)
      return vi.fn()
    })
    userServiceMocks.updateUserRole.mockResolvedValue()
  })

  it("renderiza la lista de usuarios con sus respectivos roles", () => {
    render(<UserRoleTable />)

    expect(screen.getByText("Gestión de Usuarios y Roles en Base de Datos")).toBeInTheDocument()
    expect(screen.getByText("admin@propulsa.com")).toBeInTheDocument()
    expect(screen.getByText("(Tú)")).toBeInTheDocument()
    expect(screen.getByText("empleado@metalconf.com")).toBeInTheDocument()
    expect(screen.getByText("Empleado Juan")).toBeInTheDocument()
  })

  it("permite cambiar el rol de un usuario empleado a master", async () => {
    render(<UserRoleTable />)

    const toggleBtn = screen.getByRole("button", { name: /asignar master/i })
    fireEvent.click(toggleBtn)

    await waitFor(() => {
      expect(userServiceMocks.updateUserRole).toHaveBeenCalledWith("u2", "master")
    })
  })

  it("deshabilita el botón de cambio de rol para el propio usuario master activo", () => {
    render(<UserRoleTable />)

    const buttons = screen.getAllByRole("button")
    // El primer botón corresponde a u1 (el usuario actual) y debe estar deshabilitado para evitar auto-bloqueo
    expect(buttons[0]).toBeDisabled()
  })
})
