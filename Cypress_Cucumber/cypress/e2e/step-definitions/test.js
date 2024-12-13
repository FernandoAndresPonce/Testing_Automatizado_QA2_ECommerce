// cypress run --spec **/*.feature
///<reference types="cypress"/>

import { initialPage } from "../../support/POM/user/initialPage";
import { headerPage } from "../../support/POM/user/headerPage";
import { loginPage } from "../../support/POM/user/loginPage";
import { dashboardPage } from "../../support/POM/admin/dashboardPage";
import { adminPage } from "../../support/POM/admin/adminPage";
import { categoryPage } from "../../support/POM/admin/categoryPage";
import { categoryForm } from "../../support/POM/admin/categoryFormPage";
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
        defaultPage.get.$endpoint();
      });

      When(
        "selecciona la barra de direcciones del navegador, introduce la Url para redireccionarse a la interfaz principal de Administracion",
        () => {
          dashboardPage.get.$endpoint();
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
        cy.session("Login y luego va a la Pagina Dashboard", () => {
          cy._$loginThenGoToDashboard();
        });
      }
    );

    And(
      "de que el admin se encuentra en la Interfaz Principal de Administración {string}",
      (endpoint) => {
        dashboardPage.get.$endpoint();
        cy.url().should("contain", endpoint);

        adminPage.get.$loader().should("be.visible");
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
          cy.url().should("include", "Category.aspx");

          categoryPage.get
            .$title()
            .should("be.visible")
            .should("have.text", "Categories");
        }
      );
    });
  }
);
