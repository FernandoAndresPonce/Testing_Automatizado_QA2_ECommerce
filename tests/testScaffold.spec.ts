import test, { expect } from "playwright/test";
import { fastFoodPage } from "./PageObject/fastFoodPage";


test.describe('', async () => {

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

        await expect(page).toHaveURL('http://desarrollowebecommerce.somee.com/Admin/CategoryForm.aspx');
        await expect(page.getByText('Add Category'), 'El Texto Add Category, NO esta Visible').toBeVisible();


    });

    test.beforeEach('🧩 AND: el Check Box está marcado o estado “Activo” (Checked)', async ({ page }) => {

        const checkedCheckbox = page.locator("xpath=//input[@id='ContentPlaceHolder1_cbActivo']");

        await expect( checkedCheckbox, 'El Checkbox No esta Visible.').toBeVisible();
        await expect(checkedCheckbox, 'El Checkbox No esta Marcado.').toBeChecked();

        await checkedCheckbox.waitFor({ state : "visible"});

        await page.waitForLoadState('load');

        const when = new fastFoodPage(page);
        await when.hiddenAdminLoader();

        test.info().attach('Pagina Formulario: "Add Category" | CheckBox : Marcado (Checked)', {
            body: await page.screenshot(),
            contentType: 'image/png',
        });

    });

    test('', async ({ page }) => {

    });
});