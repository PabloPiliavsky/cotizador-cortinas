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
        <TabsList className="bg-zinc-900 border border-zinc-800 p-1 mb-4 flex flex-wrap gap-1 w-full justify-start">
          <TabsTrigger value="lamas" className="text-zinc-200 data-[state=active]:bg-white data-[state=active]:text-zinc-950">Lamas</TabsTrigger>
          <TabsTrigger value="ejes" className="text-zinc-200 data-[state=active]:bg-white data-[state=active]:text-zinc-950">Ejes</TabsTrigger>
          <TabsTrigger value="guias" className="text-zinc-200 data-[state=active]:bg-white data-[state=active]:text-zinc-950">Guías</TabsTrigger>
          <TabsTrigger value="cajones" className="text-zinc-200 data-[state=active]:bg-white data-[state=active]:text-zinc-950">Cajones</TabsTrigger>
          <TabsTrigger value="motores" className="text-zinc-200 data-[state=active]:bg-white data-[state=active]:text-zinc-950">Motores</TabsTrigger>
          <TabsTrigger value="accesorios" className="text-zinc-200 data-[state=active]:bg-white data-[state=active]:text-zinc-950">Accesorios</TabsTrigger>
          <TabsTrigger value="margenes" className="text-zinc-200 data-[state=active]:bg-white data-[state=active]:text-zinc-950">Márgenes</TabsTrigger>
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

