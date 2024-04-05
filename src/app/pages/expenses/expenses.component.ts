import { Component, inject, signal } from '@angular/core';
import { ExpensesFormComponent } from "./ui/expenses-form/expenses-form.component";
import { ExpenseService } from '../../shared/data-access/expense.service';
import { UtilityService } from '../../shared/data-access/utility.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { expenseI } from '../../shared/interfaces/expense';

@Component({
    selector: 'app-expenses',
    standalone: true,
    templateUrl: './expenses.component.html',
    styleUrl: './expenses.component.scss',
    imports: [ExpensesFormComponent, CommonModule, TableModule, FormsModule, DropdownModule]
})
export default class ExpensesComponent {
    expenseService = inject(ExpenseService);
    utilityService = inject(UtilityService);
    expenseCategories = signal([]);
    onRowEditInit(expense: expenseI){

    }
    onRowEditSave(expense: expenseI){

    }
    onRowEditCancel(expense: expenseI, index: number){

    }
    addExpense(){
        this.expenseService.updateList({
            name: '',
            category: '',
            storeName: '',
            price: '',
        })
        this.
    }
}
