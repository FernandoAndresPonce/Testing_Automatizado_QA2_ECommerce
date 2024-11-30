

class InitialPage {
    
    get = {
        
        homeLink: () => cy.get("div.popup-buttons>#ContentPlaceHolder1_lbHome"),
    }
    
    comportamiento () {
        this.get.homeLink()
    }
}

export const initialPage = new InitialPage();