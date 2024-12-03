

class HeaderPage {

    get = {

        $loginLink : () => cy.get("div.container a#lbLoginOrLogout")
    }

    _clickLoginLInk(){
        this.get.$loginLink().click();
    }
}

export const headerPage = new HeaderPage();