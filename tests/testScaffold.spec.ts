import test, { expect } from "playwright/test";
import { fastFoodPage } from "./PageObject/fastFoodPage";


test.describe('🔬 US 007 - TS 007 - Check Box Formulario de Categorías | Crear una Categoría Activa o Inactiva.', async () => {

    test.beforeEach('', async ({ page }) => {

        test.info().annotations.push({
            type: `📑 US 007 | Check Box Formulario de Categorías | Crear una Categoría Activa o Inactiva.`,
            description: `COMO: Admin de la plataforma FastFood, QUIERO:  crear una categoría, PARA: que este activa o inactiva`,
        });

        test.info().annotations.push({
            type: `📋 Especificaciones`,
            description: `Para Activar o Inactivar una categoría, debemos interactuar con el Check Box ubicado en la parte inferior del "Placeholder". Este Check Box estará en estado "Activo" (Checked) por defecto. Debajo del Check Box, se encuentra una Etiqueta (Label) que indica "Active". Al hacer Click en el Check Box, este se desmarcará, y la etiqueta cambiará a "Inactive".`,
        });

        test.info().annotations.push({
            type: `🎯 Scope`,
            description: `QA deberá validar únicamente el funcionamiento del Check Box y el cambio correspondiente de la Etiqueta.`,
        });
    });

    test.beforeEach('🔲 BACKGROUND - 📝 GIVEN: que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador', async ({ page }) => {

        await page.goto('/');
        const when = new fastFoodPage(page);
        await when.loginAndGoFormCategoryAdminRandomRoute();
    });

    test.beforeEach('🧩 AND: el usuario se encuentra en la Interfaz Formulario "Add Category" de Administración - http://desarrollowebecommerce.somee.com/Admin/CategoryForm.aspx', async ({ page }) => {

        await expect(page).toHaveURL('/Admin/CategoryForm.aspx');
        await expect(page.getByText('Add Category'), 'El Texto Add Category, NO esta Visible').toBeVisible();
    });

    test.beforeEach('🧩 AND: el Check Box está marcado o estado “Activo” (Checked)', async ({ page }) => {

        const the = new fastFoodPage(page);
        const when = new fastFoodPage(page);

        await expect(the.categoryActiveCheckbox, 'El Checkbox, No esta Visible.').toBeVisible();
        await expect(the.categoryActiveCheckbox, 'El Checkbox, No esta Marcado.').toBeChecked();

        await expect(the.categoryActiveLabel, "El Label, No esta Visible").toBeVisible();
        await expect(the.categoryActiveLabel, "El Texto, No es Active").toHaveText("Active");


        await page.waitForLoadState('load');
        await when.hiddenAdminLoader();
        test.info().attach('Pagina Formulario: "Add Category" | CheckBox : Marcado (Checked)', {
            body: await page.screenshot(),
            contentType: 'image/png',
        });

    });

    test('US 007 - TS 007 - TC 001 - Validar la transición de estado de la Etiqueta (Label) de "Active" a "Inactive" y el cambio del estado del Check Box de marcado (Checked) a desmarcado (Unchecked), al hacer Click en el Check Box.', async ({ page }) => {

        const the = new fastFoodPage(page);
        const when = new fastFoodPage(page);

        await test.step('⚡ WHEN: hace Click en el Check Box,', async () => {

            await when.clickCategoryActiveCheckbox();
        });

        await test.step('✔️ THEN: la Etiqueta (Label) se actualiza de “Active” a “Inactive”,', async () => {

            await expect(the.categoryInactiveLabel, "El Label, No esta Visible.").toBeVisible();
            await expect(the.categoryInactiveLabel, "El Texto, No es Inactive.").toHaveText("Inactive");
        })


        await test.step('🧩 AND: el Check Box se establece en estado desmarcado (Unchecked).', async () => {

            await expect(the.categoryActiveCheckbox, "El Checkbox esta Marcado (Checked).").not.toBeChecked();

            test.info().attach("CheckBox: Desmarcado (Unchecked) | Label: Inactive", {
                body: await page.screenshot(),
                contentType: "image/png"
            });
        });
    });

    test('US 007 - TS 007 - TC 002 - Validar la transición de estado de la Etiqueta (Label) de "Inactive" a "Active" y el cambio del estado del Check Box de desmarcado (Unchecked) a marcado (Checked), al hacer Click en el Check Box.', async ({ page }) => {

        const the = new fastFoodPage(page);
        const when = new fastFoodPage(page);

        await test.step('⚡ WHEN: hace Click en el Check Box,', async () => {

            await when.clickCategoryActiveCheckbox();
        });

        await test.step('🧩 AND: la Etiqueta (Label) se actualiza de “Active” a “Inactive”,', async () => {

            await expect(the.categoryInactiveLabel, "El Label, No esta Visible.").toBeVisible();
            await expect(the.categoryInactiveLabel, "El Texto, No es Inactive.").toHaveText("Inactive");
        })


        await test.step('🧩 AND: el Check Box se establece en estado desmarcado (Unchecked).', async () => {

            await expect(the.categoryActiveCheckbox, "El Checkbox esta Marcado (Checked).").not.toBeChecked();

            test.info().attach("CheckBox: Desmarcado (Unchecked) | Label: Inactive", {
                body: await page.screenshot(),
                contentType: "image/png"
            });
        });

        await test.step('🧩 AND: se ejecuta un segundo Click en el CheckBox', async () => {

            await when.clickCategoryActiveCheckbox();
        });

        await test.step('✔️ THEN: la Etiqueta (Label) se actualiza nuevamente de “Inactive” a “Active”', async () => {

            await expect(the.categoryActiveLabel, "El Texto No es Active.").toHaveText("Active");
        });
        
        await test.step('🧩 AND: el CheckBox se establece en estado marcado (Checked).',async () => {
            
            await expect(the.categoryActiveCheckbox, "El CheckBox esta Desmarcado").toBeChecked();

            test.info().attach("CheckBox: Marcado (Checked) | Label: Active", {
                body: await page.screenshot(),
                contentType: "image/png"
            });
        });
    });
});



