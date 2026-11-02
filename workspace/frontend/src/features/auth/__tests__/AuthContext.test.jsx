import { act, renderHook, waitFor } from "@testing-library/react"
import { beforeEach, expect, it, vi } from "vitest"
import AuthProvider, { useAuth } from "../../../shared/providers/AuthContext"

const firebaseMocks = vi.hoisted(() => ({
  auth: {},
  createUserWithEmailAndPassword: vi.fn(),
  onAuthStateChanged: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
}))

vi.mock("firebase/auth", () => firebaseMocks)
vi.mock("@/lib/firebase", () => ({ auth: firebaseMocks.auth, db: {} }))
vi.mock("@/features/auth/services/userService", () => ({
  ROLES: { MASTER: "master", EMPLEADO: "empleado" },
  getInitialRoleForEmail: (email) => (email === "admin@propulsa.com" ? "master" : "empleado"),
  seedInitialAdminUsers: vi.fn(),
  subscribeToUserProfile: (user, callback) => {
    callback({
      uid: user.uid,
      email: user.email,
      role: emailRole(user.email),
    })
    return vi.fn()
  },
}))

function emailRole(email) {
  return email === "admin@propulsa.com" ? "master" : "empleado"
}

let authStateListener

function Wrapper({ children }) {
  return <AuthProvider>{children}</AuthProvider>
}

beforeEach(() => {
  vi.clearAllMocks()
  firebaseMocks.onAuthStateChanged.mockImplementation((_auth, listener) => {
    authStateListener = listener
    listener(null)
    return vi.fn()
  })
})

async function renderAuthHook() {
  const hook = renderHook(() => useAuth(), { wrapper: Wrapper })
  await waitFor(() => expect(hook.result.current.loading).toBe(false))
  return hook
}

it("inicia sesión y actualiza el usuario cuando cambia el estado de Firebase", async () => {
  const user = { email: "admin@propulsa.com", uid: "user-admin" }
  firebaseMocks.signInWithEmailAndPassword.mockResolvedValue({ user })
  const { result } = await renderAuthHook()

  await act(async () => {
    await result.current.login(user.email, "Admin123")
  })
  act(() => authStateListener(user))

  expect(firebaseMocks.signInWithEmailAndPassword).toHaveBeenCalledWith(firebaseMocks.auth, user.email, "Admin123")
  expect(result.current.user).toEqual(user)
  expect(result.current.isMaster).toBe(true)
  expect(result.current.isEmpleado).toBe(false)
})

it("guarda y propaga los errores de credenciales", async () => {
  const error = { code: "auth/invalid-credential" }
  firebaseMocks.signInWithEmailAndPassword.mockRejectedValue(error)
  const { result } = await renderAuthHook()

  await act(async () => {
    await expect(result.current.login("demo@persianas.com", "incorrecta")).rejects.toBe(error)
  })

  expect(result.current.authError).toBe(error)
})

it("registra una cuenta con Firebase", async () => {
  const { result } = await renderAuthHook()
  firebaseMocks.createUserWithEmailAndPassword.mockResolvedValue({ user: { uid: "user-2" } })

  await act(async () => {
    await result.current.register("nueva@persianas.com", "Demo1234")
  })

  expect(firebaseMocks.createUserWithEmailAndPassword).toHaveBeenCalledWith(firebaseMocks.auth, "nueva@persianas.com", "Demo1234")
})

it("cierra sesión y limpia el usuario activo de inmediato", async () => {
  const { result } = await renderAuthHook()
  let finishSignOut
  firebaseMocks.signOut.mockImplementation(() => new Promise((resolve) => {
    finishSignOut = resolve
  }))
  act(() => authStateListener({ email: "demo@persianas.com", uid: "user-1" }))

  let logoutPromise
  act(() => {
    logoutPromise = result.current.logout()
  })

  expect(firebaseMocks.signOut).toHaveBeenCalledWith(firebaseMocks.auth)
  expect(result.current.user).toBeNull()

  await act(async () => {
    finishSignOut()
    await logoutPromise
  })
})
