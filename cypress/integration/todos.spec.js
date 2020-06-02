/// <reference types="Cypress" />
describe('Todo app', () => {
  beforeEach(function () {
    cy.fixture('todos/all').as('todos');
  });
  //VERY IMPORTANT TO USE THE 'OLD SCHOOL' FUNCTION SYNTAX, NOT THE NEW ARROW I.E.
  /*
  function (){}; WORKS!!
  () => {}; DOES NOT WORK!!=> does not have a this context
  */
  it('loads the page', function () {
    cy.server();

    cy.route('/api/todos', '@todosPreload').as('preload');

    cy.visit('/');

    cy.wait('@preload');

    cy.store('todos').should('deep.equal', this.todosPreload);

    /*This is using callbacks*/
    cy.fixture('todos/all.json').then(json => {
      cy.route('/api/todos', json).as('preload');

      cy.visit('/');

      cy.wait('@preload');

      cy.store('todos').should('deep.equal', json);

      cy.store('todos')
        .lo_find(todo => {
          return todo.id == 1;
        })
        .lo_pick('text')
        .should('deep.equal', { text: 'first' });
    });
  });

  context.only('Todo creation retries', function () {
    beforeEach(function () {
      cy.server();
      // Alias the fixture data
      cy.route('/api/todos', '@todos').as('preload');
      cy.visit('/');
      cy.wait('@preload');

      cy.route({
        method: 'POST',
        url: 'api/todos',
        status: 500,
        response: ''
      }).as('createTodo');

      cy.get('[data-cy=new-todo]').type('new todo{enter}');

      cy.wait('@createTodo');

      cy.route({
        method: 'POST',
        url: 'api/todos',
        status: 500,
        response: ''
      }).as('createTodo2');

      cy.wait('@createTodo2');
    });

    it('retries 3 times', function () {
      cy.route({
        method: 'POST',
        url: 'api/todos',
        status: 201,
        response: ''
      }).as('createTodo3');

      cy.wait('@createTodo3');

      cy.get('[data-cy=todo-list]').children().should('have.length', 3);
    });

    it('fails after 3 unsuccessful attempts', function () {
      cy.route({
        method: 'POST',
        url: 'api/todos',
        status: 500,
        response: ''
      }).as('createTodo3');

      cy.wait('@createTodo3');
      cy.get('[data-cy=todo-list]').children().should('have.length', 2);
    });
  });
});
