import { describe, it, expect } from "vitest"
import {
  ROLES,
  getInitialRoleForEmail,
  updateUserRole,
} from "../userService"

describe("userService", () => {
  it("asigna rol master a admin@propulsa.com y demo@persianas.com", () => {
    expect(getInitialRoleForEmail("admin@propulsa.com")).toBe(ROLES.MASTER)
    expect(getInitialRoleForEmail("ADMIN@PROPULSA.COM")).toBe(ROLES.MASTER)
    expect(getInitialRoleForEmail("demo@persianas.com")).toBe(ROLES.MASTER)
  })

  it("asigna rol empleado a cualquier otro correo electrónico", () => {
    expect(getInitialRoleForEmail("empleado1@metalconf.com")).toBe(ROLES.EMPLEADO)
    expect(getInitialRoleForEmail("ventas@empresa.com")).toBe(ROLES.EMPLEADO)
    expect(getInitialRoleForEmail(null)).toBe(ROLES.EMPLEADO)
    expect(getInitialRoleForEmail("")).toBe(ROLES.EMPLEADO)
  })

  it("valida parámetros en updateUserRole", async () => {
    await expect(updateUserRole("", ROLES.MASTER)).rejects.toThrow("Se requiere UID del usuario")
    await expect(updateUserRole("uid123", "rol_inexistente")).rejects.toThrow("Rol inválido")
  })
})
