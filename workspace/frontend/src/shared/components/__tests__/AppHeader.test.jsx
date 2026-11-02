import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import AppHeader from "../AppHeader"

describe("AppHeader Component", () => {
  it("renderiza el logo de la empresa y el nombre de usuario", () => {
    const mockUser = { email: "operador@metalconf.com", displayName: "Operador Juan" }
    render(<AppHeader onLogout={vi.fn()} user={mockUser} />)

    expect(screen.getByText("COR")).toBeInTheDocument()
    expect(screen.getByText("Metalconf Cotizador")).toBeInTheDocument()
    expect(screen.getByText("Operador Juan")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /cerrar sesión/i })).toBeInTheDocument()
  })

  it("muestra el email si no hay displayName", () => {
    const mockUser = { email: "ventas@metalconf.com" }
    render(<AppHeader onLogout={vi.fn()} user={mockUser} />)

    expect(screen.getByText("ventas@metalconf.com")).toBeInTheDocument()
  })

  it("ejecuta onLogout al presionar el botón de cerrar sesión", () => {
    const mockLogout = vi.fn().mockResolvedValue()
    const mockUser = { email: "demo@metalconf.com" }
    render(<AppHeader onLogout={mockLogout} user={mockUser} />)

    const logoutBtn = screen.getByRole("button", { name: /cerrar sesión/i })
    fireEvent.click(logoutBtn)

    expect(mockLogout).toHaveBeenCalledTimes(1)
  })

  it("muestra la insignia de Master y Empleado según el rol", () => {
    const mockUser = { email: "admin@propulsa.com" }
    const { rerender } = render(<AppHeader onLogout={vi.fn()} role="master" user={mockUser} />)
    expect(screen.getByText("Master")).toBeInTheDocument()

    rerender(<AppHeader onLogout={vi.fn()} role="empleado" user={mockUser} />)
    expect(screen.getByText("Empleado")).toBeInTheDocument()
  })
})
