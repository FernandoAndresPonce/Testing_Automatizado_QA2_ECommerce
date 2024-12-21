import { dashboardPage } from "../../support/POM/admin/dashboardPage";
import { adminPage } from "../../support/POM/admin/adminPage";

export const randomRouteGoCategory = () => {
  const routeCategory = [
    dashboardPage.get.$categoriesCardIcoLink(),
    dashboardPage.get.$categoriesCardViewDetailsLink(),
    adminPage.get.$tabMenuCategoriesLink(),
  ];

  const randomIndex = Math.floor(Math.random() * routeCategory.length);
  return routeCategory[randomIndex];
};
