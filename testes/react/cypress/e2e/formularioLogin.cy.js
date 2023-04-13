describe('Formulário de Login', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })
    it('Não deve permitir um e-mail inválido', () => {
        cy.getByData('botao-login').click();
        cy.getByData('email-input').type('pedrpg5@gmail');
        cy.getByData('senha-input').type('pedrodre2504');
        cy.getByData('botao-enviar').click();
        cy.getByData('mensagem-erro').should('exist').and('have.text', 'O email digitado é inválido')
    })
})