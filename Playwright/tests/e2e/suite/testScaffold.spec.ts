import { expect } from "playwright/test";
import { execPath } from "node:process";
import { beforeEach, describe } from "node:test";
import { test } from "../../fixture/base";
import { CategoryTable } from "../../interface/categoryPage";

import dotenv from 'dotenv';
import { SuperPage } from "../../POM/superPage/superPage";
import { CategoryFormPage } from "../../POM/admin/categoryFormPage";

import { invalidRandomCategoryNameOnlyNumber, invalidRandomCategoryNameOnlySpecialCharacter, invalidRandomOfferPercentageAbove100, invalidRandomOfferPercentageDecimal, invalidRandomOfferPercentageNegativeNumber, invalidRandomOfferPercentageOnlySpecialChar, validRandomActiveInactiveCheckbox, validRandomCategoryImage, validRandomCategoryName, validRandomCategoryName1Character, validRandomCategoryName50Character, validRandomOfferPercentage, validRandomOfferPercentageCheckbox } from "../../variables/categoryFormPage"
import { AdminPage } from "../../POM/admin/adminPage";

dotenv.config();


test.describe("🔬 US 012 - TS 012 - Detalle Categoría - Acceder a la Interfaz “Detalle de una Categoría” en la plataforma FastFood. ", async () => {

    let rowsLenght: number;

    test.beforeEach("🔲 BACKGROUND:", async ({ page, superPage, categoryPage }) => {
        await test.step("📝 GIVEN que el Usuario esta Logeado como Admin -  ha pasado por un proceso de auteclearnticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador", async () => {

            await page.goto("/");
            await superPage._goToCategoryAdmin();
        });



        await test.step("🧩 AND de que el Admin se encuentra en la Interfaz Category como “/Admin/Category.aspx”", async () => {

            await expect(page).toHaveURL(categoryPage.endpoint)
            await expect(categoryPage.$categoryTitle).toBeVisible();
        });

        await test.step("🧩 AND al menos hay Una Categoría Agregada a la tabla.", async () => {

            await expect(categoryPage.$table, "La Table No esta Disponible.").toBeEnabled();
            await expect(categoryPage.$table, "La Table No esta Visible.").toBeVisible();

            const rows = await categoryPage.$tableRows.all();

            rowsLenght = await rows.length;

            await expect(rowsLenght).toBeGreaterThanOrEqual(1);

            await test.info().attach(`Category Page | Table Lenght : ${rowsLenght}`, {
                body: await page.screenshot(),
                contentType: "image/png"
            })


        });
    });

    test("primer test", async ({ page, categoryPage, adminPage }) => {

        await test.step("WHEN hace Click en el Botón en la imagen del “OJO”, que se encuentra visible al final de una fila, en la parte derecha,", async () => {
            console.log(rowsLenght)

            let seletedRow: number;
            //con esta sintaxis devolvemos un numero entre 1 y el numero que pasamos como argumento.
            const randomIndex = Math.floor(Math.random() * rowsLenght) + 1;
            seletedRow = randomIndex;

            await expect(categoryPage.$tableRows.nth(seletedRow), "La Fila No esta Disponible").toBeEnabled();
            await expect(categoryPage.$tableRows.nth(seletedRow), "La Fila NO es Visible.").toBeVisible();

            await expect(categoryPage.$tableRows.nth(seletedRow).locator("input[alt='Select']"), "El Boton No es Visible.").toBeVisible()
            await expect(categoryPage.$tableRows.nth(seletedRow).locator("input[alt='Select']"), "El Boton No esta Disponible.").toBeEnabled()

            await categoryPage.$tableRows.nth(seletedRow).locator("input[alt='Select']").click({ force: true });

            await page.waitForLoadState('load');
            await adminPage._hiddenLoader();
        });

        await test.step("el sistema se redirecciona a la Interfaz “Detalles de la categoría”.", async () => {

            await expect(page.getByText("View Category"), "El Titulo View Category, No esta Visible.").toBeVisible();
            await expect(page.getByText("View Category"), "El Titulo No contiene el texto View Category.").toHaveText("View Category");

            await test.info().attach("Category Detail Page", {
                body: await page.screenshot(),
                contentType: "image/png"
            });
        });
    });

    test("segundo TC", async ({ page, categoryPage, adminPage }) => {
        
        let categoryId : string;

        await test.step("📝 GIVEN conoce, además, el número de ID de la Categoría.", async () => {

            let seletedRow: number;

            const randomIndex = Math.floor(Math.random() * rowsLenght) + 1;
            seletedRow = randomIndex;

            await expect(categoryPage.$tableRows.nth(seletedRow), "La Fila No esta Disponible").toBeEnabled();
            await expect(categoryPage.$tableRows.nth(seletedRow), "La Fila NO es Visible.").toBeVisible();

            await expect(categoryPage.$tableRows.nth(seletedRow).locator("input[alt='Select']"), "El Boton No es Visible.").toBeVisible()
            await expect(categoryPage.$tableRows.nth(seletedRow).locator("input[alt='Select']"), "El Boton No esta Disponible.").toBeEnabled()

            await categoryPage.$tableRows.nth(seletedRow).locator("input[alt='Select']").click({ force: true });

            await expect(page.locator("//div[@class='card']//span[text()='Category: ']"), "El Titulo Category: No esta Visible.").toBeVisible();

            await expect(page.locator("//div[@class='card']//span[@id='ContentPlaceHolder1_lblIdCategory']")).toBeVisible();
            categoryId = await page.locator("//div[@class='card']//span[@id='ContentPlaceHolder1_lblIdCategory']").innerText();

        })
        
        await test.step("WHEN introduce la Url con el agrega el ID de la Categoria, con su respectiva sintaxis", async () => [

            await page.goto(`/Admin/CategoryDetail.aspx?Id=${categoryId}`)    
        ]);

        await test.step("", async () => {

            await expect(page.getByText("View Category"), "El Titulo View Category, No esta Visible.").toBeVisible();
            await expect(page.getByText("View Category"), "El Titulo No contiene el texto View Category.").toHaveText("View Category");
        });
    });

});

