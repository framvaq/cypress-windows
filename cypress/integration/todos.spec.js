/// <reference types="Cypress" />

it('loads the page', () => {
  describe('Todo app', () => {
    cy.server();

    cy.route('/api/todos', [
      {
        id: 3,
        text: 'Hello world',
        completed: false
      },
      {
        id: 4,
        text: 'Goodnight moon',
        completed: true
      }
    ]).as('preload');

    cy.visit('/');

    cy.wait('@preload');

    cy.store('todos').should('deep.equal', [
      {
        id: 3,
        text: 'Hello world',
        completed: false
      },
      {
        id: 4,
        text: 'Goodnight moon',
        completed: true
      }
    ]);

    cy.store();

    cy.get('[data-cy=todo-item-3]')
      .should('have.text', 'Hello world')
      .should('not.have.class', 'completed')
      .find('.toggle')
      .should('not.be.checked');

    cy.get('[data-cy=todo-item-4]')
      .should('have.text', 'Goodnight moon')
      .should('have.class', 'completed')
      .find('.toggle')
      .should('be.checked');
  });
});
