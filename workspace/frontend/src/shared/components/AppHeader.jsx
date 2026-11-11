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
    <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-40 w-full">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex justify-between items-center gap-2">
        <div className="flex items-center gap-2 min-w-0 shrink">
          <span className="bg-blue-600 text-[11px] sm:text-xs px-2 py-0.5 sm:py-1 rounded text-white font-mono shadow-sm shadow-blue-600/30 shrink-0 font-bold">
            COR
          </span>
          <h1 className="text-sm sm:text-lg md:text-xl font-bold tracking-tight text-white m-0 py-0 truncate">
            Metalconf Cotizador
          </h1>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <div className="flex items-center gap-1 sm:gap-2 min-w-0">
            <span
              className="max-w-[100px] sm:max-w-40 truncate font-mono text-[11px] sm:text-xs text-zinc-300"
              title={accountLabel}
            >
              {accountLabel}
            </span>
            <span
              className={`text-[9px] sm:text-[10px] uppercase font-mono px-1.5 sm:px-2 py-0.5 rounded-full font-bold tracking-wider border shrink-0 ${
                isMaster
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-sm shadow-amber-500/10"
                  : "bg-zinc-800 text-zinc-400 border-zinc-700"
              }`}
            >
              {isMaster ? "Master" : "Empleado"}
            </span>
          </div>
          <Button
            aria-label="Cerrar Sesión"
            className="border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 hover:text-white shrink-0 px-2 sm:px-3 h-8"
            onClick={handleLogout}
            size="sm"
            title="Cerrar Sesión"
            type="button"
            variant="outline"
          >
            <LogOut className="size-3.5 sm:size-4" data-icon="inline-start" />
            <span className="hidden sm:inline">Cerrar Sesión</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
