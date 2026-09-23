import { useState } from "react"
import useCrud from "../hooks/useCrud"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function MargenCrudTable({ canEdit = true }) {
  const { items: margins, createItem, deleteItem } = useCrud("margins")
  const [newItem, setNewItem] = useState({ name: "", percentage: 0 })

  const handleAdd = async () => {
    if (!newItem.name) return
    const id = newItem.name.toLowerCase().replace(/\s+/g, "-")
    if (margins.some(m => m.id === id)) return
    await createItem({ ...newItem, id })
    setNewItem({ name: "", percentage: 0 })
  }

  const handleDelete = (id) => deleteItem(id)

  return (
    <div className="flex flex-col gap-4 border border-zinc-800 p-4 rounded-lg bg-zinc-950/60 backdrop-blur-md">
      <h3 className="text-lg font-semibold text-zinc-100">Configuración de Márgenes comerciales</h3>
      {canEdit && (
        <div className="grid grid-cols-3 gap-2">
          <Input placeholder="Nombre (ej: Gremio, Cliente)" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} className="bg-zinc-900 border-zinc-800 text-zinc-200" />
          <Input placeholder="Porcentaje (ej: 60 para +60%)" type="number" step="1" value={newItem.percentage} onChange={(e) => setNewItem({ ...newItem, percentage: parseFloat(e.target.value) || 0 })} className="bg-zinc-900 border-zinc-800 text-zinc-200" />
          <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-500 text-white">Agregar Margen</Button>
        </div>
      )}
      <div className="rounded-md border border-zinc-800 overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-900/50 border-zinc-800">
            <TableRow className="border-zinc-800 hover:bg-transparent">
              <TableHead className="text-zinc-400">Nombre</TableHead>
              <TableHead className="text-zinc-400">Porcentaje de Recargo</TableHead>
              {canEdit && <TableHead className="text-zinc-400 text-right">Acciones</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {margins?.map((item) => (
              <TableRow key={item.id} className="border-zinc-800 hover:bg-zinc-800/60 transition-colors duration-150">
                <TableCell className="text-zinc-200 font-semibold text-xs">{item.name}</TableCell>
                <TableCell className="text-zinc-200 font-mono text-xs">+{item.percentage}%</TableCell>
                {canEdit && (
                  <TableCell className="text-right">
                    {item.id !== "gremio" && item.id !== "cliente" ? (
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)} className="bg-red-950/30 border border-red-900/50 text-red-300 hover:bg-red-600 hover:text-white transition-colors">Eliminar</Button>
                    ) : (
                      <span className="text-xs text-zinc-500 italic">Por defecto</span>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
