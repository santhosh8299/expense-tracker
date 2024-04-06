import { Component, inject, signal, viewChild } from '@angular/core';
import { ExpenseService } from '../../shared/data-access/expense.service';
import { UtilityService } from '../../shared/data-access/utility.service';
import { CommonModule } from '@angular/common';
import { TableModule, Table } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { expenseI } from '../../shared/interfaces/expense';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api'
import { MessagesModule } from 'primeng/messages';

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
    expenseCategories = signal([]);
    clonedExpenses: { [s: string]: expenseI } = {};
    getExpenseCategories$ = this.expenseService.getExpenseCategories();
    getExpenseList$ = this.expenseService.getExpenseList();

    constructor(){
        this.getExpenseList$.subscribe(list => {
            console.log(list)
            this.expenseService.setExpenseList(list);
        })
    }
    onRowEditInit(expense: expenseI) {
        this.clonedExpenses[expense.id as string] = {...JSON.parse(JSON.stringify(expense))};
    }

    onRowEditSave(expense: expenseI) {
        delete this.clonedExpenses[expense.id as string];
        if(expense.id === ''){
            const { id, ...newEx } = expense;
            this.expenseService.addExpense(newEx).subscribe(data => {
                console.log(data);
                this.messageService.add({severity:'success', summary:'Expense added successfully'});
            })
        }else{
            this.expenseService.updateExpense(expense).subscribe(data => {
                console.log(data);
                this.messageService.add({severity:'success', summary:'Expense updated successfully', detail:'Via MessageService'});
            })
        }
            //this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
        
    }

    onRowEditCancel(expense: expenseI, index: number) {
        this.expenseService.updateExpenseList(expense.id,this.clonedExpenses[expense.id]);
        delete this.clonedExpenses[expense.id as string];
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
                this.expenseService.addExpenseList(rowData);
                this.expenseTable()?.initRowEdit(rowData);
                this.onRowEditInit(rowData);
            }
        }
    }
    onRowDelete(expense: expenseI){
        this.expenseService.deleteExpense(expense).subscribe(data => {
            this.messageService.add({severity:'success', summary:'Expense deleted successfully'});
        })
    }
}
