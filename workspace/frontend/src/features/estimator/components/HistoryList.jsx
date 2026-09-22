import { useBudget } from "@/shared/providers/BudgetContext"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { generatePDF } from "@/shared/utils/pdfGenerator"

export default function HistoryList() {
  const { history, deleteBudget } = useBudget()

  if (history.length === 0) {
    return (
      <div className="bg-zinc-950/40 p-6 border border-zinc-800 rounded-lg text-center text-zinc-400">
        No hay presupuestos guardados en el historial.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 bg-zinc-950/40 p-4 border border-zinc-800 rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <h3 className="text-md font-semibold text-zinc-200">Historial de Presupuestos</h3>
        <span className="text-xs text-zinc-400 font-mono">
          {history.length} {history.length === 1 ? "guardado" : "guardados"}
        </span>
      </div>
      <div className="rounded-md border border-zinc-800 overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-900/50 border-zinc-800">
            <TableRow className="border-zinc-800 hover:bg-transparent">
              <TableHead className="text-zinc-400">Fecha</TableHead>
              <TableHead className="text-zinc-400">Cliente</TableHead>
              <TableHead className="text-zinc-400">Tarifa</TableHead>
              <TableHead className="text-zinc-400">Cortinas</TableHead>
              <TableHead className="text-zinc-400">Total</TableHead>
              <TableHead className="text-zinc-400 text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((b) => {
              const totalItems = b.items?.reduce((sum, item) => sum + item.qty, 0) || 0
              return (
                <TableRow key={b.id} className="border-zinc-800 hover:bg-zinc-800/60 transition-colors duration-150">
                  <TableCell className="text-zinc-400 text-xs font-mono">{b.date}</TableCell>
                  <TableCell className="text-zinc-100 font-semibold text-xs">{b.client}</TableCell>
                  <TableCell className="text-zinc-300 text-xs font-medium">{b.marginName || "Base"}</TableCell>
                  <TableCell className="text-zinc-300 text-xs font-mono">{totalItems} un</TableCell>
                  <TableCell className="text-blue-400 font-bold font-mono text-sm">${b.grandTotal?.toFixed(2)} USD</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        size="sm"
                        onClick={() => generatePDF(b)}
                        className="border border-zinc-700/80 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 hover:border-blue-400 hover:text-white transition-colors"
                      >
                        📄 PDF
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteBudget(b.id)}
                        className="bg-red-950/30 border border-red-900/50 text-red-300 hover:bg-red-600 hover:text-white transition-colors"
                      >
                        Eliminar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
