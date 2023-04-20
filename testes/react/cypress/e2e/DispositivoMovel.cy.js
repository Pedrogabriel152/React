describe('Testando dispositivos moveis', () => {
    it('Deve existir um botão menu burguer', () => {
        cy.viewport('samsung-s10');
        cy.visit('/');
        cy.getByData('botao-login').click();
        cy.getByData('email-input').type('pedrpg5@gmail.com');
        cy.getByData('senha-input').type('pedrodre2504');
        cy.getByData('botao-enviar').click();

        cy.location('pathname').should('eq', '/home');

        cy.getByData('menu-burguer').click();
        cy.getByData('menu-lateral').find('a').eq(3).click();

        cy.location('pathname').should('eq', '/home/investimentos')
    })
})