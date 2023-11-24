describe('Issue deletion', () => {
  beforeEach(() => {
    beforeEachTest();
  });

  const getConfirmationPopup = () => cy.get('[data-testid="modal:confirm"]');

  it('Test Case 1: Issue Deletion', () => {

    cy.get('[data-testid="icon:trash"]').click();

    getConfirmationPopup().should('be.visible');
    cy.contains('Are you sure you want to delete this issue?').should('be.visible');
    cy.contains("Once you delete, it's gone for good.").should('be.visible');
    cy.contains('Delete issue').click();

    getConfirmationPopup().should('not.exist');

    cy.reload();
    cy.contains('This is an issue of type: Task.').should('not.exist');
  });

  //Initiate deletion of the issue and cancel the deletion.
  it('Test Case 2: Issue Deletion Cancellation', () => {

    cy.get('[data-testid="icon:trash"]').click();

    getConfirmationPopup().should('be.visible');
    cy.contains('Are you sure you want to delete this issue?').should('be.visible');
    cy.contains("Once you delete, it's gone for good.").should('be.visible');
    cy.contains('Cancel').click();

    getConfirmationPopup().should('not.exist');

    cy.get('[data-testid="icon:close"]').first().click();

    cy.contains('This is an issue of type: Task.').should('exist');
  });
});



function beforeEachTest() {
  cy.visit('/');
  cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
    cy.visit(url + '/board');
    cy.contains('This is an issue of type: Task.').click();
    //Assert the visibility of the issue detail view modal
    cy.get('[data-testid="modal:issue-details"]').should('be.visible');
  });
}






