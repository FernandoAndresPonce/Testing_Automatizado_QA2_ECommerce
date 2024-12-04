class DefaultPage {
  get = {
    $endpoint: () => cy.visit("/User/Default.aspx"),
  };
}

export const defaultPage = new DefaultPage();
