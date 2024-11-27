import { expect } from "playwright/test";
import { execPath } from "node:process";
import { describe } from "node:test";
import { test } from "../../fixture/base"

test.describe("🔬 US 008 - TS 008 - Text Input - Add Category - Crear una Categoría en Oferta y asignar un Porcentaje de Descuento.", async () => {

    test.beforeEach("🔲 BACKGROUND:", async ({ page, adminPage, transitionerPage, categoryFormPage }) => {

        await test.step("📝 GIVEN: que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador", async () => {

            await page.goto("/");
            await transitionerPage.loginAndGoFormCategoryAdminRandomRoute();
        });

        await test.step("🧩 AND: de que el Admin se encuentra en la Interfaz Formulario “Add Category”. http://desarrollowebecommerce.somee.com/Admin/CategoryForm.aspx", async () => {

            await expect(page).toHaveURL("/Admin/CategoryForm.aspx");
            await expect(categoryFormPage.$categoryAddTitle, "El Texto Add Cagegory No es Visible.").toBeVisible();
        });

        await test.step("🧩 AND: el Check Box (Categoría Activa/Inactiva) está marcado (estado “Active” - Checked), ", async () => {

            await expect(categoryFormPage.$activeCheckbox, "El CheckBox No esta Visible.").toBeVisible();
            await expect(categoryFormPage.$activeCheckbox, "El CheckBox Desmarcado (Unchecked).").toBeChecked();
        });

        await test.step("🧩 AND: se visualiza el CheckBox(Categoria Offer/NoOffer) que está en estado Unchecked (no marcado).", async () => {

            await expect(categoryFormPage.$offerNoOfferCheckBox, "El CheckBox No esta Visible.").toBeVisible();
            await expect(categoryFormPage.$offerNoOfferCheckBox, "El CheckBox esta Marcado (Checked).").not.toBeChecked();

            await adminPage.hiddenLoader();

            const screenshot = await page.screenshot({ fullPage : true });
            await test.info().attach("CheckBox Active/Inactive : Marcado (Checked) | CheckBox Offer/No Offer : Desmarcado (Unchecked)", {
                body : screenshot,
                contentType : "image/png"
            });
        });
    });

    test("primer", async ({page, categoryFormPage }) => {

        await test.step("⚡ WHEN: Hace click en el CheckBox(Categoria Offer/NoOffer)", async () => {

            await expect(categoryFormPage.$offerNoOfferCheckBox, "El CheckBox No esta Disponible.").toBeEnabled();
            
            await categoryFormPage.clickOfferNoOfferCheckBox();
        });
        
        await test.step("🧩 AND: este cambia a estado Checked (marcado)", async () => {
            
            await expect(categoryFormPage.$offerNoOfferCheckBox, "El CheckBox esta Desmarcado (Unchecked).").toBeChecked();
        });

        await test.step("🧩 AND: se visualiza el cambio de estado de la etiqueta (Label), pasando de No Offer a Offer.", async () => {

            await expect(categoryFormPage.$offerLabel, "Label No esta Visible.").toBeVisible();
            await expect(categoryFormPage.$offerLabel, "El Texto No es Offer.").toHaveText("Offer");
        });

        await test.step("🧩 AND: el fondo (Background) de la etiqueta (Label), cambia a color “Rojo” a “Verde”.", async () => {

            const backgroundColorLabel = await categoryFormPage.$offerLabel.evaluate( element => {
                return window.getComputedStyle(element).backgroundColor;
            });

            await expect(backgroundColorLabel, "El Background No es de color Verde.").toBe("rgb(147, 190, 82)");

            await test.info().attach("CheckBox Offer/ No Offer : Marcado (Checked) | Label : Offer | Background : Verde", {
                body : await page.screenshot(),
                contentType : "image/png"
            });
        });

        await test.step("✔️ THEN: visualiza una Etiqueta (Label) con el Texto (Offer Percentage)", async () => {

            await expect(categoryFormPage.$offerPercentageLabel, "El Texto No es Offer Percentage.").toBeVisible();
        });

        await test.step("🧩 AND: un Campo de Texto (Text Input), debajo de la Etiqueta mencionada anteriormente.", async () => {

            await expect(categoryFormPage.$offerPercentageTextBox, "El Input Offer Percentage, No esta Visible.").toBeVisible();

            await test.info().attach("Visualizacion Label : Offer Percentage | Input Offer Percentage", {
                body : await page.screenshot(),
                contentType : "image/png"
            });
        });
    });
});

