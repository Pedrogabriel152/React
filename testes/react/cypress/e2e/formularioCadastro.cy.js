describe('Formulário de Cadastro', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Não deve cadastrar com o campo nome vazaio', () => {
        cy.getByData('botao-cadastro').click();
        cy.getByData('email-input').type('teste@gmail.com');
        cy.getByData('senha-input').type('pedrodre2504');
        cy.getByData('checkbox-input').click();
        cy.getByData('botao-enviar').click();
        cy.getByData('mensagem-erro').should('exist').and('have.text', 'O campo de nome é obrigatório')
    });

    it('Não deve cadastrar com o campo email vazaio', () => {
        cy.getByData('botao-cadastro').click();
        cy.getByData('nome-input').type('Teste');
        cy.getByData('senha-input').type('pedrodre2504');
        cy.getByData('checkbox-input').click();
        cy.getByData('botao-enviar').click();
        cy.getByData('mensagem-erro').should('exist').and('have.text', 'E-mail já cadastrado!')
    })

    it.only('Usuário deve conseguir cadastrar no sistema', () => {
        cy.getByData('botao-cadastro').click();
        cy.getByData('nome-input').type('Teste');
        cy.getByData('email-input').type('teste8@gmail.com');
        cy.getByData('senha-input').type('pedrodre2504');
        cy.getByData('checkbox-input').click();
        cy.getByData('botao-enviar').click();
        cy.getByData('mensagem-sucesso').should('exist').and('have.text', 'Usuário cadastrado com sucesso!')
    })
})