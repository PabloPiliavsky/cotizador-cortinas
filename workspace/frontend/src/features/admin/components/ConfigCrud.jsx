import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LamaCrudTable from "./LamaCrudTable"
import EjeCrudTable from "./EjeCrudTable"
import GuiaCrudTable from "./GuiaCrudTable"
import CajonCrudTable from "./CajonCrudTable"
import MotorCrudTable from "./MotorCrudTable"
import AccesorioCrudTable from "./AccesorioCrudTable"
import MargenCrudTable from "./MargenCrudTable"

export default function ConfigCrud() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-zinc-100 mb-2">Panel Administrativo de Datos Maestros</h2>
      <Tabs defaultValue="lamas" className="w-full">
        <TabsList className="bg-zinc-900/80 border border-zinc-800 p-1 mb-4 flex flex-wrap gap-1.5 w-full justify-start rounded-lg">
          <TabsTrigger
            value="lamas"
            className="text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-md transition-all cursor-pointer data-[state=active]:bg-white data-[state=active]:text-zinc-950 data-[state=active]:font-semibold data-[state=active]:shadow-sm"
          >
            Lamas
          </TabsTrigger>
          <TabsTrigger
            value="ejes"
            className="text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-md transition-all cursor-pointer data-[state=active]:bg-white data-[state=active]:text-zinc-950 data-[state=active]:font-semibold data-[state=active]:shadow-sm"
          >
            Ejes
          </TabsTrigger>
          <TabsTrigger
            value="guias"
            className="text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-md transition-all cursor-pointer data-[state=active]:bg-white data-[state=active]:text-zinc-950 data-[state=active]:font-semibold data-[state=active]:shadow-sm"
          >
            Guías
          </TabsTrigger>
          <TabsTrigger
            value="cajones"
            className="text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-md transition-all cursor-pointer data-[state=active]:bg-white data-[state=active]:text-zinc-950 data-[state=active]:font-semibold data-[state=active]:shadow-sm"
          >
            Cajones
          </TabsTrigger>
          <TabsTrigger
            value="motores"
            className="text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-md transition-all cursor-pointer data-[state=active]:bg-white data-[state=active]:text-zinc-950 data-[state=active]:font-semibold data-[state=active]:shadow-sm"
          >
            Motores
          </TabsTrigger>
          <TabsTrigger
            value="accesorios"
            className="text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-md transition-all cursor-pointer data-[state=active]:bg-white data-[state=active]:text-zinc-950 data-[state=active]:font-semibold data-[state=active]:shadow-sm"
          >
            Accesorios
          </TabsTrigger>
          <TabsTrigger
            value="margenes"
            className="text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-md transition-all cursor-pointer data-[state=active]:bg-white data-[state=active]:text-zinc-950 data-[state=active]:font-semibold data-[state=active]:shadow-sm"
          >
            Márgenes
          </TabsTrigger>
        </TabsList>
        <TabsContent value="lamas"><LamaCrudTable /></TabsContent>
        <TabsContent value="ejes"><EjeCrudTable /></TabsContent>
        <TabsContent value="guias"><GuiaCrudTable /></TabsContent>
        <TabsContent value="cajones"><CajonCrudTable /></TabsContent>
        <TabsContent value="motores"><MotorCrudTable /></TabsContent>
        <TabsContent value="accesorios"><AccesorioCrudTable /></TabsContent>
        <TabsContent value="margenes"><MargenCrudTable /></TabsContent>
      </Tabs>
    </div>
  )
}
