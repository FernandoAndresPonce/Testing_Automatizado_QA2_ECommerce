import { expect } from "playwright/test";
import { execPath } from "node:process";
import { beforeEach, describe } from "node:test";
import { test } from "../../fixture/base";

import dotenv from 'dotenv';
import { SuperPage } from "../../POM/superPage/superPage";
import { CategoryFormPage } from "../../POM/admin/categoryFormPage";

import { invalidRandomCategoryNameOnlyNumber, invalidRandomCategoryNameOnlySpecialCharacter, invalidRandomOfferPercentageAbove100, invalidRandomOfferPercentageDecimal, invalidRandomOfferPercentageNegativeNumber, invalidRandomOfferPercentageOnlySpecialChar, validRandomActiveInactiveCheckbox, validRandomCategoryImage, validRandomCategoryName, validRandomCategoryName1Character, validRandomCategoryName50Character, validRandomOfferPercentage, validRandomOfferPercentageCheckbox } from "../../variables/categoryFormPage"

dotenv.config();

test.describe("🔬 US 011 - TS 011 - Data Griew Category - Visualizar la Categoría agregada en la tabla de Categoría.", async () => {

    test.use({ storageState: { cookies: [], origins: [] } });
    test.beforeEach("🔲 BACKGROUND:", async ({ page, superPage, categoryFormPage, adminPage }) => {

        await test.step("📝 GIVEN: que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador", async () => {

            await page.goto("/");
            await superPage._loginThenRamdonFormCategoryByElements();

        });

        await test.step("🧩 AND: de que el Admin se encuentra en la Interfaz Formulario Add Category como “/Admin/CategoryForm.aspx”", async () => {

            await expect(categoryFormPage.$categoryAddTitle, "El Titulo Add Category No es Visible.").toBeVisible();
            await expect(page).toHaveURL(`${categoryFormPage.endpoint}`);

            await page.waitForLoadState('load');
            await adminPage._hiddenLoader();
            
            await test.info().attach("Formulario Category", {
                body: await page.screenshot(),
                contentType: "image/png"
            });
        });
    });


    const valid_Test_Cases = [
        {
            title_case: "US 011 - TS 011 - TC 001 - Intentar validar, visualizar Categoria creada en la Tabla (DataGriwView), al completar Category Name con un (1) carácter Alfabético (String), Category Image cadena de texto Alfabética (String), la Casilla de verificación Active/Inactive Marcada (Checked), la Casilla de verificacion Offer/NoOffer Marcada (Checked), y Offer Percentage con un Valor Numerico entre 0 y 100",
            categoryName_TextBox: validRandomCategoryName1Character(),
            categoryImage_InputFile: "tests/e2e/suite/Image/Desserts.png",
            active_inactive_CheckBox: "Active",
            offerPercentage_CheckBox: "Offer",
            offerPercentage_TextBox: 0,

        },

        {
            title_case: "US 011 - TS 011 - TC 002 - Intentar validar, visualizar Categoria creada en la Tabla (DataGriwView), al completar Category Name con cincuenta (50) carácteres Alfabéticos (String), Category Image cadena de texto No Alfabetica ,y la Casilla de verificación Active/Inactive Desmarcada (Unhecked)",
            categoryName_TextBox: validRandomCategoryName50Character(),
            categoryImage_InputFile: "tests/e2e/suite/Image/12$34.png",
            active_inactive_CheckBox: "Inactive",

        },

        {
            title_case: "US 011 - TS 011 - TC 003 - Intentar validar, visualizar Categoria creada en la Tabla (DataGriwView), al completar Category Name con un (1) carácter Alfabético (String), Category Image con un String con Espacio, la Casilla de verificación Active/Inactive Marcada (Checked),y la Casilla de verificacion Offer/NoOffer Desmarcada (Unchecked).",
            categoryName_TextBox: validRandomCategoryName1Character(),
            categoryImage_InputFile: "tests/e2e/suite/Image/12$34 Desserts.png",
            active_inactive_CheckBox: "Active",
            offerPercentage_CheckBox: "NoOffer"
        },

        {
            title_case: "US 011 - TS 011 - TC 004 - Intentar validar, visualizar Categoria creada en la Tabla (DataGriwView), al completar Category Name con cincuenta (50) carácteres Alfabéticos (String), Category Image Vacia ,y la Casilla de verificación Active/Inactive Marcada (Checked), la Casilla de verificacion Offer/NoOffer Marcada (Checked),y Offer Percentage con un Valor Numerico entre 0 y 100",
            categoryName_TextBox: validRandomCategoryName50Character(),
            categoryImage_InputFile: "",
            active_inactive_CheckBox: "Active",
            offerPercentage_CheckBox: "Offer",
            offerPercentage_TextBox: 100,
        },

    ];

    for (let test_case of valid_Test_Cases) {

        test(`${test_case.title_case}`, async ({ page, categoryFormPage, categoryPage, adminPage }) => {

            test.info().annotations.push({
                type: "Scenario ",
                description: "El Admin crea una Categoria en la plataforma de manera exitosa, que se refleja en la Tabla (Data Griew)."

            });

            await test.step("⚡ WHEN: completa el formulario de categoría de forma Correcta", async () => {

                await categoryFormPage._clickAndFillCategoryNameTextBox(`${test_case.categoryName_TextBox}`);

                if (test_case.categoryImage_InputFile != "") {

                    await categoryFormPage.$categoryImageInputFile.setInputFiles(`${test_case.categoryImage_InputFile}`)
                };

                if (test_case.active_inactive_CheckBox === "Active") {
                    await categoryFormPage.$activeCheckbox.check();

                    if (test_case.offerPercentage_CheckBox === "Offer") {

                        await categoryFormPage.$offerNoOfferCheckBox.check();

                        await categoryFormPage._fillOfferPercentageTextBox(`${test_case.offerPercentage_TextBox}`);
                    }
                    else {
                        await categoryFormPage.$offerNoOfferCheckBox.uncheck();
                    };
                }
                else {
                    await categoryFormPage.$activeCheckbox.uncheck();
                };

                await adminPage._hiddenLoader();

                const screenshot = await page.screenshot({ fullPage: true });
                await test.info().attach("Formulario con datos Validos", {
                    body: screenshot,
                    contentType: "image/png"
                })
            });

            await test.step("🧩 AND: hace Click en el Botón Add", async () => {

                await categoryFormPage._clickAddButton();
            });


            await test.step("🧩 AND: el sistema deberia desplegar un mensaje emergente (Pop-Up) con un mensaje amigable que la categoria ha sido creado con exito (Mensaje Pop-Up: Category has been successfully CREATED), con el nombre de la Categoria Creada", async () => {

                await expect(page.locator("div.main-body span#ContentPlaceHolder1_lblMsg")).toBeVisible();
                await expect(page.locator("div.main-body span#ContentPlaceHolder1_lblMsg")).toContainText("Category has been successfully CREATED");
                await expect(page.locator("div.main-body span#ContentPlaceHolder1_lblMsg")).toContainText(`${test_case.categoryName_TextBox}`);

                await adminPage._hiddenLoader();

                const screenshot = await page.screenshot();
                await test.info().attach(`Mensaje emergente se visualiza, con nombre de la Categoria Creada ${test_case.categoryName_TextBox} exitosamente`, {
                    body: screenshot,
                    contentType: "image/png"
                })
            });

            await test.step("🧩 AND: a los cinco segundo, el mensaje emergente desaparece.", async () => {

                // await page.locator("div.main-body span#ContentPlaceHolder1_lblMsg").waitFor({ state: "hidden" });
                await page.waitForTimeout(5000);
                await expect(page.locator("div.main-body span#ContentPlaceHolder1_lblMsg")).toBeHidden();
                await expect(page.locator("div.main-body span#ContentPlaceHolder1_lblMsg")).not.toBeVisible();

                const screenshot = await page.screenshot();
                await test.info().attach(`Mensaje Emergente se Oculta`, {
                    body: screenshot,
                    contentType: "image/png"
                })
            });

            await test.step("🧩 THEN:  en el Tabla (Data Griew) se deberia ver reflejada la categoría recién creada.", async () => {

                await expect(categoryPage.$table, "La Tabla No esta Visible").toBeEnabled();
                await expect(categoryPage.$table, "La Tabla No esta Disponible").toBeVisible();

                // await page.pause();
                const tableConteiner = await page.locator("//div[@class='main-body']//table[@id='ContentPlaceHolder1_dgvCategory']");

                const rows = await tableConteiner.locator("xpath=.//tr").all();

                const categories: Category[] = [];

                for (let row of rows) {

                    const cells = await row.locator("xpath=.//td").all();

                    if (cells.length > 0) {


                        let category: Category = {
                            name: await cells[0].innerText(),
                            isActive: await cells[2].innerText(),
                            isOffer: await cells[3].innerText(),
                        };

                        categories.push(category);
                    }
                }

                for (let category of categories) {
                    console.log(category)
                }

                const filterCategoryName = await categories.filter(newCategory => newCategory.name == test_case.categoryName_TextBox);

                console.log(filterCategoryName);

                const actualCategoryName: string = filterCategoryName[0].name;
                const actualCategoryActiveInactive: string = filterCategoryName[0].isActive;
                const actualCategoryOfferNoOffer: string = filterCategoryName[0].isOffer;


                await expect(actualCategoryName).toEqual(test_case.categoryName_TextBox);
                await expect(actualCategoryActiveInactive).toEqual(test_case.active_inactive_CheckBox);
                if (test_case.active_inactive_CheckBox != "Inactive") {

                    await expect(actualCategoryOfferNoOffer).toEqual(test_case.offerPercentage_CheckBox);
                }

                const screenshot = await page.screenshot({ fullPage : true });
                await test.info().attach(`Se refleja en la Tabla la categoria recien Creada.`, {
                    body: screenshot,
                    contentType: "image/png"
                })
            });
        });
    }

    const invalid_Test_Cases = [
        {
            title_case: "US 010 - TS 010 - TC 005 - Intentar validar, crear Categoría al completar Category Name con datos Invalido( cadena de texto Numerica), y el resto de los Campos con datos Validos.",
            categoryName_TextBox: invalidRandomCategoryNameOnlyNumber(),
            categoryImage_InputFile: validRandomCategoryImage(),
            active_inactive_CheckBox: validRandomActiveInactiveCheckbox(),
            offerPercentage_CheckBox: validRandomOfferPercentageCheckbox(),
            offerPercentage_TextBox: validRandomOfferPercentage(),
        },

        {
            title_case: "US 010 - TS 010 - TC 006 - Intentar validar, crear Categoría al completar Category Name con datos Invalido( Caracteres Especiales), y el resto de los Campos con datos Validos.",
            categoryName_TextBox: invalidRandomCategoryNameOnlySpecialCharacter(),
            categoryImage_InputFile: validRandomCategoryImage(),
            active_inactive_CheckBox: validRandomActiveInactiveCheckbox(),
            offerPercentage_CheckBox: validRandomOfferPercentageCheckbox(),
            offerPercentage_TextBox: validRandomOfferPercentage(),
        },

        {
            title_case: "US 010 - TS 010 - TC 007 - Intentar validar, crear Categoría al completar Category Name con datos Invalido(Campo Vacio), y el resto de los Campos con datos Validos.",
            categoryName_TextBox: "",
            categoryImage_InputFile: validRandomCategoryImage(),
            active_inactive_CheckBox: validRandomActiveInactiveCheckbox(),
            offerPercentage_CheckBox: validRandomOfferPercentageCheckbox(),
            offerPercentage_TextBox: validRandomOfferPercentage(),
        },

        {
            title_case: "US 010 - TS 010 - TC 008 - Intentar validar, crear Categoría al completar Offer Percentage Input con datos Invalidos(String Alfabetico), y el resto de los Campos con datos Validos.",
            categoryName_TextBox: validRandomCategoryName(),
            categoryImage_InputFile: validRandomCategoryImage(),
            active_inactive_CheckBox: "Active",
            offerPercentage_CheckBox: "Offer",
            offerPercentage_TextBox: "e",
        },

        {
            title_case: "US 010 - TS 010 - TC 009 - Intentar validar, crear Categoría al completar Offer Percentage Input con datos Invalidos(String Caracteres Especiales), y el resto de los Campos con datos Validos.",
            categoryName_TextBox: validRandomCategoryName(),
            categoryImage_InputFile: validRandomCategoryImage(),
            active_inactive_CheckBox: "Active",
            offerPercentage_CheckBox: "Offer",
            offerPercentage_TextBox: invalidRandomOfferPercentageOnlySpecialChar(),
        },

        {
            title_case: "US 010 - TS 010 - TC 010 - Intentar validar, crear Categoría al completar Offer Percentage Input con datos Invalidos(Numerico con Decimales), y el resto de los Campos con datos Validos.",
            categoryName_TextBox: validRandomCategoryName(),
            categoryImage_InputFile: validRandomCategoryImage(),
            active_inactive_CheckBox: "Active",
            offerPercentage_CheckBox: "Offer",
            offerPercentage_TextBox: invalidRandomOfferPercentageDecimal(),
        },

        {
            title_case: "US 010 - TS 010 - TC 011 - Intentar validar, crear Categoría al completar Offer Percentage Input con datos Invalidos(Numerico Negativo), y el resto de los Campos con datos Validos.",
            categoryName_TextBox: validRandomCategoryName(),
            categoryImage_InputFile: validRandomCategoryImage(),
            active_inactive_CheckBox: "Active",
            offerPercentage_CheckBox: "Offer",
            offerPercentage_TextBox: invalidRandomOfferPercentageNegativeNumber(),
        },

        {
            title_case: "US 010 - TS 010 - TC 012 - Intentar validar, crear Categoría al completar Offer Percentage Input con datos Invalidos(Fuera del Valor Limite), y el resto de los Campos con datos Validos.",
            categoryName_TextBox: validRandomCategoryName(),
            categoryImage_InputFile: validRandomCategoryImage(),
            active_inactive_CheckBox: "Active",
            offerPercentage_CheckBox: "Offer",
            offerPercentage_TextBox: invalidRandomOfferPercentageAbove100(),
        },

        {
            title_case: "US 010 - TS 010 - TC 013 - Intentar validar, crear Categoría al completar Offer Percentage Input con datos Invalidos(Campo Vacio), y el resto de los Campos con datos Validos.",
            categoryName_TextBox: validRandomCategoryName(),
            categoryImage_InputFile: validRandomCategoryImage(),
            active_inactive_CheckBox: "Active",
            offerPercentage_CheckBox: "Offer",
            offerPercentage_TextBox: "",
        },
    ];

    for (let test_case of invalid_Test_Cases) {

        test(`${test_case.title_case}`, async ({ page, categoryFormPage, categoryPage, adminPage }) => {

            test.info().annotations.push({
                type: "Scenario ",
                description: "El Admin No puede crear una Categoria en la plataforma de manera exitosa, y que  No se ve reflejada en la Tabla (Data Griew)."

            });

            await page.pause();
            await test.step("⚡ WHEN: completa algun campo del formulario de categoría de manera Incorrecta", async () => {

                await categoryFormPage._clickAndFillCategoryNameTextBox(`${test_case.categoryName_TextBox}`);

                if (test_case.categoryImage_InputFile != "") {

                    await categoryFormPage.$categoryImageInputFile.setInputFiles(`${test_case.categoryImage_InputFile}`)
                };

                if (test_case.active_inactive_CheckBox === "Active") {
                    await categoryFormPage.$activeCheckbox.check();

                    if (test_case.offerPercentage_CheckBox === "Offer") {

                        await categoryFormPage.$offerNoOfferCheckBox.check();

                        await categoryFormPage._fillOfferPercentageTextBox(`${test_case.offerPercentage_TextBox}`);
                    }
                    else {
                        await categoryFormPage.$offerNoOfferCheckBox.uncheck();
                    };
                }
                else {
                    await categoryFormPage.$activeCheckbox.uncheck();
                };

                await adminPage._hiddenLoader();

                const screenshot = await page.screenshot({ fullPage: true });
                await test.info().attach("Formulario con datos Invalidos", {
                    body: screenshot,
                    contentType: "image/png"
                })
            });

            await test.step("🧩 AND: hace Click en el Botón Add", async () => {

                await categoryFormPage._clickAddButton();
            });

            await page.pause();
            await test.step("🧩 AND: se permanece en la pagina Add Category como /Admin/CategoryForm.aspx, para que la información ingresada incorrectamente sea corregida.", async () => {

                await expect(page).toHaveURL("/Admin/CategoryForm.aspx");
                await expect(categoryFormPage.$categoryAddTitle).toBeVisible();

            });

            await test.step("BUT: hace Click en el Boton Cancel.", async () => {
                
                // await categoryFormPage.$cancelButton.scrollIntoViewIfNeeded();

                await page.evaluate(() => {
                    window.scrollTo(0, document.body.scrollHeight); // Desplaza hasta el final de la página
                });

                await page.waitForTimeout(500);
                await expect(categoryFormPage.$cancelButton).toBeVisible();
                await expect(categoryFormPage.$cancelButton).toBeEnabled();

                await categoryFormPage._clickCancelButton();
            })

            await test.step("🧩 THEN: en la tabla (Data Grid) no debería reflejarse la categoría que se intentó crear recientemente.", async () => {

                await expect(categoryPage.$table, "La Tabla No esta Visible").toBeEnabled();
                await expect(categoryPage.$table, "La Tabla No esta Disponible").toBeVisible();

                // await page.pause();
                const tableConteiner = await page.locator("//div[@class='main-body']//table[@id='ContentPlaceHolder1_dgvCategory']");

                const rows = await tableConteiner.locator("xpath=.//tr").all();

                const categories: Category[] = [];

                for (let row of rows) {

                    const cells = await row.locator("xpath=.//td").all();

                    if (cells.length > 0) {


                        let category: Category = {
                            name: await cells[0].innerText(),
                            isActive: await cells[2].innerText(),
                            isOffer: await cells[3].innerText(),
                        };

                        categories.push(category);
                    }
                }

                for (let category of categories) {
                    console.log(category)
                }

                const filterCategoryName = await categories.filter(newCategory => newCategory.name == test_case.categoryName_TextBox);

                await expect(filterCategoryName).toEqual([]);

                console.log(filterCategoryName);


                const screenshot = await page.screenshot({ fullPage : true});
                await test.info().attach(`No se Refleja la categoria que se ha intentado crear en la Tabla`, {
                    body: screenshot,
                    contentType: "image/png"
                })
            });
        });


    }

});

interface Category {
    name: string,
    // image: string;
    isActive: string,
    isOffer: string
}

