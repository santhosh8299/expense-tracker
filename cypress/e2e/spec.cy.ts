describe('My First Test', () => {
  beforeEach(()=>{
    cy.visit('/expenses')
  })
  it('Visits the initial project page', () => {
    cy.contains('Expense Tracker') // 
  })
  it('title contains ExpenseTracker', () => {
    cy.title().should('equal','ExpenseTracker')//cy.title() returns a wrapper chain 
    //should asserts the value
    //if it didnit match it will try for 4 seconds and then it will fail
  })
  it('add expense', () => {
    cy.get("[data-id]='add-expense-button'").should('contain.text', 'Add Expense')
  })
})
