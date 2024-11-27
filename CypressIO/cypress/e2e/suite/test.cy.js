describe("🔬 US 001 - TS 001 - Redireccion - Acceso a la Página Principal de Administración de FastFood", () => {
  it("US 001 - TS 001 - TC 001 - Validar, redireccionar a la Interfaz Principal de Administración, cuando se introduce la URL correspondiente", () => {
    cy.viewport(1366, 641);

    cy.visit("http://desarrollowebecommerce.somee.com/");

    cy.fixture("DOM/Page").then((fromThe) => {

      cy.get(fromThe.initialPage.link.home).should("be.visible").click();

      cy.url().should("contain", "/User/Default.aspx");

      cy.get(fromThe.headerPage.link.login)
        .should("have.text", "Login")
        .and("not.be.empty")
        .click();

      cy.url().should("contain", "/User/Login.aspx");

      
      cy.get(fromThe.loginPage.input.username)
        .should("be.visible")
        .click()
        .type(fromThe.loginPage.data.usernameAdmin.valid);
  
      cy.get(fromThe.loginPage.input.password)
        .should("be.visible")
        .click()
        .type(fromThe.loginPage.data.passwordAdmin.valid);

        cy.get(fromThe.loginPage.button.login)
          .should("be.visible")
          .should("be.enabled")
          .click({ force: true });

          cy.url().should("contain", "/Admin/Dashboard.aspx");
      
          cy.get(fromThe.dashboardPage.breadcrumb).should(
            "be.visible"
          );
    });

  });
});
