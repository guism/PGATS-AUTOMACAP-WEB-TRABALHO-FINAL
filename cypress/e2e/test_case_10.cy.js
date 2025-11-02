describe('Test case 10 - Subscription', () => {

    it('Verify subscription in home page', () => {
        
        cy.visit('https://automationexercise.com/');
        cy.scrollTo('bottom');
        cy.get('#footer .single-widget h2').should('have.text', 'Subscription');
        cy.get('#susbscribe_email').type('guismQA@gmail.com');
        cy.get('#subscribe').click();
        cy.get('#footer .alert-success').should('be.visible').and('contain.text', 'You have been successfully subscribed!');

    });
    
});