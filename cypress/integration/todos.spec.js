/// <reference types="Cypress" />
let _ = require('lodash');

describe('Todo Application', () => {
  /*beforeEach(function () {
    cy.fixture('todos/all.json').as('todos');

    cy.server();
    // Alias the fixture data
    cy.route('/api/todos', '@todos').as('preload');

    cy.visit('/');
    cy.wait('@preload');
  });*/

  it('loads the page', function () {
    cy.store('example.test.first').should('equal', 1);

    // Access the fixture data as this.todos
    cy.store('todos').should('deep.equal', this.todos);

    cy.get('[data-cy=todo-item-1]')
      .should('have.text', 'Hello world')
      .should('not.have.class', 'completed')
      .find('.toggle')
      .should('not.be.checked');

    cy.get('[data-cy=todo-item-2]')
      .should('have.text', 'Goodnight moon')
      .should('have.class', 'completed')
      .find('.toggle')
      .should('be.checked');
  });

  context('Todo Creation Retries', function () {
    beforeEach(function () {
      cy.route({
        method: 'POST',
        url: '/api/todos',
        status: 500,
        response: ''
      }).as('createTodo');

      cy.get('.new-todo').type('2nd Todo{enter}');

      cy.wait('@createTodo');

      cy.route({
        method: 'POST',
        url: '/api/todos',
        status: 500,
        response: ''
      }).as('createTodo2');

      cy.wait('@createTodo2');
    });

    it('retries 3 times', function () {
      cy.route({
        method: 'POST',
        url: '/api/todos',
        status: 200,
        response: ''
      }).as('createTodo3');

      cy.wait('@createTodo3');

      cy.get('[data-cy=todo-list]').children().should('have.length', 3);

      cy.get('[data-cy=todo-item-3]').should('exist');
    });

    it('fails after 3 unsuccessful attempts', function () {
      cy.route({
        method: 'POST',
        url: '/api/todos',
        status: 500,
        response: ''
      }).as('createTodo3');

      cy.wait('@createTodo3');

      cy.get('[data-cy=todo-list]').children().should('have.length', 2);

      cy.get('[data-cy=todo-item-3]').should('not.exist');
    });
  });

  context('Editing Todos', function () {
    it('edits existing todos', function () {
      cy.route('PUT', '/api/todos/1', 'ok').as('update');

      cy.get('[data-cy=todo-item-1] > .view > label').dblclick();
      cy.get('[data-cy=todo-input-edit]').clear().type('Updated todo{enter}');

      cy.wait('@update');

      cy.store('todos')
        .lo_find(todo => {
          return todo.id == 1;
        })
        .should('deep.equal', {
          id: 1,
          text: 'Updated todo',
          completed: false
        });
    });

    it('Performs a hello world', function () {
      cy.task('hello', { name: ' world' });
    });

    //Remember to uncomment beforeEach
    it.only('seeds the database', function () {
      cy.task('db:seed', {
        todos: [
          {
            id: 1,
            text: 'Hello worlddddddd',
            completed: false
          },
          {
            id: 2,
            text: 'Goodnight moon',
            completed: true
          }
        ]
      });
      cy.visit('/');
    });
  });
});
