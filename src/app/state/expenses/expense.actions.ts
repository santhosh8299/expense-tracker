import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { expenseI } from '../../shared/interfaces/expense';

export const ExpenseActions = createActionGroup({
  source: 'Expense',
  events: {
    'Add Expense': props<expenseI>(),
    'Add Expense Success': props<expenseI>(),
    'Load Expense': emptyProps(),
    'Load Expense Success': (expenseList: expenseI[]) => ({ expenseList }),
  }
});
