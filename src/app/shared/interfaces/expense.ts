export interface expenseI {
    id: string,
    name: string,
    category: string,
    storeName: string,
    quantity: number,
    price: number,
}
export type newExpense = Omit<expenseI, 'id'>
export interface weeklyExpenseI {
    week: number,
    expenseList: expenseI[]
}
export interface monthlyExpenseI {
    month: string,
    expenselist: weeklyExpenseI[]
}
export interface expenseCategoryI {
    name: string
}