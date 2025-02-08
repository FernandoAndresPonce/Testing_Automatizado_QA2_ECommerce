class CategoryPage {
  get = {
    $endpoint : () => "/Admin/Category.aspx",
    $categoriesTitleLabel : () => cy.get("div.col-12.mobil-inputs h4.sub-title"),
    $addButton : () => cy.get("div.page-body input[value='Add Category']"),
    $categoriesTable : () => cy.get("div.page-body table#ContentPlaceHolder1_dgvCategory"),
  };

  _goToEndpoint() {
    cy.visit(this.get.$endpoint());
  }
  _clickAddButton() {
    this.get.$addButton().click({ force: true });
  }
}

export const categoryPage = new CategoryPage();
