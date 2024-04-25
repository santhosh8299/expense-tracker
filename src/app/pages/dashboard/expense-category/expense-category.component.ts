import { Component, input } from '@angular/core';
import { expenseCategorywithListI } from '../../../shared/interfaces/expense';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-expense-category',
  templateUrl: './expense-category.component.html',
  styleUrl: './expense-category.component.scss',
  standalone: true,
  imports: [TableModule, FormsModule, ButtonModule, InputTextModule, AccordionModule, CommonModule]
})
export class ExpenseCategoryComponent {
  categories = input.required<expenseCategorywithListI[]>();
  /* addExpenseItem(){
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
  onRowDelete(expense: expenseI){
      this.expenseService.deleteExpense(expense).subscribe(data => {
          this.messageService.add({severity:'success', summary:'Expense deleted successfully'});
      })
  } */
}
