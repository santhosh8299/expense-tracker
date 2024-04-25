import { Component, inject } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { ExpenseService } from '../../shared/data-access/expense.service';
import { CommonModule } from '@angular/common';
import { catchError, map, take } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { ExpenseCategoryComponent } from './expense-category/expense-category.component';
import { OverviewComponent } from './overview/overview.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TabViewModule, CommonModule, ExpenseCategoryComponent, OverviewComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export default class DashboardComponent {

  expenseService = inject(ExpenseService);
  expenseCategories$ = this.expenseService.getExpenseCategories().pipe(catchError(_ => of(null)), take(1));
  expenseItems$ = this.expenseService.getExpenseItems().pipe(catchError(_ => of(null)), take(1));
  expenseApis$ = forkJoin([this.expenseCategories$, this.expenseItems$]).pipe(map(([categories, items]) => {
    return categories?.map(category => {
        return {
          ...category,
          items: items ? items.filter(item => item.categoryId === category.id) : []
        }
      })
    
}));
  
}

