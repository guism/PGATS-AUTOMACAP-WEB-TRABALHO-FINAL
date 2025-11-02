import userData from "../fixtures/example.json";
 
describe('Test case scenarios 1 to 5, related to LOGIN and REGISTER', () => {

    beforeEach(() => {
        cy.visit('https://automationexercise.com/');
        cy.get('a[href="/login"]').click();
    });
    it('TC-01 - Cadastrar um usuário com sucesso', () => {
        const timestamp = new Date().getTime();

        cy.get('input[data-qa="signup-name"]').type('guismQATester');
        cy.get('input[data-qa="signup-email"]').type(`guismtester${timestamp}@test.com`);
        cy.get('button[data-qa="signup-button"]').click();

        cy.get('#id_gender1').check();
        cy.get('input#password').type('12345', {log: false}); 

        cy.get('select#days').select('10');
        cy.get('select#months').select('May');
        cy.get('select#years').select('1990');

        cy.get('input[type=checkbox]#newsletter').check();
        cy.get('input[type=checkbox]#optin').check();

        cy.get('input#first_name').type('Guilherme');
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
    });
    
    it('TC-02 - Fazer login com usuário existente', () => {
        cy.get('input[data-qa="login-email"]').type('guism@hotmail.com');
        cy.get('input[data-qa="login-password"]').type('guismsenha', {log: false});
        cy.get('button[data-qa="login-button"]').click();

        cy.contains('Logged in as guism').should('be.visible');
        cy.get('i.fa-user').parent().should('contain.text', 'guism');
        cy.get('a[href="/logout"]').should('be.visible');
    });

    it('TC-03 - Fazer login com usuário inexistente', () => {
        cy.get('input[data-qa="login-email"]').type('gssm@hotmail.com');
        cy.get('input[data-qa="login-password"]').type('guismsenhaErrada', {log: false});
        cy.get('button[data-qa="login-button"]').click();
        cy.contains('Your email or password is incorrect!').should('be.visible');
    });
    it('TC-04 - Fazer logout de um usuário logado', () => {

        cy.get('input[data-qa="login-email"]').type('guism@hotmail.com');
        cy.get('input[data-qa="login-password"]').type('guismsenha', {log: false});
        cy.get('button[data-qa="login-button"]').click();
        cy.get('a[href="/logout"]').click();
        cy.contains('Login to your account').should('be.visible');
        cy.get('a[href="/login"]').should('contain', 'Signup / Login');
    });

    it('TC-05 - Cadastrar usuário com email já existente', () => {
        cy.get('input[data-qa="signup-name"]').type('guismQATester');
        cy.get('input[data-qa="signup-email"]').type('guism@hotmail.com');
        cy.get('button[data-qa="signup-button"]').click();
        cy.contains('Email Address already exist!').should('be.visible');
    });

});