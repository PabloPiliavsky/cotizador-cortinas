export default function AccessoryChecklist({
  accesorios,
  currentSelected,
  onToggle,
}) {
  if (accesorios.length === 0) {
    return (
      <div className="text-center py-8 text-xs text-zinc-500 italic">
        No se encontraron accesorios coincidentes con la búsqueda.
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 max-h-80">
      {accesorios.map((acc) => {
        const isChecked = currentSelected.includes(acc.code)
        return (
          <label
            key={acc.code}
            className={`flex items-center justify-between p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
              isChecked
                ? "bg-blue-950/20 border-blue-500/70 text-zinc-100 shadow-xs"
                : "bg-zinc-900/40 border-zinc-800/80 text-zinc-300 hover:bg-zinc-850 hover:border-zinc-700 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onToggle(acc.code)}
                className="rounded border-zinc-700 bg-zinc-900 accent-blue-600 w-4 h-4 cursor-pointer"
              />
              <div className="flex flex-col">
                <span className="font-medium text-zinc-200">{acc.name}</span>
                <span className="font-mono text-[11px] text-zinc-500">{acc.code}</span>
              </div>
            </div>
            <span className="font-mono text-zinc-400 text-xs font-semibold">
              ${acc.price?.toFixed(2) ?? "0.00"} USD
            </span>
          </label>
        )
      })}
    </div>
  )
}
