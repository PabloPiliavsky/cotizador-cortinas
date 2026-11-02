import { useState } from "react"
import useCrud from "../hooks/useCrud"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import MotorCreateForm from "./MotorCreateForm"
import MotorCompatibilityModal from "./MotorCompatibilityModal"
import EditElementModal from "./EditElementModal"

export default function MotorCrudTable({ canEdit = true }) {
  const { items: motores, createItem, updateItem, deleteItem } = useCrud("motores")
  const { items: accesorios } = useCrud("accesorios")
  const [newItem, setNewItem] = useState({ code: "", name: "", price: 0, compatibleAcc: [] })
  const [modalState, setModalState] = useState({ isOpen: false, mode: "new", targetMotor: null })
  const [editTarget, setEditTarget] = useState(null)

  const handleOpenNewModal = () => setModalState({ isOpen: true, mode: "new", targetMotor: null })
  const handleOpenEditModal = (motor) => setModalState({ isOpen: true, mode: "edit", targetMotor: motor })
  const handleCloseModal = () => setModalState({ isOpen: false, mode: "new", targetMotor: null })

  const handleSaveModalCompatibilities = async (selectedCodes) => {
    if (modalState.mode === "new") {
      setNewItem((prev) => ({ ...prev, compatibleAcc: selectedCodes }))
    } else if (modalState.mode === "edit" && modalState.targetMotor) {
      await updateItem(modalState.targetMotor.code, { compatibleAcc: selectedCodes })
    }
  }

  const handleAdd = async () => {
    if (!newItem.code || !newItem.name) return
    await createItem(newItem)
    setNewItem({ code: "", name: "", price: 0, compatibleAcc: [] })
  }

  return (
    <div className="flex flex-col gap-4 border border-zinc-800 p-4 rounded-lg bg-zinc-950/60 backdrop-blur-md">
      <div>
        <h3 className="text-lg font-semibold text-zinc-100">Sistemas de Motorización</h3>
        <p className="text-xs text-zinc-400">Administra los modelos de motor y los accesorios autorizados para cada uno.</p>
      </div>

      {canEdit && (
        <MotorCreateForm newItem={newItem} onAdd={handleAdd} onOpenModal={handleOpenNewModal} setNewItem={setNewItem} />
      )}

      <div className="rounded-md border border-zinc-800 overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-900/50 border-zinc-800">
            <TableRow className="border-zinc-800 hover:bg-transparent">
              <TableHead className="text-zinc-400">Código</TableHead>
              <TableHead className="text-zinc-400">Descripción</TableHead>
              <TableHead className="text-zinc-400">Precio/UN</TableHead>
              <TableHead className="text-zinc-400">Accesorios Compatibles</TableHead>
              {canEdit && <TableHead className="text-zinc-400 text-right">Acciones</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {motores.length === 0 ? (
              <TableRow className="border-zinc-800">
                <TableCell colSpan={canEdit ? 5 : 4} className="text-center py-6 text-xs text-zinc-500 italic">No hay motores registrados.</TableCell>
              </TableRow>
            ) : (
              motores.map((item) => (
                <TableRow key={item.code} className="border-zinc-800 hover:bg-zinc-800/60 transition-colors duration-150">
                  <TableCell className="text-zinc-200 font-mono text-xs">{item.code}</TableCell>
                  <TableCell className="text-zinc-200 font-medium text-xs">{item.name}</TableCell>
                  <TableCell className="text-zinc-200 font-mono text-xs">${item.price?.toFixed(2)} USD</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 flex-wrap max-w-xs">
                      {item.compatibleAcc?.length ? (
                        item.compatibleAcc.map((c) => <span key={c} className="bg-zinc-900 border border-zinc-700/80 text-zinc-300 font-mono text-[10px] px-1.5 py-0.5 rounded">{c}</span>)
                      ) : <span className="text-zinc-500 italic text-xs">Ninguno</span>}
                    </div>
                  </TableCell>
                  {canEdit && (
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button size="sm" variant="outline" onClick={() => setEditTarget(item)} className="border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 hover:text-white text-xs">Editar</Button>
                        <Button size="sm" variant="outline" onClick={() => handleOpenEditModal(item)} className="border-zinc-700 bg-zinc-900 hover:bg-zinc-800 hover:text-white hover:border-blue-400 text-xs">⚙️ Accs</Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteItem(item.code)} className="bg-red-950/30 border border-red-900/50 text-red-300 hover:bg-red-600 hover:text-white transition-colors">Eliminar</Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {canEdit && (
        <>
          <MotorCompatibilityModal
            accesorios={accesorios}
            motorName={modalState.mode === "edit" ? modalState.targetMotor?.name : newItem.name || "Nuevo Motor"}
            onClose={handleCloseModal}
            onSave={handleSaveModalCompatibilities}
            open={modalState.isOpen}
            selectedCodes={modalState.mode === "edit" ? modalState.targetMotor?.compatibleAcc || [] : newItem.compatibleAcc || []}
          />
          <EditElementModal item={editTarget} onClose={() => setEditTarget(null)} onSave={updateItem} open={Boolean(editTarget)} type="motor" />
        </>
      )}
    </div>
  )
}
