

class InitialPage {
    
    get = {
        
        $homeLink: () => cy.get("div.popup-buttons>#ContentPlaceHolder1_lbHome"),
    }
    
    _clickHomeLink () {
        this.get.homeLink().click({ force : true })
    }
}

export const initialPage = new InitialPage();