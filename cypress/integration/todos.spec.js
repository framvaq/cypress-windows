describe('Todo app', ()=>{
  it('loads the page', ()=>{
    cy.visit('/');
    
    //cy.contains('Hello world') // This gives false positives (look .contains('Goodnight))
    //This is the best (and easiest) way
    cy.get('[data-cy=todo-item-3]')
      .should('have.text', 'Hello world')
      .should('not.have.class', 'completed')
      .find('.toggle')
      .should('not.be.checked');

    //this one works, but I have to be a lot more careful, and won't work it there are any changes in the DOM
    cy.contains('Goodnight moon')
      .should('have.text', 'Goodnight moon')
      .siblings('input')
      //.find('.toggle') // I ca't look for a toggle inside a toggle
      .should('be.checked');
  });
});
