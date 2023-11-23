import { beforeEachIssueDelete } from "./functions";


describe('Issue deletion', () => {
  beforeEach(() => {
    beforeEachIssueDelete();
    //Assert the visibility of the issue detail view modal
    getIssueDetailsModal().should('be.visible');
  });


  const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
  const getConfirmationPopup = () => cy.get('[data-testid="modal:confirm"]');

  //Delete the issue by clicking the delete button and confirming the deletion
  it('Test Case 1: Issue Deletion', () => {

    cy.get('[data-testid="icon:trash"]').click();

    getConfirmationPopup().should('be.visible');
    getConfirmationPopup().within(() => {
    cy.contains('Are you sure you want to delete this issue?').should('be.visible');
    cy.contains("Once you delete, it's gone for good.").should('be.visible');
    cy.contains('Delete issue').click();
    });

    getConfirmationPopup().should('not.exist');

    cy.reload();
    cy.contains('This is an issue of type: Task.').should('not.exist');
  });

  //Initiate deletion of the issue and cancel the deletion.
  it('Test Case 2: Issue Deletion Cancellation', () => {

    cy.get('[data-testid="icon:trash"]').click();

    getConfirmationPopup().should('be.visible');
    getConfirmationPopup().within(() => {
    cy.contains('Are you sure you want to delete this issue?').should('be.visible');
    cy.contains("Once you delete, it's gone for good.").should('be.visible');
    cy.contains('Cancel').click();
    });

    getConfirmationPopup().should('not.exist');

    cy.get('[data-testid="icon:close"]').first().click();

    cy.contains('This is an issue of type: Task.').should('exist');
  });
});
