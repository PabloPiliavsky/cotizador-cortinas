import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AppHeader({ user, role, onLogout }) {
  const accountLabel = user?.displayName || user?.email || "Usuario conectado"
  const isMaster = role === "master"

  function handleLogout() {
    if (onLogout) {
      onLogout().catch(() => undefined)
    }
  }

  return (
    <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight text-white m-0 py-0 flex items-center gap-2">
          <span className="bg-blue-600 text-xs px-2 py-1 rounded text-white font-mono shadow-sm shadow-blue-600/30">
            COR
          </span>
          Metalconf Cotizador
        </h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="max-w-40 truncate font-mono text-xs text-zinc-300" title={accountLabel}>
              {accountLabel}
            </span>
            <span
              className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-full font-bold tracking-wider border ${
                isMaster
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-sm shadow-amber-500/10"
                  : "bg-zinc-800 text-zinc-400 border-zinc-700"
              }`}
            >
              {isMaster ? "Master" : "Empleado"}
            </span>
          </div>
          <Button
            className="border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 hover:text-white"
            onClick={handleLogout}
            size="sm"
            type="button"
            variant="outline"
          >
            <LogOut data-icon="inline-start" />
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </header>
  )
}
