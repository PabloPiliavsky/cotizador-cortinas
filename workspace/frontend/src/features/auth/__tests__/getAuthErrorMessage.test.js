import { expect, it } from "vitest"
import getAuthErrorMessage from "../utils/getAuthErrorMessage"

it.each([
  ["auth/invalid-credential", "El correo o la contraseña no son correctos."],
  ["auth/user-not-found", "No existe una cuenta con ese correo."],
  ["auth/wrong-password", "La contraseña no es correcta."],
  ["auth/email-already-in-use", "Ese correo ya está registrado."],
  ["auth/weak-password", "La contraseña debe tener al menos 6 caracteres."],
])("traduce %s", (code, message) => {
  expect(getAuthErrorMessage({ code })).toBe(message)
})
