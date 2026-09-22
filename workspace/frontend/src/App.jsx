import { useState } from "react"
import { BudgetProvider } from "./shared/providers/BudgetContext"
import EstimatorPage from "./features/estimator/components/EstimatorPage"
import ConfigCrud from "./features/admin/components/ConfigCrud"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SplashScreen from "./shared/components/SplashScreen"

export default function App() {
  const [showSplash, setShowSplash] = useState(true)

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
            <span className="text-xs text-zinc-400 font-mono">v1.1.0</span>
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
