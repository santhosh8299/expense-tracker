import { Component, computed, inject, signal, viewChild } from '@angular/core';
import { ExpenseService } from '../../shared/data-access/expense.service';
import { UtilityService } from '../../shared/data-access/utility.service';
import { CommonModule } from '@angular/common';
import { TableModule, Table } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { expenseCategoryI, expenseI, expenseItemsI } from '../../shared/interfaces/expense';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api'
import { MessagesModule } from 'primeng/messages';
import { AutoCompleteCompleteEvent, AutoCompleteModule, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { ExpenseActions } from '../../state/expenses/expense.actions';
import { Store } from '@ngrx/store';
import { selectExpense } from '../../state/expenses/expense.selectors';

interface expenseState{
    expenseList: expenseI[],
  }
@Component({
    selector: 'app-expenses',
    standalone: true,
    templateUrl: './expenses.component.html',
    styleUrl: './expenses.component.scss',
    imports: [CommonModule, TableModule, FormsModule, DropdownModule, ButtonModule, InputTextModule, MessagesModule, AutoCompleteModule],
    providers: [MessageService],
})
export default class ExpensesComponent {
    expenseTable = viewChild<Table>('dt');
    expenseService = inject(ExpenseService);
    utilityService = inject(UtilityService);
    messageService = inject(MessageService)
    store = inject(Store)
    expenses = this.store.selectSignal(selectExpense)
    //state
    /* state = signal<expenseState>({
        expenseList: [],
    }) */
    clonedEditedExpense?: expenseI;
    suggestedExpenses: expenseItemsI[] = [];
    //selectors
    //expenseList = computed(() => this.state().expenseList);


    expenseCategories = signal<expenseCategoryI[]>([]);
    getExpenseCategories$ = this.expenseService.getExpenseCategories();
    getExpenseList$ = this.expenseService.getExpenseList();

    constructor(){
        this.store.dispatch(ExpenseActions.loadExpense());
        //this.getExpenseList();
        this.getExpenseCategories$.subscribe(data => {
            this.expenseCategories.set(data)
        })
    }
    /* getExpenseList(){
        this.getExpenseList$.subscribe(list => {
            this.state.update(state =>  {
                return {...state, expenseList: list}
            });
        })
    } */
    onRowEditInit(expense: expenseI) {
        this.clonedEditedExpense = {...expense};
    }

    onRowEditSave(event: any,expense: expenseI) {
        console.log(event);
        event.stopImmediatePropagation();
        /* if(expense.id === ''){
            const { id, ...newEx } = expense;
            this.expenseService.addExpense(newEx).subscribe(data => {
                this.messageService.add({severity:'success', summary:'Expense added successfully'});
            })
        }else{
            this.expenseService.updateExpense(expense).subscribe(data => {
                this.messageService.add({severity:'success', summary:'Expense updated successfully', detail:'Via MessageService'});
            })
        }
        delete this.clonedEditedExpense; */
    }

    onRowEditCancel(expense: expenseI, index: number) {
        /* this.state.update(state => {
            state.expenseList[index] = this.clonedEditedExpense!;
            return state
        }) */
        delete this.clonedEditedExpense;
    }
    addExpense(){
        if(this.expenseTable()){
            //if(!this.clonedEditedExpense){
                const rowData = {
                    id: '',
                    name: '',
                    category: '',
                    storeName: '',
                    quantity: 0,
                    price: 0,
                }
                /* this.state.update(state => {
                    return {...state,expenseList: [...state.expenseList,rowData]}
                }) */
                //this.store.dispatch(ExpenseActions.addExpense(rowData))
                this.expenseTable()?.initRowEdit(rowData);

            //}
        }
    }
    onRowDelete(expense: expenseI){
        this.expenseService.deleteExpense(expense).subscribe(data => {
            this.messageService.add({severity:'success', summary:'Expense deleted successfully'});
        })
        delete this.clonedEditedExpense;
    }
    searchLibrary(event: AutoCompleteCompleteEvent){
        const searchTerm = event.query.toLowerCase();
        this.suggestedExpenses = this.expenseService.expenseAppState().expenseItems.filter(item => item.name.toLowerCase().includes(searchTerm));
    }
    selectLibExpense(event: AutoCompleteSelectEvent, index: number){
        console.log(event)
        /* this.state.update(state => {
            state.expenseList[index] = event.value;
            return state
        })
        this.expenseTable()?.initRowEdit(this.state().expenseList[index]); */
    }
    getCategoryName(expense: expenseItemsI){
        return this.expenseCategories().find(cat => cat.id === expense.categoryId)?.name
    }
}
