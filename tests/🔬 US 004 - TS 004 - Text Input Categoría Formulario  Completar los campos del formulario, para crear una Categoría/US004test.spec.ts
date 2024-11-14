import { test, expect } from '@playwright/test'
import { fastFoodPage } from '../PageObject/fastFoodPage';

let name : string = "Postre";

test.beforeEach('🔲 BACKGROUND - 📝 GIVEN: que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador', async ({ page }) => {
    await page.goto('/');
    const goFormCategory = new fastFoodPage(page);
    await goFormCategory.loginAndGoFormCategoryAdminTabMenuLink();
});

test.beforeEach('🧩 AND: el usuario se encuentra en la Interfaz Formulario "Add Category" de Administración - http://desarrollowebecommerce.somee.com/Admin/CategoryForm.aspx', async ({ page }) => {

    await expect(page).toHaveURL('http://desarrollowebecommerce.somee.com/Admin/CategoryForm.aspx');
    await expect(page.getByText('Add Category'), 'El Texto Add Category, NO esta Visible').toBeVisible();

    await page.waitForLoadState('load');
    const waitLoader = new fastFoodPage(page);
    await waitLoader.hiddenAdminLoader();

    test.info().attach('Pagina Formulario "Add Category"', {
        body: await page.screenshot(),
        contentType: 'image/png',
    })
});

test.describe('🎬 Scenario: Admin completa el campo Category Name exitosamente', () => {

    test('TC004', async ({ page }) => {

        test.info().annotations.push({
            type: '📑 US 004 | Text Input Categoría Formulario | Completar los campos del formulario, para crear una Categoría.',
            description: `COMO: Admin de la web FastFood,
QUIERO: crear una categoría,
PARA: agregarla a la tabla de la lista de categorías.
`,
        });

        test.info().annotations.push({
            type: '📋 Especificaciones:',
            description: `El admin se encuentre situado en http://desarrollowebecommerce.somee.com/Admin/CategoryForm.aspx, podrá agregar una categoría, con el botón que aparece en la parte inferior de la tabla. 
Generado el evento, lo redireccionara a la primera parte del formulario para completar la categoría,
Cada campo que esté incorrectamente completado mostrará una advertencia y no permitirá continuar con los siguientes pasos
Formulario Categoria:
•	Category Name* (formato string)
•	Category Image (formato string)
•	Active (formato bool).
•   Offer/NoOffer (formato: booleano).`,
        });

        test.info().annotations.push({
            type: '🎯 Scope:',
            description: `QA deberá validar únicamente la funcionalidad del Text Input, al presionar el botón Add.`,
        });

        test.info().annotations.push({
            type: '🚫 OOS:',
            description: `QA no deberá validar, el evento que suceda después de presionar el botón Add, excepto lo declarado en el scope.`,
        });

        await test.step('⚡ WHEN: completa el Text Input Category Name con una cadena de texto Alfabética,', async () => {

            await expect(page.locator('xpath=//div[@class="mb-3"]//span[@class="form-label" and text()="Category Name"]'), 'El Texto "Category Name", No es Visible.').toBeVisible();
            await expect(page.getByRole('textbox', { name: 'Category Name' }), 'El Text Input "Category Name", NO es Visible.').toBeVisible();

            const completeCategoryName = new fastFoodPage(page);
            await completeCategoryName.clickAndFillCategoryNameTextBox(`${name}`)
        });

        await test.step('🚫 BUT: con un mínimo de un (1) carácter 🧩 AND: un máximo de cincuenta (50) caracteres, ', async () => {

            const text = new fastFoodPage(page);
            const textTextbox = (await text.categoryNameTextBox.inputValue());
            const lenght = textTextbox.length;

            await expect(lenght).toBeGreaterThanOrEqual(1);
            await expect(lenght).toBeLessThanOrEqual(50);

            console.log(`La longitud del texto es: ${lenght}`);

            await test.info().attach(`Input Text "Category Name" : ${name} | Longitud : ${lenght}`, {
                body: await page.screenshot(),
                contentType: 'image/png'
            })
        });

        await test.step('🧩 AND: presiona el botón Add,  ', async () => {
            await expect(page.getByRole('button', {name: 'Add'}), 'El boton Add, No es Visible.').toBeVisible();
            await expect(page.getByRole('button', {name: 'Add'}), 'El Texto NO Coincide.').toHaveText('Add');

            await page.getByRole('button', {name: 'Add'}).click({ force : true })
        });


    });
});