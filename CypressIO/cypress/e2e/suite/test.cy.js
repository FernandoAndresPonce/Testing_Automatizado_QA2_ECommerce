describe.skip("🔬 US 001 - TS 001 - Redireccion - Acceso a la Página Principal de Administración de FastFood", () => {
  it("US 001 - TS 001 - TC 001 - Validar, redireccionar a la Interfaz Principal de Administración, cuando se introduce la URL correspondiente", () => {
    cy.viewport(1366, 641);

    cy.visit("/");

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

      cy.get(fromThe.dashboardPage.breadcrumb).should("be.visible");
    });
  });
});

describe.skip("🔬 US 002 - TS 002 - Redireccion - Acceso a la Página Categories de Administración de FastFood", () => {
  beforeEach(
    "Precondicion : que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador, 🧩 AND: el Usuario se encuentra en la Interfaz Principal de Administración - Dashboard'",
    () => {
      cy.session("Login and go to Dashboard Page", () => {
        cy.viewport(1366, 641);
        cy.adminLoginAndGoToDashboard();
      });
    }
  );
  it("US 002 - TS 002 - TC 001 - Validar la correcta redirección a la Interfaz “Categories” de Administración, mediante la URL.", () => {
    cy.fixture("DOM/Page").then((fromThe) => {
      cy.visit(fromThe.dashboardPage.endpoint);

      cy.visit(fromThe.categoryPage.endpoint);

      cy.url().should("include", "/Admin/Category.aspx");

      cy.get(fromThe.categoryPage.title)
        .should("be.visible")
        .should("have.text", "Categories");
    });
  });

  it("US 002 - TS 002 - TC 002 - Validar, redireccionar a la Interfaz “Categories” de Administración, mediante el TabMenu, seleccionando la opción funcional “Categories”.", () => {
    cy.fixture("DOM/Page").then((theFrom) => {
      cy.visit(theFrom.dashboardPage.endpoint);

      cy.get(theFrom.adminPage.tabMenu.categoriesLink)
        .should("be.visible")
        .should("not.be.disabled")
        .should("contain.text", "Categories")
        .click();

      cy.url().should("include", "/Admin/Category.aspx");

      cy.get(theFrom.categoryPage.title)
        .should("be.visible")
        .should("have.text", "Categories");
    });
  });

  it("US 002 - TS 002 - TC 003 - Intentar Validar, redireccionar a la Interfaz “Categories” de Administración, mediante el Icono de la Card Categories", () => {
    cy.fixture("DOM/Page").then((theFrom) => {
      cy.visit(theFrom.dashboardPage.endpoint);

      cy.get(theFrom.dashboardPage.card.icon.categoriesLink)
        .should("be.visible")
        .should("not.be.disabled")
        .click();

      cy.url().should("include", "/Admin/Category.aspx");

      cy.get(theFrom.categoryPage.title)
        .should("be.visible")
        .should("have.text", "Categories");
    });
  });

  it("US 002 - TS 002 - TC 004 - Intentar Validar, redireccionar a la Interfaz “Categories” de Administración, mediante el View Details de la Card Categories.", () => {
    cy.fixture("DOM/Page").then((theFrom) => {
      cy.visit(theFrom.dashboardPage.endpoint);

      cy.get(theFrom.dashboardPage.card.viewDetail.categoriesLink)
        .should("be.visible")
        .should("not.be.disabled")
        .click();

      cy.url().should("include", "/Admin/Category.aspx");

      cy.get(theFrom.categoryPage.title)
        .should("be.visible")
        .should("have.text", "Categories");
    });
  });
});
