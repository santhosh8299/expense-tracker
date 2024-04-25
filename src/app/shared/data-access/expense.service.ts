import { Injectable, inject, signal } from '@angular/core';
import { expenseCategoryI, expenseI, expenseItemsI, newExpense } from '../interfaces/expense'
import { FIRESTORE } from '../../app.config';
import { addDoc, collection, deleteDoc, doc, limit, query, setDoc, where } from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import { Observable, defer } from 'rxjs';

export interface expenseAppStateI{
  expenseItems: expenseItemsI[]
}
@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private firestore = inject(FIRESTORE);
  private expenseCollection = collection(this.firestore, 'expenseList');
  
  //state
  private state = signal<expenseAppStateI>({
    expenseItems: []
  })
  expenseAppState = this.state.asReadonly();
  constructor() { 
    this.getExpenseItems().subscribe(data => {
      this.state.update(state => ({...state, expenseItems: data}))
    })
  }
  getExpenseCategories(){
    const expenseCategoryCollection = query(collection(this.firestore, 'expenseCategory'),limit(50))//to get a reference to a collection
    /* const messagesCollection = query(
      collection(this.firestore, 'messages'),
      orderBy('created', 'desc'),
      limit(50)
    ); */
    /* return collectionData(messagesCollection, { idField: 'id' }).pipe(
      map((messages) => [...messages].reverse())
    ) as Observable<Message[]>; */
    return collectionData(expenseCategoryCollection) as Observable<expenseCategoryI[]>
  }
  getExpenseItems(){
    const expenseItemsCollection = query(collection(this.firestore, 'expenseItems'),limit(50))//to get a reference to a collection
    return collectionData(expenseItemsCollection, { idField: 'id' }) as Observable<expenseItemsI[]>
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
