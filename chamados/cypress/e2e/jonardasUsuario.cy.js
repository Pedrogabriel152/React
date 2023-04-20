describe('Fomulario de Login', () => {
  it('Usuário deve conseguir acessar a página de dashboard', () => {
    cy.visit('/');

    cy.location('pathname').should('eq', '/');

    cy.getByData('input-name').type('pedrpg5@gmail.com');
    cy.getByData('input-password').type('pedrodre2504');
    cy.getByData('button-submit').click();

    cy.location('pathname').should('eq', '/dashboard');
  });

  it('Usuário deve conseguir acessar a página de dashboard, depois cadastrar um novo chamado e sair da aplicação', () => {
    cy.visit('/');

    cy.location('pathname').should('eq', '/');

    cy.getByData('input-name').type('pedrpg5@gmail.com');
    cy.getByData('input-password').type('pedrodre2504');
    cy.getByData('button-submit').click();

    cy.location('pathname').should('eq', '/dashboard');
    cy.get('.Toastify__toast--success').click();
    cy.getByData('novo-chamado-dados').should('exist').click();
    
    cy.location('pathname').should('eq', '/new');

    cy.getByData('client').select('Nexus');
    cy.getByData('assunto').select('Finaceiro');
    cy.getByData('atendido').click();
    cy.get('textarea').type('Novo chamado')
    cy.getByData('button-submit').click();

    cy.location('pathname').should('eq', '/dashboard');

    cy.get('.Toastify__toast--success').click();
    cy.getByData('logout').click();

    cy.location('pathname').should('eq', '/');

  })
})