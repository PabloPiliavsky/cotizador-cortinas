import { createContext, useContext } from "react"
import useMasterData from "@/features/admin/hooks/useMasterData"
import useBudgetHistory from "@/features/estimator/hooks/useBudgetHistory"

const BudgetContext = createContext(null)

export function BudgetProvider({ children }) {
  const masterData = useMasterData()
  const budgetHistory = useBudgetHistory()

  return (
    <BudgetContext.Provider
      value={{
        ...masterData,
        history: budgetHistory.history,
        saveBudget: budgetHistory.saveBudget,
        deleteBudget: budgetHistory.deleteBudget,
        loading: masterData.loading || budgetHistory.historyLoading,
        databaseError: masterData.databaseError || budgetHistory.historyError,
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
