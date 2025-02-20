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

    test.use({ storageState: { cookies: [], origins: []}})
    test.beforeEach("🔲 BACKGROUND:", async ({page, superPage}) => {

        await test.step("📝 GIVEN que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador", async () => {

            await page.goto("/");
            await superPage._$loginAndGoCategoriesAdmin();
        });
    });

    test("US 016 - TS 016 - TC 001 - Validar, visualizar información de la categoría seleccionada en la Interfaz “Formulario de la Categoría”, al hacer Click en el Botón Edit.", async ({page, categoryPage}) => {

        await test.step("Given que la Tabla de la Interfaz de Categoría como /Admin/Category.aspx contiene al menos una categoría registrada , ", async () => {

            await expect (categoryPage.$table, "La Tabla NO es Visible.").toBeVisible();
            await expect (categoryPage.$table, "La Tabla NO esta Disponible.").toBeEnabled();

            const rows = await categoryPage.$tableRows.all();

            const rowsLenght : number = await rows.length;

            await console.log("Cantidad de Filas: " + rowsLenght);

            await expect (rowsLenght).toBeGreaterThanOrEqual (1);
        });

        await test.step("", async () => {

        })
    });
});