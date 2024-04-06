import { Injectable, inject, signal } from '@angular/core';
import { expenseCategoryI, expenseI, newExpense } from '../interfaces/expense'
import { FIRESTORE } from '../../app.config';
import { addDoc, collection, deleteDoc, doc, limit, query, setDoc } from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import { Observable, defer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  #expenses = signal<expenseI[]>([]);
  expenseList = this.#expenses.asReadonly();

  firestore = inject(FIRESTORE);
  expenseCollection = collection(this.firestore, 'expenseList');
  
  constructor() { }
  setExpenseList(exList: expenseI[]){
    this.#expenses.set(exList)
  }
  addExpenseList(newEx: newExpense){
    const newExx = {...newEx, id: ''}
    this.#expenses.update(ex => [...ex, newExx])
  }
  updateExpenseList(id: string, updatedExpense: expenseI){
    this.#expenses.update(ex => {
      return ex.map(x => {
        if(x.id === id){
          return updatedExpense
        }
        else{
          return x
        }
      })
    })
  }
  getExpenseCategories(){
    const expenseCollection = query(collection(this.firestore, 'expenseCategory'),limit(50))//to get a reference to a collection
    /* const messagesCollection = query(
      collection(this.firestore, 'messages'),
      orderBy('created', 'desc'),
      limit(50)
    ); */
    /* return collectionData(messagesCollection, { idField: 'id' }).pipe(
      map((messages) => [...messages].reverse())
    ) as Observable<Message[]>; */
    return collectionData(expenseCollection, { idField: 'id' }) as Observable<expenseCategoryI[]>
  }
  addExpense(expense: newExpense){
    return defer(() => addDoc(this.expenseCollection, expense));
  }
  updateExpense(expense: expenseI){
    const expenseDoc = doc(this.expenseCollection, expense.id)
    return defer(() => setDoc(expenseDoc, expense));// adddoc returns a promise
  }
  deleteExpense(expense: expenseI){
    return defer(() => deleteDoc(doc(this.expenseCollection, expense.id)));
  }
  getExpenseList(){
    const expenseCollection = query(collection(this.firestore, 'expenseList'),limit(50))//to get a reference to a collection
    return collectionData(expenseCollection, { idField: 'id' }) as Observable<expenseI[]>
  }
}
