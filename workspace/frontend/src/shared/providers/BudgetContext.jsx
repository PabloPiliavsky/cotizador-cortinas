import { createContext, useContext, useState, useEffect } from "react"
import {
  initialLamas,
  initialEjes,
  initialGuias,
  initialCajones,
  initialMotores,
  initialAccesorios,
  initialMargins,
} from "../utils/seedData"

const BudgetContext = createContext()

function getStored(key, initial) {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : initial
}

export function BudgetProvider({ children }) {
  const [lamas, setLamas] = useState(() => getStored("lamas", initialLamas))
  const [ejes, setEjes] = useState(() => getStored("ejes", initialEjes))
  const [guias, setGuias] = useState(() => getStored("guias", initialGuias))
  const [cajones, setCajones] = useState(() => getStored("cajones", initialCajones))
  const [motores, setMotores] = useState(() => getStored("motores", initialMotores))
  const [accesorios, setAccesorios] = useState(() => getStored("accesorios", initialAccesorios))
  const [margins, setMargins] = useState(() => getStored("margins", initialMargins))
  const [history, setHistory] = useState(() => getStored("budget_history", []))

  useEffect(() => {
    localStorage.setItem("lamas", JSON.stringify(lamas))
    localStorage.setItem("ejes", JSON.stringify(ejes))
    localStorage.setItem("guias", JSON.stringify(guias))
    localStorage.setItem("cajones", JSON.stringify(cajones))
    localStorage.setItem("motores", JSON.stringify(motores))
    localStorage.setItem("accesorios", JSON.stringify(accesorios))
    localStorage.setItem("margins", JSON.stringify(margins))
  }, [lamas, ejes, guias, cajones, motores, accesorios, margins])

  useEffect(() => {
    localStorage.setItem("budget_history", JSON.stringify(history))
  }, [history])

  const saveBudget = (budget) => {
    setHistory((prev) => [
      { ...budget, id: Date.now().toString(), date: new Date().toLocaleDateString() },
      ...prev,
    ])
  }

  const deleteBudget = (id) => {
    setHistory((prev) => prev.filter((b) => b.id !== id))
  }

  return (
    <BudgetContext.Provider
      value={{
        lamas, setLamas,
        ejes, setEjes,
        guias, setGuias,
        cajones, setCajones,
        motores, setMotores,
        accesorios, setAccesorios,
        margins, setMargins,
        history, saveBudget, deleteBudget
      }}
    >
      {children}
    </BudgetContext.Provider>
  )
}

export function useBudget() {
  return useContext(BudgetContext)
}

