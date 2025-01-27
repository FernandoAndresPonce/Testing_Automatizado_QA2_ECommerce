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

test.describe("🔬 US 014 - TS 014 - Botón Return - Regreso a la Interfaz de Categoría desde “Detalle de la Categoría”.", async () => {
    test.beforeEach("🔲 BACKGROUND:", async ({page, categoryPage, categoryDetail, adminPage}) => {

        let rowsLenght : number;

        await test.step("📝 GIVEN que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador", async () => {

            await page.goto("/");
            await categoryPage._goToEndpoint();   
        });

        await test.step(" AND que la Tabla de la Interfaz de Categoría contiene al menos una categoría registrada", async () => {

            await expect(categoryPage.$table).toBeVisible();
            await expect(categoryPage.$table).toBeEnabled();

            const rows = await categoryPage.$tableRows.all();

            rowsLenght = await rows.length;

            await expect (rowsLenght).toBeGreaterThanOrEqual(1);    
        });

        await test.step("AND que el admin ha seleccionado una Categoría de dicha tabla,", async () => {
            const randomIndex = Math.floor(Math.random() * (rowsLenght - 1) + 1);

            await expect(categoryPage.$tableRows.nth(randomIndex)).toBeVisible();
            await expect(categoryPage.$tableRows.nth(randomIndex)).toBeEnabled();

            await categoryPage._clickEyeRowButton(randomIndex);
        });

        await test.step("se encuentra en la Interfaz de “Detalle de una Categoría” ", async () => {

            await adminPage._hiddenLoader();
            await page.waitForEvent("load");

            await expect(categoryDetail.$viewCategoryTitle).toBeVisible();
        });


    });

    test("US 018 - TS 018 - TC 001 - Validar, regresar a la Interfaz “Category” al hacer Click en el Botón Return", async ({page, categoryDetail, adminPage, categoryPage }) => {

        await test.step(" WHEN hace Click en el Boton Return,", async () => {

            await expect(page.getByRole("button", {name : "Return"}), "El Button NO es Visible.").toBeVisible();
            await expect(page.getByRole("button", {name : "Return"}), "El Button NO esta Disponible.").toBeEnabled();
            await expect(page.getByRole("button", {name : "Return"}), "El Button NO Contiene el texto 'Return'.").toHaveText("Return");
    
            await page.getByRole("button", {name : "Return"}).click({ force : true });
        });

        await test.step(" THEN se iniciará la redireccion de la página, mostrando un indicador de carga (Loader),", async () => {

            await expect(adminPage.$loader, "El Loader (imagen de carga) NO es Visible.").toBeVisible();
            await adminPage._hiddenLoader();
        })

        await test.step(" AND el sistema se redirecciona a la Interfaz de “Category” de Administración como '/Admin/Category.aspx'", async () => {

            await expect(page).toHaveURL(categoryPage.endpoint);
            await expect(categoryPage.$categoryTitle, "El Titulo 'Category' NO es Visible.").toBeVisible();
        });
    });
});
