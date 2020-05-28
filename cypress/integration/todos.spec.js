describe('Todo app', ()=>{
  it('loads the page', ()=>{
    cy.visit('/');
    
    cy.get('[data-cy=todo-item-3]')
      .should('have.text', 'Hello world')
      .should('not.have.class', 'completed')
      .find('.toggle')
      .should('not.be.checked');

    cy.contains('Goodnight moon')
      .should('have.text', 'Goodnight moon')
      .parent('div')
      .parent('li')
      .should('have.class', 'completed')
      .find('.toggle')
      .should('be.checked');
  });
});
