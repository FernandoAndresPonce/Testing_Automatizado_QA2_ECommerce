// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

Cypress.Commands.add("adminLoginAndGoToDashboard", () => {
  cy.visit("/");

  cy.fixture("DOM/Page").then((fromThe) => {
    cy.get(fromThe.initialPage.link.home).click();

    cy.get(fromThe.headerPage.link.login).click();

    cy.url().should("contain", "/User/Login.aspx");

    cy.get(fromThe.loginPage.input.username)
      .click()
      .type(fromThe.loginPage.data.usernameAdmin.valid);

    cy.get(fromThe.loginPage.input.password)
      .click()
      .type(fromThe.loginPage.data.passwordAdmin.valid);

    cy.get(fromThe.loginPage.button.login).click({ force: true });
  });
});
