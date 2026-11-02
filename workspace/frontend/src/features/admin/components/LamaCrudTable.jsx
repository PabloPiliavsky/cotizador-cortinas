import { useState } from "react"
import useCrud from "../hooks/useCrud"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import EditElementModal from "./EditElementModal"

export default function LamaCrudTable({ canEdit = true }) {
  const { items: lamas, createItem, updateItem, deleteItem } = useCrud("lamas")
  const { items: accesorios } = useCrud("accesorios")
  const [newItem, setNewItem] = useState({ code: "", name: "", unit: "MTS", usefulHeight: 0.05, price: 0, requiredGasketCode: "" })
  const [editTarget, setEditTarget] = useState(null)

  const handleAdd = async () => {
    if (!newItem.code || !newItem.name) return
    await createItem(newItem)
    setNewItem({ code: "", name: "", unit: "MTS", usefulHeight: 0.05, price: 0, requiredGasketCode: "" })
  }

  const handleDelete = (code) => deleteItem(code)
  const gaskets = accesorios.filter(a => a.code.startsWith("BUR") || a.name.toLowerCase().includes("burlete"))

  return (
    <div className="flex flex-col gap-4 border border-zinc-800 p-4 rounded-lg bg-zinc-950/60 backdrop-blur-md">
      <h3 className="text-lg font-semibold text-zinc-100">Tablillas / Lamas</h3>
      {canEdit && (
        <>
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
          <Button onClick={handleAdd} disabled={!newItem.code || !newItem.name} className="bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-md shadow-blue-600/20 active:scale-[0.98] transition-all disabled:opacity-50 w-fit self-end">Agregar Lama</Button>
        </>
      )}

      <div className="rounded-md border border-zinc-800 overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-900/50 border-zinc-800">
            <TableRow className="border-zinc-800 hover:bg-transparent">
              <TableHead className="text-zinc-400">Código</TableHead>
              <TableHead className="text-zinc-400">Descripción</TableHead>
              <TableHead className="text-zinc-400">Alto Útil</TableHead>
              <TableHead className="text-zinc-400">Precio/m</TableHead>
              {canEdit && <TableHead className="text-zinc-400 text-right">Acciones</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {lamas.map((item) => (
              <TableRow key={item.code} className="border-zinc-800 hover:bg-zinc-800/60 transition-colors duration-150">
                <TableCell className="text-zinc-200 font-mono text-xs">{item.code}</TableCell>
                <TableCell className="text-zinc-200 font-medium text-xs">{item.name}</TableCell>
                <TableCell className="text-zinc-200 font-mono text-xs">{item.usefulHeight} m</TableCell>
                <TableCell className="text-zinc-200 font-mono text-xs">${item.price.toFixed(2)} USD</TableCell>
                {canEdit && (
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button size="sm" variant="outline" onClick={() => setEditTarget(item)} className="border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 hover:text-white text-xs">Editar</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(item.code)} className="bg-red-950/30 border border-red-900/50 text-red-300 hover:bg-red-600 hover:text-white transition-colors">Eliminar</Button>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <EditElementModal accesorios={accesorios} item={editTarget} onClose={() => setEditTarget(null)} onSave={updateItem} open={Boolean(editTarget)} type="lama" />
    </div>
  )
}
