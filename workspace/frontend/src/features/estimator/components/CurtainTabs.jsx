import { Button } from "@/components/ui/button"

export default function CurtainTabs({
  budgetItems,
  activeItemId,
  setActiveItemId,
  handleAddDesign,
  handleRemoveCurtain,
  handleClearBudget,
}) {
  return (
    <div className="flex flex-col gap-3 bg-zinc-950/40 p-4 border border-zinc-800 rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-zinc-300">Diseños / Secciones</span>
        <Button
          size="xs"
          variant="destructive"
          onClick={handleClearBudget}
          className="bg-red-950/30 border border-red-900/50 text-red-300 hover:bg-red-600 hover:text-white transition-all shadow-xs"
        >
          Reiniciar Presupuesto
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        {budgetItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveItemId(item.id)}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold border rounded-lg transition-all duration-150 cursor-pointer ${
              activeItemId === item.id
                ? "bg-white text-zinc-950 border-white shadow-md shadow-white/10"
                : "bg-zinc-900/70 text-zinc-300 border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 hover:text-white hover:shadow-xs"
            }`}
          >
            <span>{item.name}</span>
            {budgetItems.length > 1 && (
              <span
                role="button"
                aria-label={`Eliminar cortina ${item.name}`}
                onClick={(e) => handleRemoveCurtain(item.id, e)}
                className="hover:text-red-400 hover:bg-red-500/20 font-bold ml-1 text-zinc-400 px-1 py-0.5 rounded transition-colors"
              >
                ×
              </span>
            )}
          </button>
        ))}
        <button
          onClick={handleAddDesign}
          className="px-3.5 py-1.5 text-xs font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-500 hover:shadow-md hover:shadow-blue-500/30 active:scale-[0.98] transition-all duration-150 border border-blue-500 cursor-pointer"
        >
          + Nuevo Diseño
        </button>
      </div>
    </div>
  )
}
