import { expect } from "playwright/test";
import { execPath } from "node:process";
import { beforeEach, describe } from "node:test";
import { test } from "../../fixture/base";

import dotenv from 'dotenv';
import { SuperPage } from "../../POM/superPage/superPage";
import { CategoryFormPage } from "../../POM/admin/categoryFormPage";

import { invalidRandomCategoryNameOnlyNumber, invalidRandomCategoryNameOnlySpecialCharacter, invalidRandomOfferPercentageAbove100, invalidRandomOfferPercentageDecimal, invalidRandomOfferPercentageNegativeNumber, invalidRandomOfferPercentageOnlySpecialChar, validRandomActiveInactiveCheckbox, validRandomCategoryImage, validRandomCategoryName, validRandomCategoryName1Character, validRandomCategoryName50Character, validRandomOfferPercentage, validRandomOfferPercentageCheckbox } from "../../variables/categoryFormPage"

dotenv.config();

describe("🔬 US 010 - TS 010 - Completar el Formulario para Crear una Categoría.", async () => {

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
            title_case: "US 010 - TS 010 - TC 001 - Intentar, validar crear Categoría al completar Category Name con un (1) carácter Alfabético (String), Category Image cadena de texto Alfabética (String), la Casilla de verificación Active/Inactive Marcada (Checked), la Casilla de verificacion Offer/NoOffer Marcada (Checked), y Offer Percentage con un Valor Numerico entre 0 y 100",
            categoryName_TextBox: validRandomCategoryName1Character(),
            categoryImage_InputFile: "tests/e2e/suite/Image/Desserts.png",
            active_inactive_CheckBox: "check",
            offerPercentage_CheckBox: "check",
            offerPercentage_TextBox: 0,

        },

        {
            title_case: "US 010 - TS 010 - TC 002 - Intentar, validar crear Categoría al completar Category Name con cincuenta (50) carácteres Alfabéticos (String), Category Image cadena de texto No Alfabetica ,y la Casilla de verificación Active/Inactive Desmarcada (Unhecked)",
            categoryName_TextBox: validRandomCategoryName50Character(),
            categoryImage_InputFile: "tests/e2e/suite/Image/12$34.png",
            active_inactive_CheckBox: "uncheck",
        },

        {
            title_case: "US 010 - TS 010 - TC 003 - Intentar, validar crear Categoría al completar Category Name con un (1) carácter Alfabético (String), Category Image con un String con Espacio, la Casilla de verificación Active/Inactive Marcada (Checked),y la Casilla de verificacion Offer/NoOffer Desmarcada (Unchecked).",
            categoryName_TextBox: validRandomCategoryName1Character(),
            categoryImage_InputFile: "tests/e2e/suite/Image/12$34 Desserts.png",
            active_inactive_CheckBox: "check",
            offerPercentage_CheckBox: "uncheck"
        },

        {
            title_case: "US 010 - TS 010 - TC 004 - Intentar, validar crear Categoría al completar Category Name con cincuenta (50) carácteres Alfabéticos (String), Category Image Vacia ,y la Casilla de verificación Active/Inactive Marcada (Checked), la Casilla de verificacion Offer/NoOffer Marcada (Checked),y Offer Percentage con un Valor Numerico entre 0 y 100",
            categoryName_TextBox: validRandomCategoryName50Character(),
            categoryImage_InputFile: "",
            active_inactive_CheckBox: "check",
            offerPercentage_CheckBox: "check",
            offerPercentage_TextBox: 100,
        },

    ];

    for (let test_case of valid_Test_Cases) {

        test(`${test_case.title_case}`, async ({ page, categoryFormPage, adminPage }) => {

            await test.step("When: completa el formulario de categoría de forma Correcta", async () => {

                await categoryFormPage._clickAndFillCategoryNameTextBox(`${test_case.categoryName_TextBox}`);

                if (test_case.categoryImage_InputFile != "") {

                    await categoryFormPage.$categoryImageInputFile.setInputFiles(`${test_case.categoryImage_InputFile}`)
                };

                if (test_case.active_inactive_CheckBox === "check") {
                    await categoryFormPage.$activeCheckbox.check();

                    if (test_case.offerPercentage_CheckBox === "check") {

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



                const screenshot = await page.screenshot({ fullPage: true });
                await test.info().attach("Formulario con datos Validos", {
                    body: screenshot,
                    contentType: "image/png"
                })
            });

            await test.step("AND: hace Click en el Botón Add", async () => {

                await categoryFormPage._clickAddButton();
            });


            await test.step("THEN: el sistema deberia desplegar un mensaje emergente (Pop-Up) con un mensaje amigable que la categoria ha sido creado con exito (Mensaje Pop-Up: Category has been successfully CREATED), con el nombre de la Categoria Creada", async () => {

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

            await test.step("AND: a los cinco segundo, el mensaje emergente desaparece.", async () => {

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
        });
    }

    const invalid_test_case = [
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
            active_inactive_CheckBox: "check",
            offerPercentage_CheckBox: "check",
            offerPercentage_TextBox: "e",
        },

        {
            title_case: "US 010 - TS 010 - TC 009 - Intentar validar, crear Categoría al completar Offer Percentage Input con datos Invalidos(String Caracteres Especiales), y el resto de los Campos con datos Validos.",
            categoryName_TextBox: validRandomCategoryName(),
            categoryImage_InputFile: validRandomCategoryImage(),
            active_inactive_CheckBox: "check",
            offerPercentage_CheckBox: "check",
            offerPercentage_TextBox: invalidRandomOfferPercentageOnlySpecialChar(),
        },

        {
            title_case: "US 010 - TS 010 - TC 010 - Intentar validar, crear Categoría al completar Offer Percentage Input con datos Invalidos(Numerico con Decimales), y el resto de los Campos con datos Validos.",
            categoryName_TextBox: validRandomCategoryName(),
            categoryImage_InputFile: validRandomCategoryImage(),
            active_inactive_CheckBox: "check",
            offerPercentage_CheckBox: "check",
            offerPercentage_TextBox: invalidRandomOfferPercentageDecimal(),
        },

        {
            title_case: "US 010 - TS 010 - TC 011 - Intentar validar, crear Categoría al completar Offer Percentage Input con datos Invalidos(Numerico Negativo), y el resto de los Campos con datos Validos.",
            categoryName_TextBox: validRandomCategoryName(),
            categoryImage_InputFile: validRandomCategoryImage(),
            active_inactive_CheckBox: "check",
            offerPercentage_CheckBox: "check",
            offerPercentage_TextBox: invalidRandomOfferPercentageNegativeNumber(),
        },

        {
            title_case: "US 010 - TS 010 - TC 012 - Intentar validar, crear Categoría al completar Offer Percentage Input con datos Invalidos(Fuera del Valor Limite), y el resto de los Campos con datos Validos.",
            categoryName_TextBox: validRandomCategoryName(),
            categoryImage_InputFile: validRandomCategoryImage(),
            active_inactive_CheckBox: "check",
            offerPercentage_CheckBox: "check",
            offerPercentage_TextBox: invalidRandomOfferPercentageAbove100(),
        },

        {
            title_case: "US 010 - TS 010 - TC 013 - Intentar validar, crear Categoría al completar Offer Percentage Input con datos Invalidos(Campo Vacio), y el resto de los Campos con datos Validos.",
            categoryName_TextBox: validRandomCategoryName(),
            categoryImage_InputFile: validRandomCategoryImage(),
            active_inactive_CheckBox: "check",
            offerPercentage_CheckBox: "check",
            offerPercentage_TextBox: "",
        },
    ];

    for (let test_case of invalid_test_case) {

        test(`${test_case.title_case}`, async ({ page, categoryFormPage, adminPage }) => {

            await test.step("WHEN: completa el formulario de categoría de forma Incorrecta", async () => {



                await categoryFormPage._clickAndFillCategoryNameTextBox(`${test_case.categoryName_TextBox}`);

                if (test_case.categoryImage_InputFile != "") {

                    await categoryFormPage.$categoryImageInputFile.setInputFiles(`${test_case.categoryImage_InputFile}`)
                };

                if (test_case.active_inactive_CheckBox === "check") {
                    await categoryFormPage.$activeCheckbox.check();

                    if (test_case.offerPercentage_CheckBox === "check") {

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

            await test.step("AND: hace Click en el Botón Add", async () => {

                await categoryFormPage._clickAddButton();
            });

            await page.pause();
            await test.step("THEN: se deberia mantener en la pagina Add Category para que información ingresada incorrectamente sea corregida.", async () => {

                await expect(page).toHaveURL("/Admin/CategoryForm.aspx");
                await expect(categoryFormPage.$categoryAddTitle).toBeVisible();

            });

            await test.step("Deberia redirigirse al campo para que sea corregido del error", async () => {

                await page.waitForTimeout(500);

                const specialChar = /[!#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~°©®™€£¥αβγΔπΩ√¿¡«»“‘’"]/;

                const textCategoryNameInput = await categoryFormPage.$categoryNameTextBox.inputValue();
                const isNumeric = Number(textCategoryNameInput);

                if (!isNaN(isNumeric)) {

                    if (test_case.categoryName_TextBox == "") {

                        await expect(categoryFormPage.$categoryNameTextBox).toBeFocused();
                        await expect(categoryFormPage.$categoryNameTextBox).toBeVisible();

                        await expect(page.locator('xpath=//div[@class="mb-3"]//span[@id="ContentPlaceHolder1_rfValidator"]')).toBeVisible();
                    } else {


                        await expect(categoryFormPage.$categoryNameTextBox).toBeFocused();
                        await expect(categoryFormPage.$categoryNameTextBox).toBeVisible();

                        await expect(page.locator('xpath=//div[@class="mb-3"]//span[@id="ContentPlaceHolder1_revName"]')).toBeVisible();
                    }
                }
                else if (specialChar.test(textCategoryNameInput)) {

                    await expect(categoryFormPage.$categoryNameTextBox).toBeFocused();
                    await expect(categoryFormPage.$categoryNameTextBox).toBeVisible();

                    await expect(page.locator('xpath=//div[@class="mb-3"]//span[@id="ContentPlaceHolder1_revName"]')).toBeVisible();
                };

                //009segui

                // const textOfferPercentageInput = await categoryFormPage.$offerPercentageTextBox.inputValue();

                const isNumericOfferPercentage = Number(test_case.offerPercentage_TextBox)

                if (isNaN(isNumericOfferPercentage)) {
                    if (specialChar.test(String (test_case.offerPercentage_TextBox))) {

                        await expect(categoryFormPage.$offerPercentageTextBox).toBeFocused();
                        await expect(categoryFormPage.$offerPercentageTextBox).toBeVisible();

                        await expect(categoryFormPage.$offerPercentageRequiredOfferPercentageValidationSpan).toBeVisible();

                    }
                    else {

                        await expect(categoryFormPage.$offerPercentageTextBox).toBeFocused();
                        await expect(categoryFormPage.$offerPercentageTextBox).toBeVisible();

                        await expect(categoryFormPage.$offerPercentageRequiredOfferPercentageValidationSpan).toBeVisible()
                    }
                }


                const screenshot = await page.screenshot();
                await test.info().attach("Formulario con datos Invalidos", {
                    body: screenshot,
                    contentType: "image/png"
                });
            })
        });
    }
});

