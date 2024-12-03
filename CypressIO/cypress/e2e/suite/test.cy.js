/**
 * npx cypress run --browser chrome/firefox --spec (relative pagh o * / ** /carpeta o archivo
 * */
import { initialPage } from "../../support/POM/user/initialPage";
import { headerPage } from "../../support/POM/user/headerPage";
import { loginPage } from "../../support/POM/user/loginPage";
import { dashboardPage } from "../../support/POM/admin/dashboardPage";
import { adminPage } from "../../support/POM/admin/adminPage";

describe("🔬 US 001 - TS 001 - Redireccion - Acceso a la Página Principal de Administración de FastFood", () => {
  it("US 001 - TS 001 - TC 001 - Validar, redireccionar a la Interfaz Principal de Administración, cuando se introduce la URL correspondiente", () => {
    cy.visit("/");

    initialPage.get
    .$homeLink()
    .should("be.visible")
    .click();

    cy.url().should("contain", "/User/Default.aspx");

    headerPage.get
      .$loginLink()
      .should("have.text", "Login")
      .and("not.be.empty")
      .click();

    cy.url().should("contain", "/User/Login.aspx");

    loginPage.get
      .$usernameInput()
      .should("be.visible")
      .click()
      .type(Cypress.env("adminUser").username);

    loginPage.get
      .$passwordInput()
      .should("be.visible")
      .click()
      .type(Cypress.env("ADMINPASSWORD"));

    loginPage.get
      .$loginButton()
      .should("be.visible")
      .should("be.enabled")
      .click({ force: true });

    adminPage.get.$loader().should("be.visible");

    cy.url().should("contain", "/Admin/Dashboard.aspx");
    
    dashboardPage.get.$breadcrumb().should("be.visible");
  });
});

describe("🔬 US 002 - TS 002 - Redireccion - Acceso a la Página Categories de Administración de FastFood", () => {
  beforeEach(
    "Precondicion : que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador, 🧩 AND: el Usuario se encuentra en la Interfaz Principal de Administración - Dashboard'",
    () => {
      cy.session("Login and go to Dashboard Page", () => {
        cy.adminLoginAndGoToDashboard();
      });
    }
  );
  it("US 002 - TS 002 - TC 001 - Validar la correcta redirección a la Interfaz “Categories” de Administración, mediante la URL.", () => {
    cy.fixture("DOM/Page").then((fromThe) => {
      // cy.visit(fromThe.dashboardPage.endpoint);

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
