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

    test.use({ storageState: { cookies: [], origins: [] } })
    test.beforeEach("🔲 BACKGROUND:", async ({ page, superPage }) => {

        await test.step("📝 GIVEN que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador", async () => {

            await page.goto("/");
            await superPage._$loginAndGoCategoriesAdmin();
        });
    });

    test("US 016 - TS 016 - TC 001 - Validar, visualizar información de la categoría seleccionada en la Interfaz “Formulario de la Categoría”, al hacer Click en el Botón Edit.", async ({ page, categoryPage, categoryDetail, adminPage, editCategory }) => {

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

            let rowNumber: number = 5; //<= variable random Row <==================

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

            await expect(page.getByText("Category Id")).toBeVisible();
            await expect(page.locator("xpath=//div[@class='card']//input[@id='ContentPlaceHolder1_txtCategoryId']")).toBeVisible();

            await expect(page.locator("//div[@class='card']//span[@class='form-label' and text()='Category Name']")).toBeVisible();
            await expect(page.getByRole('textbox', { name: 'Category Name' })).toBeVisible();

            await expect(page.locator("//div[@class='card']//input[@id='ContentPlaceHolder1_cbActivo']")).toBeVisible();
            await expect(page.locator("//div[@class='card']//input[@id='ContentPlaceHolder1_cbActivo']")).toBeEnabled();

            if (expectCategory.isActive == 'Active') {

                await expect(page.locator("//div[@class='card']//input[@id='ContentPlaceHolder1_cbActivo']")).toBeChecked();

                await expect(page.locator("//div[@class='card']//span[@id='ContentPlaceHolder1_lblActive' and text()='Active']")).toBeVisible();

                await expect(page.locator("//div[@class='card']//span[@id='ContentPlaceHolder1_lblActive' and text()='Active']")).toContainText("Active");

            }else{

                await expect(page.locator("//div[@class='card']//input[@id='ContentPlaceHolder1_cbActivo']")).not.toBeChecked();

                await expect(page.locator("//div[@class='card']//span[@id='ContentPlaceHolder1_lblInactive' and text()='Inactive']")).toBeVisible();
                await expect(page.locator("//div[@class='card']//span[@id='ContentPlaceHolder1_lblInactive' and text()='Inactive']")).toContainText("Inactive");
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