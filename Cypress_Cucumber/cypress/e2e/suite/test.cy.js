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
import { categoryFormPage } from "../../support/POM/admin/categoryFormPage";
import { defaultPage } from "../../support/POM/user/defaultPage";

import {
  validRandomCategoryName1Character,
  validRandomCategoryName50Characters,
  invalidRandomCategoryNameOnlyNumber,
  invalidRandomCategoryNameOnlySpecialCharacter,
} from "../variables/categoryFormPage";

describe("US 001 - TS 001 - TC 001 - Redireccionar a la Interfaz Principal de Administración, cuando se introduce la URL correspondiente", () => {
  it("US 001 - TS 001 - TC 001 - Validar, redireccionar a la Interfaz Principal de Administración, cuando se introduce la URL correspondiente", () => {
    cy.visit("/");

    initialPage.get.$homeLink().should("be.visible").click();

    cy.url().should("contain", defaultPage.get.$endpoint());

    headerPage.get
      .$loginLink()
      .should("have.text", "Login")
      .and("not.be.empty")
      .click();

    cy.url().should("contain", loginPage.get.$endpoint());

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

    cy.url().should("contain", dashboardPage.get.$endpoint());

    dashboardPage.get.$breadcrumb().should("be.visible");
  });
});

describe("🔬 US 002 - TS 002 - Redireccion - Acceso a la Página Categories de Administración de FastFood", () => {
  beforeEach(
    "📝 GIVEN: que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador, 🧩 AND: el Usuario se encuentra en la Interfaz Principal de Administración - Dashboard'",
    () => {
      cy.session("Login then go to Dashboard Page", () => {
        cy._$loginThenGoToDashboard();
      });
    }
  );
  it("US 002 - TS 002 - TC 001 - Validar la correcta redirección a la Interfaz “Categories” de Administración, mediante la URL.", () => {
    categoryPage._goToEndpoint();
    cy.url().should("include", categoryPage.get.$endpoint());

    categoryPage.get
      .$title()
      .should("be.visible")
      .should("have.text", "Categories");
  });

  it("US 002 - TS 002 - TC 002 - Validar, redireccionar a la Interfaz “Categories” de Administración, mediante el TabMenu, seleccionando la opción funcional “Categories”.", () => {
    dashboardPage._goToEndpoint();

    adminPage.get
      .$tabMenuCategoriesLink()
      .should("be.visible")
      .should("not.be.disabled")
      .should("contain.text", "Categories")
      .click();

    cy.url().should("include", categoryPage.get.$endpoint());

    categoryPage.get
      .$title()
      .should("be.visible")
      .should("have.text", "Categories");
  });

  it("US 002 - TS 002 - TC 003 - Intentar Validar, redireccionar a la Interfaz “Categories” de Administración, mediante el Icono de la Card Categories", () => {
    dashboardPage._goToEndpoint();

    dashboardPage.get
      .$categoriesCardIcoLink()
      .should("be.visible")
      .should("not.be.disabled")
      .click();

    cy.url().should("include", categoryPage.get.$endpoint());

    categoryPage.get
      .$title()
      .should("be.visible")
      .should("have.text", "Categories");
  });

  it("US 002 - TS 002 - TC 004 - Intentar Validar, redireccionar a la Interfaz “Categories” de Administración, mediante el View Details de la Card Categories.", () => {
    dashboardPage._goToEndpoint();

    dashboardPage.get
      .$categoriesCardViewDetailsLink()
      .should("be.visible")
      .should("not.be.disabled")
      .click();

    cy.url().should("include", categoryPage.get.$endpoint());

    categoryPage.get
      .$title()
      .should("be.visible")
      .should("have.text", "Categories");
  });
});

describe("🔬 US 003 - TS 003 - Acceso a la Pagina Formulario de Categories de Administración de FastFood", () => {
  beforeEach(
    "📝 GIVEN: que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador, 🧩 AND: que el admin se encuentra en la Interfaz Categories de Administración ",
    () => {
      cy.session("Login then Go to Category Page", () => {
        cy._$loginThenRamdonCategoryByElements();
      });
    }
  );
  it("US 003 - TS 003 - TC 001 - Validar, redireccionar a la Interfaz “Formulario de Categories” de Administración, mediante el Botón Add.", () => {
    categoryPage._goToEndpoint();

    cy.get("title").should("exist");
    cy.title().should("eql", "FastFood - Admin");

    categoryPage.get
      .$addButton()
      .should("be.visible")
      .should("be.enabled")
      .should("contain", "Add Category")
      .click({ force: true });

    //confirmar el placeholder =>
    cy.get("input[name='ctl00$ContentPlaceHolder1$txtFastFilter']").should(
      "have.attr",
      "placeholder",
      "Category quick search..."
    );

    cy.url().should("include", categoryPage.get.$endpoint());

    categoryFormPage.get
      .$title()
      .should("be.visible")
      .should("have.text", "Add Category");
  });

  it("US 003 - TS 003 - TC 002 - Validar, redireccionar a la Interfaz “Formulario de una Categoria” de Administración, mediante la URL.", () => {
    categoryFormPage._goToEndpoint();

    cy.url().should("include", categoryFormPage.get.$endpoint());

    categoryFormPage.get
      .$title()
      .should("be.visible")
      .should("have.text", "Add Category");
  });
});

describe.skip("🔬 US 004 - TS 004 - Text Input Categoría Formulario - Completar los campos del formulario, para crear una Categoría.", () => {
  beforeEach(
    "📝 GIVEN: que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador, 🧩 AND: que el admin se encuentra en la Interfaz Add Category de Administración",

    () => {
      cy._$loginThenGoToCategoryFormByRandomElements();
    }
  );

  const valid_test_case = [
    {
      titleTC:
        "US 004 - TS 004 - TC 001 -  Validar el Text Input Category Name, al añadir un (1) carácter Alfabético (String).",
      inputTextTC: `${validRandomCategoryName1Character()}`,
    },

    {
      titleTC:
        "US 004 - TS 004 - TC 002 -  Validar el Text Input Category Name, al añadir cincuenta (50) caracteres Alfabéticos (String).",
      inputTextTC: `${validRandomCategoryName50Characters()}`,
    },
  ];

  for (let test_case of valid_test_case) {
    it(`${test_case.titleTC}`, () => {
      // categoryFormPage._goToEndpoint();

      cy.title().should("eql", "FastFood - Admin");
      cy.url().should("include", categoryFormPage.get.$endpoint());

      cy.wait(1000);

      categoryFormPage.get
        .$title()
        .should("be.visible")
        .should("have.text", "Add Category");

      categoryFormPage.get.$categoryNameLabel().should("be.visible");

      categoryFormPage.get
        .$categoryNameInput()
        .should("be.visible")
        .should("be.enabled")
        .type(test_case.inputTextTC);

      categoryFormPage.get
        .$addButton()
        .should("be.visible")
        .should("be.enabled")
        .click({ force: true });

      cy.wait(500);

      cy.url().should("include", categoryPage.get.$endpoint());
      categoryPage.get.$title().should("be.visible");
    });
  }

  const invalid_test_case = [
    {
      titleTC:
        "US 004 - TS 004 - TC 003 - Validar el Text Input Category Name, al añadir una Cadena de texto solo Numérica.",
      inputTextTC: `${invalidRandomCategoryNameOnlyNumber()}`,
      validationError: "(Name must be in character only)",
    },
    {
      titleTC:
        "US 004 - TS 004 - TC 004 - Intentar Validar el Text Input Category Name, al añadir una Cadena de texto solo caracteres Especiales.",
      inputTextTC: `${invalidRandomCategoryNameOnlySpecialCharacter()}`,
      validationError: "(Name must be in character only)",
    },
    {
      titleTC:
        "US 004 - TS 004 - TC 005 - Intentar Validar el Text Input Category Name, con cero (0) carácter, campo vacío.",
      inputTextTC: "",
      validationError: "(Required Category Name)",
    },
  ];

  for (let test_case of invalid_test_case) {
    it(`${test_case.titleTC}`, () => {
      // categoryFormPage._goToEndpoint();

      cy.title().should("eql", "FastFood - Admin");
      cy.url().should("include", categoryFormPage.get.$endpoint());

      cy.wait(1000);

      categoryFormPage.get
        .$title()
        .should("be.visible")
        .should("have.text", "Add Category");

      categoryFormPage.get.$categoryNameLabel().should("be.visible");

      categoryFormPage.get
        .$categoryNameInput()
        .should("be.visible")
        .should("be.enabled")
        .clear();

      categoryFormPage._fillCategoryNameInput(test_case.inputTextTC);

      categoryFormPage.get
        .$addButton()
        .should("be.visible")
        .should("be.enabled")
        .click({ force: true });

      cy.wait(500);

      categoryFormPage.get.$categoryNameInput().should("be.focused");

      if (test_case.inputTextTC == "") {
        cy.get("div.card span#ContentPlaceHolder1_rfValidator")
          .should("be.visible")
          .should("have.text", test_case.validationError);
      } else {
        categoryFormPage.get
          .$categoryNameMustBeInCharacterOnlyValidationSpan()
          .should("be.visible")
          .should("have.text", test_case.validationError);
      }
    });
  }
});
