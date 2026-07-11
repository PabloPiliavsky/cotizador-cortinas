export default function CurtainBreakdown({
  budgetItems,
  activeItemId,
  setActiveItemId,
  marginFactor,
}) {
  return (
    <div className="bg-zinc-950/40 p-4 border border-zinc-800 rounded-lg flex flex-col gap-3">
      <h3 className="text-md font-semibold text-zinc-200">Desglose de Costos por Diseño</h3>
      <div className="flex flex-col gap-3">
        {budgetItems.map(item => {
          if (!item.calcs) return null
          const totalItemUnit = (item.calcs.total * marginFactor)
          const slatsWithMargin = item.calcs.slatsCost * marginFactor
          const guidesWithMargin = item.calcs.guidesCost * marginFactor
          const ejeWithMargin = item.calcs.ejeCost * marginFactor
          const cajonWithMargin = item.calcs.cajonCost * marginFactor
          const motorWithMargin = item.calcs.motorCost * marginFactor
          const accsWithMargin = item.calcs.accsCost * marginFactor

          return (
            <div 
              key={item.id} 
              onClick={() => setActiveItemId(item.id)}
              className={`flex flex-col p-4 border rounded-md gap-3 cursor-pointer transition-colors ${
                activeItemId === item.id 
                  ? "border-blue-500/80 bg-blue-950/10" 
                  : "border-zinc-800 bg-zinc-900/30 hover:border-zinc-700"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="text-zinc-200 font-bold text-sm">{item.name} ({item.qty} un)</span>
                  <span className="text-zinc-400 text-xs mt-0.5">
                    Medidas: {item.width}m x {item.height}m (Final: {item.calcs.wFinal.toFixed(2)}m x {item.calcs.hFinal.toFixed(2)}m)
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-zinc-400 text-xs">Unitario: ${totalItemUnit.toFixed(2)}</span>
                  <span className="font-mono text-blue-400 font-bold text-sm">Subtotal: ${(totalItemUnit * item.qty).toFixed(2)} USD</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 bg-zinc-950/20 p-2.5 rounded border border-zinc-800/40 text-xs text-zinc-400">
                <div><span className="text-zinc-500">Lamas:</span> <span className="font-mono">${slatsWithMargin.toFixed(2)}</span></div>
                {guidesWithMargin > 0 && <div><span className="text-zinc-500">Guías:</span> <span className="font-mono">${guidesWithMargin.toFixed(2)}</span></div>}
                {cajonWithMargin > 0 && <div><span className="text-zinc-500">Cajón:</span> <span className="font-mono">${cajonWithMargin.toFixed(2)}</span></div>}
                {ejeWithMargin > 0 && <div><span className="text-zinc-500">Eje:</span> <span className="font-mono">${ejeWithMargin.toFixed(2)}</span></div>}
                {motorWithMargin > 0 && <div><span className="text-zinc-500">Motor:</span> <span className="font-mono">${motorWithMargin.toFixed(2)}</span></div>}
                {accsWithMargin > 0 && <div><span className="text-zinc-500">Accs:</span> <span className="font-mono">${accsWithMargin.toFixed(2)}</span></div>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
