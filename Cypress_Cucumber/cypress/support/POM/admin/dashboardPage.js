

class DashboardPage {

    get = {

        $endpoint : () => cy.visit("/Admin/Dashboard.aspx"),
        $breadcrumb : () => cy.get("div.card-block.danger-breadcrumb a[href='Dashboard.aspx']"),
        $categoriesCardIcoLink : () => cy.get("div.page-body i.icofont-muffin.bg-danger"),
        $categoriesCardViewDetailsLink : () => cy.get("div.page-body i#categoriesDetails"),
    };
};

export const dashboardPage = new DashboardPage();