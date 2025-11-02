describe('Test case 08 & 09, related to products', () => {
    
    beforeEach(() => {
        cy.visit('https://automationexercise.com/');
        cy.get('a[href="/products"]').click();
        cy.url().should('include', '/products');
    });

    it('TC08 - Verify products page', () => {
        cy.get('.title.text-center').should('have.text', 'All Products');
        cy.get('.features_items .product-image-wrapper').should('have.length.greaterThan', 0);
        cy.get('a[href="/product_details/1"]').click();
        cy.url().should('include', '/product_details/1');
        // Verify product details - REFACTOR TO A FUNCTION LATER
        cy.get('.product-information h2').should('exist');
        cy.get('input[name="quantity"]').should('have.value', '1');
        cy.get('div.product-details p').should('contain.text', 'Category:');
        cy.get('div.product-details').should('contain.text', 'Availability:');
        cy.get('div.product-details').should('contain.text', 'Condition:');
        cy.get('div.product-details').should('contain.text', 'Brand:');
        cy.get('div.product-details span span').should('contain.text', 'Rs.');
         
    });

    it('TC09 - Search product', () => {
        cy.get('#search_product').type('Top');
        cy.get('#submit_search').click();
        cy.url().should('include', '/products?search=Top');
        cy.get('.title.text-center').should('have.text', 'Searched Products');
        cy.get('.features_items .product-image-wrapper').should('have.length.greaterThan', 0);
        cy.get('a[href="/product_details/1"]').click();
         // Verify product details - REFACTOR TO A FUNCTION LATER
        cy.get('.product-information h2').should('exist');
        cy.get('input[name="quantity"]').should('have.value', '1');
        cy.get('div.product-details p').should('contain.text', 'Category:');
        cy.get('div.product-details').should('contain.text', 'Availability:');
        cy.get('div.product-details').should('contain.text', 'Condition:');
        cy.get('div.product-details').should('contain.text', 'Brand:');
        cy.get('div.product-details span span').should('contain.text', 'Rs.');
    });
});