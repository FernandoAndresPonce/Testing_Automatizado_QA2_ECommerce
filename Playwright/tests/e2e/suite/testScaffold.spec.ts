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
import { CategoryDetail } from "../../POM/admin/categoryDetail";
import { CategoryPage } from "../../POM/admin/categoryPage";

dotenv.config();

test.describe("🔬 US 013 - TS 013 - Detalle Categoría - Acceder a la Interfaz “Detalle de una Categoría” en la plataforma FastFood.", async () => {

    let rowsLenght: number;

    test.beforeEach("🔲 BACKGROUND:", async ({ page, categoryPage }) => {
        await test.step("📝 GIVEN que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador", async () => {

            await page.goto("/");
            await categoryPage._goToEndpoint();
        });
        await test.step("🧩 AND de que el Admin se encuentra en la Interfaz Category como “/Admin/Category.aspx”", async () => {

            await expect(page).toHaveURL(categoryPage.endpoint);
            await expect(categoryPage.$categoryTitle, "El titulo No Esta Visible.").toBeVisible();
        })

        await test.step("🧩 AND al menos hay Una Categoría Agregada a la tabla.", async () => {

            await expect(categoryPage.$table).toBeVisible();
            await expect(categoryPage.$table).toBeEnabled();

            const rows = await categoryPage.$tableRows.all();

            rowsLenght = await rows.length;

            await expect(rowsLenght).toBeGreaterThanOrEqual(1);
        })
    })

    test("US 013 - TS 013 - TC 001 - Validar que la información de la tabla coincida con la del detalle de la categoría.", async ({ page, categoryPage, categoryDetail }) => {

        let expectCategory: CategoryTable;

        await test.step("⚡WHEN hace Click en el Botón en la imagen del “OJO”, que se encuentra visible al final de una fila, en la parte derecha,", async () => {

            let rowNumber: number;

            const randomIndex = Math.floor(Math.random() * (rowsLenght - 1) + 1);
            rowNumber = randomIndex;

            await expect(categoryPage.$tableRows.nth(3)).toBeVisible();
            await expect(categoryPage.$tableRows.nth(3)).toBeEnabled();

            //arreglar cuando deseo conseguir la fila x , y las celdas necesarias
            const row = await categoryPage.$tableRows.nth(3);

            const cell = await row.locator("xpath=.//td").all();

            expectCategory = {
                name: await cell[0].innerText(),
                isActive: await cell[2].innerText(),
                isOffer: await cell[3].innerText(),
            };

            console.log(expectCategory);

            await expect(categoryPage.$eyeRowButton(3)).toBeVisible();
            await expect(categoryPage.$eyeRowButton(3)).toBeEnabled();

            await categoryPage._clickEyeRowButton(3);
        });

        await test.step(" AND el sistema se redirecciona a la Interfaz “Detalles de la categoría”,", async () => {

            await expect(categoryDetail.$viewCategoryTitle, "El Titulo View Category No esta Visible.").toBeVisible();
        })

        await test.step("Then: la información de la Categoria seleccionada deberia coincidir con la presentada en la tabla.", async () => {

            await expect(categoryDetail.$categoryLabel).toBeVisible();
            await expect(categoryDetail.$idCategoryLabel).toBeVisible();

            await expect(page.locator("div.card span#ContentPlaceHolder1_lblNameCategory")).toBeVisible();
            await expect(page.locator("div.card span#ContentPlaceHolder1_lblNameCategory")).toBeEnabled();

            const actualCategoryName = await page.locator("div.card span#ContentPlaceHolder1_lblNameCategory").innerText();

            let actualCategoryActiveInactive: string;
            let actualCategoryOfferNoOffer: string;

            //solucionar el problema si un elemento esta visible y no.
            const activeLocator = page.locator("div.card span#ContentPlaceHolder1_lblActive");
            const offerLocator = page.locator("div.card span#ContentPlaceHolder1_lblOffer");
            if (await activeLocator.isVisible) {

                await expect(page.locator("div.card span#ContentPlaceHolder1_lblActive")).toBeEnabled();
                await expect(page.locator("div.card span#ContentPlaceHolder1_lblActive")).toBeVisible();

                actualCategoryActiveInactive = await page.locator("div.card span#ContentPlaceHolder1_lblActive").innerText();
                if (await offerLocator.isVisible) {

                    await expect(page.locator("div.card span#ContentPlaceHolder1_lblOffer")).toBeVisible();
                    await expect(page.locator("div.card span#ContentPlaceHolder1_lblOffer")).toBeEnabled();

                    actualCategoryOfferNoOffer = await page.locator("div.card span#ContentPlaceHolder1_lblOffer").innerText();
                } else {

                    await expect(page.locator("div.card span#ContentPlaceHolder1_lblNoOffert")).toBeEnabled();
                    await expect(page.locator("div.card span#ContentPlaceHolder1_lblNoOffert")).toBeVisible();

                    actualCategoryOfferNoOffer = await page.locator("div.card span#ContentPlaceHolder1_lblNoOffert").innerText();
                }


                console.log(`name : ${actualCategoryName}\n Active: ${actualCategoryActiveInactive}\n Offer : ${actualCategoryOfferNoOffer}`)
            }
            else {
                await expect(page.locator("div.card span#ContentPlaceHolder1_lblInactive")).toBeVisible();
                await expect(page.locator("div.card span#ContentPlaceHolder1_lblInactive")).toBeEnabled();

                actualCategoryActiveInactive = await page.locator("div.card span#ContentPlaceHolder1_lblInactive").innerText();

            }
            console.log(`name : ${actualCategoryName}\n Active: ${actualCategoryActiveInactive}`)


        })
    })
})
