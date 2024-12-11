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

Cypress.Commands.add("_$loginThenGoToDashboard", () => {
  cy.visit("/");
  initialPage._clickHomeLink();
  headerPage._clickLoginLink();
  loginPage._fillAdminLoginSuccess();
});

Cypress.Commands.add("_$loginThenRamdonCategoryByElements", () => {

  const routeCategory = [
    dashboardPage.get.$categoriesCardIcoLink,
    dashboardPage.get.$categoriesCardViewDetailsLink,
    adminPage.get.$tabMenuCategoriesLink,
  ];

  const randomIndex = Math.floor(Math.random() * routeCategory.length);
  const randomRouteGoCategory = routeCategory[randomIndex];

  cy.visit("/");

  initialPage._clickHomeLink();
  headerPage._clickLoginLink();
  loginPage._fillAdminLoginSuccess();

  randomRouteGoCategory().click({ force: true });
});