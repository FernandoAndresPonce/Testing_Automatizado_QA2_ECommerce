// cypress run --spec **/*.feature
///<reference types="cypress"/>

import { initialPage } from "../../support/POM/user/initialPage";
import { headerPage } from "../../support/POM/user/headerPage";
import { loginPage } from "../../support/POM/user/loginPage";
import { dashboardPage } from "../../support/POM/admin/dashboardPage";
import { adminPage } from "../../support/POM/admin/adminPage";
import { categoryPage } from "../../support/POM/admin/categoryPage";
import { categoryFormPage } from "../../support/POM/admin/categoryFormPage";
import { defaultPage } from "../../support/POM/user/defaultPage";

import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

context(
  "📑 US 001 - Redirección - Acceso a la Página Principal de Administración de FastFood.",
  () => {
    describe("🧪 US 001 - TS 001 - TC 001 - Validar, redireccionar a la Interfaz Principal de Administración, cuando se introduce la URL correspondiente", () => {
      Given(
        "que el usuario se encuentra en la página principal de la plataforma",
        () => {
          cy.visit("/");
        }
      );

      And("esta Logeado como Admin", () => {
        initialPage._clickHomeLink();
        headerPage._clickLoginLink();
        loginPage._fillAdminLoginSuccess();
      });

      And("se encuentra en la Pagina Default del Usuario", () => {
        defaultPage._goToEndpoint();
      });

      When(
        "selecciona la barra de direcciones del navegador, introduce la Url para redireccionarse a la interfaz principal de Administracion",
        () => {
          dashboardPage._goToEndpoint();
        }
      );

      Then(
        "lo redirecciona a la Interfaz Principal de administración {string}",
        (endpoint) => {
          adminPage.get.$loader().should("be.visible");

          cy.url().should("contain", endpoint);

          dashboardPage.get.$breadcrumb().should("be.visible");
        }
      );
    });
  }
);

context(
  "📑 US 002 Redirección - Acceso a la Página Categories de Administración de FastFood.",
  () => {
    Given(
      "que el Usuario ha iniciado sesión con credenciales con rol Administrador",
      () => {
        cy.session("Login y luego se redirige Pagina Dashboard", () => {
          cy._$loginThenGoToDashboard();
        });
      }
    );

    And(
      "de que el admin se encuentra en la Interfaz Principal de Administración {string}",
      (endpoint) => {
        dashboardPage._goToEndpoint();
        cy.url().should("contain", endpoint);
      }
    );

    describe("🧪 US 002 - TS 002 - TC 001 - Validar la correcta redirección a la Interfaz “Categories” de Administración, mediante la URL.", () => {
      When(
        "cuando introduce la Url {string} en la barra de direcciones del navegador",
        (endpoint) => {
          cy.visit(endpoint);
          cy.url().should("contain", endpoint);

          adminPage.get.$loader().should("be.visible");
        }
      );

      Then(
        "el sistema se redirecciona a la Interfaz Categories de Administración.",
        () => {
          categoryPage.get
            .$title()
            .should("be.visible")
            .should("have.text", "Categories");
        }
      );
    });

    describe("🧪 US 002 - TS 002 - TC 002 - Validar, redireccionar a la Interfaz “Categories” de Administración, mediante el TabMenu, seleccionando la opción funcional Categories.", () => {
      When(
        "hace Click en Categories del Tab Menu visible en la parte izquierda de la pantalla",
        () => {
          adminPage._clickTabMenuCategoriesLink();
        }
      );

      Then(
        "el sistema se redirecciona a la Interfaz Categories de Administración.",
        () => {
          cy.url().should("include", categoryPage.get.$endpoint());

          categoryPage.get
            .$title()
            .should("be.visible")
            .should("have.text", "Categories");
        }
      );
    });

    describe("🧪 US 002 - TS 002 - TC 003 - Intentar Validar, redireccionar a la Interfaz “Categories” de Administración, mediante el Icono de la Card Categories.", () => {
      When("hace Click en el Icono de la Card Categories", () => {
        dashboardPage.get
          .$categoriesCardIcoLink()
          .should("be.visible")
          .should("not.be.disabled")
          .click({ force: true });
      });

      Then(
        "el sistema se redirecciona a la Interfaz Categories de Administración.",
        () => {
          adminPage.get.$loader().should("be.visible");

          categoryPage.get
            .$title()
            .should("have.text", "Categories")
            .should("be.visible");
        }
      );
    });

    describe("🧪 US 002 - TS 002 - TC 004 - Intentar Validar, redireccionar a la Interfaz “Categories” de Administración, mediante el View Details de la Card Categories.", () => {
      When("hace Click en el View Details de la Card Categories", () => {
        dashboardPage.get
          .$categoriesCardViewDetailsLink()
          .should("be.visible")
          .should("not.be.disabled")
          .click({ force: true });
      });

      Then(
        "el sistema se redirecciona a la Interfaz Categories de Administración.",
        () => {
          adminPage.get.$loader().should("be.visible");

          categoryPage.get
            .$title()
            .should("have.text", "Categories")
            .should("be.visible");
        }
      );
    });
  }
);

context(
  "📑 - US 003 - Redirección - Acceso a la Pagina Add Category de Administración de FastFood.",
  () => {
    Given(
      "que el Usuario ha iniciado sesión con credenciales con rol Administrador",
      () => {}
    );
    And(
      "de que el admin se encuentra en la Interfaz Category de Administración como {string}",
      (endpoint) => {
        dashboardPage._goToEndpoint();
        dashboardPage._clickGoToCategoryByRandomElements();

        cy.url().should("contain", endpoint);
      }
    );

    describe("🧪 US 003 - TS 003 - TC 001 - Validar, redireccionar a la Interfaz “Formulario de Categories” de Administración, mediante el Botón Add.", () => {
      When("hace Click en el Boton Add", () => {
        categoryPage.get
          .$addButton()
          .should("be.visible")
          .should("be.enabled")
          .should("contain", "Add Category")
          .click({ force: true });

        adminPage.get.$loader().should("be.visible");
      });

      Then(
        "el sistema se redirecciona a la Interfaz Add Category de Administración como {string}.",
        (endpoint) => {
          cy.url().should("include", endpoint);
          categoryFormPage.get
            .$title()
            .should("be.visible")
            .should("have.text", "Add Category");
        }
      );
    });

    describe("🧪 US 003 - TS 003 - TC 002 - Validar, redireccionar a la Interfaz “Formulario de una Categoria” de Administración, mediante la URL.", () => {
      When(
        "cuando introduce la Url {string} en la barra de direcciones del navegador",
        (endpoint) => {
          cy.visit(endpoint);

          adminPage.get.$loader().should("be.visible");
        }
      );

      Then(
        "el sistema se redirecciona a la Interfaz Add Category de Administración como {string}.",
        (endpoint) => {
          cy.url().should("contain", endpoint);
          categoryFormPage.get
            .$title()
            .should("be.visible")
            .should("have.text", "Add Category");
        }
      );
    });
  }
);

context(
  "📑 US 004 - Text Input Categoría Formulario - Completar los campos del formulario, para crear una Categoría.",
  () => {
    Given(
      "que el Usuario ha iniciado sesión con credenciales con rol Administrador",
      () => {}
    );

    And(
      "de que el admin se encuentra en la Interfaz del Formulario para crear una Categoria de Administración como {string}",
      (endpoint) => {
        categoryFormPage._goToEndpoint();
        cy.url().should("contain", endpoint);
        categoryFormPage.get
          .$title()
          .should("be.visible")
          .should("have.text", "Add Category");
      }
    );

    describe("🧪 US 004 - TS 004 - TC 001 -  Validar, completar campo Category Name exitosamente, al ingresar datos Validos.", () => {
      When(
        "el usuario ingresa un dato como {string} en el campo Category Name",
        (dato) => {
          categoryFormPage.get
            .$categoryNameLabel()
            .should("be.visible")
            .should("have.text", "Category Name");

          categoryFormPage.get
            .$categoryNameInput()
            .should("be.visible")
            .should("be.enabled");

          categoryFormPage._fillCategoryNameInput(dato);
        }
      );
    });
  }
);
