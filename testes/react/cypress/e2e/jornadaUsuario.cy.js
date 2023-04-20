describe('Jornadas de usuário', () => {
    it('Deve permitir que a pessoa usuária acesse a aplicação, realiz  e uma transação e realize um logout na aplicação', () => {
        cy.visit('/');
        cy.getByData('botao-login').click();
        cy.getByData('email-input').type('pedrpg5@gmail.com');
        cy.getByData('senha-input').type('pedrodre2504');
        cy.getByData('botao-enviar').click();

        cy.location('pathname').should('eq', '/home');

        cy.getByData('select-opcoes').select('Transferência');
        cy.getByData('form-input').type('45');
        cy.getByData('realiza-transacao').click();
        cy.getByData('lista-transacoes').find('li').last().contains('- R$ 45');
        cy.getByData('botao-sair').click();

        cy.location('pathname').should('eq', '/');
        
    })
})