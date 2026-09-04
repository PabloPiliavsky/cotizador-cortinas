import { useCallback, useEffect, useState } from "react"
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import {
  initialAccesorios,
  initialCajones,
  initialEjes,
  initialGuias,
  initialLamas,
  initialMargins,
  initialMotores,
} from "@/shared/utils/seedData"

const MASTER_DATA = {
  lamas: initialLamas,
  ejes: initialEjes,
  guias: initialGuias,
  cajones: initialCajones,
  motores: initialMotores,
  accesorios: initialAccesorios,
  margins: initialMargins,
}

export const MASTER_COLLECTION_NAMES = Object.freeze(Object.keys(MASTER_DATA))

const EMPTY_MASTER_DATA = Object.fromEntries(
  MASTER_COLLECTION_NAMES.map((collectionName) => [collectionName, []]),
)

function assertCollection(collectionName) {
  if (!Object.hasOwn(MASTER_DATA, collectionName)) {
    throw new Error(`Colección maestra desconocida: ${collectionName}`)
  }
}

function getItemId(collectionName, item) {
  return collectionName === "margins" ? item.id : item.code
}

async function seedFirestore() {
  const seedRef = doc(db, "app_config", "initial_data")
  if ((await getDoc(seedRef)).exists()) return

  const batch = writeBatch(db)
  Object.entries(MASTER_DATA).forEach(([collectionName, items]) => {
    items.forEach((item) => {
      batch.set(doc(db, collectionName, getItemId(collectionName, item)), item)
    })
  })
  batch.set(seedRef, { seeded: true, seededAt: new Date().toISOString() })
  await batch.commit()
}

export default function useMasterData() {
  const [data, setData] = useState(() => ({ ...EMPTY_MASTER_DATA }))
  const [loading, setLoading] = useState(true)
  const [databaseError, setDatabaseError] = useState(null)

  useEffect(() => {
    let active = true
    const unsubscribers = []
    const pendingCollections = new Set(MASTER_COLLECTION_NAMES)

    const markCollectionReady = (collectionName) => {
      pendingCollections.delete(collectionName)
      if (active && pendingCollections.size === 0) setLoading(false)
    }

    async function connect() {
      try {
        await seedFirestore()
        if (!active) return

        MASTER_COLLECTION_NAMES.forEach((collectionName) => {
          unsubscribers.push(
            onSnapshot(
              collection(db, collectionName),
              (snapshot) => {
                const items = snapshot.docs.map((item) => item.data())
                setData((current) => ({ ...current, [collectionName]: items }))
                markCollectionReady(collectionName)
              },
              (error) => {
                setDatabaseError(error.message)
                markCollectionReady(collectionName)
              },
            ),
          )
        })
      } catch (error) {
        if (active) {
          setDatabaseError(error.message)
          setLoading(false)
        }
      }
    }

    connect()
    return () => {
      active = false
      unsubscribers.forEach((unsubscribe) => unsubscribe())
    }
  }, [])

  const runMutation = useCallback(async (operation) => {
    setDatabaseError(null)
    try {
      return await operation()
    } catch (error) {
      setDatabaseError(error.message)
      throw error
    }
  }, [])

  const createItem = useCallback(
    async (collectionName, item) => {
      assertCollection(collectionName)
      const id = getItemId(collectionName, item)
      if (!id) throw new Error("El registro necesita un identificador")
      return runMutation(() => setDoc(doc(db, collectionName, id), item))
    },
    [runMutation],
  )

  const updateItem = useCallback(
    async (collectionName, id, changes) => {
      assertCollection(collectionName)
      if (!id) throw new Error("El registro necesita un identificador")
      return runMutation(() => updateDoc(doc(db, collectionName, id), changes))
    },
    [runMutation],
  )

  const deleteItem = useCallback(
    async (collectionName, id) => {
      assertCollection(collectionName)
      if (!id) throw new Error("El registro necesita un identificador")
      return runMutation(() => deleteDoc(doc(db, collectionName, id)))
    },
    [runMutation],
  )

  return {
    ...data,
    loading,
    databaseError,
    createItem,
    updateItem,
    deleteItem,
  }
}
