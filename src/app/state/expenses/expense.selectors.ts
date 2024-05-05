import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromExpense from './expense.reducer';

export const selectExpenseState = createFeatureSelector<fromExpense.expenseState>(
    fromExpense.expenseFeatureKey
)
export const selectExpense = createSelector(
    selectExpenseState,
    (state: fromExpense.expenseState) => state.expenses
)