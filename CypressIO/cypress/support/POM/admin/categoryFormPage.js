class CategoryForm {
  get = {
    $endpoint: () => cy.visit("/Admin/CategoryForm.aspx"),
    $title: () => cy.get("div.main-body span#ContentPlaceHolder1_lblCategoryTitle"),
  };
}

export const categoryForm = new CategoryForm();
