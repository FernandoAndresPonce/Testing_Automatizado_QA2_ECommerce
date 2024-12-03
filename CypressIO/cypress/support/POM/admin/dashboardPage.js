

class DashboardPage {

    get = {

        $breadcrumb : () => cy.get("div.card-block.danger-breadcrumb a[href='Dashboard.aspx']")
    }
}

export const dashboardPage = new DashboardPage();