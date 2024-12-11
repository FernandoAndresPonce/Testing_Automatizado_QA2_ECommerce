class CategoryPage {
  get = {
    $endpoint: () => cy.visit("/Admin/Category.aspx"),
    $title: () => cy.get("div.col-12.mobil-inputs h4.sub-title"),
    $addButton: () => cy.get("div.page-body input[value='Add Category']"),
  };

  _clickAddButton() {
    this.get.$addButton().click({ force: true });
  }
}

export const categoryPage = new CategoryPage();
