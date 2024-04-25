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
    name: string;
    id: string
}
export interface expenseCategorywithListI extends expenseCategoryI{
    items: expenseItemsI[]
}
export interface expenseItemsI{
    categoryId: string;
    name: string;
    price: number;
    quantity: number;
    shop: string;
    id: string
}