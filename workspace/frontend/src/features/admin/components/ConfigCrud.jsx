import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/shared/providers/AuthContext"
import LamaCrudTable from "./LamaCrudTable"
import EjeCrudTable from "./EjeCrudTable"
import GuiaCrudTable from "./GuiaCrudTable"
import CajonCrudTable from "./CajonCrudTable"
import MotorCrudTable from "./MotorCrudTable"
import AccesorioCrudTable from "./AccesorioCrudTable"
import MargenCrudTable from "./MargenCrudTable"
import UserRoleTable from "./UserRoleTable"

export default function ConfigCrud() {
  const { isMaster } = useAuth()
  const canEdit = isMaster ?? false

  const triggerClass = "text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-md transition-all cursor-pointer data-[state=active]:bg-white data-[state=active]:text-zinc-950 data-[state=active]:font-semibold data-[state=active]:shadow-sm"

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto p-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-zinc-100">Panel Administrativo de Datos Maestros</h2>
        {!canEdit && (
          <div className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs px-4 py-2.5 rounded-lg flex items-center gap-2 mt-1">
            <span>🔒</span>
            <span>Modo consulta: Tu usuario opera con permisos de <strong>Empleado</strong>. La edición de elementos está reservada a usuarios Master.</span>
          </div>
        )}
      </div>

      <Tabs className="w-full" defaultValue="lamas">
        <TabsList className="bg-zinc-900/80 border border-zinc-800 p-1 mb-4 flex flex-wrap gap-1.5 w-full justify-start rounded-lg">
          <TabsTrigger className={triggerClass} value="lamas">Lamas</TabsTrigger>
          <TabsTrigger className={triggerClass} value="ejes">Ejes</TabsTrigger>
          <TabsTrigger className={triggerClass} value="guias">Guías</TabsTrigger>
          <TabsTrigger className={triggerClass} value="cajones">Cajones</TabsTrigger>
          <TabsTrigger className={triggerClass} value="motores">Motores</TabsTrigger>
          <TabsTrigger className={triggerClass} value="accesorios">Accesorios</TabsTrigger>
          <TabsTrigger className={triggerClass} value="margenes">Márgenes</TabsTrigger>
          {canEdit && (
            <TabsTrigger className={`${triggerClass} data-[state=active]:!bg-amber-500 data-[state=active]:!text-zinc-950`} value="usuarios">
              Usuarios DB
            </TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="lamas"><LamaCrudTable canEdit={canEdit} /></TabsContent>
        <TabsContent value="ejes"><EjeCrudTable canEdit={canEdit} /></TabsContent>
        <TabsContent value="guias"><GuiaCrudTable canEdit={canEdit} /></TabsContent>
        <TabsContent value="cajones"><CajonCrudTable canEdit={canEdit} /></TabsContent>
        <TabsContent value="motores"><MotorCrudTable canEdit={canEdit} /></TabsContent>
        <TabsContent value="accesorios"><AccesorioCrudTable canEdit={canEdit} /></TabsContent>
        <TabsContent value="margenes"><MargenCrudTable canEdit={canEdit} /></TabsContent>
        {canEdit && (
          <TabsContent value="usuarios"><UserRoleTable /></TabsContent>
        )}
      </Tabs>
    </div>
  )
}
