

class AdminPage {

    get = {

        $loader : () => cy.get(".contain"),
    }

    _hiddenLoader() {

        this.get.$loader().should("not.be.visible");
    
    }

}
export const adminPage = new AdminPage();