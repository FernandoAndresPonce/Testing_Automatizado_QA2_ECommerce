import { expect } from "playwright/test";
import { execPath } from "node:process";
import { beforeEach, describe } from "node:test";
import { test } from "../../fixture/base";

import dotenv from 'dotenv';
import { SuperPage } from "../../POM/superPage/superPage";
import { CategoryFormPage } from "../../POM/admin/categoryFormPage";

import { validRandomCategoryName } from "../../variables/categoryFormPage"

dotenv.config();

describe("🔬 US 009 - TS 009 - Completar el Formulario para Crear una Categoría.", async () => {

    test.use({ storageState: { cookies: [], origins: [] } })
    test.beforeEach("🔲 BACKGROUND:", async ({ page, superPage, categoryFormPage }) => {

        await test.step("📝 GIVEN: que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador", async () => {

            await page.goto("/");
            await superPage._loginThenRamdonFormCategoryByElements();
        });

        await test.step("🧩 AND: de que el Admin se encuentra en la Interfaz Formulario “Add Category”- /Admin/CategoryForm.aspx", async () => {

            await expect(page).toHaveURL("/Admin/CategoryForm.aspx");
            await expect(categoryFormPage.$categoryAddTitle, "El Texto Add Category No es Visible.").toBeVisible();
        });
    });


    const valid_Test_Cases = [
        {
            categoryName_TextBox: validRandomCategoryName(),
            categoryImage_InputFile: "tests/e2e/suite/Image/Desserts.png",
            active_inactive_CheckBox: "check",
            offerPercentage_CheckBox: "check",
            offerPercentage_TextBox: 0,

        }
    ]

    for (let test_case of valid_Test_Cases) {

        test("primer", async ({ page, categoryFormPage, adminPage }) => {

            await test.step("When: completa el formulario de categoría de forma correcta", async () => {

                await categoryFormPage._clickAndFillCategoryNameTextBox(`${test_case.categoryName_TextBox}`);

                await categoryFormPage.$categoryImageInputFile.setInputFiles(`${test_case.categoryImage_InputFile}`)

                if (test_case.active_inactive_CheckBox === "check") {
                    await categoryFormPage.$activeCheckbox.check();
                }
                else {
                    await categoryFormPage.$activeCheckbox.uncheck();
                };

                if (test_case.offerPercentage_CheckBox === "check") {
                    await categoryFormPage.$offerNoOfferCheckBox.check();
                }
                else {
                    await categoryFormPage.$offerNoOfferCheckBox.uncheck();
                };

                await categoryFormPage._fillOfferPercentageTextBox(`${test_case.offerPercentage_TextBox}`);

                const screenshot = await page.screenshot({ fullPage : true});
                await test.info().attach("Formulario con datos Validos", {
                    body: screenshot,
                    contentType : "image/png"
                })
            });

            await page.pause();
            await test.step("AND: hace Click en el Botón Add", async () => {

                await categoryFormPage._clickAddButton();
            });


            await test.step("THEN: el sistema despliega un mensaje emergente (Pop-Up) con un mensaje amigable que la categoria ha sido creado con exito (Mensaje Pop-Up: Category has been successfully CREATED), con el nombre de la Categoria Creada", async () => {

                await expect(page.locator("div.main-body span#ContentPlaceHolder1_lblMsg")).toBeVisible();
                await expect(page.locator("div.main-body span#ContentPlaceHolder1_lblMsg")).toContainText("Category has been successfully CREATED");
                await expect(page.locator("div.main-body span#ContentPlaceHolder1_lblMsg")).toContainText(`${test_case.categoryName_TextBox}`); 

                await adminPage._hiddenLoader();
                
                const screenshot = await page.screenshot();
                await test.info().attach(`Mensaje emergente se visualiza, con nombre de la Categoria Creada ${test_case.categoryName_TextBox} exitosamente`, {
                    body: screenshot,
                    contentType : "image/png"
                })
            });

            await test.step("AND: a los cinco segundo, el mensaje emergente desaparece.", async () => {
                
                // await page.locator("div.main-body span#ContentPlaceHolder1_lblMsg").waitFor({ state: "hidden" });
                await page.waitForTimeout(5000);
                await expect(page.locator("div.main-body span#ContentPlaceHolder1_lblMsg")).toBeHidden();
                await expect(page.locator("div.main-body span#ContentPlaceHolder1_lblMsg")).not.toBeVisible();

                const screenshot = await page.screenshot();
                await test.info().attach(`Mensaje Emergente se Oculta`, {
                    body: screenshot,
                    contentType : "image/png"
                })
            });
        });
    }
});

