/// <reference types="Cypress" />

describe('Todo app', () => {
  it('loads the page', () => {
    /*   cy.server();

    cy.route('/api/todos', [
      {
        text: 'Hello world',
        completed: false,
        id: 3
      },
      {
        id: 4,
        completed: true,
        text: 'Goodnight moon'
      }
    ]).as('preload');

    cy.visit('/');

    cy.wait('@preload');

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

    //Turn off to restore to defaults, then restart again
    cy.server({ enable: false });
    cy.log('server shutdown');
*/
    //Doesn't work, cypress sends a normal (not stubbed) get request
    cy.server({ method: 'POST' });

    //Doesn't work, cypress sends a normal (not stubbed) get request
    cy.route('POST', '/api/todos/3', [
      {
        text: 'Hello worlddddddddddddd',
        completed: false,
        id: 3
      },
      {
        id: 4,
        completed: true,
        text: 'Goodnight moon'
      }
    ]).as('update');

    cy.visit('/');

    cy.wait('@update');

    cy.get('[data-cy=todo-item-3]').find('label').dblclick();
    cy.get('.editing').find('input').type('zzz');
    cy.get('h1').click();
    cy.get('[data-cy=todo-item-3]').should('have.text', 'Hello worldzzz');
  });
});
