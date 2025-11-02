import userData from "../fixtures/example.json";

describe('Test case scenarios 6, related to CONTACT_US feature', () => {

    beforeEach(() => {
        cy.visit('https://automationexercise.com/');
        cy.get('a[href="/contact_us"]').click();
     });

     it(' Realizar contato com suporte do website', () => {

        cy.get('input[data-qa="name"]').type(userData.name);
        cy.get('input[data-qa="email"]').type(userData.email);
        cy.get('input[data-qa="subject"]').type(userData.subject);
        cy.get('textarea[data-qa="message"]').type(userData.message);

        cy.fixture('example.json').as('fileToUpload');
        cy.get('input[type="file"]').selectFile('@fileToUpload');

        cy.get('input[type="submit"]').click();
        cy.contains('Success! Your details have been submitted successfully.').should('be.visible');
    });
});