import { useBudget } from "../../../shared/providers/BudgetContext"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { generatePDF } from "../../../shared/utils/pdfGenerator"

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
    <div className="flex flex-col gap-4 bg-zinc-950/40 p-4 border border-zinc-800 rounded-lg">
      <h3 className="text-md font-semibold text-zinc-200">Historial de Presupuestos</h3>
      <Table>
        <TableHeader className="border-zinc-800">
          <TableRow className="border-zinc-800 hover:bg-transparent">
            <TableHead className="text-zinc-400">Fecha</TableHead>
            <TableHead className="text-zinc-400">Cliente</TableHead>
            <TableHead className="text-zinc-400">Dimensiones</TableHead>
            <TableHead className="text-zinc-400">Total</TableHead>
            <TableHead className="text-zinc-400 text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map((b) => (
            <TableRow key={b.id} className="border-zinc-800 hover:bg-zinc-900/40">
              <TableCell className="text-zinc-300 text-xs">{b.date}</TableCell>
              <TableCell className="text-zinc-200 font-semibold">{b.client}</TableCell>
              <TableCell className="text-zinc-300 text-xs font-mono">{b.calcs.wFinal.toFixed(2)}m x {b.calcs.hFinal.toFixed(2)}m</TableCell>
              <TableCell className="text-blue-400 font-bold font-mono">${b.calcs.total.toFixed(2)} USD</TableCell>
              <TableCell className="text-right flex gap-2 justify-end">
                <Button size="sm" onClick={() => generatePDF(b)} className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200">PDF</Button>
                <Button size="sm" variant="destructive" onClick={() => deleteBudget(b.id)}>Eliminar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
