import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ExpenseService } from '../../../../shared/data-access/expense.service';

@Component({
  selector: 'app-expenses-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './expenses-form.component.html',
  styleUrl: './expenses-form.component.scss'
})
export class ExpensesFormComponent {

  fb = inject(FormBuilder);
  expenseService = inject(ExpenseService);
  expenseForm = this.fb.nonNullable.group({
    name: [''],
    category: [''],
    storeName: [''],
    price: ['']
  })
}
