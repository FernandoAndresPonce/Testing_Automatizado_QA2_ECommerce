
import {randomRouteGoCategory} from '../../../e2e/variables/elements'

class DashboardPage {

    get = {

        $endpoint : () => "/Admin/Dashboard.aspx",
        $breadcrumb : () => cy.get("div.card-block.danger-breadcrumb a[href='Dashboard.aspx']"),
        $categoriesCardIcoLink : () => cy.get("div.page-body i.icofont-muffin.bg-danger"),
        $categoriesCardViewDetailsLink : () => cy.get("div.page-body i#categoriesDetails"),
    };

    _goToEndpoint() {
        cy.visit(this.get.$endpoint());
    }
    
    _clickCategoriesCardIcoLink () {
        this.get.$categoriesCardIcoLink().click({ force : true });
    }

    _clickGoToCategoryByRandomElements (){

        randomRouteGoCategory().click({ force : true })
    }
};

export const dashboardPage = new DashboardPage();