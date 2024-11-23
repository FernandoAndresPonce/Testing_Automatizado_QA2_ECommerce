import test, { expect } from "playwright/test";
import { fastFoodPage } from "../PageObjectModel/fastFoodPage";
import { execPath } from "node:process";


test.describe('US 007 - TS 007 - Check Box - Check Box Add Category - Crear una Categoría en Oferta o que no esté.', async () => {

    test.beforeEach('🔲 BACKGROUND:', async ({page}) => {

        const the = new fastFoodPage(page);
        const when = new fastFoodPage(page);

        await test.step('📝 GIVEN: que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador', async () => {
            
            
            await page.goto('/');
            await when.loginAndGoFormCategoryAdminRandomRoute();
        });

        test.step('🧩 AND: el Admin se encuentra en la Interfaz Formulario “Add Category”. http://desarrollowebecommerce.somee.com/Admin/CategoryForm.aspx.', async () => {
            
            await expect(page).toHaveURL('/Admin/CategoryForm.aspx');
            await expect(the.categoryAddTitle, 'El Texto Add Category, NO esta Visible').toBeVisible();
        });   
    });

    test('US 007 - TS 007 - TC 001 - Validar, categoría activa, pero no en oferta, al marcar (Checked) el CheckBox(Active-Inactive de una Categoría), y No marcar(Unchecked) el CheckBox(Offer-NoOffer de una Categoría).', async ({page}) => {

        const the = new fastFoodPage(page);
        const when = new fastFoodPage(page);

        await test.step(' WHEN: el Check Box (Categoría Activa/Inactiva) está marcado (estado “Active” - Checked).', async () => {

        await expect(the.categoryActiveCheckbox, "El CheckBox No esta Marcado (Checked).").toBeChecked();
        });
        await expect(the.categoryActiveLabel, "El Texto No es Active.").toHaveText("Active");

        await page.waitForLoadState('load');
        await when.hiddenAdminLoader();

        const screenshot = await page.screenshot({ fullPage : true });
        test.info().attach("CheckBox : Marcado (Checked) | Etiqueta (Label) : Active.", {
            body : screenshot,
            contentType : "image/png"
        });

        await test.step('Then: se visualiza un nuevo CheckBox(Categoria Offer/NoOffer) que está en estado Unchecked (no marcado),', async () => {
            await expect(the.categoryOfferNoOfferCheckBox, "El Checkbox Bo esta Visible").toBeVisible();
            await expect(the.categoryOfferNoOfferCheckBox, "El Checkbox esta Marcado (Checked).").not.toBeChecked();
        });

        await test.step('And: acompañado de su etiqueta (Label) con el texto “No Offer”,', async () => {
            await expect(the.categoryNoOfferLabel, "La Etiqueta No esta Visible.").toBeVisible();
            await expect(the.categoryNoOfferLabel, "El texto No es 'No Offer'").toHaveText("No Offer");
        });

        await test.step('And: el fondo (Background) de la etiqueta (Label), es de color “Rojo”.', async () => {
            const backgroundColor = await the.categoryNoOfferLabel.evaluate(element => {
                return window.getComputedStyle(element).backgroundColor;});
            
            await expect(backgroundColor).toBe('rgb(252, 97, 128)');
        });
        
        
        
        

    });

});

