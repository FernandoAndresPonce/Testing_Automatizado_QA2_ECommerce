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

test.describe("🐞 => 🔬 US 013 - TS 013 - Detalle Categoría - Acceder a la Interfaz “Detalle de una Categoría” en la plataforma FastFood.", async () => {

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

    test("US 013 - TS 013 - TC 001 - Validar que la información de la tabla coincida con la del detalle de la categoría.", async ({ page, categoryPage, categoryDetail, adminPage }) => {

        await test.info().annotations.push({
            type : '🐞 Bug',
            description : 'no match => categoryPage : Label NoOffer != categoryDetail : Label No Offert || categoryPage : Label Offer != categoryDetail : Label Offert',
        })

        await test.info().annotations.push({
            type : '🎬 Scenario',
            description : 'El admin puede visualizar la información acerca de una “Categoria”.',
        })
        
        
        let expectCategory: CategoryTable;

        await test.step("⚡WHEN hace Click en el Botón en la imagen del “OJO”, que se encuentra visible al final de una fila, en la parte derecha,", async () => {

            let rowNumber: number;

            const randomIndex = Math.floor(Math.random() * (rowsLenght - 1) + 1);
            rowNumber = randomIndex;

            await expect(categoryPage.$tableRows.nth(rowNumber)).toBeVisible();
            await expect(categoryPage.$tableRows.nth(rowNumber)).toBeEnabled();

            //arreglar cuando deseo conseguir la fila x , y las celdas necesarias
            const row = await categoryPage.$tableRows.nth(rowNumber);

            const cell = await row.locator("xpath=.//td").all();

            expectCategory = {
                name: await cell[0].innerText(),
                isActive: await cell[2].innerText(),
                isOffer: await cell[3].innerText(),
            };

            console.log(expectCategory);

            await expect(categoryPage.$eyeRowButton(rowNumber)).toBeVisible();
            await expect(categoryPage.$eyeRowButton(rowNumber)).toBeEnabled();

            const screenshot = await page.screenshot({ fullPage : true });

            await test.info().attach(`Category Page - Table \n Row Selection => Name: ${expectCategory.name}, IsActive: ${expectCategory.isActive}, IsOffer: ${expectCategory.isOffer}  `, {
                body : await screenshot,
                contentType : "image/png"
            })

            await categoryPage._clickEyeRowButton(rowNumber);
        });

        await test.step(" AND el sistema se redirecciona a la Interfaz “Detalles de la categoría”,", async () => {

            await page.waitForLoadState('load');
            await adminPage._hiddenLoader();

            await expect(categoryDetail.$viewCategoryTitle, "El Titulo View Category No esta Visible.").toBeVisible();
        })

        await test.step("Then: la información de la Categoria seleccionada deberia coincidir con la presentada en la tabla.", async () => {

            await expect(categoryDetail.$categoryLabel).toBeVisible();
            await expect(categoryDetail.$idCategoryLabel).toBeVisible();

            await expect(page.locator("div.card span#ContentPlaceHolder1_lblNameCategory")).toBeVisible();
            await expect(page.locator("div.card span#ContentPlaceHolder1_lblNameCategory")).toBeEnabled();

            const actualCategoryName = await page.locator("div.card span#ContentPlaceHolder1_lblNameCategory").innerText();

            let actualCategoryActiveInactive: string;
            let actualCategoryOfferNoOffer: string = "No Offert";

            //solucionar el problema si un elemento esta visible y no.
            const isVisibleActiveLocator = await categoryDetail.$activeLabel.isVisible();
            const isVisibleOfferLocator = await categoryDetail.$offerLabel.isVisible();

            if (isVisibleActiveLocator) {

                await expect(categoryDetail.$activeLabel).toBeEnabled();
                await expect(categoryDetail.$activeLabel).toBeVisible();

                actualCategoryActiveInactive = await categoryDetail.$activeLabel.innerText();
                if (isVisibleOfferLocator) {

                    await expect(categoryDetail.$offerLabel).toBeVisible();
                    await expect(categoryDetail.$offerLabel).toBeEnabled();

                    actualCategoryOfferNoOffer = await categoryDetail.$offerLabel.innerText();
                } else {

                    await expect(categoryDetail.$noOfferLabel).toBeEnabled();
                    await expect(categoryDetail.$noOfferLabel).toBeVisible();

                    actualCategoryOfferNoOffer = await categoryDetail.$noOfferLabel.innerText();
                }


                console.log(`name : ${actualCategoryName}\n Active: ${actualCategoryActiveInactive}\n Offer : ${actualCategoryOfferNoOffer}`)
            }
            else {
                await expect(categoryDetail.$inactiveLabel).toBeVisible();
                await expect(categoryDetail.$inactiveLabel).toBeEnabled();

                actualCategoryActiveInactive = await categoryDetail.$inactiveLabel.innerText();

            };

            await page.waitForLoadState('load');
            await adminPage._hiddenLoader();

            const screenshot = await page.screenshot({ fullPage : true})
            await test.info().attach(`Category Details - Category Selected :\nName: ${actualCategoryName}, IsActive: ${actualCategoryActiveInactive}, IsOffer: ${actualCategoryOfferNoOffer}  `, {
                body : await screenshot,
                contentType : "image/png"
            });

            await expect(expectCategory.name).toStrictEqual(actualCategoryName);
            await expect(expectCategory.isActive).toStrictEqual(actualCategoryActiveInactive);

            await expect(expectCategory.isOffer).toContain(actualCategoryOfferNoOffer); // <= bug here, no match 
            // | categoryPage | categoryDetail |
            // | NoOffer     != No Offert      |
            // | Offer      !=  Offert        |



        });
    });
});
