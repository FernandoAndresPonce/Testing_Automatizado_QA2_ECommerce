class CategoryFormPage {
  get = {
    $endpoint: () => "/Admin/CategoryForm.aspx",
    $title: () => cy.get("div.card span#ContentPlaceHolder1_lblCategoryTitle"),
    $categoryNameLabel: () => cy.contains("span","Category Name"),
    $categoryNameInput: () => cy.get("div.card input#ContentPlaceHolder1_txtName"),
    $addButton: () => cy.get("div.page-body input#ContentPlaceHolder1_btnAccept"),
  };
  
  _goToEndpoint() {
    cy.visit(this.get.$endpoint());
  };

  _clickAddButton() {
    this.get.$addButton().click({ force : true });
  };


}

export const categoryFormPage = new CategoryFormPage();
