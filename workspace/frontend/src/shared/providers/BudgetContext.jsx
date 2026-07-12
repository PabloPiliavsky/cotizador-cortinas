import { createContext, useContext, useEffect, useState } from "react"
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  writeBatch,
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import {
  initialLamas,
  initialEjes,
  initialGuias,
  initialCajones,
  initialMotores,
  initialAccesorios,
  initialMargins,
} from "../utils/seedData"

const BudgetContext = createContext(null)

const MASTER_DATA = {
  lamas: initialLamas,
  ejes: initialEjes,
  guias: initialGuias,
  cajones: initialCajones,
  motores: initialMotores,
  accesorios: initialAccesorios,
  margins: initialMargins,
}

const getItemId = (collectionName, item) =>
  collectionName === "margins" ? item.id : item.code

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

export function BudgetProvider({ children }) {
  const [data, setData] = useState(() =>
    Object.fromEntries(Object.keys(MASTER_DATA).map((key) => [key, []])),
  )
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [databaseError, setDatabaseError] = useState(null)

  useEffect(() => {
    let active = true
    const unsubscribers = []

    async function connect() {
      try {
        await seedFirestore()
        if (!active) return

        Object.keys(MASTER_DATA).forEach((collectionName) => {
          unsubscribers.push(
            onSnapshot(
              collection(db, collectionName),
              (snapshot) => {
                const items = snapshot.docs.map((item) => item.data())
                setData((current) => ({ ...current, [collectionName]: items }))
                setLoading(false)
              },
              (error) => setDatabaseError(error.message),
            ),
          )
        })

        unsubscribers.push(
          onSnapshot(
            collection(db, "budget_history"),
            (snapshot) => {
              const budgets = snapshot.docs
                .map((item) => ({ id: item.id, ...item.data() }))
                .sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""))
              setHistory(budgets)
            },
            (error) => setDatabaseError(error.message),
          ),
        )
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

  const saveItem = async (collectionName, item) => {
    const id = getItemId(collectionName, item)
    if (!id) throw new Error("El registro necesita un identificador")
    await setDoc(doc(db, collectionName, id), item)
  }

  const deleteItem = async (collectionName, id) => {
    await deleteDoc(doc(db, collectionName, id))
  }

  const saveBudget = async (budget) => {
    const id = crypto.randomUUID()
    const createdAt = new Date().toISOString()
    await setDoc(doc(db, "budget_history", id), {
      ...budget,
      date: new Date().toLocaleDateString(),
      createdAt,
    })
  }

  const deleteBudget = async (id) => {
    await deleteDoc(doc(db, "budget_history", id))
  }

  return (
    <BudgetContext.Provider
      value={{
        ...data,
        history,
        loading,
        databaseError,
        saveItem,
        deleteItem,
        saveBudget,
        deleteBudget,
      }}
    >
      {children}
    </BudgetContext.Provider>
  )
}

export function useBudget() {
  const context = useContext(BudgetContext)
  if (!context) throw new Error("useBudget debe usarse dentro de BudgetProvider")
  return context
}
