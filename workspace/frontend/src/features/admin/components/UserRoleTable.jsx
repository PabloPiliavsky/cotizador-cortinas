import { useEffect, useState } from "react"
import { useAuth } from "@/shared/providers/AuthContext"
import { ROLES, subscribeToAllUsers, updateUserRole } from "@/features/auth/services/userService"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export default function UserRoleTable() {
  const { user: currentUser } = useAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [updatingUid, setUpdatingUid] = useState(null)

  useEffect(() => {
    const unsubscribe = subscribeToAllUsers((fetchedUsers) => {
      setUsers(fetchedUsers)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  async function handleToggleRole(targetUser) {
    const nextRole = targetUser.role === ROLES.MASTER ? ROLES.EMPLEADO : ROLES.MASTER
    setUpdatingUid(targetUser.uid)
    try {
      await updateUserRole(targetUser.uid, nextRole)
    } finally {
      setUpdatingUid(null)
    }
  }

  return (
    <div className="flex flex-col gap-4 border border-zinc-800 p-4 rounded-lg bg-zinc-950/60 backdrop-blur-md">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-zinc-100">Gestión de Usuarios y Roles en Base de Datos</h3>
          <p className="text-xs text-zinc-400">Administra los permisos de acceso. Los usuarios Master pueden modificar elementos; los Empleados operan en modo consulta.</p>
        </div>
        <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1 rounded border border-zinc-800">
          Total: {users.length} usuarios
        </span>
      </div>

      <div className="rounded-md border border-zinc-800 overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-900/50 border-zinc-800">
            <TableRow className="border-zinc-800 hover:bg-transparent">
              <TableHead className="text-zinc-400">Usuario / Correo</TableHead>
              <TableHead className="text-zinc-400">Nombre</TableHead>
              <TableHead className="text-zinc-400">Rol Actual</TableHead>
              <TableHead className="text-zinc-400 text-right">Acción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-zinc-500 py-6">Cargando usuarios de la base de datos...</TableCell>
              </TableRow>
            )}
            {!loading && users.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-zinc-500 py-6">No hay usuarios registrados aún.</TableCell>
              </TableRow>
            )}
            {users.map((item) => {
              const isItemMaster = item.role === ROLES.MASTER
              const isSelf = item.uid === currentUser?.uid

              return (
                <TableRow key={item.uid} className="border-zinc-800 hover:bg-zinc-800/60 transition-colors">
                  <TableCell className="text-zinc-200 font-medium text-xs">
                    {item.email}
                    {isSelf && <span className="ml-2 text-[10px] text-blue-400 font-mono">(Tú)</span>}
                  </TableCell>
                  <TableCell className="text-zinc-300 text-xs">{item.displayName || "—"}</TableCell>
                  <TableCell>
                    <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-full font-bold border ${
                      isItemMaster ? "bg-amber-500/10 text-amber-400 border-amber-500/30" : "bg-zinc-800 text-zinc-400 border-zinc-700"
                    }`}>
                      {isItemMaster ? "Master" : "Empleado"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={updatingUid === item.uid || (isSelf && isItemMaster)}
                      onClick={() => handleToggleRole(item)}
                      className="border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 hover:text-white text-xs h-7"
                    >
                      {isItemMaster ? "Cambiar a Empleado" : "Asignar Master"}
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
