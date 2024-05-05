/// <reference types="Cypress" />
describe('add expense',()=>{
    const expense = {
        id: '',
        name: '',
        category: '',
        storeName: '',
        quantity: 1,
        price: 1,
    }
    function startBackend(): void {
        cy.intercept({
            method: 'POST', 
            url: 'http://localhost:8080/google.firestore.v1.Firestore/Listen/channel?VER=8&database=projects%2Fdemo-project%2Fdatabases%2F(default)&RID=11761&CVER=22&X-HTTP-Session-Id=gsessionid&zx=mg216thup1x6&t=1'
        }, {body: []}).as('expenseList');
    }
    
    beforeEach(()=>{
        cy.visit('/expenses');
        startBackend();
    })
    it('Add expense',()=>{
        cy.intercept(
            {
              method: 'POST',
              url: 'http://localhost:8080/google.firestore.v1.Firestore/Listen/channel?VER=8&database=projects%2Fdemo-project%2Fdatabases%2F(default)&RID=85215&CVER=22&X-HTTP-Session-Id=gsessionid&zx=chigbve7otz2&t=1',
            },
            {
              body: [],
            }
          );

        cy.get('button').should('contain.text', 'Add Expense')
    })
})