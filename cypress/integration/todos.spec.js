describe('Todo app', ()=>{
  it('loads the page', ()=>{
    cy.visit('/');
    cy.get('.todo-list li:nth-child(1)').should('have.text', 'Hello world')//it's case sensitive
      .should('not.have.class', 'completed')
      .find('.toggle')
      .should('not.be.checked');
  });
});
