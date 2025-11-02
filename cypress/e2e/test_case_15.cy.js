describe('TC15 - Realizar o cadastro do usuário e realizar um pedido.', () => {
    
    beforeEach(() => {
        cy.visit('https://automationexercise.com/');
        cy.get('a[href="/login"]').click();
    });

    it('TC-01 - Cadastrar um usuário com sucesso e realizar um pedido', () => {
        const timestamp = new Date().getTime();
        const userName = `guismQATester${timestamp}`;

        cy.get('input[data-qa="signup-name"]').type(userName);
        cy.get('input[data-qa="signup-email"]').type(`guismtester${timestamp}@test.com`);
        cy.get('button[data-qa="signup-button"]').click();

        cy.get('#id_gender1').check();
        cy.get('input#password').type('12345', {log: false}); 

        cy.get('select#days').select('10');
        cy.get('select#months').select('May');
        cy.get('select#years').select('1990');

        cy.get('input[type=checkbox]#newsletter').check();
        cy.get('input[type=checkbox]#optin').check();

        cy.get('input#first_name').type(userName);
        cy.get('input#last_name').type('Silva');
        cy.get('input#company').type('QATester');
        cy.get('input#address1').type('Rua dos Testes, 123');
        cy.get('input#address2').type('Apto 456');
        cy.get('select#country').select('Canada');
        cy.get('input#state').type('Ontario');
        cy.get('input#city').type('Toronto');
        cy.get('input#zipcode').type('M1B2K3');
        cy.get('input#mobile_number').type('+1 416-123-4567');
        cy.get('button[data-qa="create-account"]').click();

        cy.contains('Account Created!').should('be.visible');
        cy.get('a[data-qa="continue-button"]').click();
        cy.contains(`Logged in as ${userName}`).should('be.visible');

        // Function to hover and add product to the cart - Modularize later
        const addProductToCart = (productId) => {
            cy.get(`a[href="/product_details/${productId}"]`).trigger('mouseover');
            cy.get(`a[href="/product_details/${productId}"]`).click();
            cy.get('button.btn.btn-default.cart').click();
            cy.contains('Continue Shopping').click();
            cy.get('a[href="/products"]').click();
            cy.url().should('include', '/products');
            cy.wait(2000);
        };
        let totalProducts = 0 // Number of products to add
        // Add products to cart
        for(let i = 1; i < 3; i++) {
            addProductToCart(i);
            totalProducts = totalProducts + 1;
        }

        // Proceed to checkout
        cy.contains('Cart').click();
        for(let i = 1; i <= totalProducts; i++) {
            cy.get(`tr[id="product-${totalProducts}"]`).should('be.visible');
        }
        cy.contains('Shopping Cart').should('be.visible');
        cy.contains('Proceed To Checkout').click();

        // Verify address details
        cy.get('.address_firstname').should('contain.text', userName);
        cy.get('.address_lastname').should('contain.text', 'Silva');
        cy.get('.address_city').should('contain.text', 'Toronto');
        cy.contains('Canada').should('be.visible');
        // review order and place order
        cy.get('.cart_description').should('have.length', totalProducts);

        // Enterr description in comment text area
        cy.get('textarea[name="message"]').type('Please deliver between 9 AM to 5 PM.');
        cy.contains('Place Order').click();
        // Enter payment details
        cy.get('input[name="name_on_card"]').type('Guilherme Silva');
        cy.get('input[name="card_number"]').type('4111111111111111');
        cy.get('input[name="cvc"]').type('123');
        cy.get('input[name="expiry_month"]').type('12');
        cy.get('input[name="expiry_year"]').type('2025');
        cy.get('#submit').click();
        // cy.contains('Your order has been placed successfully!').should('be.visible');
        cy.contains('h2', 'Order Placed!');

        // Delete account
        cy.get('a[href="/delete_account"]').click();
        cy.contains('Account Deleted!').should('be.visible');
        cy.get('a[data-qa="continue-button"]').click();


    });
});