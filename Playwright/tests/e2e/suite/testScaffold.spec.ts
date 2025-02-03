import { _bidiChromium, expect } from "playwright/test";
import { execPath } from "node:process";
import { beforeEach, describe } from "node:test";
import { test } from "../../fixture/base";
import { CategoryTable } from "../../interface/categoryPage";

import dotenv from 'dotenv';
import { SuperPage } from "../../POM/superPage/superPage";
import { CategoryFormPage } from "../../POM/admin/categoryFormPage";

import { invalidRandomCategoryNameOnlyNumber, invalidRandomCategoryNameOnlySpecialCharacter, invalidRandomOfferPercentageAbove100, invalidRandomOfferPercentageDecimal, invalidRandomOfferPercentageNegativeNumber, invalidRandomOfferPercentageOnlySpecialChar, validRandomActiveInactiveCheckbox, validRandomCategoryImage, validRandomCategoryName, validRandomCategoryName1Character, validRandomCategoryName50Character, validRandomOfferPercentage, validRandomOfferPercentageCheckbox } from "../../variables/categoryFormPage"
import { AdminPage } from "../../POM/admin/adminPage";
import { CategoryDetail } from "../../POM/admin/categoryDetail";
import { CategoryPage } from "../../POM/admin/categoryPage";

dotenv.config();


test.describe("🔬 US 015 - TS 015 - Botón Edit - Acceso a la Interfaz de “Edit Category” desde “Detalle de la Categoría”.", async () => {

    test.beforeEach("🔲 BACKGROUND:", async ({ page, categoryPage, categoryDetail }) => {
        await test.step("📝 GIVEN que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador", async () => {

            await page.goto("/");
            await categoryPage._goToEndpoint();
        });

        await test.step(" AND el admin ha seleccionado una Categoría “x” de dicha tabla,", async () => {
            
            await expect(categoryPage.$table, "La tabla NO esta Visible").toBeVisible();
            await expect(categoryPage.$table, "La tabla NO esta Disponible").toBeEnabled();

            const rows = await categoryPage.$tableRows.all();
            const lenghtRows : number = await rows.length;
            
            // console.log("Cantidad Filas: " + lenghtRows);
            await expect(lenghtRows).toBeGreaterThan(1);

            const randomIndex = Math.floor(Math.random() * (lenghtRows - 1) + 1);

            await expect (categoryPage.$tableRows.nth(randomIndex), `La fila ${randomIndex} NO esta Visible.`).toBeVisible();
            await expect (categoryPage.$tableRows.nth(randomIndex), `La fila ${randomIndex} NO esta Disponible.`).toBeEnabled();

            //seguir por aqui 
            const idCategory = await categoryDetail.$idCategoryLabel.innerText();
            console.log(idCategory);
            
            await categoryPage._clickEyeRowButton(randomIndex);
            
            await expect(categoryDetail.$viewCategoryTitle, "El Titulo View Category NO esta Visible.").toBeVisible();
        });
    });

    test("US 015 - TS 015 - TC 001 - Validar, redireccionar a la Interfaz “Edit Category”, al hacer Click en el Botón Edit.", async ({ page, categoryDetail, editCategory }) => {

        await test.step(" WHEN hace Click en el Boton Edit,", async () => {

            await expect(categoryDetail.$editButton, "El Button NO es Visible.").toBeVisible();
            await expect(categoryDetail.$editButton, "El Button NO esta Disponible.").toBeEnabled();

            await categoryDetail._clickEditButton();     
        });

        await test.step(" THEN el sistema se deberia redirecciona a la Interfaz de “Edit Category", async () => {

            await expect(editCategory.$editCategoryTitle, "El Titulo Edit Category NO esta Visible.").toBeVisible();
            await expect(editCategory.$editCategoryTitle, "El Titulo Edit Category NO esta Disponible.").toBeEnabled();
            await expect(editCategory.$editCategoryTitle, "Edit Category NO es el Titulo.").toHaveText("Edit Category");
        });
    })

    test("US 015 - TS 015 - TC 001 - Intentar Validar, redireccionar a la Interfaz “Edit Category”, al ingresar la url con el ID de la categoria.", async ({page}) => {

        await test.step("WHEN hace ingresa la URL en el ID de la Categoria,", async () => {

        });

        await test.step("THEN el sistema se deberia redirecciona a la Interfaz de “Edit Category", async () => {

        });
    });
});