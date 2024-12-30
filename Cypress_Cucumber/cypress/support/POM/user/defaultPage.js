class DefaultPage {
  get = {

    $endpoint: () => "/User/Default.aspx",
  };

  _goToEndpoint() {
    cy.visit(this.get.$endpoint());
  }
}

export const defaultPage = new DefaultPage();
