import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function EditElementModal({ open, item, type, onClose, onSave, accesorios = [] }) {
  const [formData, setFormData] = useState({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (item) setFormData({ ...item })
  }, [item])

  if (!open || !item) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await onSave(item.code || item.id, formData)
      onClose()
    } finally { setSaving(false) }
  }

  const gaskets = accesorios.filter((a) => a.code?.startsWith("BUR") || a.name?.toLowerCase().includes("burlete"))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl p-6 flex flex-col gap-4 text-zinc-100">
        <div>
          <h3 className="text-lg font-bold text-white">Editar Elemento</h3>
          <p className="text-xs font-mono text-zinc-400">ID: {item.code || item.id}</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label htmlFor="edit-name" className="text-xs text-zinc-400 mb-1 block">Nombre / Descripción</label>
            <Input id="edit-name" value={formData.name || ""} onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))} className="bg-zinc-900 border-zinc-800 text-zinc-200" required />
          </div>

          {type === "lama" && (
            <div>
              <label htmlFor="edit-height" className="text-xs text-zinc-400 mb-1 block">Alto Útil (m)</label>
              <Input id="edit-height" type="number" step="0.001" value={formData.usefulHeight ?? 0} onChange={(e) => setFormData((p) => ({ ...p, usefulHeight: parseFloat(e.target.value) || 0 }))} className="bg-zinc-900 border-zinc-800 text-zinc-200" />
            </div>
          )}
          {type === "guia" && (
            <div>
              <label htmlFor="edit-width" className="text-xs text-zinc-400 mb-1 block">Ancho Guía (m)</label>
              <Input id="edit-width" type="number" step="0.001" value={formData.profileWidth ?? 0} onChange={(e) => setFormData((p) => ({ ...p, profileWidth: parseFloat(e.target.value) || 0 }))} className="bg-zinc-900 border-zinc-800 text-zinc-200" />
            </div>
          )}
          {type === "cajon" && (
            <div>
              <label htmlFor="edit-cajon-h" className="text-xs text-zinc-400 mb-1 block">Alto Cajón/Vuelo (m)</label>
              <Input id="edit-cajon-h" type="number" step="0.001" value={formData.heightAdjustment ?? 0} onChange={(e) => setFormData((p) => ({ ...p, heightAdjustment: parseFloat(e.target.value) || 0 }))} className="bg-zinc-900 border-zinc-800 text-zinc-200" />
            </div>
          )}

          {type !== "margen" ? (
            <div>
              <label htmlFor="edit-price" className="text-xs text-zinc-400 mb-1 block">Precio (USD)</label>
              <Input id="edit-price" type="number" step="0.01" value={formData.price ?? 0} onChange={(e) => setFormData((p) => ({ ...p, price: parseFloat(e.target.value) || 0 }))} className="bg-zinc-900 border-zinc-800 text-zinc-200" />
            </div>
          ) : (
            <div>
              <label htmlFor="edit-percentage" className="text-xs text-zinc-400 mb-1 block">Porcentaje de Recargo (%)</label>
              <Input id="edit-percentage" type="number" step="1" value={formData.percentage ?? 0} onChange={(e) => setFormData((p) => ({ ...p, percentage: parseFloat(e.target.value) || 0 }))} className="bg-zinc-900 border-zinc-800 text-zinc-200" />
            </div>
          )}

          {type === "lama" && (
            <div>
              <label htmlFor="edit-gasket" className="text-xs text-zinc-400 mb-1 block">Burlete Requerido</label>
              <select id="edit-gasket" value={formData.requiredGasketCode || ""} onChange={(e) => setFormData((p) => ({ ...p, requiredGasketCode: e.target.value }))} className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-2 text-zinc-200 text-sm">
                <option value="">Sin Burlete</option>
                {gaskets.map((g) => <option key={g.code} value={g.code}>{g.name}</option>)}
              </select>
            </div>
          )}

          <div className="flex justify-end gap-2 mt-2 pt-3 border-t border-zinc-800">
            <Button type="button" variant="outline" onClick={onClose} disabled={saving} className="border-zinc-800 bg-zinc-900 text-zinc-300">Cancelar</Button>
            <Button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-500 text-white font-semibold">{saving ? "Guardando..." : "Guardar Cambios"}</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
