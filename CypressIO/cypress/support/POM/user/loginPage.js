
class LoginPage {

    get = {

        $usernameInput : () => cy.get("div.row input[title='Username']"),
        $passwordInput : () => cy.get("div.row input[title='Password']"),
        $loginButton : () => cy.get("div.row input#ContentPlaceHolder1_btnLogin"),
    };

    _fillLogin( username, password ) {
        this.get.$usernameInput().type(username);
        this.get.$passwordInput().type(password);
    };

    __fillAdminLoginSuccess(){
        this.get.$usernameInput().type(Cypress.env("ADMINUSERNAME"));
        this.get.$passwordInput().type(Cypress.env("ADMINPASSWORD"));
        this.get.$loginButton().click({ force : true });
    }  
}

export const loginPage = new LoginPage();