import { collection, doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

export const ROLES = Object.freeze({ MASTER: "master", EMPLEADO: "empleado" })
export const DEFAULT_MASTER_EMAILS = Object.freeze(["admin@propulsa.com", "demo@persianas.com"])

export function getInitialRoleForEmail(email) {
  if (!email) return ROLES.EMPLEADO
  return DEFAULT_MASTER_EMAILS.includes(email.trim().toLowerCase()) ? ROLES.MASTER : ROLES.EMPLEADO
}

export function subscribeToUserProfile(user, onProfile, onError) {
  if (!user?.uid) {
    onProfile(null)
    return () => undefined
  }
  if (!db) {
    onProfile({ uid: user.uid, email: user.email || "", role: getInitialRoleForEmail(user.email) })
    return () => undefined
  }

  const userRef = doc(db, "usuarios", user.uid)
  return onSnapshot(
    userRef,
    async (snapshot) => {
      if (snapshot.exists()) {
        onProfile(snapshot.data())
        return
      }
      const profile = {
        uid: user.uid,
        email: user.email || "",
        displayName: user.displayName || user.email?.split("@")[0] || "Usuario",
        role: getInitialRoleForEmail(user.email),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      try {
        await setDoc(userRef, profile)
        onProfile(profile)
      } catch (err) {
        onProfile(profile)
        if (onError) onError(err)
      }
    },
    (error) => {
      onProfile({ uid: user.uid, email: user.email || "", role: getInitialRoleForEmail(user.email) })
      if (onError) onError(error)
    },
  )
}

export function subscribeToAllUsers(onUsers, onError) {
  return onSnapshot(
    collection(db, "usuarios"),
    (snapshot) => onUsers(snapshot.docs.map((d) => d.data())),
    (error) => { if (onError) onError(error) },
  )
}

export async function updateUserRole(uid, newRole) {
  if (!uid) throw new Error("Se requiere UID del usuario")
  if (!Object.values(ROLES).includes(newRole)) throw new Error("Rol inválido")
  await updateDoc(doc(db, "usuarios", uid), { role: newRole, updatedAt: new Date().toISOString() })
}

export async function seedInitialAdminUsers() {
  try {
    const adminRef = doc(db, "usuarios", "admin-propulsa-preconfigured")
    const docSnap = await getDoc(adminRef)
    if (!docSnap.exists()) {
      await setDoc(adminRef, {
        uid: "admin-propulsa-preconfigured",
        email: "admin@propulsa.com",
        displayName: "Admin Propulsa",
        role: ROLES.MASTER,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    }
  } catch {
    // Silencioso si falla inicialización preventiva
  }
}
