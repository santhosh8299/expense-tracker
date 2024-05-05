import { createReducer, on } from '@ngrx/store';
import { ExpenseActions } from './expense.actions';
import { expenseI } from '../../shared/interfaces/expense';

export const expenseFeatureKey = 'expense';

export interface expenseState {
  expenses: expenseI[];
}

export const initialState: expenseState = {
  expenses : []
};

export const expenseReducer = createReducer(
  initialState,
  on(ExpenseActions.addExpenseSuccess,(state: expenseState, expense )=>({
    ...state,
    expenses: [...state.expenses,expense]
  })),
  on(ExpenseActions.loadExpenseSuccess, (state: expenseState, expenses) => (
    {
      ...state,
      expenses: expenses.expenseList
    }
  ))
);

