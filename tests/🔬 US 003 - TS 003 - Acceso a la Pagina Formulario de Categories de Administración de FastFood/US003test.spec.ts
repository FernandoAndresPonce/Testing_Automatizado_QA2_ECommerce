import { describe } from "node:test";
import { expect, test } from "playwright/test";
import { fastFoodPage } from "../PageObject/fastFoodPage";


test.beforeEach('🔲 BACKGROUND - 📝 GIVEN: que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador. ', async ({ page }) => {

    await page.goto('/');
    const goCategoriesAdmin = new fastFoodPage(page);
    await goCategoriesAdmin.loginAndGoCategoriesAdmin();
});

test.beforeEach('🧩 AND: el usuario se encuentra en la Interfaz Categories de Administración - http://desarrollowebecommerce.somee.com/Admin/Category.aspx', async ({ page }) => {

    await expect(page).toHaveURL('http://desarrollowebecommerce.somee.com/Admin/Category.aspx');

    await page.waitForLoadState('load')
    const waitTakePicture = new fastFoodPage(page);
    await waitTakePicture.hiddenAdminLoader();

    await test.info().attach('Pagina Categories', {
        body: await page.screenshot(),
        contentType: 'image/png'
    });
});


test.describe('🎬 Scenario: El admin accede exitosamente a la Interfaz “Formulario de una Categoria” de Administración', () => {

    test('🧪 US 003 | TS 003 | TC 001 | Validar, redireccionar a la Interfaz “Formulario de Categories” de Administración, mediante el Botón Add.', async ({ page }) => {

        test.info().annotations.push({
            type: '📑 US 003 | Redirección |Acceso a la Pagina "Formulario de una Categoria" de Administración de FastFood.',
            description: `COMO: admin de la plataforma FastFood,
        QUIERO: acceder al “Formulario Categories”,
        PARA: agregar una nueva categoría.`,
        });

        test.info().annotations.push({
            type: '📋 Especificaciones:',
            description: `Existen dos alternativas para acceder a la interfaz "Formulario de Categories" de administración:

1.	A través de la Interfaz de Categorías de Administración: Al ingresar a la interfaz de categorías, se visualizará un Botón con el texto "Agregar", ubicado en la parte inferior de la tabla que lista las categorías existentes.

NOTA: La tabla se mostrará únicamente si se ha agregado al menos una categoría.

Al hacer Click en el botón "Agregar", se iniciará la carga de la página, mostrando un indicador de carga (Loader) y redirigiendo al usuario a la interfaz correspondiente. Una vez que se complete la carga, se presentará un formulario con las siguientes especificaciones:
Formulario de Categoría:
•	Nombre de la Categoría* (formato: string)
•	Imagen de la Categoría (formato: string)
•	Activo (formato: booleano).
•   Offer/NoOffer (formato: booleano).

2.	Acceso directo mediante URL:
Es posible acceder directamente a la interfaz " Formulario Categories" utilizando la siguiente URL:
http://desarrollowebecommerce.somee.com/Admin/CategoryForm.aspx`,
        });

        test.info().annotations.push({
            type: '🎯 Scope:',
            description: `•	QA: deberá validar el acceso tanto a través de la URL como desde la Interfaz Categories de Administración, asegurando el correcto redireccionamiento a la interfaz "Formulario de Categories".`,
        });

        await test.step('⚡ WHEN: hace Click en el Boton Add, visible en la parte superior derecha del Filtro Rapido (Buscador),', async () => {

            await page.waitForLoadState('load');
            const goFormCategory = new fastFoodPage(page);
            await goFormCategory.hiddenAdminLoader();

            await expect(page.getByRole('button', { name: 'Add Category' }), 'El boton Add, NO es Visible.').toBeVisible();
            await expect(page.getByRole('textbox', { name: 'Category quick search...' }), 'El filtro rapido (Buscador), NO es Visible.').toBeVisible();

            await goFormCategory.clickAddCategoryButton();
        });

        await test.step('✔️ THEN: El sistema se deberia redireccionar a la Interfaz Formulario "Add Category" de Administración.', async () => {

            await expect(page).toHaveURL('http://desarrollowebecommerce.somee.com/Admin/CategoryForm.aspx');
        });

        await test.step('🧩 AND: Deberia renderizarse la Interfaz Formulario "Add Category" de Administración..', async () => {

            await expect(page.getByText('Add Category'), 'El texto ADD CATEGORY, NO contiene el Texto.').toBeVisible();

            const goFormCategory = new fastFoodPage(page);
            await goFormCategory.hiddenAdminLoader();

            await test.info().attach('Formulario "Add Category"', {
                body: await page.screenshot(),
                contentType: 'image/png',
            });
        });
    });


    test('🧪 US 003 | TS 003 | TC 002 | Validar, redireccionar a la Interfaz “Formulario de una Categoria” de Administración, mediante la URL.', async ({ page }) => {

        test.info().annotations.push({
            type: '📑 US 003 | Redirección |Acceso a la Pagina "Formulario de Categories" de Administración de FastFood.',
            description: `COMO: admin de la plataforma FastFood,
        QUIERO: acceder al “Formulario Categories”,
        PARA: agregar una nueva categoría.`,
        });

        test.info().annotations.push({
            type: '📋 Especificaciones:',
            description: `Existen dos alternativas para acceder a la interfaz "Formulario de las Categorias" de administración:

1.	A través de la Interfaz de Categorías de Administración: Al ingresar a la interfaz de categorías, se visualizará un Botón con el texto "Agregar", ubicado en la parte inferior de la tabla que lista las categorías existentes.

NOTA: La tabla se mostrará únicamente si se ha agregado al menos una categoría.

Al hacer Click en el botón "Agregar", se iniciará la carga de la página, mostrando un indicador de carga (Loader) y redirigiendo al usuario a la interfaz correspondiente. Una vez que se complete la carga, se presentará un formulario con las siguientes especificaciones:
Formulario de Categoría:
•	Nombre de la Categoría* (formato: string)
•	Imagen de la Categoría (formato: string)
•	Activo (formato: booleano).
•   Offer/NoOffer (formato: booleano).

2.	Acceso directo mediante URL:
Es posible acceder directamente a la interfaz " Formulario Categorias" utilizando la siguiente URL:
http://desarrollowebecommerce.somee.com/Admin/CategoryForm.aspx`,
        });

        test.info().annotations.push({
            type: '🎯 Scope:',
            description: `•	QA: deberá validar el acceso tanto a través de la URL como desde la Interfaz Categories de Administración, asegurando el correcto redireccionamiento a la interfaz "Formulario de Categories".`,
        });

        await test.step('⚡ WHEN: :al introducr la URL (http://localhost:52000/Admin/CategoryForm.aspx), en la barra de direcciones del navegador', async () => {

            await page.goto('http://desarrollowebecommerce.somee.com/Admin/CategoryForm.aspx');
        });

        await test.step('✔️ THEN: El sistema se deberia redireccionar a la Interfaz Formulario "Add Category" de Administración.', async () => {

            await expect(page).toHaveURL('http://desarrollowebecommerce.somee.com/Admin/CategoryForm.aspx');
        });

        await test.step('🧩 AND: Deberia renderizarse la Interfaz Formulario "Add Category" de Administración..', async () => {

            await expect(page.getByText('Add Category'), 'El texto ADD CATEGORY, NO contiene el Texto.').toBeVisible();

            const goFormCategory = new fastFoodPage(page);
            await goFormCategory.hiddenAdminLoader();

            await test.info().attach('Formulario "Add Category"', {
                body: await page.screenshot(),
                contentType: 'image/png',
            });
        });
    });
});


