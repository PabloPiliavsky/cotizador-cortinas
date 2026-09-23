import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"
import { auth } from "@/lib/firebase"

const AuthContext = createContext(null)

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authError, setAuthError] = useState(null)

  useEffect(() => {
    return onAuthStateChanged(
      auth,
      (nextUser) => {
        setUser(nextUser)
        setLoading(false)
      },
      (error) => {
        setAuthError(error)
        setLoading(false)
      },
    )
  }, [])

  const runAuthOperation = useCallback(async (operation) => {
    setAuthError(null)

    try {
      return await operation()
    } catch (error) {
      setAuthError(error)
      throw error
    }
  }, [])

  const login = useCallback(
    (email, password) =>
      runAuthOperation(() => signInWithEmailAndPassword(auth, email, password)),
    [runAuthOperation],
  )

  const register = useCallback(
    (email, password) =>
      runAuthOperation(() => createUserWithEmailAndPassword(auth, email, password)),
    [runAuthOperation],
  )

  const logout = useCallback(async () => {
    setUser(null)
    return runAuthOperation(() => signOut(auth))
  }, [runAuthOperation])

  const value = useMemo(
    () => ({ user, loading, authError, login, register, logout }),
    [authError, loading, login, logout, register, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider")

  return context
}
