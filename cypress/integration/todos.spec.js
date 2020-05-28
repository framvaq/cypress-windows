describe("Todo app", () => {
  it("loads the page", () => {
    cy.visit("/");

    cy.log("About to fetch the first element");

    cy.wrap(5).should("eq", 5);

    cy.get("[data-cy=todo-item-3]")
      //.then((element) => { debugger; }) //harder way
      .debug()
      .should("have.text", "Hello world")
      .should("not.have.class", "completed")
      .find(".toggle")
      .should("not.be.checked");

    //debugger; //If I put it here, it will be the first that loads, as it is "asynchronous"
    // the queue would be:
    //      [visit, get, should, should, find, should, get, ...]
    //DEBUG

    cy.get("[data-cy=todo-item-4]")
      .should("have.text", "Goodnight moon")
      .should("have.class", "completed")
      .find(".toggle")
      .should("be.checked");
  });
});
