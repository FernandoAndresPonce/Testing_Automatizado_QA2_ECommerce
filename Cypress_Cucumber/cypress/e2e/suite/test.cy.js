/**
 * npx cypress run --browser chrome/firefox --spec (relative path o * / ** /carpeta o archivo
 * */

///<reference types="cypress"/>

import { initialPage } from "../../support/POM/user/initialPage";
import { headerPage } from "../../support/POM/user/headerPage";
import { loginPage } from "../../support/POM/user/loginPage";
import { dashboardPage } from "../../support/POM/admin/dashboardPage";
import { adminPage } from "../../support/POM/admin/adminPage";
import { categoryPage } from "../../support/POM/admin/categoryPage";
import { categoryForm } from "../../support/POM/admin/categoryFormPage";
import { defaultPage } from "../../support/POM/user/defaultPage";

describe.skip("US 001 - TS 001 - TC 001 - Redireccionar a la Interfaz Principal de Administración, cuando se introduce la URL correspondiente", () => {
  it("US 001 - TS 001 - TC 001 - Validar, redireccionar a la Interfaz Principal de Administración, cuando se introduce la URL correspondiente", () => {
    cy.visit("/");

    initialPage.get.$homeLink().should("be.visible").click();

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
      cy.session("Login then go to Dashboard Page", () => {
        cy._$loginThenGoToDashboard();
      });
    }
  );
  it("US 002 - TS 002 - TC 001 - Validar la correcta redirección a la Interfaz “Categories” de Administración, mediante la URL.", () => {
    categoryPage.get.$endpoint();
    cy.url().should("include", "/Admin/Category.aspx");

    categoryPage.get
      .$title()
      .should("be.visible")
      .should("have.text", "Categories");
  });

  it("US 002 - TS 002 - TC 002 - Validar, redireccionar a la Interfaz “Categories” de Administración, mediante el TabMenu, seleccionando la opción funcional “Categories”.", () => {
    dashboardPage.get.$endpoint();

    adminPage.get
      .$tabMenuCategoriesLink()
      .should("be.visible")
      .should("not.be.disabled")
      .should("contain.text", "Categories")
      .click();

    cy.url().should("include", "/Admin/Category.aspx");

    categoryPage.get
      .$title()
      .should("be.visible")
      .should("have.text", "Categories");
  });

  it("US 002 - TS 002 - TC 003 - Intentar Validar, redireccionar a la Interfaz “Categories” de Administración, mediante el Icono de la Card Categories", () => {
    dashboardPage.get.$endpoint();

    dashboardPage.get
      .$categoriesCardIcoLink()
      .should("be.visible")
      .should("not.be.disabled")
      .click();

    cy.url().should("include", "/Admin/Category.aspx");

    categoryPage.get
      .$title()
      .should("be.visible")
      .should("have.text", "Categories");
  });

  it("US 002 - TS 002 - TC 004 - Intentar Validar, redireccionar a la Interfaz “Categories” de Administración, mediante el View Details de la Card Categories.", () => {
    dashboardPage.get.$endpoint();

    dashboardPage.get
      .$categoriesCardViewDetailsLink()
      .should("be.visible")
      .should("not.be.disabled")
      .click();

    cy.url().should("include", "/Admin/Category.aspx");

    categoryPage.get
      .$title()
      .should("be.visible")
      .should("have.text", "Categories");
  });
});

describe("🔬 US 003 - TS 003 - Acceso a la Pagina Formulario de Categories de Administración de FastFood", () => {
  beforeEach(
    "Precondicion : que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador, 🧩 AND: que el admin se encuentra en la Interfaz Categories de Administración ",
    () => {
      cy.session("Login then Go to Category Page", () => {
        cy._$loginThenRamdonCategoryByElements();
      });
    }
  );
  it("US 003 - TS 003 - TC 001 - Validar, redireccionar a la Interfaz “Formulario de Categories” de Administración, mediante el Botón Add.", () => {
    categoryPage.get.$endpoint();

    categoryPage.get
      .$addButton()
      .should("be.visible")
      .should("be.enabled")
      .should("contain", "Add Category")
      .click({ force: true });

    cy.url().should("include", "/Admin/CategoryForm.aspx");

    categoryForm.get
      .$title()
      .should("be.visible")
      .should("have.text", "Add Category");
  });

  it("US 003 - TS 003 - TC 002 - Validar, redireccionar a la Interfaz “Formulario de una Categoria” de Administración, mediante la URL.", () => {
    categoryForm.get.$endpoint();

    cy.url().should("include", "/Admin/CategoryForm.aspx");

    categoryForm.get
      .$title()
      .should("be.visible")
      .should("have.text", "Add Category");
  });
});
