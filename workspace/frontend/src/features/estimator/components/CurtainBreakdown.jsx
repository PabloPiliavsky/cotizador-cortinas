export default function CurtainBreakdown({
  budgetItems,
  activeItemId,
  setActiveItemId,
  marginFactor,
}) {
  return (
    <div className="bg-zinc-950/40 p-4 border border-zinc-800 rounded-lg flex flex-col gap-3 shadow-sm">
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
              className={`flex flex-col p-4 border rounded-xl gap-3 cursor-pointer transition-all duration-150 ${
                activeItemId === item.id 
                  ? "border-blue-500 bg-blue-950/20 shadow-md shadow-blue-500/10" 
                  : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/80 hover:shadow-xs"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="text-zinc-100 font-bold text-sm flex items-center gap-2">
                    {item.name} ({item.qty} un)
                    {activeItemId === item.id && (
                      <span className="text-[10px] font-mono bg-blue-600/30 border border-blue-500/40 text-blue-300 px-1.5 py-0.2 rounded">
                        Activa
                      </span>
                    )}
                  </span>
                  <span className="text-zinc-400 text-xs mt-0.5 font-mono">
                    Medidas: {item.width}m x {item.height}m (Final: {item.calcs.wFinal.toFixed(2)}m x {item.calcs.hFinal.toFixed(2)}m)
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-zinc-400 text-xs">Unitario: ${totalItemUnit.toFixed(2)}</span>
                  <span className="font-mono text-blue-400 font-bold text-sm">Subtotal: ${(totalItemUnit * item.qty).toFixed(2)} USD</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 bg-zinc-950/40 p-2.5 rounded-lg border border-zinc-800/60 text-xs text-zinc-300">
                <div><span className="text-zinc-500">Lamas:</span> <span className="font-mono font-medium">${slatsWithMargin.toFixed(2)}</span></div>
                {guidesWithMargin > 0 && <div><span className="text-zinc-500">Guías:</span> <span className="font-mono font-medium">${guidesWithMargin.toFixed(2)}</span></div>}
                {cajonWithMargin > 0 && <div><span className="text-zinc-500">Cajón:</span> <span className="font-mono font-medium">${cajonWithMargin.toFixed(2)}</span></div>}
                {ejeWithMargin > 0 && <div><span className="text-zinc-500">Eje:</span> <span className="font-mono font-medium">${ejeWithMargin.toFixed(2)}</span></div>}
                {motorWithMargin > 0 && <div><span className="text-zinc-500">Motor:</span> <span className="font-mono font-medium">${motorWithMargin.toFixed(2)}</span></div>}
                {accsWithMargin > 0 && <div><span className="text-zinc-500">Accs:</span> <span className="font-mono font-medium">${accsWithMargin.toFixed(2)}</span></div>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
