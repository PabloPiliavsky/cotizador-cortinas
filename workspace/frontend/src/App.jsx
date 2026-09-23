import { useCallback, useState } from "react"
import { useAuth } from "@/shared/providers/AuthContext"
import LoginPage from "@/features/auth/components/LoginPage"
import SplashScreen from "@/shared/components/SplashScreen"
import AuthenticatedApp from "@/shared/components/AuthenticatedApp"

export default function App() {
  const { loading, logout, user } = useAuth()
  const [showSplash, setShowSplash] = useState(false)

  const handleAuthenticated = useCallback(() => setShowSplash(true), [])
  const handleSplashComplete = useCallback(() => setShowSplash(false), [])

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 font-mono text-sm text-zinc-400">
        Cargando sesión...
      </main>
    )
  }

  if (!user) {
    return <LoginPage onAuthenticated={handleAuthenticated} />
  }

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashComplete} />
  }

  return <AuthenticatedApp onLogout={logout} user={user} />
}
