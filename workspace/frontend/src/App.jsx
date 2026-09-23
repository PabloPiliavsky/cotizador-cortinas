import { useCallback, useState } from "react"
import { LogOut } from "lucide-react"
import { BudgetProvider } from "./shared/providers/BudgetContext"
import LoginPage from "./features/auth/components/LoginPage"
import SplashScreen from "./features/auth/components/SplashScreen"
import EstimatorPage from "./features/estimator/components/EstimatorPage"
import ConfigCrud from "./features/admin/components/ConfigCrud"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/shared/providers/AuthContext"
import SplashScreen from "./shared/components/SplashScreen"

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const { loading, logout, user } = useAuth()
  const [showSplash, setShowSplash] = useState(false)
  const accountLabel = user?.displayName || user?.email || "Usuario conectado"
  const handleAuthenticated = useCallback(() => setShowSplash(true), [])
  const handleSplashComplete = useCallback(() => setShowSplash(false), [])

  function handleLogout() {
    logout().catch(() => undefined)
  }

  if (loading) {
    return <main className="flex min-h-screen items-center justify-center bg-zinc-950 font-mono text-sm text-zinc-400">Cargando sesión...</main>
  }

  if (!user) return <LoginPage onAuthenticated={handleAuthenticated} />

  if (showSplash) return <SplashScreen onComplete={handleSplashComplete} />

  return (
    <BudgetProvider>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      <main className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col font-sans pb-12">
        <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold tracking-tight text-white m-0 py-0 flex items-center gap-2">
              <span className="bg-blue-600 text-xs px-2 py-1 rounded text-white font-mono shadow-sm shadow-blue-600/30">
                COR
              </span>
              Metalconf Cotizador
            </h1>
            <div className="flex items-center gap-3">
              <span className="max-w-40 truncate font-mono text-xs text-zinc-400" title={accountLabel}>{accountLabel}</span>
              <Button className="border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 hover:text-white" onClick={handleLogout} size="sm" type="button" variant="outline">
                <LogOut data-icon="inline-start" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </header>

        <section className="max-w-6xl w-full mx-auto px-4 mt-6 flex flex-col gap-6">
          <Tabs defaultValue="cotizador" className="w-full">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
              <TabsList className="bg-zinc-900/80 border border-zinc-800 p-1 rounded-lg">
                <TabsTrigger
                  value="cotizador"
                  className="text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-md transition-all cursor-pointer data-[state=active]:bg-white data-[state=active]:text-zinc-950 data-[state=active]:font-semibold data-[state=active]:shadow-sm"
                >
                  Cotizador Cliente
                </TabsTrigger>
                <TabsTrigger
                  value="admin"
                  className="text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-md transition-all cursor-pointer data-[state=active]:bg-white data-[state=active]:text-zinc-950 data-[state=active]:font-semibold data-[state=active]:shadow-sm"
                >
                  Configuración CRUD
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="cotizador" className="mt-4">
              <EstimatorPage />
            </TabsContent>
            <TabsContent value="admin" className="mt-4">
              <ConfigCrud />
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </BudgetProvider>
  )
}
