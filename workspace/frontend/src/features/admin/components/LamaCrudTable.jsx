import { useState } from "react"
import { useBudget } from "../../../shared/providers/BudgetContext"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LamaCrudTable() {
  const { lamas, setLamas, accesorios } = useBudget()
  const [newItem, setNewItem] = useState({ code: "", name: "", unit: "MTS", usefulHeight: 0.05, price: 0, requiredGasketCode: "" })

  const handleAdd = () => {
    if (!newItem.code || !newItem.name) return
    setLamas((prev) => [...prev, newItem])
    setNewItem({ code: "", name: "", unit: "MTS", usefulHeight: 0.05, price: 0, requiredGasketCode: "" })
  }

  const handleDelete = (code) => {
    setLamas((prev) => prev.filter((item) => item.code !== code))
  }

  const gaskets = accesorios.filter(a => a.code.startsWith("BUR") || a.name.toLowerCase().includes("burlete"))

  return (
    <div className="flex flex-col gap-4 border border-zinc-800 p-4 rounded-lg bg-zinc-950/60 backdrop-blur-md">
      <h3 className="text-lg font-semibold text-zinc-100">Tablillas / Lamas</h3>
      <div className="grid grid-cols-5 gap-2">
        <Input placeholder="Código" value={newItem.code} onChange={(e) => setNewItem({ ...newItem, code: e.target.value })} className="bg-zinc-900 border-zinc-800 text-zinc-200" />
        <Input placeholder="Nombre" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} className="bg-zinc-900 border-zinc-800 text-zinc-200" />
        <Input placeholder="Alto Útil (m)" type="number" step="0.001" value={newItem.usefulHeight} onChange={(e) => setNewItem({ ...newItem, usefulHeight: parseFloat(e.target.value) || 0 })} className="bg-zinc-900 border-zinc-800 text-zinc-200" />
        <Input placeholder="Precio/m" type="number" step="0.01" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) || 0 })} className="bg-zinc-900 border-zinc-800 text-zinc-200" />
        <select value={newItem.requiredGasketCode} onChange={(e) => setNewItem({ ...newItem, requiredGasketCode: e.target.value })} className="bg-zinc-900 border border-zinc-800 rounded-md p-2 text-zinc-200 text-sm">
          <option value="">Sin Burlete</option>
          {gaskets.map(g => <option key={g.code} value={g.code}>{g.name}</option>)}
        </select>
      </div>
      <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-500 text-white w-fit self-end">Agregar Lama</Button>

      <Table>
        <TableHeader className="border-zinc-800">
          <TableRow className="border-zinc-800 hover:bg-transparent">
            <TableHead className="text-zinc-400">Código</TableHead>
            <TableHead className="text-zinc-400">Descripción</TableHead>
            <TableHead className="text-zinc-400">Alto Útil</TableHead>
            <TableHead className="text-zinc-400">Precio/m</TableHead>
            <TableHead className="text-zinc-400 text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lamas.map((item) => (
            <TableRow key={item.code} className="border-zinc-800 hover:bg-zinc-900/40">
              <TableCell className="text-zinc-200 font-mono">{item.code}</TableCell>
              <TableCell className="text-zinc-200">{item.name}</TableCell>
              <TableCell className="text-zinc-200 font-mono">{item.usefulHeight} m</TableCell>
              <TableCell className="text-zinc-200 font-mono">${item.price.toFixed(2)} USD</TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="destructive" onClick={() => handleDelete(item.code)}>Eliminar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
