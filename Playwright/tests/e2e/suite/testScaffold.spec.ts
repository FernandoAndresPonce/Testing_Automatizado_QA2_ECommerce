import { expect } from "playwright/test";
import { execPath } from "node:process";
import { beforeEach, describe } from "node:test";
import { test } from "../../fixture/base";

import dotenv from 'dotenv';
dotenv.config();

test.describe("🔬 US 009 - TS 009 - Text Input - Ingreso de Porcentaje de Descuento en el Campo de Texto para la Categoría a Agregar", async () => {
    test.use({ storageState: { cookies: [], origins: [] } })

    test.beforeEach("🔲 BACKGROUND:", async ({ page, superPage, categoryFormPage, adminPage }) => {



        await test.step("📝 GIVEN: que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador", async () => {

            await page.goto("/");
            await superPage._loginThenRamdonFormCategoryByElements();
        });

        test.step("🧩 AND: de que el Admin se encuentra en la Interfaz Formulario “Add Category”. http://desarrollowebecommerce.somee.com/Admin/CategoryForm.aspx", async () => {

            await expect(page).toHaveURL("/Admin/CategoryForm.aspx");
            await expect(categoryFormPage.$categoryAddTitle, "El Texto Add Cagegory No es Visible.").toBeVisible();
        });

        await test.step("🧩 AND: completa el Text Input “Category Name”, con la Cadena de Texto Postre.", async () => {
            await expect(categoryFormPage.$categoryNameTextBox, "El Text Input “Category Name”, No es Visible").toBeVisible()
            await expect(categoryFormPage.$categoryNameTextBox, "El Text Input “Category Name”, No esta Disponible").toBeEnabled()

            //env con data valid
            await categoryFormPage._clickAndFillCategoryNameTextBox("Postre");
        });

        await test.step("🧩 AND: el Check Box (Categoría Activa/Inactiva) está marcado (estado “Active” - Checked).", async () => {

            await expect(categoryFormPage.$activeCheckbox, "El CheckBox No esta Visible.").toBeVisible();
            await expect(categoryFormPage.$activeCheckbox, "El CheckBox Desmarcado (Unchecked).").toBeChecked();
        });

        await test.step("🧩 AND: se visualiza el CheckBox(Categoria Offer/NoOffer) que está en estado Unchecked (no marcado),", async () => {

            await expect(categoryFormPage.$offerNoOfferCheckBox, "El CheckBox No esta Visible.").toBeVisible();
            await expect(categoryFormPage.$offerNoOfferCheckBox, "El CheckBox esta Marcado (Checked).").not.toBeChecked();

        });

        await test.step("🧩 AND: Hacer Click en el CheckBox(Categoria Offer/NoOffer), cambiando su estado de desmarcado (Unchecked) a marcado (Checked)", async () => {

            await expect(categoryFormPage.$offerNoOfferCheckBox, "").toBeEnabled();
            await categoryFormPage.$offerNoOfferCheckBox.check();

            await adminPage._hiddenLoader();
            await test.info().attach("CheckBox Active/Inactive : Marcado (Checked) | CheckBox Offer/No Offer : Marcado (Checked)", {
                body: await page.screenshot(),
                contentType: "image/png"

            });
        });
    });

    const valid_Test_Cases = [
        {
            title_TC: "US 009 - TS 009 - TC 001 - Validar, completar Campo de Texto (Text Input) “Offer Percentage”, al ingresar: 0.",
            when_And1: "AND: completa el campo con un valor númerico de tipo entero,",
            when_And2: "AND: el valor está dentro del rango 0 - 100,",
            value: '0'
        },
        {
            title_TC: "US 009 - TS 009 - TC 002 - Validar, completar Campo de Texto (Text Input) “Offer Percentage”, al ingresar: 100.",
            when_And1: "AND: completa el campo con un valor númerico de tipo entero,",
            when_And2: "AND: el valor está dentro del rango 0 - 100,",
            value: '100'
        }
    ];


    for (const test_case of valid_Test_Cases) {

        test(`${test_case.title_TC}`, async ({ page, categoryFormPage, adminPage }) => {

            await test.step("⚡ WHEN: Hace click en el Campo de Texto (Text Input) “Offer Percentage”", async () => {
                await expect(categoryFormPage.$offerPercentageTextBox, "El TextBox No esta Disponible").toBeEnabled();
                await expect(categoryFormPage.$offerPercentageTextBox, "El TextBox No esta Disponible").toBeVisible();

                await categoryFormPage._clickOfferPercentageTextBox();
            });

            await test.step(`${test_case.when_And1}`, async () => {
            });

            await test.step(`${test_case.when_And2}`, async () => {

                const numericValid = Number(test_case.value);

                // Si no es un número válido (NaN) o si es un string alfabético
                if (!(isNaN(numericValid))) {

                    await categoryFormPage._fillOfferPercentageTextBox(`${test_case.value}`);
                    const valueInput = await categoryFormPage.$offerPercentageTextBox.inputValue();
                    const numericValue = Number(valueInput);

                    await expect(numericValue, "Es menor a 0.").toBeGreaterThanOrEqual(0);
                    await expect(numericValue, "Es Mayor a 100").toBeLessThanOrEqual(100);

                } else {
                    throw new Error("El valor ingresado NO es un Valor Númerico");

                }
            });

            await test.step("AND: Hace Click en el Boton Add", async () => {

                await expect(categoryFormPage.$addButton, "No esta Visible el Boton Add.").toBeVisible();
                await expect(categoryFormPage.$addButton, "No esta Disponible el Boton Add.").toBeEnabled();

                await categoryFormPage._clickAddButton();
            })

            await test.step(" THEN: no deberia muestrarse ninguna advertencia, para el campo completado anteriormente.", async () => {

                await test.info().attach(`Valor Ingresado: ${test_case.value}`, {
                    body: await page.screenshot(),
                    contentType: "image/png"
                });
            });
        });
    }

    const invalid_Test_Cases = [
        {
            title_TC: "US 009 - TS 009 - TC 003 - Validar, completar Campo de Texto (Text Input) “Offer Percentage”, al ingresar una Cadena de Texto Alfabética (String).",
            when_And1: "AND: Completar el campo con un valor no númerico",
            value: 'e',
            then: "THEN: deberia mostrarse una advertencia que indica que el campo ha sido completado incorrectamente, según las especificaciones previas (valor fuera de rango, valor negativo o decimal, o campo vacío)",
            validationError: "(Required Offer Percentage)"
        },
        {
            title_TC: "US 009 - TS 009 - TC 004 - Validar, completar Campo de Texto (Text Input) “Offer Percentage”, al ingresar Caracteres Especiales.",
            when_And1: "AND: Completar el campo con un valor no númerico, ",
            value: '+-.',
            then: "THEN: deberia mostrarse una advertencia que indica que el campo ha sido completado incorrectamente, según las especificaciones previas (valor fuera de rango, valor negativo o decimal, o campo vacío)",
            validationError: "(Required Offer Percentage)"
        },

        {
            title_TC: "US 009 - TS 009 - TC 005 - Intentar Validar, completar Campo de Texto (Text Input) “Offer Percentage”, al ingresar un Valor Numérico con Decimales.",
            when_And1: "AND: completa el campo con un valor númerico con Decimales, ",
            value: '2.1',
            then: "THEN: deberia mostrarse una advertencia que indica que el campo ha sido completado incorrectamente, según las especificaciones previas (valor fuera de rango, valor negativo o decimal, o campo vacío)",
            validationError: "Does not allow negative numbers or decimals"
        },

        {
            title_TC: "US 009 - TS 009 - TC 006 - Intentar Validar, completar Campo de Texto (Text Input) “Offer Percentage”, al ingresar un Valor Numérico Negativo.",
            when_And1: "AND: completar el campo con un valor númerico Negativo, ",
            value: '-1',
            then: "THEN: deberia mostrarse una advertencia que indica que el campo ha sido completado incorrectamente, según las especificaciones previas (valor fuera de rango, valor negativo o decimal, o campo vacío)",
            validationError: "Does not allow negative numbers or decimals"
        },

        {
            title_TC: "US 009 - TS 009 - TC 007 - Intentar Validar, completar Campo de Texto (Text Input) “Offer Percentage”, al ingresar un Valor Numérico Entero Mayor a 100.",
            when_And1: "AND: completar el campo con un valor númerico Mayor a 100, ",
            value: '101',
            then: "THEN: deberia mostrarse una advertencia que indica que el campo ha sido completado incorrectamente, según las especificaciones previas (valor fuera de rango, valor negativo o decimal, o campo vacío)",
            validationError: "(Allowed range 0-100)"
        },

        {
            title_TC: "US 009 - TS 009 - TC 008 - Intentar Validar, completar Campo de Texto (Text Input) “Offer Percentage”, al dejar el campo Vacío.",
            when_And1: " deja el campo Vacio ",
            value: '',
            then: "THEN: deberia mostrarse una advertencia que indica que el campo ha sido completado incorrectamente, según las especificaciones previas (valor fuera de rango, valor negativo o decimal, o campo vacío)",
            validationError: "(Required Offer Percentage)"
        },
    ];

    for (const test_case of invalid_Test_Cases) {

        test(`${test_case.title_TC}`, async ({ page, categoryFormPage }) => {


            await test.step("⚡ WHEN: Hace click en el Campo de Texto (Text Input) “Offer Percentage”", async () => {

                await expect(categoryFormPage.$offerPercentageTextBox, "El TextBox No esta Disponible").toBeEnabled();
                await expect(categoryFormPage.$offerPercentageTextBox, "El TextBox No esta Disponible").toBeVisible();

                await categoryFormPage._clickOfferPercentageTextBox();
            });

            await test.step(`${test_case.when_And1}`, async () => {

                await categoryFormPage._fillOfferPercentageTextBox(`${test_case.value}`);
            });

            await test.step(" AND: Hace Click en el Boton Add", async () => {

                await expect(categoryFormPage.$addButton, "No esta Visible el Boton Add.").toBeVisible();
                await expect(categoryFormPage.$addButton, "No esta Disponible el Boton Add.").toBeEnabled();

                await categoryFormPage._clickAddButton();
            });

            const isValueNumeric = Number(test_case.value);

            if (isNaN(isValueNumeric) || test_case.value === "") {

                await test.step(`${test_case.then}, Advertencia : ${test_case.validationError}`, async () => {

                    await expect(categoryFormPage.$offerPercentageTextBox).toBeFocused();
                    await expect(categoryFormPage.$offerPercentageTextBox).toBeVisible();


                    await categoryFormPage.$offerPercentageRequiredOfferPercentageValidationSpan.waitFor({ state: "visible" })
                    await expect(categoryFormPage.$offerPercentageRequiredOfferPercentageValidationSpan).toBeVisible();
                    await expect(categoryFormPage.$offerPercentageRequiredOfferPercentageValidationSpan).toHaveText(`${test_case.validationError}`);
                });
            }
            else {

                if (isValueNumeric < 100) {

                    await test.step(`${test_case.then}, Advertencia : ${test_case.validationError}`, async () => {

                        await expect(categoryFormPage.$offerPercentageTextBox).toBeFocused();
                        await expect(categoryFormPage.$offerPercentageTextBox).toBeVisible();


                        await categoryFormPage.$offerPercentageDoesNotAllowNegativeNumbersOrDecimalsValidationSpan.waitFor({ state: "visible" })
                        await expect(categoryFormPage.$offerPercentageDoesNotAllowNegativeNumbersOrDecimalsValidationSpan).toBeVisible();
                        await expect(categoryFormPage.$offerPercentageDoesNotAllowNegativeNumbersOrDecimalsValidationSpan).toHaveText(`${test_case.validationError}`);

                    });
                }
                else {

                    await test.step(`${test_case.then}, Advertencia : ${test_case.validationError}`, async () => {

                        await expect(categoryFormPage.$offerPercentageTextBox).toBeFocused();
                        await expect(categoryFormPage.$offerPercentageTextBox).toBeVisible();


                        await categoryFormPage.$offerPercentageAllowedRange0100ValidationSpan.waitFor({ state: "visible" })
                        await expect(categoryFormPage.$offerPercentageAllowedRange0100ValidationSpan).toBeVisible();
                        await expect(categoryFormPage.$offerPercentageAllowedRange0100ValidationSpan).toHaveText(`${test_case.validationError}`);
                    });
                }
            }
            await test.info().attach(`Focus Text Input Offer Percentage - ${test_case.validationError}`, {
                body: await page.screenshot(),
                contentType: "image/png"
            });
        });
    }
});

