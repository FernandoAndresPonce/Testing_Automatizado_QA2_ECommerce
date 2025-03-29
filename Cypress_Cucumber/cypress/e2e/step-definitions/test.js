// cypress run --spec **/*.feature
///<reference types="cypress"/>

import { initialPage } from "../../support/POM/user/initialPage";
import { headerPage } from "../../support/POM/user/headerPage";
import { loginPage } from "../../support/POM/user/loginPage";
import { dashboardPage } from "../../support/POM/admin/dashboardPage";
import { adminPage } from "../../support/POM/admin/adminPage";
import { categoryPage } from "../../support/POM/admin/categoryPage";
import { categoryFormPage } from "../../support/POM/admin/categoryFormPage";
import { defaultPage } from "../../support/POM/user/defaultPage";
import { imagePath } from "../variables/path";
import {
  randomCategoryImage,
  validRandomCategoryNameBetween1And50Character,
} from "../variables/categoryFormPage";

import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

context(
  "📑 US 001 - Redirección - Acceso a la Página Principal de Administración de FastFood.",
  () => {
    describe("🧪 US 001 - TS 001 - TC 001 - Validar, redireccionar a la Interfaz Principal de Administración, cuando se introduce la URL correspondiente", () => {
      Given(
        "que el usuario se encuentra en la página principal de la plataforma",
        () => {
          cy.visit("/");
        }
      );

      And("esta Logeado como Admin", () => {
        initialPage._clickHomeLink();
        headerPage._clickLoginLink();
        loginPage._fillAdminLoginSuccess();
      });

      And("se encuentra en la Pagina Default del Usuario", () => {
        defaultPage._goToEndpoint();
      });

      When(
        "selecciona la barra de direcciones del navegador, introduce la Url para redireccionarse a la interfaz principal de Administracion",
        () => {
          dashboardPage._goToEndpoint();
        }
      );

      Then(
        "lo redirecciona a la Interfaz Principal de administración {string}",
        (endpoint) => {
          adminPage.get.$loader().should("be.visible");

          cy.url().should("contain", endpoint);

          dashboardPage.get.$breadcrumb().should("be.visible");
        }
      );
    });
  }
);

context(
  "📑 US 002 Redirección - Acceso a la Página Categories de Administración de FastFood.",
  () => {
    Given(
      "que el Usuario ha iniciado sesión con credenciales con rol Administrador",
      () => {
        cy.session("Login y luego se redirige Pagina Dashboard", () => {
          cy._$loginThenGoToDashboard();
        });
      }
    );

    And(
      "de que el admin se encuentra en la Interfaz Principal de Administración {string}",
      (endpoint) => {
        dashboardPage._goToEndpoint();
        cy.url().should("contain", endpoint);
      }
    );

    describe("🧪 US 002 - TS 002 - TC 001 - Validar la correcta redirección a la Interfaz “Categories” de Administración, mediante la URL.", () => {
      When(
        "cuando introduce la Url {string} en la barra de direcciones del navegador",
        (endpoint) => {
          cy.visit(endpoint);
          cy.url().should("contain", endpoint);

          adminPage.get.$loader().should("be.visible");
        }
      );

      Then(
        "el sistema se redirecciona a la Interfaz Categories de Administración.",
        () => {
          categoryPage.get
            .$categoriesTitleLabel()
            .should("be.visible")
            .should("have.text", "Categories");
        }
      );
    });

    describe("🧪 US 002 - TS 002 - TC 002 - Validar, redireccionar a la Interfaz “Categories” de Administración, mediante el TabMenu, seleccionando la opción funcional Categories.", () => {
      When(
        "hace Click en Categories del Tab Menu visible en la parte izquierda de la pantalla",
        () => {
          adminPage._clickTabMenuCategoriesLink();
        }
      );

      Then(
        "el sistema se redirecciona a la Interfaz Categories de Administración.",
        () => {
          cy.url().should("include", categoryPage.get.$endpoint());

          categoryPage.get
            .$categoriesTitleLabel()
            .should("be.visible")
            .should("have.text", "Categories");
        }
      );
    });

    describe("🧪 US 002 - TS 002 - TC 003 - Intentar Validar, redireccionar a la Interfaz “Categories” de Administración, mediante el Icono de la Card Categories.", () => {
      When("hace Click en el Icono de la Card Categories", () => {
        dashboardPage.get
          .$categoriesCardIcoLink()
          .should("be.visible")
          .should("not.be.disabled")
          .click({ force: true });
      });

      Then(
        "el sistema se redirecciona a la Interfaz Categories de Administración.",
        () => {
          adminPage.get.$loader().should("be.visible");

          categoryPage.get
            .$categoriesTitleLabel()
            .should("have.text", "Categories")
            .should("be.visible");
        }
      );
    });

    describe("🧪 US 002 - TS 002 - TC 004 - Intentar Validar, redireccionar a la Interfaz “Categories” de Administración, mediante el View Details de la Card Categories.", () => {
      When("hace Click en el View Details de la Card Categories", () => {
        dashboardPage.get
          .$categoriesCardViewDetailsLink()
          .should("be.visible")
          .should("not.be.disabled")
          .click({ force: true });
      });

      Then(
        "el sistema se redirecciona a la Interfaz Categories de Administración.",
        () => {
          adminPage.get.$loader().should("be.visible");

          categoryPage.get
            .$categoriesTitleLabel()
            .should("have.text", "Categories")
            .should("be.visible");
        }
      );
    });
  }
);

context(
  "📑 - US 003 - Redirección - Acceso a la Pagina Add Category de Administración de FastFood.",
  () => {
    Given(
      "que el Usuario ha iniciado sesión con credenciales con rol Administrador",
      () => {}
    );
    And(
      "de que el admin se encuentra en la Interfaz Category de Administración como {string}",
      (endpoint) => {
        dashboardPage._goToEndpoint();
        dashboardPage._clickGoToCategoryByRandomElements();

        cy.url().should("contain", endpoint);
      }
    );

    describe("🧪 US 003 - TS 003 - TC 001 - Validar, redireccionar a la Interfaz “Formulario de Categories” de Administración, mediante el Botón Add.", () => {
      When("hace Click en el Boton Add", () => {
        categoryPage.get
          .$addButton()
          .should("be.visible")
          .should("be.enabled")
          .should("contain", "Add Category")
          .click({ force: true });

        adminPage.get.$loader().should("be.visible");
      });

      Then(
        "el sistema se redirecciona a la Interfaz Add Category de Administración como {string}.",
        (endpoint) => {
          cy.url().should("include", endpoint);
          categoryFormPage.get
            .$addCategoryTitleLabel()
            .should("be.visible")
            .should("have.text", "Add Category");
        }
      );
    });

    describe("🧪 US 003 - TS 003 - TC 002 - Validar, redireccionar a la Interfaz “Formulario de una Categoria” de Administración, mediante la URL.", () => {
      When(
        "cuando introduce la Url {string} en la barra de direcciones del navegador",
        (endpoint) => {
          cy.visit(endpoint);

          adminPage.get.$loader().should("be.visible");
        }
      );

      Then(
        "el sistema se redirecciona a la Interfaz Add Category de Administración como {string}.",
        (endpoint) => {
          cy.url().should("contain", endpoint);
          categoryFormPage.get
            .$addCategoryTitleLabel()
            .should("be.visible")
            .should("have.text", "Add Category");
        }
      );
    });
  }
);

context(
  "📑 US 004 - Text Input Categoría Formulario - Completar los campos del formulario, para crear una Categoría.",
  () => {
    Given(
      "que el Usuario ha iniciado sesión con credenciales con rol Administrador",
      () => {}
    );

    And(
      "de que el admin se encuentra en la Interfaz del Formulario para crear una Categoria de Administración como {string}",
      (endpoint) => {
        categoryFormPage._goToEndpoint();
        cy.url().should("contain", endpoint);
        categoryFormPage.get
          .$addCategoryTitleLabel()
          .should("be.visible")
          .should("have.text", "Add Category");
      }
    );

    describe("🧪 US 004 - TS 004 - TC 001 -  Validar, completar campo Category Name exitosamente, al ingresar datos Validos.", () => {
      When(
        "el usuario ingresa un dato valido como {string} en el campo Category Name",
        (valid_data) => {
          categoryFormPage.get
            .$categoryNameLabel()
            .should("be.visible")
            .should("have.text", "Category Name");

          categoryFormPage.get
            .$categoryNameInput()
            .should("be.visible")
            .should("be.enabled");

          categoryFormPage._fillCategoryNameInput(valid_data);
        }
      );

      And("presiona el botón Add", () => {
        cy.get("div.page-body input[value='Add']")
          .should("be.visible")
          .should("be.enabled")
          .click({ force: true });
      });

      Then(
        "el sistema lo redireccionara automaticament a la página Category como {string}.",
        (endpoint) => {
          cy.url().should("contain", endpoint);
          categoryPage.get.$categoriesTitleLabel().should("be.visible");
        }
      );
    });

    describe("🧪 US 004 - TS 004 - TC 002 -  Validar, completar campo Category Name Incorrectamente, al ingresar datos Invalidos.", () => {
      When(
        "el usuario ingresa un dato invalido como {string} en el campo Category Name",
        (invalid_data) => {
          // Cypress.env("categoryData", invalid_data);
          // or
          cy.wrap(invalid_data).as("categoryData");

          categoryFormPage.get
            .$categoryNameLabel()
            .should("be.visible")
            .should("have.text", "Category Name");

          categoryFormPage.get
            .$categoryNameInput()
            .should("be.enabled")
            .should("be.visible");

          categoryFormPage._fillCategoryNameInput(invalid_data);
        }
      );
      And("presiona el botón Add", () => {
        categoryFormPage.get
          .$addButton()
          .should("be.enabled")
          .should("be.visible");

        categoryFormPage._clickAddButton();
      });

      Then(
        "debería el sistema redirigirlo automaticamente hacia el Text Input Category Name",
        () => {
          categoryFormPage.get.$categoryNameInput().should("be.focused");
        }
      );
      And(
        "debería aparecer una advertencia con un mensaje de color rojo, al lado derecho de la Label Category Name, con la Advertencia de Error como {string}.",
        function (validationError) {
          let data = this.categoryData;
          cy.log("Data :" + data);

          if (data != "") {
            categoryFormPage.get
              .$categoryNameMustBeInCharacterOnlyValidationErrorSpan()
              .should("be.visible")
              .should("have.text", validationError);
          } else {
            categoryFormPage.get
              .$categoryNameRequiredNameValidationErrorSpan()
              .should("be.visible")
              .should("have.text", validationError);
          }
        }
      );
    });
  }
);

context(
  "📑 US 005 - File Input Categoría Formulario - Previsualizacion de una imagen al ingresar un dato en el File Input.",
  () => {
    Given(
      "que el Usuario ha iniciado sesión con credenciales con rol Administrador",
      () => {}
    );
    And(
      "se encuentra en la Interfaz Formulario Add Category de Administración como {string}",
      (endpoint) => {
        categoryFormPage._goToEndpoint();

        cy.url().should("include", endpoint);

        categoryFormPage.get
          .$addCategoryTitleLabel()
          .should("be.visible")
          .and("have.text", "Add Category");
      }
    );

    describe("🧪 US 005 - TS 005 - TC 001: Validar, cargar previsualización de una imagen, al ingresar una imagen en el File-Input.", () => {
      When("hace Click en el File Input Category Image", () => {
        cy.wait(500);

        categoryFormPage.get
          .$categoryImageLabel()
          .should("be.visible")
          .and("have.text", "Category Image");

        categoryFormPage.get.$placeholderImg().should("be.visible");

        categoryFormPage.get
          .$categoryImageInput()
          .should("be.visible")
          .and("be.enabled")
          .click({ force: true });
      });

      And("carga una Imagen como {string}", (image) => {
        categoryFormPage._uploadCategoryImageFileInput(
          Cypress.env("path").imagePath + image
        );

        categoryFormPage.get
          .$categoryImageInput()
          .invoke("val")
          .then((dataImageInput) => {
            cy.log(dataImageInput);
            expect(dataImageInput).be.include(image);
          });
      });

      Then("deberia previsualizarse la imagen añadida.", () => {
        categoryFormPage.get
          .$replacePlaceholderImg()
          .should("be.visible")
          .and("have.prop", "naturalWidth")
          .then((imageWidth) => {
            cy.log("Width: " + imageWidth);
            expect(imageWidth).to.be.greaterThan(0);
          });
        categoryFormPage.get.$placeholderImg().should("not.exist");
      });
    });

    describe("🧪 US 005 - TS 005 - TC 002: Validar, No cargar previsualización de una imagen.", () => {
      Then(
        "deberia previsualizarse un Placeholder, como imagen pre establecida.",
        () => {
          cy.wait(500);

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
              cy.log("Data: " + textImageInput);

              expect(textImageInput).to.be.eql("");
            });

          categoryFormPage.get
            .$placeholderImg()
            .should("be.visible")
            .and("exist");
        }
      );
    });

    describe("🧪 US 005 - TS 005 - TC 003: Validar, Intentar cargar previsualización de una imagen,  al No ingresar una imagen en el File-Input.", () => {
      When("hace Click en el File Input Category Image", () => {
        categoryFormPage.get
          .$categoryImageLabel()
          .should("be.visible")
          .and("be.enabled")
          .and("have.text", "Category Image");

        categoryFormPage.get
          .$categoryImageInput()
          .should("be.visible")
          .and("be.enabled")
          .click({ force: true });
      });

      And("NO carga ninguna Imagen", () => {
        categoryFormPage._uploadCategoryImageFileInput([]);

        //No es necesario esta logica, ya que esta desarrollada en el then =>
        // categoryFormPage.get.$categoryImageInput().invoke("val").then((dataImageInput) => {

        //   cy.log("Data Input: " + dataImageInput)
        //   expect(dataImageInput).to.be.eqls("");
        // });
        Then(
          "deberia previsualizarse un Placeholder, como imagen pre establecida.",
          () => {}
        );
      });
    });
  }
);

context(
  "📑 US 006 - File Input Categoría Formulario - Completar los campos del formulario, para crear una Categoría.",
  () => {
    Given(
      "que el Usuario ha iniciado sesión con credenciales con rol Administrador",
      () => {}
    );
    And(
      "se encuentra en la Interfaz Formulario Add Category de Administración como {string}",
      (endpoint) => {}
    );
    And(
      "completa el Text Input “Category Name”, con una Cadena de Texto valida.",
      () => {
        categoryFormPage.get
          .$categoryNameInput()
          .should("be.visible")
          .and("be.enabled");

        categoryFormPage._fillCategoryNameInput(
          validRandomCategoryNameBetween1And50Character()
        );
      }
    );

    describe("🧪 US 006 - TS 006 - TC 001:  Validar - Crear una categoria existosamente, al ingresar un imagen en el file-input.", () => {
      When("carga una imagen valida, en el File Input Category Image", () => {
        categoryFormPage.get
          .$categoryImageLabel()
          .should("be.visible")
          .and("have.text", "Category Image");

        categoryFormPage.get
          .$categoryImageInput()
          .should("be.visible")
          .and("be.enabled");

        categoryFormPage.get
          .$placeholderImg()
          .should("be.visible")
          .and("exist");

        const image = randomCategoryImage();

        categoryFormPage._uploadCategoryImageFileInput(
          Cypress.env("path").imagePath + image
        );

        categoryFormPage.get
          .$categoryImageInput()
          .invoke("val")
          .then((dataImageInput) => {
            cy.log("Data Image Input: " + dataImageInput);

            expect(dataImageInput).to.be.include(image);
          });

        cy.wait(500);
        categoryFormPage.get.$placeholderImg().should("not.exist");

        categoryFormPage.get
          .$replacePlaceholderImg()
          .should("be.visible")
          .and("exist")
          .and("have.prop", "naturalWidth")
          .then((imageWidth) => {
            cy.log("Image Width: " + imageWidth);

            expect(imageWidth).to.greaterThan(1);
          });
      });

      And("hace click en el boton Add", () => {
        categoryFormPage.get
          .$addButton()
          .should("be.visible")
          .and("be.enabled");

        categoryFormPage._clickAddButton();

        adminPage.get.$loader().should("be.visible", { timeout: 2000 });

        cy.wait(2000);

        adminPage.get.$loader().should("not.exist");
      });

      Then(
        "deberia redireccionarse a la Interfaz Category de Administracion como {string}",
        (endpointExpect) => {
          cy.url().should("include", endpointExpect);
          categoryPage.get
            .$categoriesTitleLabel()
            .should("be.visible")
            .and("have.text", "Categories");
        }
      );
    });

    describe("🧪 US 006 - TS 006 - TC 002:  Intentar Validar - Crear una categoria existosamente, al no ingresar ninguna imagen en el file-input.", () => {
      When("hace click en el boton Add", () => {
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
          .then((dataImageInput) => {
            cy.log("Data Input Image: " + dataImageInput);

            expect(dataImageInput).to.eql("");
          });

        categoryFormPage.get
          .$placeholderImg()
          .should("be.visible")
          .and("exist");

        categoryFormPage.get
          .$addButton()
          .should("be.visible")
          .and("be.enabled")
          .and("have.value", "Add");

        categoryFormPage._clickAddButton();
      });

      Then(
        "deberia redireccionarse a la Interfaz Category de Administracion como {string}",
        (endpoint) => {}
      );
    });
  }
);

context(
  "📑 US 007 - File Input Categoría Formulario - Previsualizacion de una imagen al una extension especifica en el File Input.",
  () => {
    Given(
      "que el Usuario ha iniciado sesión con credenciales con rol Administrador",
      () => {}
    );

    And(
      "se encuentra en la Interfaz Formulario Add Category de Administración como {string}",
      (endpoint) => {}
    );

    //agregar verificacion al respecto que en el la parte superior de elemento del DOM, del file input, no deberia aparecer ninguna advertencia.
    describe("🧪 US 007 - TS 007 - TC 001: Intentar Validar - el File Input Category Image, al añadir la extension bmp.", () => {

    })
  }
);
