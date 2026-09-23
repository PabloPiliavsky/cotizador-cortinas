import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { ROLES, getInitialRoleForEmail, seedInitialAdminUsers, subscribeToUserProfile } from "@/features/auth/services/userService"

const AuthContext = createContext(null)

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authError, setAuthError] = useState(null)

  useEffect(() => { seedInitialAdminUsers() }, [])

  useEffect(() => {
    let unsubProfile = () => undefined
    const unsubAuth = onAuthStateChanged(
      auth,
      (nextUser) => {
        setUser(nextUser)
        if (nextUser) {
          unsubProfile = subscribeToUserProfile(nextUser, (profile) => {
            setUserProfile(profile)
            setLoading(false)
          })
        } else {
          setUserProfile(null)
          setLoading(false)
        }
      },
      (error) => {
        setAuthError(error)
        setLoading(false)
      },
    )
    return () => {
      unsubAuth()
      unsubProfile()
    }
  }, [])

  const runAuth = useCallback(async (op) => {
    setAuthError(null)
    try {
      return await op()
    } catch (err) {
      setAuthError(err)
      throw err
    }
  }, [])

  const login = useCallback((email, pass) => runAuth(() => signInWithEmailAndPassword(auth, email, pass)), [runAuth])
  const register = useCallback((email, pass) => runAuth(() => createUserWithEmailAndPassword(auth, email, pass)), [runAuth])
  const logout = useCallback(async () => {
    setUser(null)
    setUserProfile(null)
    return runAuth(() => signOut(auth))
  }, [runAuth])

  const role = userProfile?.role || (user ? getInitialRoleForEmail(user.email) : null)
  const isMaster = role === ROLES.MASTER
  const isEmpleado = role === ROLES.EMPLEADO

  const value = useMemo(
    () => ({ user, userProfile, role, isMaster, isEmpleado, loading, authError, login, register, logout }),
    [authError, isEmpleado, isMaster, loading, login, logout, register, role, user, userProfile],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider")
  return context
}
