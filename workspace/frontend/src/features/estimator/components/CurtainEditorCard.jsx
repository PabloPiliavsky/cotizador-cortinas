import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import EstimatorInputs from "./EstimatorInputs"
import EstimatorOptions from "./EstimatorOptions"

export default function CurtainEditorCard({
  activeItem,
  updateActiveItem,
  handleLamaChange,
  lamas,
  guias,
  cajones,
  ejes,
  motores,
  accesorios,
}) {
  return (
    <div className="bg-zinc-950/40 p-4 border border-zinc-800 rounded-lg flex flex-col gap-4">
      <h3 className="text-md font-semibold text-zinc-200">
        Configuración de {activeItem.name}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-zinc-400 text-xs">Identificador / Referencia Cortina</Label>
          <Input
            value={activeItem.name}
            onChange={(e) => updateActiveItem("name", e.target.value)}
            className="bg-zinc-900 border-zinc-800 text-zinc-200 mt-1 hover:border-zinc-700 focus:border-blue-500 transition-colors"
          />
        </div>
        <div>
          <Label className="text-zinc-400 text-xs">Cantidad</Label>
          <Input
            type="number"
            min="1"
            value={activeItem.qty}
            onChange={(e) => updateActiveItem("qty", parseInt(e.target.value) || 1)}
            className="bg-zinc-900 border-zinc-800 text-zinc-200 mt-1 hover:border-zinc-700 focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EstimatorInputs
          width={activeItem.width}
          setWidth={(w) => updateActiveItem("width", w)}
          height={activeItem.height}
          setHeight={(h) => updateActiveItem("height", h)}
          lamas={lamas}
          selectedLama={activeItem.selectedLama}
          setSelectedLama={handleLamaChange}
          hasGuides={activeItem.hasGuides}
          setHasGuides={(g) => updateActiveItem("hasGuides", g)}
          guias={guias}
          selectedGuide={activeItem.selectedGuide}
          setSelectedGuide={(g) => updateActiveItem("selectedGuide", g)}
        />
        <EstimatorOptions
          hasVuelo={activeItem.hasVuelo}
          setHasVuelo={(v) => updateActiveItem("hasVuelo", v)}
          addVueloMeasure={activeItem.addVueloMeasure}
          setAddVueloMeasure={(v) => updateActiveItem("addVueloMeasure", v)}
          cajones={cajones}
          selectedCajon={activeItem.selectedCajon}
          setSelectedCajon={(c) => updateActiveItem("selectedCajon", c)}
          ejes={ejes}
          selectedEje={activeItem.selectedEje}
          setSelectedEje={(x) => updateActiveItem("selectedEje", x)}
          motores={motores}
          selectedMotor={activeItem.selectedMotor}
          setSelectedMotor={(m) => updateActiveItem("selectedMotor", m)}
          accesorios={accesorios}
          selectedAccs={activeItem.selectedAccs || []}
          setSelectedAccs={(accs) =>
            updateActiveItem(
              "selectedAccs",
              typeof accs === "function" ? accs(activeItem.selectedAccs || []) : accs
            )
          }
          selectedLama={activeItem.selectedLama}
        />
      </div>
    </div>
  )
}
