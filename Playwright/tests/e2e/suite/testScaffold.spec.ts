import { _bidiChromium, expect } from "playwright/test";
import { execPath } from "node:process";
import { beforeEach, describe } from "node:test";
import { test } from "../../fixture/base";
import { CategoryTable } from "../../interface/categoryPage";

import dotenv from 'dotenv';
import { SuperPage } from "../../POM/superPage/superPage";
import { CategoryFormPage } from "../../POM/admin/categoryFormPage";

import { invalidRandomCategoryNameOnlyNumber, invalidRandomCategoryNameOnlySpecialCharacter, invalidRandomOfferPercentageAbove100, invalidRandomOfferPercentageDecimal, invalidRandomOfferPercentageNegativeNumber, invalidRandomOfferPercentageOnlySpecialChar, validRandomActiveInactiveCheckbox, validRandomCategoryImage, validRandomCategoryName, validRandomCategoryName1Character, validRandomCategoryName50Character, validRandomOfferPercentage, validRandomOfferPercentageCheckbox } from "../../variables/categoryFormPage"

import { randomCategoryIdEndpointOnlyCharacterAlphabetical, randomCategoryIdEndpointOnlySpecialCharacter, randomCategoryIdEndpointOnlyNumberOutOfRange } from "../../variables/editCategoryPage"
import { AdminPage } from "../../POM/admin/adminPage";
import { CategoryDetail } from "../../POM/admin/categoryDetail";
import { CategoryPage } from "../../POM/admin/categoryPage";

dotenv.config();

test.describe("🔬 US 016 - TS 016 - Editar Categoría - Acceso a la Interfaz de “Formulario de Categoría” para Actualizar una Categoría", async () => {

    test.use({ storageState: { cookies: [], origins: [] } });

    test.beforeEach("🔲 BACKGROUND:", async ({ page, superPage }) => {

        await test.step("📝 GIVEN que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador", async () => {

            await page.goto("/");
            await superPage._$loginAndGoCategoriesAdmin();
        });
    });

    test("US 016 - TS 016 - TC 001 - Validar, visualizar información de la categoría seleccionada en la Interfaz “Formulario de la Categoría”, al hacer Click en el Botón Edit.", async ({ page, categoryPage, categoryDetail, adminPage, editCategory }) => {

        let expectPercentageCategory;

        await test.step("GIVEN que la Tabla de la Interfaz de Categoría como /Admin/Category.aspx contiene al menos una categoría registrada , ", async () => {

            await adminPage._hiddenLoader();

            await expect(page).toHaveURL(categoryPage.endpoint)

            await expect(categoryPage.$table, "La Tabla NO es Visible.").toBeVisible();
            await expect(categoryPage.$table, "La Tabla NO esta Disponible.").toBeEnabled();

            const rows = await categoryPage.$tableRows.all();

            const rowsLenght: number = await rows.length;

            await console.log("Cantidad de Filas: " + rowsLenght);

            await expect(rowsLenght).toBeGreaterThanOrEqual(1);

            // AND que el admin ha seleccionado una Categoría “x” de dicha tabla,

            const randomRow = Math.floor(Math.random() * (rowsLenght - 1) + 1);

            let rowNumber: number = 1; //<= variable random Row <==================

            if (rowNumber == 4) {
                await page.evaluate(() => {
                    window.scrollTo(0, document.body.scrollHeight); // Desplazamos hasta el final de la página    
                });

                await page.waitForTimeout(500);
            }

            await expect(categoryPage.$tableRows.nth(rowNumber), "La Fila NO es Visible.").toBeVisible();
            await expect(categoryPage.$tableRows.nth(rowNumber), "La Fila NO esta Disponible.").toBeEnabled();

            const row = await categoryPage.$tableRows.nth(rowNumber);
            const cell = await row.locator("xpath=.//td").all();

            let expectCategory: CategoryTable;

            expectCategory = {
                name: await cell[0].innerText(),
                isActive: await cell[2].innerText(),
                isOffer: await cell[3].innerText()
            };

            await console.log(expectCategory);


            await categoryPage._clickEyeRowButton(rowNumber);

            // AND se encuentra en la Interfaz de “Detalle de una Categoría”,

            await adminPage._hiddenLoader();

            const categoryId = await categoryDetail.$idCategoryLabel.innerText();
            await expect(page).toHaveURL(categoryDetail.endpoint + "?Id=" + categoryId)

            await expect(categoryDetail.$viewCategoryTitle, "El Titulo View Category NO es Visible.").toBeVisible();

            let expectCategoryId = await categoryDetail.$idCategoryLabel.innerText();


            if (expectCategory.isOffer == "Offer") {
                await expect(categoryDetail.$percentageOfferLabel, "El Porcentage es Visible").toBeVisible();
                await expect(categoryDetail.$percentageOfferLabel, "El Porcentage esta Disponible").toBeEnabled();
                expectPercentageCategory = await categoryDetail.$percentageOfferLabel.innerText();
            }
            // WHEN hace Click en el Boton Edit,


            await expect(categoryDetail.$editButton, "El boton NO es Visible.").toBeVisible();
            await expect(categoryDetail.$editButton, "El boton NO esta Disponible.").toBeEnabled();

            await categoryDetail._clickEditButton();

            // AND el sistema se redirecciona a la Interfaz de “Formulario de Categoria”, como /Admin/CategoryForm.aspx?Id= (id de la Categoria),
            await adminPage._hiddenLoader();
            await page.waitForEvent('load');

            await expect(page).toHaveURL(editCategory.endpoint + "?Id=" + categoryId);
            await expect(editCategory.$editCategoryTitle, "El Titulo Edit Category NO es Visible.").toBeVisible();

            // THEN la información presentada en los diferentes elementos coincide con los del “Detalle de la Categoría”.

            //ALL ASSERTION

            //ASSERTION CATEGORY ID.
            await expect(page.getByText("Category Id")).toBeVisible();
            await expect(editCategory.$categoryIdInput, "El campo de texto Category Id, NO es Visible.").toBeVisible();

            const actualCategoryId = await editCategory.$categoryIdInput.inputValue();

            expect(expectCategoryId).toEqual(actualCategoryId);

            //ASSERTION CATEGORY NAME.
            await expect(editCategory.$categoryNameLabel, "La Label Category Name, NO es Visible.").toBeVisible();
            await expect(editCategory.$categoryNameInput).toBeVisible();

            const actualCategoryName = await editCategory.$categoryNameInput.inputValue();
            expect(actualCategoryName).toEqual(expectCategory.name);

            //ASSERTION IF CHECKBOX ACTIVE/INACTIVE IS VISIBLE .
            await expect(editCategory.$activeInactiveCheckBox, "El CheckBox Active/Inactive, NO es Visible.").toBeVisible();
            await expect(editCategory.$activeInactiveCheckBox, "El CheckBox Active/Inactive, NO esta Disponible.").toBeEnabled();

            //ASSERTION IF ACTIVE OR INACTIVE.
            if (expectCategory.isActive == 'Active') {

                await expect(editCategory.$activeInactiveCheckBox, "El CheckBo, NO esta marcado (Unchecked).").toBeChecked();

                await expect(editCategory.$activeLabel, "La Label Active, NO es Visible.").toBeVisible();
                await expect(editCategory.$activeLabel, "La Label, NO contiene el texto ACTIVE.").toContainText("Active");

                //ASSERTION IF OFFER OR NO OFFER.
                if (expectCategory.isOffer == 'Offer') {

                    await expect(editCategory.$offerNoOfferCheckBox, "El CheckBox Offer/NoOffer, NO esta marcado (Unchecked).").toBeChecked();

                    await expect(editCategory.$offerLabel, "La Label Offer, NO es Visible.").toBeVisible();
                    await expect(editCategory.$offerLabel, "La Label, NO contiene el Texto OFFER.").toHaveText("Offer");

                    //textbox offer percentage
                    await expect(editCategory.$offerPercentageLabel, "La Label Offer Percentage, NO es Visible.").toBeVisible();
                    await expect(editCategory.$offerPercentageLabel, "La Label Offer Percentage, NO contiene el Texto OFFER PERCENTAGE.").toHaveText("Offer Percentage");

                    await expect(editCategory.$offerPercentageInput, "El Input del Offer Percentage, NO es Visible.").toBeVisible();
                    await expect(editCategory.$offerPercentageInput, "El Input del Offer Percentage, NO esta Disponible.").toBeEnabled();

                    const actualOfferPercentageCategory = await editCategory.$offerPercentageInput.inputValue();

                    expect(actualOfferPercentageCategory).toEqual(expectPercentageCategory)
                    //SEGUIR DESDE ACATesting_Automatizado_QA2_ECommerce
                    await console.log(actualOfferPercentageCategory)

                } else {

                    if (expectCategory.isOffer == "No Offer") {

                        await expect(editCategory.$activeInactiveCheckBox, "El CheckBox Active/Inactive, esta Marcado (Checked)").not.toBeChecked();

                        await expect(editCategory.$noOfferLabel, "La Label No Offer, NO es Visible.").toBeVisible();
                        await expect(editCategory.$noOfferLabel, "La Label No Offer, NO contiene el texto NO OFFER.").toHaveText("No Offer");
                    }
                }

            } else {

                await expect(editCategory.$activeInactiveCheckBox, "El CheckBox, esta Marcado (Checked).").not.toBeChecked();

                await expect(editCategory.$inactiveLabel, "La Label INACTIVE, NO esta Visible.").toBeVisible();
                await expect(editCategory.$inactiveLabel, "La Label, NO contiene el Texto INACTIVE.").toContainText("Inactive");
            }



            // let actualCategory : CategoryTable;

            // actualCategory = {
            //     name : ,
            // }
        });

        // await test.step("AND que el admin ha seleccionado una Categoría “x” de dicha tabla,", async () => {
        // })
    });
});