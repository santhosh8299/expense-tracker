import { ComponentFixture, TestBed } from "@angular/core/testing"
import ExpensesComponent from "./expenses.component"
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('',()=>{
    let http: HttpTestingController;
    let fixture: ComponentFixture<ExpensesComponent>;
    let expenseComponent: ExpensesComponent;
    let element: any;
    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports: [ExpensesComponent],
            providers: [provideHttpClientTesting()]
        });
        http = TestBed.inject(HttpTestingController);
        fixture = TestBed.createComponent(ExpensesComponent);
        expenseComponent = fixture.componentInstance;
        element = fixture.nativeElement;
        fixture.detectChanges();
    })
    afterEach(() => {
        http.verify();
      });
    it('should have add expense button',()=>{
        const button = element.querySelector('button');
        expect(button.textContent).toContain('Add Expense')
    })
    it('should add empty row at the end of table when add is clicked',()=>{
        const button = element.querySelector('button');
        button.dispatchEvent(new Event('click'));
        
        fixture.detectChanges();
        const rowData = {
            id: '',
            name: '',
            category: '',
            storeName: '',
            quantity: 0,
            price: 0,
        }
        expect(expenseComponent.expenseList().at(-1)).toEqual(rowData)
    })
})