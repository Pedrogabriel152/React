describe('Formulário de Cadastro', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.getByData('botao-login').click()
        cy.getByData('email-input').type('pedrpg5@gmail.com');
        cy.getByData('senha-input').type('pedrodre2504');
        cy.getByData('botao-enviar').click()
    })
    it('Deve entrar na aplicação com sucesso', ()=>{
        cy.location('pathname').should('eq', '/home');
    })

    it('Deve conseguir acessar a pagina de cartões', ()=>{
        cy.location('pathname').should('eq', '/home');
        cy.getByData('app-home').find('a').eq(1).click();
        cy.getByData('titulo-cartoes').should('exist').and('have.text', 'Meus cartões');
        cy.location('pathname').should('eq', '/home/cartoes');
    })
})