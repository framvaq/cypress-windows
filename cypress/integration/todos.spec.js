it('loads the page', () => {
  describe('Todo app', () => {
    cy.server();

    cy.route('/api/todos', [
      {
        text: 'first',
        completed: true,
        id: 1
      },
      {
        text: 'second',
        completed: false,
        id: 2
      },
      {
        text: 'third',
        completed: true,
        id: 3
      },
      {
        text: 'fourth',
        completed: false,
        id: 4
      },
      {
        text: 'fifth',
        completed: true,
        id: 5
      }
    ]).as('preload');

    cy.visit('/');

    cy.wait('@preload');

    cy.store('todos')
      .lo_filter(todo => {
        return todo.id == 1;
      })
      .should('deep.equal', [
        {
          text: 'first',
          completed: true,
          id: 1
        }
      ]);

    cy.store('todos')
      .lo_find(todo => {
        return todo.id == 1;
      })
      .lo_pick('text')
      .should('deep.equal', { text: 'first' });
  });
});
