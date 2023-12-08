const getTimeInputField = () => cy.get('input[placeholder="Number"]');
const getTimeTrackingModal = () => cy.get('[data-testid="modal:tracking"]');
const getTimeTrackerButton = () => cy.get('[data-testid="icon:stopwatch"]');

const estimatedTime = '10';
const estimatedTimeEdit = '20';
const estimatedExpectedTime = 'h estimated';

const loggedTime = '2';
const loggedExpectedTime = 'h logged';

const remainingTime = '5';
const remainingExpectedTime = 'h remaining';


describe('Tests for Time-tracking functionality', () => {
    beforeEach(() => {
        visitBoardAndOpenIssueCreationModal();
        createNewIssue();
    });

    //Cover time estimation functionality based on the provided test cases(Time Tracking Test Cases).

    it('Should add, edit and remove estimated time', () => {
        cy.contains('No time logged').should('be.visible');

        getTimeInputField()
            .type(estimatedTime);
        getTimeInputField()
            .should('have.value', estimatedTime);
        cy.contains(`${estimatedTime}${estimatedExpectedTime}`).should('be.visible');

        getTimeInputField().clear()
            .type(estimatedTimeEdit);
        getTimeInputField()
            .should('have.value', estimatedTimeEdit);
        cy.contains(`${estimatedTimeEdit}${estimatedExpectedTime}`).should('be.visible');

        getTimeInputField().clear();

        cy.contains(`${estimatedTime}${estimatedExpectedTime}`).should('not.exist');
        cy.contains(`${estimatedTimeEdit}${estimatedExpectedTime}`).should('not.exist');
        cy.contains('No time logged').should('be.visible');
    });

    //Cover time-logging functionality based on the given test cases(Time Tracking Test Cases).

    it('Should add and remove logged time', () => {
        getTimeInputField()
            .type(estimatedTime);
        getTimeInputField()
            .should('have.value', estimatedTime);
        cy.contains(`${estimatedTime}${estimatedExpectedTime}`).should('be.visible');

        getTimeTrackerButton()
            .click();

        getTimeTrackingModal().should('be.visible')
            .within(() => {
                getTimeInputField().eq(0)
                    .type(loggedTime);
                getTimeInputField().eq(1)
                    .type(remainingTime);

                cy.contains('button', 'Done').click();
            });

        getTimeTrackingModal()
            .should('not.exist');

        cy.contains(`${loggedTime}${loggedExpectedTime}`).should('be.visible');
        cy.contains(`${remainingTime}${remainingExpectedTime}`).should('be.visible');
        cy.contains(`${estimatedTime}${estimatedExpectedTime}`).should('not.exist');

        getTimeTrackerButton()
            .click();

        getTimeTrackingModal()
            .should('be.visible')
            .within(() => {
                getTimeInputField().eq(0)
                    .clear();
                getTimeInputField().eq(1)
                    .clear();

                cy.contains('button', 'Done').click();
            });

        cy.contains('No time logged').should('be.visible');

        cy.contains(`${loggedTime}${loggedExpectedTime}`).should('not.exist');
        cy.contains(`${remainingTime}${remainingExpectedTime}`).should('not.exist');
        cy.contains(`${estimatedTime}${estimatedExpectedTime}`).should('be.visible');

    });
});

function visitBoardAndOpenIssueCreationModal() {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
        cy.visit(url + '/board?modal-issue-create=true');
    });
}

function createNewIssue() {
    cy.get('[data-testid="modal:issue-create"]').within(() => {
        cy.get(".ql-editor").type('Time Tracking');
        cy.get('input[name="title"]').type('Time Tracking Title');
        cy.get('[data-testid="select:type"]').click();
        cy.get('[data-testid="select:reporterId"]').click();
        cy.get('[data-testid="select-option:Pickle Rick"]').click();
        cy.get('button[type="submit"]').click();
    });
    cy.contains('Issue has been successfully created.').should('be.visible');
    cy.get('[data-testid="board-list:backlog"]').should('be.visible').contains('Time Tracking Title').click();
}