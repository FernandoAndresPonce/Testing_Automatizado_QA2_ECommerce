

class HeaderPage {

    get = {

        $loginLink : () => cy.get("div.container a#lbLoginOrLogout")
    }

    _clickLoginLink(){
        this.get.$loginLink().click();
    }
}

export const headerPage = new HeaderPage();