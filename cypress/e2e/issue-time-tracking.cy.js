describe('Tests for Time-tracking functionality', () => {
    beforeEach(() => {
      beforeEachTest();
    });






});

function beforeEachTest() {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
      cy.visit(url + '/board');
      cy.contains('This is an issue of type: Task.').click();
      cy.get('[data-testid="modal:issue-details"]').should('be.visible');
    });
  }