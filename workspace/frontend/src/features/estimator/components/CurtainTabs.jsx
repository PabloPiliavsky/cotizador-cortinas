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
    <div className="flex flex-col gap-3 bg-zinc-950/40 p-4 border border-zinc-800 rounded-lg">
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-zinc-300">Diseños / Secciones</span>
        <Button size="xs" variant="destructive" onClick={handleClearBudget}>Reiniciar Presupuesto</Button>
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        {budgetItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveItemId(item.id)}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold border rounded-md transition-colors ${
              activeItemId === item.id 
                ? "bg-zinc-100 text-zinc-950 border-zinc-100" 
                : "bg-zinc-900/60 text-zinc-300 border-zinc-850 hover:bg-zinc-800"
            }`}
          >
            <span>{item.name}</span>
            {budgetItems.length > 1 && (
              <span 
                onClick={(e) => handleRemoveCurtain(item.id, e)} 
                className="hover:text-red-500 font-bold ml-1 text-zinc-500 cursor-pointer"
              >
                ×
              </span>
            )}
          </button>
        ))}
        <button 
          onClick={handleAddDesign}
          className="px-3 py-1.5 text-xs font-bold bg-blue-600/90 text-white rounded-md hover:bg-blue-500 transition-colors border border-blue-500"
        >
          + Nuevo Diseño
        </button>
      </div>
    </div>
  )
}
