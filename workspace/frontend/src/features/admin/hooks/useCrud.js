import { useCallback } from "react"
import { useBudget } from "@/shared/providers/BudgetContext"
import { MASTER_COLLECTION_NAMES } from "./useMasterData"

export default function useCrud(collectionName) {
  if (!MASTER_COLLECTION_NAMES.includes(collectionName)) {
    throw new Error(`Colección CRUD desconocida: ${collectionName}`)
  }

  const context = useBudget()
  const {
    createItem: createMasterItem,
    updateItem: updateMasterItem,
    deleteItem: deleteMasterItem,
    loading,
    databaseError,
  } = context

  const createItem = useCallback(
    (item) => createMasterItem(collectionName, item),
    [collectionName, createMasterItem],
  )

  const updateItem = useCallback(
    (id, changes) => updateMasterItem(collectionName, id, changes),
    [collectionName, updateMasterItem],
  )

  const deleteItem = useCallback(
    (id) => deleteMasterItem(collectionName, id),
    [collectionName, deleteMasterItem],
  )

  return {
    items: context[collectionName] ?? [],
    loading,
    error: databaseError,
    createItem,
    updateItem,
    deleteItem,
  }
}
