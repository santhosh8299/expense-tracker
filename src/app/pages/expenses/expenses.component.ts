import { Component, computed, inject, signal, viewChild } from '@angular/core';
import { ExpenseService } from '../../shared/data-access/expense.service';
import { UtilityService } from '../../shared/data-access/utility.service';
import { CommonModule } from '@angular/common';
import { TableModule, Table } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { expenseCategoryI, expenseI } from '../../shared/interfaces/expense';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api'
import { MessagesModule } from 'primeng/messages';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface expenseState{
    expenseList: expenseI[],
    editingRowKey: string | null
  }
@Component({
    selector: 'app-expenses',
    standalone: true,
    templateUrl: './expenses.component.html',
    styleUrl: './expenses.component.scss',
    imports: [CommonModule, TableModule, FormsModule, DropdownModule, ButtonModule, InputTextModule, MessagesModule],
    providers: [MessageService]
})
export default class ExpensesComponent {
    expenseTable = viewChild<Table>('dt');
    expenseService = inject(ExpenseService);
    utilityService = inject(UtilityService);
    messageService = inject(MessageService)

    //state
    private state = signal<expenseState>({
        expenseList: [],
        editingRowKey: null
    })
    //selectors
    expenseList = computed(() => this.state().expenseList);

    expenseCategories = signal([]);
    getExpenseCategories$ = this.expenseService.getExpenseCategories();
    getExpenseList$ = this.expenseService.getExpenseList();

    constructor(){
        this.getExpenseList();
    }
    getExpenseList(){
        this.getExpenseList$.subscribe(list => {
            this.state.update(state =>  {
                return {...state, expenseList: list}
            });
        })
    }
    onRowEditInit(expense: expenseI) {
        this.state.update(state => {
            return {...state, editingRowKey: expense.id}
        })
    }

    onRowEditSave(expense: expenseI) {
        if(expense.id === ''){
            const { id, ...newEx } = expense;
            this.expenseService.addExpense(newEx).subscribe(data => {
                this.messageService.add({severity:'success', summary:'Expense added successfully'});
            })
        }else{
            this.expenseService.updateExpense(expense).subscribe(data => {
                this.messageService.add({severity:'success', summary:'Expense updated successfully', detail:'Via MessageService'});
            })
        }
        
    }

    onRowEditCancel(expense: expenseI, index: number) {
        if(!expense.id){
            this.state.update(state => ({...state, expenseList: state.expenseList.filter(exp => exp.id !== expense.id)}) )
        }else{
            this.getExpenseList();
        }
    }
    addExpense(){
        if(this.expenseTable()){
            if(!Object.values((this.expenseTable() as Table).editingRowKeys).find(bool => bool)){
                const rowData = {
                    id: '',
                    name: '',
                    category: '',
                    storeName: '',
                    quantity: 0,
                    price: 0,
                }
                this.state.update(state => {
                    return {...state,editingRowKey: rowData.id,expenseList: [...state.expenseList,rowData]}
                })
                this.expenseTable()?.initRowEdit(rowData);
            }
        }
    }
    onRowDelete(expense: expenseI){
        this.expenseService.deleteExpense(expense).subscribe(data => {
            this.messageService.add({severity:'success', summary:'Expense deleted successfully'});
        })
    }
}
