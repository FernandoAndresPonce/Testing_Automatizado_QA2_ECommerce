class CategoryFormPage {
  get = {
    $endpoint: () => "/Admin/CategoryForm.aspx",
    $title: () => cy.get("div.card span#ContentPlaceHolder1_lblCategoryTitle"),
    $categoryNameLabel: () => cy.contains("span", "Category Name"),
    $categoryImageLabel: () => cy.contains("span", "Category Image"),
    $categoryNameInput: () =>
      cy.get("div.card input#ContentPlaceHolder1_txtName"),
    $categoryImageInput: () => cy.get("div.card input[type='file']"),
    $placeholderImg: () => cy.get("div.card img[src='Image/placeholder/placeholder.jpg']"),
    $replacePlaceholderImg: () =>  cy.get("div.card img#ContentPlaceHolder1_imgForm"),
    $addButton: () =>
      cy.get("div.page-body input#ContentPlaceHolder1_btnAccept"),
    $categoryNameMustBeInCharacterOnlyValidationErrorSpan: () =>
      cy.get("div.card span#ContentPlaceHolder1_revName"),
    $categoryNameRequiredNameValidationErrorSpan: () =>
      cy.get("div.card span#ContentPlaceHolder1_rfValidator"),
  };

  _goToEndpoint() {
    cy.visit(this.get.$endpoint());
  }

  _clickAddButton() {
    this.get.$addButton().click({ force: true });
  }

  _fillCategoryNameInput(name) {
    if (name != "") {
      this.get.$categoryNameInput().type(name);
    } else {
      this.get.$categoryNameInput().clear();
    }
  }
}

export const categoryFormPage = new CategoryFormPage();
