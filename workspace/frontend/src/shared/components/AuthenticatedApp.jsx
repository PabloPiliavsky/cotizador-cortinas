import { BudgetProvider } from "@/shared/providers/BudgetContext"
import AppHeader from "@/shared/components/AppHeader"
import EstimatorPage from "@/features/estimator/components/EstimatorPage"
import ConfigCrud from "@/features/admin/components/ConfigCrud"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useAuth } from "@/shared/providers/AuthContext"

export default function AuthenticatedApp({ user, onLogout }) {
  const { role } = useAuth()

  return (
    <BudgetProvider>
      <main className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col font-sans pb-12">
        <AppHeader onLogout={onLogout} role={role} user={user} />

        <section className="max-w-6xl w-full mx-auto px-4 mt-6 flex flex-col gap-6">
          <Tabs className="w-full" defaultValue="cotizador">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
              <TabsList className="bg-zinc-900/80 border border-zinc-800 p-1 rounded-lg">
                <TabsTrigger
                  className="text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-md transition-all cursor-pointer data-[state=active]:bg-white data-[state=active]:text-zinc-950 data-[state=active]:font-semibold data-[state=active]:shadow-sm"
                  value="cotizador"
                >
                  Cotizador Cliente
                </TabsTrigger>
                <TabsTrigger
                  className="text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-md transition-all cursor-pointer data-[state=active]:bg-white data-[state=active]:text-zinc-950 data-[state=active]:font-semibold data-[state=active]:shadow-sm"
                  value="admin"
                >
                  Configuración de elementos
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent className="mt-4" value="cotizador">
              <EstimatorPage />
            </TabsContent>
            <TabsContent className="mt-4" value="admin">
              <ConfigCrud />
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </BudgetProvider>
  )
}
