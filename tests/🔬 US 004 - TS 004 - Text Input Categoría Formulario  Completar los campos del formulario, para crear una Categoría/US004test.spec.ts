import { test, expect } from '@playwright/test'
import { fastFoodPage } from '../PageObject/fastFoodPage';


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

//Variables ⬇️ TC

const sections = [

    { titleTC: '🧪 US 004| TS 004 |TC 001 |  Validar el Text Input Category Name, al añadir un (1) carácter Alfabético (String).', inputTextTC: 'P', thenTC: '✔️ THEN: el Text Input Category Name no le dará ninguna advertencia 🧩 AND: el sistema lo redireccionara a la página Category.' },

    { titleTC: '🧪 US 004| TS 004 | TC 002 |  Validar el Text Input Category Name, al añadir cincuenta (50) caracteres Alfabéticos (String).', inputTextTC: 'qwertyuioplkjhgfdsazxcvbnmlkjhgfdsaqwertyuioplkjhg', butTC: '🚫 BUT: con un mínimo de un (1) carácter 🧩 AND: un máximo de cincuenta (50) caracteres, ', thenTC: '✔️ THEN: el Text Input Category Name no le dará ninguna advertencia 🧩 AND: el sistema lo redireccionara a la página Category.' }

];


for (const section of sections) {
    test.describe('🎬 Scenario: Admin completa el campo Category Name exitosamente', () => {

        test(`${section.titleTC}`, async ({ page }) => {

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
                type: '🎯 Scope',
                description: `QA deberá validar únicamente la funcionalidad del Text Input, al presionar el botón Add.`,
            });

            test.info().annotations.push({
                type: '🚫 OOS',
                description: `QA no deberá validar, el evento que suceda después de presionar el botón Add, excepto lo declarado en el scope.`,
            });

            await test.step('⚡ WHEN: completa el Text Input Category Name con una cadena de texto Alfabética,', async () => {

                await expect(page.locator('xpath=//div[@class="mb-3"]//span[@class="form-label" and text()="Category Name"]'), 'El Texto "Category Name", No es Visible.').toBeVisible();
                await expect(page.getByRole('textbox', { name: 'Category Name' }), 'El Text Input "Category Name", NO es Visible.').toBeVisible();

                const completeCategoryName = new fastFoodPage(page);
                await completeCategoryName.clickAndFillCategoryNameTextBox(`${section.inputTextTC}`)
            });

            await test.step(`${section.butTC}`, async () => {

                const text = new fastFoodPage(page);
                const textTextbox = (await text.categoryNameTextBox.inputValue());
                const lenght = textTextbox.length;

                // await expect(textTextbox).toEqual(`${section.inputTextTC}`);
                await expect(lenght).toBeGreaterThanOrEqual(1);
                await expect(lenght).toBeLessThanOrEqual(50);

                console.log(`La longitud del texto es: ${lenght}`);

                await test.info().attach(`Input Text "Category Name" : ${section.inputTextTC} | Longitud : ${lenght}`, {
                    body: await page.screenshot(),
                    contentType: 'image/png'
                })
            });

            await test.step('🧩 AND: presiona el botón Add,  ', async () => {

                await expect(page.getByRole('button', { name: 'Add' }), 'El boton Add, No es Visible.').toBeVisible();
                await expect(page.getByRole('button', { name: 'Add' }), 'El Texto NO Coincide.').toHaveText('Add');

                await page.getByRole('button', { name: 'Add' }).click({ force: true })
            });

            await test.step(`${section.thenTC}`, async () => {

                await expect(page).toHaveURL('http://desarrollowebecommerce.somee.com/Admin/Category.aspx');
                await expect(page.getByRole('heading', { name: 'CATEGORIES' }), 'El texto "CATEGORIES", NO es Visible.').toBeVisible();

                await page.waitForLoadState('load');
                const waitLoader = new fastFoodPage(page);
                await waitLoader.hiddenAdminLoader();

                await test.info().attach('Pagina "Categories"', {
                    body: await page.screenshot(),
                    contentType: 'image/png',
                });
            });


        });
    });
}


const sectionsBath = [


    { titleTC: '🧪 US 004 | TS 004 |TC 003 | Validar el Text Input Category Name, al añadir una Cadena de texto solo Numérica.', inputTextTC: 1234567, whenTC: '⚡ WHEN: completa el Text Input añadiendo una Cadena de texto solo Numérica,', butTC: '🚫 BUT: con un mínimo de un (1) carácter 🧩 AND: un máximo de cincuenta (50) caracteres, ', thenTC: '✔️ THEN: Debería el sistema redirigirlo automaticamente hacia el Text Input Category Name.', andThenTC: 'Debería aparecer una advertencia con un mensaje de color rojo, al lado derecho de la Label (Category Name), con el texto “Name must be in character only”.', validationError : '(Name must be in character only)', 
    },
    {
        titleTC: '🧪 US 004 | TS 004 | TC 004 | Intentar Validar el Text Input Category Name, al añadir una Cadena de texto solo caracteres Especiales.', inputTextTC: '@#$%^&', whenTC: '⚡ WHEN: completa el Text Input añadiendo una Cadena de texto solo caracteres Especiales,', butTC: '🚫 BUT: con un mínimo de un (1) carácter 🧩 AND: un máximo de cincuenta (50) caracteres, ', thenTC: '✔️ THEN: Debería el sistema redirigirlo automaticamente hacia el Text Input Category Name.', andThenTC: 'Debería aparecer una advertencia con un mensaje de color rojo, al lado derecho de la Label (Category Name), con el texto “Name must be in character only”.', validationError : '(Name must be in character only)',
    },
    {
        titleTC: '🧪 US 004 | TS 004 | TC 005 | Intentar Validar el Text Input Category Name, al añadir una Cadena de texto Alfanumérica.', inputTextTC: 'Postre37', whenTC: '⚡ WHEN: completa el Text Input añadiendo una Cadena de texto Alfanumérica,', butTC: '🚫 BUT: con un mínimo de un (1) carácter 🧩 AND: un máximo de cincuenta (50) caracteres, ', thenTC: '✔️ THEN: Debería el sistema redirigirlo automaticamente hacia el Text Input Category Name.', andThenTC: 'Debería aparecer una advertencia con un mensaje de color rojo, al lado derecho de la Label (Category Name), con el texto “Name must be in character only”.', validationError : '(Name must be in character only)',
    },
    {
        titleTC: '🧪 US 004 | TS 004 | TC 006 | Intentar Validar el Text Input Category Name, al añadir una Cadena de texto Alfabética con caracteres Especiales.', inputTextTC: 'Postre$%*&', whenTC: '⚡ WHEN: completa el Text Input añadiendo una Cadena de texto Alfabética con caracteres Especiales,', butTC: '🚫 BUT: con un mínimo de un (1) carácter 🧩 AND: un máximo de cincuenta (50) caracteres, ', thenTC: '✔️ THEN: Debería el sistema redirigirlo automaticamente hacia el Text Input Category Name.', andThenTC: 'Debería aparecer una advertencia con un mensaje de color rojo, al lado derecho de la Label (Category Name), con el texto “Name must be in character only”.', validationError : '(Name must be in character only)',
    },
    {
        titleTC: '🧪 US 004 | TS 004 | TC 007 | Intentar Validar el Text Input Category Name, con cero (0) carácter, campo vacío.', inputTextTC: '', whenTC: '⚡ WHEN: NO completa el Text Input, cero (0) carácter, campo vacío,', butTC: '', thenTC: '✔️ THEN: Debería el sistema redirigirlo automaticamente hacia el Text Input Category Name.', andThenTC: 'Debería aparecer una advertencia con un mensaje de color rojo, al lado derecho de la Label (Category Name), con el texto “Required Category Name”.', validationError: '(Required Category Name)',
    }

];


for (const section of sectionsBath) {
    test.describe('🎬 Scenario: Admin completa el campo Category Name incorrectamente', () => {

        test(`${section.titleTC}`, async ({ page }) => {

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
                type: '🎯 Scope',
                description: `QA deberá validar únicamente la funcionalidad del Text Input, al presionar el botón Add.`,
            });

            test.info().annotations.push({
                type: '🚫 OOS',
                description: `QA no deberá validar, el evento que suceda después de presionar el botón Add, excepto lo declarado en el scope.`,
            });

            await test.step(`${section.whenTC}`, async () => {

                await expect(page.locator('xpath=//div[@class="mb-3"]//span[@class="form-label" and text()="Category Name"]'), 'El Texto "Category Name", No es Visible.').toBeVisible();
                await expect(page.getByRole('textbox', { name: 'Category Name' }), 'El Text Input "Category Name", NO es Visible.').toBeVisible();

                const completeCategoryName = new fastFoodPage(page);
                await completeCategoryName.clickAndFillCategoryNameTextBox(`${section.inputTextTC}`)
            });


            const text = new fastFoodPage(page);
            const textTextbox = (await text.categoryNameTextBox.inputValue());
            const lenght = textTextbox.length;

            if (lenght > 0 && lenght < 51) {
                await test.step(`${section.butTC}`, async () => {

                    const text = new fastFoodPage(page);
                    const textTextbox = (await text.categoryNameTextBox.inputValue());
                    const lenght = textTextbox.length;

                    await expect(lenght).toBeGreaterThanOrEqual(1);
                    await expect(lenght).toBeLessThanOrEqual(50);

                    console.log(`La longitud del texto es: ${lenght}`);

                    await test.info().attach(`Input Text "Category Name" : ${section.inputTextTC} | Longitud : ${lenght}`, {
                        body: await page.screenshot(),
                        contentType: 'image/png'
                    })
                });
            }

            await test.step('🧩 AND: presiona el botón Add,  ', async () => {

                await expect(page.getByRole('button', { name: 'Add' }), 'El boton Add, No es Visible.').toBeVisible();
                await expect(page.getByRole('button', { name: 'Add' }), 'El Texto NO Coincide.').toHaveText('Add');

                await page.getByRole('button', { name: 'Add' }).click({ force: true })
            });

            await test.step(`${section.thenTC}`, async () => {

                const focusCategoryName = new fastFoodPage(page);
                await expect(focusCategoryName.categoryNameTextBox).toBeFocused();
                await expect(focusCategoryName.categoryNameTextBox).toBeVisible();
            });

            await test.step(`${section.andThenTC}`, async () => {

                if (lenght > 0 && lenght < 51) {
                    await page.getByText(`${section.validationError}`).waitFor({ state: 'visible' });
                    await expect(page.locator('xpath=//div[@class="mb-3"]//span[@id="ContentPlaceHolder1_revName"]')).toHaveText(`${section.validationError}`);
                }
                else {
                    await page.getByText(`${section.validationError}`).waitFor({ state: 'visible' });
                    await expect(page.locator('xpath=//div[@class="mb-3"]//span[@id="ContentPlaceHolder1_rfValidator"]')).toHaveText(`${section.validationError}`);
                }

                await page.waitForTimeout(100);
                await test.info().attach(`Focus Text Input "Category Name" - ${section.validationError}`, {
                    body: await page.screenshot(),
                    contentType: 'image/png',
                });
            });


        });
    });
}