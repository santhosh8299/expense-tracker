import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ExpenseActions } from './expense.actions';
import { concatMap, exhaustMap, map } from 'rxjs';
import { ExpenseService } from '../../shared/data-access/expense.service';
import { expenseI } from '../../shared/interfaces/expense';

@Injectable()
export class ExpenseEffects {

  actions$ = inject(Actions);
  expenseService = inject(ExpenseService)

  addExpense$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ExpenseActions.addExpense),
      concatMap((expense: expenseI) =>
        this.expenseService.addExpense(expense).pipe(
          map((_) => ExpenseActions.addExpenseSuccess(expense))
        )
      )
    )
  )
  loadExpenses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpenseActions.loadExpense),
      exhaustMap(() => 
        this.expenseService.getExpenseList().pipe(
          map((expenseList: expenseI[]) => ExpenseActions.loadExpenseSuccess(expenseList))
        )
      )
    )
  )
}
