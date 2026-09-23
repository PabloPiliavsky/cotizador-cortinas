import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, expect, it, vi } from "vitest"
import LoginPage from "../LoginPage"

const authMocks = vi.hoisted(() => ({
  login: vi.fn(),
  register: vi.fn(),
}))

vi.mock("@/shared/providers/AuthContext", () => ({
  useAuth: () => ({ ...authMocks, authError: null }),
}))

function renderLoginPage() {
  return render(<LoginPage onAuthenticated={vi.fn()} />)
}

beforeEach(() => {
  vi.clearAllMocks()
  authMocks.login.mockResolvedValue({})
  authMocks.register.mockResolvedValue({})
})

it("muestra el formulario de inicio con campos obligatorios", () => {
  renderLoginPage()

  expect(screen.getByRole("heading", { name: "Iniciar Sesión" })).toBeInTheDocument()
  expect(screen.getByLabelText("Correo electrónico")).toBeRequired()
  expect(screen.getByLabelText("Contraseña")).toBeRequired()
  expect(screen.getByRole("button", { name: "Iniciar Sesión" })).toBeInTheDocument()
})

it("alterna entre inicio de sesión y creación de cuenta", async () => {
  const user = userEvent.setup()
  renderLoginPage()

  await user.click(screen.getByRole("button", { name: "Crear una cuenta" }))

  expect(screen.getByRole("heading", { name: "Crear Cuenta" })).toBeInTheDocument()
  expect(screen.getByRole("button", { name: "Crear Cuenta" })).toBeInTheDocument()
})

it("no envía credenciales cuando faltan campos obligatorios", async () => {
  const user = userEvent.setup()
  renderLoginPage()

  await user.click(screen.getByRole("button", { name: "Iniciar Sesión" }))

  expect(authMocks.login).not.toHaveBeenCalled()
})

it("traduce errores de credenciales de Firebase", async () => {
  const user = userEvent.setup()
  authMocks.login.mockRejectedValueOnce({ code: "auth/invalid-credential" })
  renderLoginPage()

  await user.type(screen.getByLabelText("Correo electrónico"), "demo@persianas.com")
  await user.type(screen.getByLabelText("Contraseña"), "incorrecta")
  await user.click(screen.getByRole("button", { name: "Iniciar Sesión" }))

  expect(await screen.findByRole("alert")).toHaveTextContent("El correo o la contraseña no son correctos.")
})

it("rellena las credenciales demo sin iniciar sesión", async () => {
  const user = userEvent.setup()
  renderLoginPage()

  await user.click(screen.getByRole("button", { name: "Credenciales Demo / Relleno Rápido" }))

  expect(screen.getByLabelText("Correo electrónico")).toHaveValue("demo@persianas.com")
  expect(screen.getByLabelText("Contraseña")).toHaveValue("Demo1234")
  expect(authMocks.login).not.toHaveBeenCalled()
})

it("inicia el splash después de una autenticación exitosa", async () => {
  const user = userEvent.setup()
  const onAuthenticated = vi.fn()

  render(<LoginPage onAuthenticated={onAuthenticated} />)
  await user.type(screen.getByLabelText("Correo electrónico"), "demo@persianas.com")
  await user.type(screen.getByLabelText("Contraseña"), "Demo1234")
  await user.click(screen.getByRole("button", { name: "Iniciar Sesión" }))

  await waitFor(() => expect(onAuthenticated).toHaveBeenCalledTimes(1))
  expect(authMocks.login).toHaveBeenCalledWith("demo@persianas.com", "Demo1234")
})
