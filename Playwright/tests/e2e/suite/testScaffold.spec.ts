import { expect } from "playwright/test";
import { execPath } from "node:process";
import { beforeEach, describe } from "node:test";
import { test } from "../../fixture/base"
import { CategoryFormPage } from "../../POM/admin/categoryFormPage";

import dotenv from 'dotenv';
dotenv.config();

test.describe("🔬 US 009 - TS 009 - Text Input - Ingreso de Porcentaje de Descuento en el Campo de Texto para la Categoría a Agregar", async () => {


    test.use({ storageState: { cookies: [], origins: [] } })

    test.beforeEach("🔲 BACKGROUND:", async ({ page, transitionerPage, categoryFormPage, adminPage }) => {

        await test.step("📝 GIVEN: que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador", async () => {

            await page.goto("/");
            await transitionerPage._loginThenRamdonFormCategoryByElements();
        });

        test.step("🧩 AND: de que el Admin se encuentra en la Interfaz Formulario “Add Category”. http://desarrollowebecommerce.somee.com/Admin/CategoryForm.aspx", async () => {

            await expect(page).toHaveURL("/Admin/CategoryForm.aspx");
            await expect(categoryFormPage.$categoryAddTitle, "El Texto Add Cagegory No es Visible.").toBeVisible();
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
            value: '101'
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

                await categoryFormPage._fillOfferPercentageTextBox(`${test_case.value}`);
                const valueInput = await categoryFormPage.$offerPercentageTextBox.inputValue();
                const numericValue = Number(valueInput);

                //corregir porque me devuelve un 0 porque me devuelve un valor
                //si no lo puede convertir en numerico, devuelve un nan
                if (isNaN(numericValue)) {
                    throw new Error("El valor ingresado no es un número válido");
                }
                await expect(numericValue).toBeGreaterThanOrEqual(0);
                await expect(numericValue).toBeLessThanOrEqual(100);
            });

            await test.step("AND: Hace Click en el Boton Add", async () => {

                await expect(categoryFormPage.$addButton, "No esta VIsible el Boton Add.").toBeVisible();
                await expect(categoryFormPage.$addButton, "No esta Disponible el Boton Add.").toBeEnabled();

                await categoryFormPage._clickAddButton();
            })

            await test.step(" THEN: no deberia se muestra ninguna advertencia, para el campo completado anteriormente.", async () => {

                await test.info().attach(`Valor Ingresado: ${test_case.value}`, {
                    body: await page.screenshot(),
                    contentType: "image/png"
                });
            });
        });
    }
});

