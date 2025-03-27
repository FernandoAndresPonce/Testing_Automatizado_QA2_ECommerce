/**
 * npx cypress run --browser chrome/firefox --spec (relative path o * / ** /carpeta o archivo
 * */

///<reference types="cypress"/>

import { initialPage } from "../../support/POM/user/initialPage";
import { headerPage } from "../../support/POM/user/headerPage";
import { loginPage } from "../../support/POM/user/loginPage";
import { dashboardPage } from "../../support/POM/admin/dashboardPage";
import { adminPage } from "../../support/POM/admin/adminPage";
import { categoryPage } from "../../support/POM/admin/categoryPage";
import { categoryFormPage } from "../../support/POM/admin/categoryFormPage";
import { defaultPage } from "../../support/POM/user/defaultPage";

import {
  validRandomCategoryName1Character,
  validRandomCategoryName50Characters,
  invalidRandomCategoryNameOnlyNumber,
  invalidRandomCategoryNameOnlySpecialCharacter,
  validRandomCategoryNameBetween1And50Character,
  randomCategoryImage, randomCategoryImageExtension,
} from "../variables/categoryFormPage";

describe.skip("US 001 - TS 001 - TC 001 - Redireccionar a la Interfaz Principal de Administración, cuando se introduce la URL correspondiente", () => {
  it("US 001 - TS 001 - TC 001 - Validar, redireccionar a la Interfaz Principal de Administración, cuando se introduce la URL correspondiente", () => {
    cy.visit("/");

    initialPage.get.$homeLink().should("be.visible").click();

    cy.url().should("contain", defaultPage.get.$endpoint());

    headerPage.get
      .$loginLink()
      .should("have.text", "Login")
      .and("not.be.empty")
      .click();

    cy.url().should("contain", loginPage.get.$endpoint());

    loginPage.get
      .$usernameInput()
      .should("be.visible")
      .click()
      .type(Cypress.env("adminUser").username);

    loginPage.get
      .$passwordInput()
      .should("be.visible")
      .click()
      .type(Cypress.env("ADMINPASSWORD"));

    loginPage.get
      .$loginButton()
      .should("be.visible")
      .and("be.enabled")
      .click({ force: true });

    adminPage.get.$loader().should("be.visible");

    cy.url().should("contain", dashboardPage.get.$endpoint());

    dashboardPage.get.$breadcrumb().should("be.visible");
  });
});

describe.skip("🔬 US 002 - TS 002 - Redireccion - Acceso a la Página Categories de Administración de FastFood", () => {
  beforeEach(
    "📝 GIVEN: que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador, 🧩 AND: el Usuario se encuentra en la Interfaz Principal de Administración - Dashboard'",
    () => {
      cy.session("Login then go to Dashboard Page", () => {
        cy._$loginThenGoToDashboard();
      });
    }
  );
  it("US 002 - TS 002 - TC 001 - Validar la correcta redirección a la Interfaz “Categories” de Administración, mediante la URL.", () => {
    categoryPage._goToEndpoint();
    cy.url().should("include", categoryPage.get.$endpoint());

    categoryPage.get
      .$categoriesTitleLabel()
      .should("be.visible")
      .and("have.text", "Categories");
  });

  it("US 002 - TS 002 - TC 002 - Validar, redireccionar a la Interfaz “Categories” de Administración, mediante el TabMenu, seleccionando la opción funcional “Categories”.", () => {
    dashboardPage._goToEndpoint();

    adminPage.get
      .$tabMenuCategoriesLink()
      .should("be.visible")
      .and("not.be.disabled")
      .and("contain.text", "Categories")
      .click();

    cy.url().should("include", categoryPage.get.$endpoint());

    categoryPage.get
      .$categoriesTitleLabel()
      .should("be.visible")
      .and("have.text", "Categories");
  });

  it("US 002 - TS 002 - TC 003 - Intentar Validar, redireccionar a la Interfaz “Categories” de Administración, mediante el Icono de la Card Categories", () => {
    dashboardPage._goToEndpoint();

    dashboardPage.get
      .$categoriesCardIcoLink()
      .should("be.visible")
      .and("not.be.disabled")
      .click();

    cy.url().should("include", categoryPage.get.$endpoint());

    categoryPage.get
      .$categoriesTitleLabel()
      .should("be.visible")
      .and("have.text", "Categories");
  });

  it("US 002 - TS 002 - TC 004 - Intentar Validar, redireccionar a la Interfaz “Categories” de Administración, mediante el View Details de la Card Categories.", () => {
    dashboardPage._goToEndpoint();

    dashboardPage.get
      .$categoriesCardViewDetailsLink()
      .should("be.visible")
      .and("not.be.disabled")
      .click();

    cy.url().should("include", categoryPage.get.$endpoint());

    categoryPage.get
      .$categoriesTitleLabel()
      .should("be.visible")
      .and("have.text", "Categories");
  });
});

describe.skip("🔬 US 003 - TS 003 - Acceso a la Pagina Formulario de Categories de Administración de FastFood", () => {
  beforeEach(
    "📝 GIVEN: que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador, 🧩 AND: que el admin se encuentra en la Interfaz Categories de Administración ",
    () => {
      cy.session("Login then Go to Category Page", () => {
        cy._$loginThenRamdonCategoryByElements();
      });
    }
  );
  it("US 003 - TS 003 - TC 001 - Validar, redireccionar a la Interfaz “Formulario de Categories” de Administración, mediante el Botón Add.", () => {
    categoryPage._goToEndpoint();

    cy.get("title").should("exist");
    cy.title().should("eql", "FastFood - Admin");

    //confirmar el placeholder =>
    cy.get("input[name='ctl00$ContentPlaceHolder1$txtFastFilter']").should(
      "have.attr",
      "placeholder",
      "Category quick search..."
    );

    categoryPage.get
      .$addButton()
      .should("be.visible")
      .and("be.enabled")
      .and("contain", "Add Category");

    categoryPage._clickAddButton();

    cy.wait(2000);

    cy.url().should("include", categoryFormPage.get.$endpoint());

    categoryFormPage.get
      .$addCategoryTitleLabel()
      .should("be.visible")
      .and("have.text", "Add Category");
  });

  it("US 003 - TS 003 - TC 002 - Validar, redireccionar a la Interfaz “Formulario de una Categoria” de Administración, mediante la URL.", () => {
    categoryFormPage._goToEndpoint();

    cy.wait(2000);

    cy.url().should("include", categoryFormPage.get.$endpoint());

    categoryFormPage.get
      .$addCategoryTitleLabel()
      .should("be.visible")
      .and("have.text", "Add Category");
  });
});

describe.skip("🔬 US 004 - TS 004 - Text Input Categoría Formulario - Completar los campos del formulario, para crear una Categoría.", () => {
  beforeEach(
    "📝 GIVEN: que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador, 🧩 AND: que el admin se encuentra en la Interfaz Add Category de Administración",

    () => {
      cy._$loginThenGoToCategoryFormByRandomElements();
    }
  );

  const valid_test_case = [
    {
      titleTC:
        "US 004 - TS 004 - TC 001 -  Validar el Text Input Category Name, al añadir un (1) carácter Alfabético (String).",
      inputTextTC: `${validRandomCategoryName1Character()}`,
    },

    {
      titleTC:
        "US 004 - TS 004 - TC 002 -  Validar el Text Input Category Name, al añadir cincuenta (50) caracteres Alfabéticos (String).",
      inputTextTC: `${validRandomCategoryName50Characters()}`,
    },
  ];

  for (let test_case of valid_test_case) {
    it(`${test_case.titleTC}`, () => {
      // categoryFormPage._goToEndpoint();

      cy.title().should("eql", "FastFood - Admin");
      cy.url().should("include", categoryFormPage.get.$endpoint());

      cy.wait(1000);

      categoryFormPage.get
        .$addCategoryTitleLabel()
        .should("be.visible")
        .and("have.text", "Add Category");

      categoryFormPage.get.$categoryNameLabel().should("be.visible");

      const dataCategoryName = test_case.inputTextTC;
      const dataCategoryNameLenght = dataCategoryName.length;

      if (dataCategoryNameLenght >= 1 && dataCategoryNameLenght <= 50) {
        categoryFormPage.get
          .$categoryNameInput()
          .should("be.visible")
          .and("be.enabled")
          .type(dataCategoryName);
      } else {
        if (dataCategoryNameLenght > 50) {
          cy.log(
            "Max caracteres permitido 50 | Caracteres : " +
              dataCategoryNameLenght
          );
        } else {
          cy.log(
            "Min caracteres permitido 1 | Caracteres : " +
              dataCategoryNameLenght
          );
        }
      }

      categoryFormPage.get
        .$addButton()
        .should("be.visible")
        .and("be.enabled")
        .click({ force: true });

      cy.wait(500);

      cy.url().should("include", categoryPage.get.$endpoint());
      categoryPage.get.$categoriesTitleLabel().should("be.visible");
    });
  }

  const invalid_test_case = [
    {
      titleTC:
        "US 004 - TS 004 - TC 003 - Validar el Text Input Category Name, al añadir una Cadena de texto solo Numérica.",
      inputTextTC: `${invalidRandomCategoryNameOnlyNumber()}`,
      validationError: "(Name must be in character only)",
    },
    {
      titleTC:
        "US 004 - TS 004 - TC 004 - Intentar Validar el Text Input Category Name, al añadir una Cadena de texto solo caracteres Especiales.",
      inputTextTC: `${invalidRandomCategoryNameOnlySpecialCharacter()}`,
      validationError: "(Name must be in character only)",
    },
    {
      titleTC:
        "US 004 - TS 004 - TC 005 - Intentar Validar el Text Input Category Name, con cero (0) carácter, campo vacío.",
      inputTextTC: "",
      validationError: "(Required Category Name)",
    },
  ];

  for (let test_case of invalid_test_case) {
    console.log("Ejecutando caso de prueba:", test_case.titleTC);
    it(`${test_case.titleTC}`, () => {
      // categoryFormPage._goToEndpoint();

      cy.title().should("eql", "FastFood - Admin");
      cy.url().should("include", categoryFormPage.get.$endpoint());

      cy.wait(1000);

      categoryFormPage.get
        .$addCategoryTitleLabel()
        .should("be.visible")
        .and("have.text", "Add Category");

      categoryFormPage.get.$categoryNameLabel().should("be.visible");

      categoryFormPage.get
        .$categoryNameInput()
        .should("be.visible")
        .and("be.enabled")
        .clear();

      const dataCategoryName = test_case.inputTextTC;
      categoryFormPage._fillCategoryNameInput(dataCategoryName);

      categoryFormPage.get
        .$addButton()
        .should("be.visible")
        .and("be.enabled")
        .click({ force: true });

      cy.wait(500);

      categoryFormPage.get.$categoryNameInput().should("be.focused");

      //validar la longuitud de la data.

      const dataCategoryNameLenght = dataCategoryName.length;
      cy.log("lenght : " + dataCategoryNameLenght);
      if (dataCategoryNameLenght >= 1 && dataCategoryNameLenght <= 50) {
        categoryFormPage.get
          .$categoryNameMustBeInCharacterOnlyValidationErrorSpan()
          .should("be.visible")
          .and("have.text", test_case.validationError);
      } else if (dataCategoryNameLenght == 0) {
        categoryFormPage.get
          .$categoryNameRequiredNameValidationErrorSpan()
          .should("be.visible")
          .and("have.text", test_case.validationError);
      }
    });
  }
});

describe.skip("🔬 US 005 - TS 005 - File Input Categoría Formulario - Previsualizacion de una imagen al ingresar un dato en el File Input.", () => {
  beforeEach(
    "📝 GIVEN: que el Usuario esta Logeado como Admin,  🧩 AND: que el admin se encuentra en la Interfaz Add Category de Administración.",
    () => {
      cy.session("Login then Go to Category Page", () => {
        cy._$loginThenGoToDashboard();
      });

      dashboardPage._goToEndpoint();
      dashboardPage._clickGoToCategoryByRandomElements();
      categoryPage._clickAddButton();
    }
  );

  it("US 005 - TS 005 - TC 001 - Validar, cargar previsualización de una imagen, al ingresar una imagen en el File-Input.", () => {
    categoryFormPage.get
      .$categoryImageLabel()
      .should("be.visible")
      .and("have.text", "Category Image");

    categoryFormPage.get
      .$categoryImageInput()
      .should("be.visible")
      .and("be.enabled");

    categoryFormPage.get.$placeholderImg().should("be.visible");

    categoryFormPage.get
      .$categoryImageInput()
      .selectFile(`cypress/e2e/suite/Image/${randomCategoryImage()}`);

    categoryFormPage.get
      .$categoryImageInput()
      .invoke("val")
      .then((textImageInput) => {
        cy.log("Input value: " + textImageInput);

        expect(textImageInput).to.contain(textImageInput);
      });

    categoryFormPage.get
      .$replacePlaceholderImg()
      .should("be.visible")
      .and("have.prop", "naturalWidth")
      .then((imageWidth) => {
        cy.log(imageWidth);
        expect(imageWidth).to.greaterThan(0);
      });

    categoryFormPage.get.$placeholderImg().should("not.exist");
  });

  it("US 005 - TS 005 - TC 002 - Validar, No cargar previsualización de una imagen.", () => {
    categoryFormPage.get
      .$categoryImageLabel()
      .should("be.visible")
      .and("have.text", "Category Image");

    categoryFormPage.get
      .$categoryImageInput()
      .should("be.visible")
      .and("be.enabled");

    categoryFormPage.get
      .$categoryImageInput()
      .invoke("val")
      .then((textImageInput) => {
        cy.log("Input value: " + textImageInput);

        expect(textImageInput).to.contain("");

        categoryFormPage.get
          .$placeholderImg()
          .should("be.visible")
          .and("exist");
      });
  });

  it("US 005 - TS 005 - TC 003 - Validar, Cargar previsualización de una imagen,  al No ingresar una imagen en el File-Input.", () => {
    categoryFormPage.get
      .$categoryImageLabel()
      .should("be.visible")
      .and("have.text", "Category Image");

    categoryFormPage.get
      .$categoryImageInput()
      .should("be.visible")
      .and("be.enabled");

    categoryFormPage.get.$categoryImageInput().selectFile([]);

    categoryFormPage.get
      .$categoryImageInput()
      .invoke("val")
      .then((textImageInput) => {
        cy.log("Input value: " + textImageInput);

        expect(textImageInput).to.contain(textImageInput);
      });

    categoryFormPage.get
      .$replacePlaceholderImg()
      .should("be.visible")
      .and("have.prop", "naturalWidth")
      .then((imageWidth) => {
        cy.log(imageWidth);
        expect(imageWidth).to.greaterThan(0);
      });

    categoryFormPage.get.$placeholderImg().should("be.visible").and("exist");
  });
});

describe.skip("🔬 US 006 - TS 006 - File Input Categoría Formulario - Completar los campos del formulario, para crear una Categoría.", () => {
  beforeEach(
    "📝 GIVEN: que el Usuario esta Logeado como Admin,  🧩 AND: que el admin se encuentra en la Interfaz Add Category de Administración, 🧩 AND: completa el Text Input “Category Name”, con una Cadena de Texto valida.",
    () => {
      cy.session("Login then Go to Category Page.", () => {
        cy._$loginThenGoToDashboard();
      });

      dashboardPage._goToEndpoint();
      dashboardPage._clickGoToCategoryByRandomElements();
      categoryPage._clickAddButton();
      categoryFormPage._fillCategoryNameInput(
        validRandomCategoryNameBetween1And50Character()
      );
    }
  );

  it("US 006 - TS 006 - TC 001 -  Validar - Crear una categoria existosamente, al ingresar un imagen en el file-input.", () => {
    categoryFormPage.get
      .$categoryImageLabel()
      .should("be.visible")
      .and("have.text", "Category Image");

    categoryFormPage.get
      .$categoryNameInput()
      .should("be.visible")
      .and("be.enabled");

    categoryFormPage.get.$placeholderImg().should("be.visible").and("exist");

    categoryFormPage._uploadCategoryImageFileInput(
      Cypress.env("path").imagePath + randomCategoryImage()
    );

    categoryFormPage._clickAddButton();

    cy.url().should("contain", categoryPage.get.$endpoint());

    categoryPage.get
      .$categoriesTitleLabel()
      .should("be.visible")
      .and("have.text", "Categories");

    cy.get("div.page-body table#ContentPlaceHolder1_dgvCategory").should(
      "be.visible"
    );
  });

  it("US 006 - TS 006 - TC 002 -  Validar - Crear una categoria existosamente, al no ingresar ninguna imagen en el file-input.", () => {
    categoryFormPage.get
      .$categoryImageLabel()
      .should("be.visible")
      .and("have.text", "Category Image");

    categoryFormPage.get
      .$categoryNameInput()
      .should("be.visible")
      .and("be.enabled");

    categoryFormPage.get.$placeholderImg().should("be.visible").and("exist");

    categoryFormPage._uploadCategoryImageFileInput([]);

    categoryFormPage._clickAddButton();

    cy.url().should("contain", categoryPage.get.$endpoint());

    categoryPage.get
      .$categoriesTitleLabel()
      .should("be.visible")
      .and("have.text", "Categories");

    categoryPage.get.$categoriesTable().should("be.visible");
  });
});

describe("🐞 => 🔬 US 007 - File Input Categoría Formulario - Previsualizacion de una imagen al ingresar diferentes extensiones en el File Input.", () => {
  beforeEach(
    "📝 GIVEN: que el Usuario esta Logeado como Admin,  🧩 AND: que el admin se encuentra en la Interfaz Add Category de Administración.",
    () => {
      cy.session(
        "Login, and then go to interface /Admin/CategoryForm.aspx ",
        () => {
          cy._$loginThenGoToCategoryFormByRandomElements();
        }
      );
    }
  );

  const valid_test_case = [
    {
      titleTC:
        "US 007 - TS 007 - TC 001 -  Intentar Validar el File Input Category Image, al añadir la extension bmp",
      extension: ".bmp",
    },

    {
      titleTC:
        "US 007 - TS 007 - TC 002 - Intentar Validar el File Input Category Image, al añadir la extension eps",
      extension: ".eps",
    },

    {
      titleTC:
        "US 007 - TS 007 - TC 003 - Intentar Validar el File Input Category Image, al añadir la extension gif",
      extension: ".gif",
    },

    {
      titleTC:
        "US 007 - TS 007 - TC 004 - Intentar Validar el File Input Category Image, al añadir la extension jpg",
      extension: ".jpg",
    },

    {
      titleTC:
        "US 007 - TS 007 - TC 005 - Intentar Validar el File Input Category Image, al añadir la extension png",
      extension: ".png",
    },

    {
      titleTC:
        "US 007 - TS 007 - TC 006 - Intentar Validar el File Input Category Image, al añadir la extension raw",
      extension: ".raw",
    },

    {
      titleTC:
        "US 007 - TS 007 - TC 007 - Intentar Validar el File Input Category Image, al añadir la extension tiff",
      extension: ".tiff",
    },

    {
      titleTC:
        "US 007 - TS 007 - TC 008 - Intentar Validar el File Input Category Image, al añadir la extension webp",
      extension: ".webp",
    },

    {
      titleTC:
        "🐞 => US 007 - TS 007 - TC 009 - Intentar Validar el File Input Category Image, al añadir la extension svg",
      extension: ".svg",
    },

    {
      titleTC:
        "US 007 - TS 007 - TC 010 - Intentar Validar el File Input Category Image, al añadir la extension random.",
      extension: randomCategoryImageExtension(),
    },
  ];

  for (let test_case of valid_test_case) {
    it(test_case.titleTC, () => {
      categoryFormPage._goToEndpoint();

      cy.wait(1000);

      cy.url().should("contain", categoryFormPage.get.$endpoint());
      categoryFormPage.get
        .$addCategoryTitleLabel()
        .should("be.visible")
        .and("have.text", "Add Category");

      categoryFormPage.get
        .$categoryImageLabel()
        .should("be.visible")
        .and("have.text", "Category Image");

      categoryFormPage.get
        .$categoryImageInput()
        .should("be.visible")
        .and("be.enabled");

      categoryFormPage.get.$placeholderImg().should("be.visible").and("exist");

      categoryFormPage._uploadCategoryImageFileInput(
        Cypress.env("path").imageDifferentExtension +
          "Desserts" +
          test_case.extension
      );


      cy.wait(1000);
      categoryFormPage.get.$placeholderImg().should("not.exist");

      categoryFormPage.get
        .$replacePlaceholderImg()
        .should("be.visible")
        .and("exist");

      categoryFormPage.get
        .$replacePlaceholderImg()
        .should("have.prop", "naturalWidth")
        .then((imageWidth) => {
          cy.log("Image Witdh:" + imageWidth);

          expect(imageWidth).to.be.greaterThan(0);
        });

    });
  }
});
