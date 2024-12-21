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
import { initialPage } from "./POM/user/initialPage";
import { headerPage } from "./POM/user/headerPage";
import { loginPage } from "./POM/user/loginPage";
import { dashboardPage } from "./POM/admin/dashboardPage";
import { adminPage } from "./POM/admin/adminPage";
import { categoryPage } from "./POM/admin/categoryPage";
import { randomRouteGoCategory } from "../e2e/variables/elements";

Cypress.Commands.add("_$loginThenGoToDashboard", () => {
  cy.visit("/");

  initialPage._clickHomeLink();
  headerPage._clickLoginLink();
  loginPage._fillAdminLoginSuccess();
});

Cypress.Commands.add("_$loginThenRamdonCategoryByElements", () => {

  cy.visit("/");

  initialPage._clickHomeLink();
  headerPage._clickLoginLink();
  loginPage._fillAdminLoginSuccess();

  randomRouteGoCategory().click({ force: true });
});

Cypress.Commands.add("_$loginThenGoToCategoryFormByRandomElements", () => {
  cy.visit("/");

  initialPage._clickHomeLink();
  headerPage._clickLoginLink();
  loginPage._fillAdminLoginSuccess();

  randomRouteGoCategory().click({ force : true });

  cy.wait(1000);
  categoryPage._clickAddButton();
});
