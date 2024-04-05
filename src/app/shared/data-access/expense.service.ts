import { Injectable, inject, signal } from '@angular/core';
import { expenseI } from '../interfaces/expense'
import { FIRESTORE } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  #expenses = signal<expenseI[]>([]);
  expenseList = this.#expenses.asReadonly();

  firestore = inject(FIRESTORE);
  updateList(newEx: expenseI){
    this.#expenses.update(ex => [...ex, newEx])
  }
  constructor() { }
  
}
