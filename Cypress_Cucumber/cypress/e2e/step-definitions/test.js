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

describe("US 001 - TS 001 - TC 001 - Validar, redireccionar a la Interfaz Principal de Administración, cuando se introduce la URL correspondiente", () => {
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

