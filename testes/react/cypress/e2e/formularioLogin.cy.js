describe('Formulário de Login', () => {
    beforeEach(() => {
        cy.visit('/')
    })
    it('Não deve permitir um e-mail inválido', () => {
        cy.getByData('botao-login').click();
        cy.getByData('email-input').type('pedrpg5@gmail');
        cy.getByData('senha-input').type('pedrodre2504');
        cy.getByData('botao-enviar').click();
        cy.getByData('mensagem-erro').should('exist').and('have.text', 'O email digitado é inválido')
    })

    it('Não deve permitir um campo em branco', ()=>{
        cy.getByData('botao-login').click()
        cy.getByData('senha-input').type('123456')
        cy.getByData('botao-enviar').click()
        cy.getByData('mensagem-erro').should('exist').and('have.text', 'O campo email é obrigatório')
    })

    it('Deve entrar na aplicação com sucesso', ()=>{
        cy.getByData('botao-login').click()
        cy.getByData('email-input').type('pedrpg5@gmail.com');
        cy.getByData('senha-input').type('pedrodre2504');
        cy.getByData('botao-enviar').click()
        cy.getByData('botao-sair').should('exist')
    })
})