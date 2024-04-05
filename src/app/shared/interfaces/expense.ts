export interface expenseI {
    name: string,
    category: string,
    storeName: string,
    price: string,
}
export interface weeklyExpenseI {
    week: number,
    expenseList: expenseI[]
}
export interface monthlyExpenseI {
    month: string,
    expenselist: weeklyExpenseI[]
}