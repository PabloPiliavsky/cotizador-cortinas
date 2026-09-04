import { useCallback, useEffect, useState } from "react"
import { collection, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

export default function useBudgetHistory() {
  const [history, setHistory] = useState([])
  const [historyLoading, setHistoryLoading] = useState(true)
  const [historyError, setHistoryError] = useState(null)

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "budget_history"),
      (snapshot) => {
        const budgets = snapshot.docs
          .map((item) => ({ id: item.id, ...item.data() }))
          .sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""))
        setHistory(budgets)
        setHistoryLoading(false)
      },
      (error) => {
        setHistoryError(error.message)
        setHistoryLoading(false)
      },
    )

    return unsubscribe
  }, [])

  const saveBudget = useCallback(async (budget) => {
    const id = crypto.randomUUID()
    const createdAt = new Date().toISOString()
    setHistoryError(null)

    try {
      await setDoc(doc(db, "budget_history", id), {
        ...budget,
        date: new Date().toLocaleDateString(),
        createdAt,
      })
    } catch (error) {
      setHistoryError(error.message)
      throw error
    }
  }, [])

  const deleteBudget = useCallback(async (id) => {
    setHistoryError(null)
    try {
      await deleteDoc(doc(db, "budget_history", id))
    } catch (error) {
      setHistoryError(error.message)
      throw error
    }
  }, [])

  return {
    history,
    historyLoading,
    historyError,
    saveBudget,
    deleteBudget,
  }
}
