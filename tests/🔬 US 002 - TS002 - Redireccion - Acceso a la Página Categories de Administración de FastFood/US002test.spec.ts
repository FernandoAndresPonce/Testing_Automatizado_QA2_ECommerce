import { test, expect } from '@playwright/test'
import { fastFoodPage } from '../PageObject/fastFoodPage'
import { describe } from 'node:test';

test.beforeEach(async ({page}) => {
    await page.goto('/');
});

test.describe('🎬 Scenario: El admin accede exitosamente a la Interfaz Categories de Administración ', () => {


    test('🧪 US 002 | TS 002 | TC 001 | Validar la correcta redirección a la Interfaz “Categories” de Administración, mediante la URL.', async ({ page }) => {

        test.info().annotations.push({
            type: '📑 US 002 | Redirección | Acceso a la Página "Categories" de Administración de FastFood.',
            description: `COMO: Admin de la plataforma FastFood,
QUIERO: acceder a la interfaz “Categories” de administración,
PARA: visualizar la lista de categorías.
`,
        });

        test.info().annotations.push({
            type: '📋 Especificaciones:',
            description: `Existen dos alternativas para acceder a la interfaz "Categories" de administración:

        1.	A través de la Interfaz Principal de Administración:
        Al ingresar a la interfaz principal, se mostrará un menú lateral (Tab Menu) que contiene las siguientes opciones funcionales:
        •	Categorías
        •	Productos
        •	Usuarios
        •	Contacto

        Al hacer Click en "Categorías", se iniciará la carga de la página, mostrando un loader y redirigiendo al usuario a la interfaz correspondiente. Una vez cargada, se presentará una tabla con las diferentes categorías y un buscador en la parte superior.

        2.	Acceso directo mediante URL:
        Se puede acceder directamente a la interfaz "Categories" utilizando la siguiente URL:
        http://desarrollowebecommerce.somee.com/Admin/Category.aspx`,

        });

        test.info().annotations.push({
            type: '🎯 Scope:',
            description: `TAE: deberá validar el acceso tanto a través de la URL como desde la Interfaz Principal de Administración, asegurando el correcto redireccionamiento a la interfaz "Categories".`,
        })

        test.info().annotations.push({
            type: `🚫 OOS:`,
            description: `TAE: No se deberá la validar el contenido de la tabla tras la renderización de la interfaz "Categories".`,
        })

        await test.step('📝 GIVEN: que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador.', async () => {

            const goDashboardAdmin = new fastFoodPage(page);
            await goDashboardAdmin.loginAndGoDashboardAdmin();
        });

        await test.step('🧩 AND: el Usuario se encuentra en la Interfaz Principal de Administración - Dashboard', async () => {

            const waitTakePicture = new fastFoodPage(page);
            await waitTakePicture.hiddenAdminLoader();

            await test.info().attach('Pagina Dashboard', {
                body: await page.screenshot(),
                contentType: 'image/png'
            });
        });

        await test.step('⚡ WHEN: selecciona la barra de direcciones del Navegar, 🧩 AND: introduce la URL: http://desarrollowebecommerce.somee.com/Admin/Category.aspx', async () => {
            await page.goto('http://desarrollowebecommerce.somee.com/Admin/Category.aspx');
        });

        await test.step('✔️ THEN: el sistema se deberia redireccionar a la Interfaz Categories de Administración.', async () => {
            await expect(page).toHaveURL('http://desarrollowebecommerce.somee.com/Admin/Category.aspx');
            await expect(page.getByRole('heading', { name: 'CATEGORIES' })).toBeVisible();
            await expect(page.getByRole('heading', { name: 'CATEGORIES' })).toHaveText('Categories');
        });

        await test.step('🧩 AND: el sistema se deberia renderizar la Interfaz Categories de Administración correctamente. ', async () => {

            const waitTakePicture = new fastFoodPage(page);
            await waitTakePicture.hiddenAdminLoader();

            await test.info().attach('Pagina Categories', {
                body: await page.screenshot(),
                contentType: 'image/png',
            });

        });

    });

    test('🧪 US 002 | TS 002 | TC 002 | Validar, redireccionar a la Interfaz “Categories” de Administración, mediante el TabMenu, seleccionando la opción funcional “Categories”.', async ({ page }) => {

        test.info().annotations.push({
            type: '📑 US 002 | Redirección | Acceso a la Página "Categories" de Administración de FastFood.',
            description: `COMO: Admin de la plataforma FastFood,
QUIERO: acceder a la interfaz “Categories” de administración,
PARA: visualizar la lista de categorías.
`,
        });

        test.info().annotations.push({
            type: '📋 Especificaciones:',
            description: `Existen dos alternativas para acceder a la interfaz "Categories" de administración:

        1.	A través de la Interfaz Principal de Administración:
        Al ingresar a la interfaz principal, se mostrará un menú lateral (Tab Menu) que contiene las siguientes opciones funcionales:
        •	Categorías
        •	Productos
        •	Usuarios
        •	Contacto

        Al hacer Click en "Categorías", se iniciará la carga de la página, mostrando un loader y redirigiendo al usuario a la interfaz correspondiente. Una vez cargada, se presentará una tabla con las diferentes categorías y un buscador en la parte superior.

        2.	Acceso directo mediante URL:
        Se puede acceder directamente a la interfaz "Categories" utilizando la siguiente URL:
        http://desarrollowebecommerce.somee.com/Admin/Category.aspx`,

        });

        test.info().annotations.push({
            type: '🎯 Scope:',
            description: `TAE: deberá validar el acceso tanto a través de la URL como desde la Interfaz Principal de Administración, asegurando el correcto redireccionamiento a la interfaz "Categories".`,
        })

        test.info().annotations.push({
            type: `🚫 OOS:`,
            description: `TAE: No se deberá la validar el contenido de la tabla tras la renderización de la interfaz "Categories".`,
        })

        await test.step('📝 GIVEN: que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador.', async () => {

            const goDashboardAdmin = new fastFoodPage(page);
            await goDashboardAdmin.loginAndGoDashboardAdmin();
        });

        await test.step('🧩 AND: el Usuario se encuentra en la Interfaz Principal de Administración - Dashboard', async () => {

            await page.waitForLoadState('load');
            const waitTakePicture = new fastFoodPage(page);
            await waitTakePicture.hiddenAdminLoader();

            await test.info().attach('Pagina Dashboard', {
                body: await page.screenshot(),
                contentType: 'image/png'
            });
        });

        await test.step('⚡ WHEN: hace Click en Categories del Tab Menu visible en la parte izquierda de la pantalla,', async () => {

            const goCategories = new fastFoodPage(page);
            
            await page.waitForLoadState('load');
            await goCategories.hiddenAdminLoader();

            await expect(page.getByRole('link', { name: ' Categories' }), 'Categories del Tab Menu no esta Visible.').toBeVisible();

            await goCategories.clickTabMenuCategoriesLink();
        });


        await test.step('✔️ THEN: El sistema se deberia redireccionar a la Interfaz Categories de Administración,', async () => {

            await expect(page).toHaveURL('http://desarrollowebecommerce.somee.com/Admin/Category.aspx');
            await expect(page.getByRole('heading', { name: 'CATEGORIES' })).toBeVisible();
            await expect(page.getByRole('heading', { name: 'CATEGORIES' })).toHaveText('Categories');
        });


        await test.step('🧩 AND: el sistema se deberia renderizar la Interfaz Categories de Administración correctamente. ', async () => {

            const waitTakePicture = new fastFoodPage(page);
            await waitTakePicture.hiddenAdminLoader();

            await test.info().attach('Pagina Categories', {
                body: await page.screenshot(),
                contentType: 'image/png',
            });

        });

    });
});