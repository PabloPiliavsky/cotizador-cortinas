const AUTH_ERROR_MESSAGES = {
  "auth/invalid-credential": "El correo o la contraseña no son correctos.",
  "auth/user-not-found": "No existe una cuenta con ese correo.",
  "auth/wrong-password": "La contraseña no es correcta.",
  "auth/email-already-in-use": "Ese correo ya está registrado.",
  "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
  "auth/operation-not-allowed": "Activá el acceso con correo y contraseña en Firebase.",
}

export default function getAuthErrorMessage(error) {
  if (!error) return null

  return AUTH_ERROR_MESSAGES[error.code] ?? "No se pudo completar la operación."
}
