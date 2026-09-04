import { useState } from "react"
import useCrud from "../hooks/useCrud"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function AccesorioCrudTable() {
  const { items: accesorios, createItem, deleteItem } = useCrud("accesorios")
  const [newItem, setNewItem] = useState({ code: "", name: "", price: 0 })

  const handleAdd = async () => {
    if (!newItem.code || !newItem.name) return
    await createItem(newItem)
    setNewItem({ code: "", name: "", price: 0 })
  }

  const handleDelete = (code) => deleteItem(code)

  return (
    <div className="flex flex-col gap-4 border border-zinc-800 p-4 rounded-lg bg-zinc-950/60 backdrop-blur-md">
      <h3 className="text-lg font-semibold text-zinc-100">Accesorios y Componentes</h3>
      <div className="grid grid-cols-4 gap-2">
        <Input placeholder="Código" value={newItem.code} onChange={(e) => setNewItem({ ...newItem, code: e.target.value })} className="bg-zinc-900 border-zinc-800 text-zinc-200" />
        <Input placeholder="Nombre" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} className="bg-zinc-900 border-zinc-800 text-zinc-200" />
        <Input placeholder="Precio Unitario" type="number" step="0.01" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) || 0 })} className="bg-zinc-900 border-zinc-800 text-zinc-200" />
        <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-500 text-white">Agregar</Button>
      </div>
      <Table>
        <TableHeader className="border-zinc-800">
          <TableRow className="border-zinc-800 hover:bg-transparent">
            <TableHead className="text-zinc-400">Código</TableHead>
            <TableHead className="text-zinc-400">Descripción</TableHead>
            <TableHead className="text-zinc-400">Precio/UN</TableHead>
            <TableHead className="text-zinc-400 text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accesorios.map((item) => (
            <TableRow key={item.code} className="border-zinc-800 hover:bg-zinc-900/40">
              <TableCell className="text-zinc-200 font-mono">{item.code}</TableCell>
              <TableCell className="text-zinc-200">{item.name}</TableCell>
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
