import { expect } from "playwright/test";
import { execPath } from "node:process";
import { beforeEach, describe } from "node:test";
import { test } from "../../fixture/base"

test.describe("🔬 US 009 - TS 009 - Text Input - Ingreso de Porcentaje de Descuento en el Campo de Texto para la Categoría a Agregar", async () => {

    test.beforeEach("🔲 BACKGROUND:", async ({ page, transitionerPage, categoryFormPage, adminPage }) => {

        await test.step("📝 GIVEN: que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador", async () => {

            await page.goto("/");
            await transitionerPage._goToDashboardThenRandomFormCategoryByElements();
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

            await expect(categoryFormPage.$offerNoOfferCheckBox,"").toBeEnabled();
            await categoryFormPage.$offerNoOfferCheckBox.check();

            await adminPage._hiddenLoader();
            await test.info().attach("CheckBox Active/Inactive : Marcado (Checked) | CheckBox Offer/No Offer : Marcado (Checked)", {
                body : await page.screenshot(),
                contentType : "image/png"

            });

        });



    });

    test("primer", async ({ page, categoryFormPage, adminPage }) => {

        await test.step("⚡ WHEN: Hace click en el Campo de Texto (Text Input) “Offer Percentage”", async () => {
            await expect(categoryFormPage.$offerPercentageTextBox, "El TextBox No esta Disponible")
                .toBeEnabled();
        });
    });
});

