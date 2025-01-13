

class AdminPage {

    get = {

        $loader : () => cy.get(".contain"),
        $tabMenuCategoriesLink : () => cy.get("div#mCSB_1_container a[href='Category.aspx']"),
    };

    _hiddenLoader() {

        this.get.$loader().should("not.be.visible");    
    };

    _clickTabMenuCategoriesLink() {
        this.get.$tabMenuCategoriesLink().click({ force : true });
    }

};
export const adminPage = new AdminPage();
