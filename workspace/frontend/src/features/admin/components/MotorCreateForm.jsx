import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function MotorCreateForm({
  newItem,
  setNewItem,
  onOpenModal,
  onAdd,
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 bg-zinc-900/30 p-3 rounded-lg border border-zinc-800/80">
        <Input
          placeholder="Código (ej: MOT001)"
          value={newItem.code}
          onChange={(e) => setNewItem({ ...newItem, code: e.target.value })}
          className="bg-zinc-900 border-zinc-800 text-zinc-200 hover:border-zinc-700 focus:border-blue-500 transition-colors"
        />
        <Input
          placeholder="Nombre del Motor"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="bg-zinc-900 border-zinc-800 text-zinc-200 hover:border-zinc-700 focus:border-blue-500 transition-colors"
        />
        <Input
          placeholder="Precio/UN (USD)"
          type="number"
          step="0.01"
          value={newItem.price || ""}
          onChange={(e) =>
            setNewItem({ ...newItem, price: parseFloat(e.target.value) || 0 })
          }
          className="bg-zinc-900 border-zinc-800 text-zinc-200 hover:border-zinc-700 focus:border-blue-500 transition-colors"
        />
        <Button
          type="button"
          variant="outline"
          onClick={onOpenModal}
          className="border-zinc-700 bg-zinc-900/80 text-zinc-200 hover:bg-zinc-800 hover:border-blue-500 hover:text-white transition-all text-xs"
        >
          ⚙️ Accesorios ({newItem.compatibleAcc?.length || 0} selec.)
        </Button>
      </div>

      <Button
        onClick={onAdd}
        disabled={!newItem.code || !newItem.name}
        className="bg-blue-600 hover:bg-blue-500 text-white w-fit self-end font-semibold shadow-md shadow-blue-600/20 transition-all active:scale-[0.98] disabled:opacity-50"
      >
        Agregar Motor
      </Button>
    </div>
  )
}
