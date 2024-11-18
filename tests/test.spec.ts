import { test, expect, Browser, Page } from '@playwright/test'
import { describe } from 'node:test';
import { fastFoodPage } from './PageObject/fastFoodPage';


let username: string = 'Admin';
let password: string = '1234';

//Ejemplo de la Posible Arquitectura de diseño.

test.describe('🔬 US 001 - TS 001 - Redireccion - Acceso a la Página Principal de Administración de FastFood', () => {


    test.beforeEach(async ({ page }) => {
        await page.goto('/');

        test.info().annotations.push({
            type: '📑 US 001 | Acceso a la Página Principal de Administración de FastFood.',
            description: `      
        COMO: admin de la web FastFood,
        QUIERO: acceder a la interfaz principal de administración,
        PARA: gestionar todas las tareas relacionadas con la plataforma.`
        });

        test.info().annotations.push({
            type: '📋 Especificaciones:',
            description: 'Al acceder a la URL, la aplicación debe cargarse correctamente y mostrar un menú lateral con las siguientes opciones funcionales: Categorías, Productos, Usuarios, Contacto'
        });

        test.info().annotations.push({
            type: '🎯 Scope:',
            description: 'QA: Se encargará de validar únicamente el acceso a la URL y el correcto redireccionamiento a la interfaz principal.',
        });

    });


    test('US 001 - TS 001 - TC 001 - Validar, redireccionar a la Interfaz Principal de Administración, cuando se introduce la URL correspondiente', async ({ page }) => {



        await test.step('📝 GIVEN:  que el usuario se encuentra en la Plataforma - http://desarrollowebecommerce.somee.com/ ', async () => {
            await expect(page.locator("xpath=//div[contains(@class, 'popup-content')]//a"), 'El link "Home", no esta Visible').toBeVisible();
        });

        const goDashboardAdmin = new fastFoodPage(page);
        await test.step('🧩AND: esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador.', async () => {
            await goDashboardAdmin.clickinitialHomeLink();

            await expect(page).toHaveURL('http://desarrollowebecommerce.somee.com/User/Default.aspx');

            await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();

            await goDashboardAdmin.clickNavbarLoginLink();
            await expect(page).toHaveURL('http://desarrollowebecommerce.somee.com/User/Login.aspx');

            await page.getByRole('textbox', { name: 'Username' }).fill(`${username}`);
            await page.getByRole('textbox', { name: 'Password' }).fill(`${password}`);

            await goDashboardAdmin.clickLoginButton();
        });

        await test.step('🧩AND: se encuentra en el HOME de la plataforma - http://desarrollowebecommerce.somee.com/User/Default.aspx', async () => {

            await page.goto('http://desarrollowebecommerce.somee.com/User/Default.aspx');
            await expect(page).toHaveURL('http://desarrollowebecommerce.somee.com/User/Default.aspx');

            await test.info().attach('Pagina HOME', {
                body: await page.screenshot(),
                contentType: 'image/png',
            });
        });

        await test.step('⚡ WHEN: Selecciona la barra de direcciones del navegador, 🧩AND: introduce la URL, 🧩AND: presiona la tecla Enter,', async () => {

            await page.goto('http://desarrollowebecommerce.somee.com/Admin/Dashboard.aspx')

            const waitLoader = new fastFoodPage(page);
            await waitLoader.hiddenAdminLoader();
        });

        await test.step('✔️ THEN: Debería redirecciónarse a la Interfaz Principal de Administración,  ', async () => {

            await expect(page).toHaveURL('http://desarrollowebecommerce.somee.com/Admin/Dashboard.aspx');
            await expect(page).toHaveTitle('FastFood - Admin');
        });

        await test.step('🧩AND: Deberia renderizarse la Interfaz Principal de Administración exitosamente.', async () => {

            const waitTakePicture = new fastFoodPage(page);
            await waitTakePicture.hiddenAdminLoader();

            await test.info().attach('Pagina DASHBOARD', {
                body: await page.screenshot(),
                contentType: 'image/png'
            });
        });
    });
});


test.describe('🔬 US 002 - TS 002 - Redireccion - Acceso a la Página Categories de Administración de FastFood', () => {

    test.beforeEach(async ({ page }) => {

        test.info().annotations.push({
            type: '📑 US 002 | Redirección | Acceso a la Página "Categories" de Administración de FastFood.',
            description: `COMO: Admin de la plataforma FastFood,
QUIERO: acceder a la interfaz “Categories” de administración,
PARA: visualizar la lista de categorías.
`,
        });

        test.info().annotations.push({
            type: '📋 Especificaciones',
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
            type: '🎯 Scope',
            description: `TAE: deberá validar el acceso tanto a través de la URL como desde la Interfaz Principal de Administración, asegurando el correcto redireccionamiento a la interfaz "Categories".`,
        })

        test.info().annotations.push({
            type: `🚫 OOS`,
            description: `TAE: No se deberá la validar el contenido de la tabla tras la renderización de la interfaz "Categories".`,
        })
    })


    test.beforeEach('🔲 BACKGROUND - 📝 GIVEN: que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador.', async ({ page }) => {

        await page.goto('/');

        const goDashboardAdmin = new fastFoodPage(page);
        await goDashboardAdmin.loginAndGoDashboardAdmin();
    });

    test.beforeEach('🧩 AND: el Usuario se encuentra en la Interfaz Principal de Administración - Dashboard', async ({ page }) => {

        await page.waitForLoadState('load');
        const waitTakePicture = new fastFoodPage(page);
        await waitTakePicture.hiddenAdminLoader();

        await test.info().attach('Pagina Dashboard', {
            body: await page.screenshot(),
            contentType: 'image/png'
        });
    });


    test('US 002 - TS 002 - TC 001 - Validar la correcta redirección a la Interfaz “Categories” de Administración, mediante la URL.', async ({ page }) => {


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

    test('US 002 - TS 002 - TC 002 - Validar, redireccionar a la Interfaz “Categories” de Administración, mediante el TabMenu, seleccionando la opción funcional “Categories”.', async ({ page }) => {



        await test.step('⚡ WHEN: hace Click en Categories del Tab Menu visible en la parte izquierda de la pantalla,', async () => {

            await expect(page.getByRole('link', { name: ' Categories' }), 'Categories del Tab Menu no esta Visible.').toBeVisible();

            const goCategories = new fastFoodPage(page);
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

    test('US 002 - TS 002 - TC 003 - Intentar Validar, redireccionar a la Interfaz “Categories” de Administración, mediante el Icono de la "Card Categories".', async ({ page }) => {


        await test.step('⚡ WHEN: hace Click en el ICONO de la "Card Categories", que se encuentra en el Panel central del Dashboard,', async () => {

            await expect(page.locator('div.card-block-small i.icofont-muffin'), 'La Card Categories, NO esta Visible').toBeVisible();

            const goPageCategories = new fastFoodPage(page);
            await goPageCategories.clickCardCategoriesIco();
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

    test('US 002 - TS 002 - TC 004 - Intentar Validar, redireccionar a la Interfaz “Categories” de Administración, mediante el View Details de la "Card Categories".', async ({ page }) => {


        await test.step('⚡ WHEN: hace Click en el Text "View Details" de la "Card Categories", que se encuentra en el Panel central del Dashboard,', async () => {

            await expect(page.locator("//div[@class='card-block-small']//i[@id='categoriesDetails']"), 'El "View Details", de la "Card Categories", NO es Visible.').toBeVisible();

            const goPageCategories = new fastFoodPage(page);
            await goPageCategories.clickCardCategoriesViewDetails();
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


test.describe('🔬 US 003 - TS 003 - Acceso a la Pagina Formulario de Categories de Administración de FastFood', () => {

    test.beforeEach(async ({ page }) => {

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

    });

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


    test('US 003 - TS 003 - TC 001 - Validar, redireccionar a la Interfaz “Formulario de Categories” de Administración, mediante el Botón Add.', async ({ page }) => {


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


    test('US 003 - TS 003 - TC 002 - Validar, redireccionar a la Interfaz “Formulario de una Categoria” de Administración, mediante la URL.', async ({ page }) => {


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



test.describe('🔬 US 004 - TS 004 - Text Input Categoría Formulario | Completar los campos del formulario, para crear una Categoría.', () => {

    test.beforeEach(async ({ page }) => {
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
    })


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

        { titleTC: 'US 004 - TS 004 - TC 001 -  Validar el Text Input Category Name, al añadir un (1) carácter Alfabético (String).', inputTextTC: 'P', thenTC: '✔️ THEN: el Text Input Category Name no le dará ninguna advertencia 🧩 AND: el sistema lo redireccionara a la página Category.' },

        { titleTC: 'US 004 - TS 004 - TC 002 -  Validar el Text Input Category Name, al añadir cincuenta (50) caracteres Alfabéticos (String).', inputTextTC: 'qwertyuioplkjhgfdsazxcvbnmlkjhgfdsaqwertyuioplkjhg', butTC: '🚫 BUT: con un mínimo de un (1) carácter 🧩 AND: un máximo de cincuenta (50) caracteres, ', thenTC: '✔️ THEN: el Text Input Category Name no le dará ninguna advertencia 🧩 AND: el sistema lo redireccionara a la página Category.' }

    ];

    for (const section of sections) {

        test(`${section.titleTC}`, async ({ page }) => {

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
    }


    const sectionsBath = [
        {
            titleTC: 'US 004 - TS 004 - TC 003 - Validar el Text Input Category Name, al añadir una Cadena de texto solo Numérica.', inputTextTC: 1234567, whenTC: '⚡ WHEN: completa el Text Input añadiendo una Cadena de texto solo Numérica,', butTC: '🚫 BUT: con un mínimo de un (1) carácter 🧩 AND: un máximo de cincuenta (50) caracteres, ', thenTC: '✔️ THEN: Debería el sistema redirigirlo automaticamente hacia el Text Input Category Name.', andThenTC: 'Debería aparecer una advertencia con un mensaje de color rojo, al lado derecho de la Label (Category Name), con el texto “Name must be in character only”.', validationError: '(Name must be in character only)',
        },
        {
            titleTC: 'US 004 - TS 004 - TC 004 - Intentar Validar el Text Input Category Name, al añadir una Cadena de texto solo caracteres Especiales.', inputTextTC: '@#$%^&', whenTC: '⚡ WHEN: completa el Text Input añadiendo una Cadena de texto solo caracteres Especiales,', butTC: '🚫 BUT: con un mínimo de un (1) carácter 🧩 AND: un máximo de cincuenta (50) caracteres, ', thenTC: '✔️ THEN: Debería el sistema redirigirlo automaticamente hacia el Text Input Category Name.', andThenTC: 'Debería aparecer una advertencia con un mensaje de color rojo, al lado derecho de la Label (Category Name), con el texto “Name must be in character only”.', validationError: '(Name must be in character only)',
        },
        {
            titleTC: 'US 004 - TS 004 - TC 005 - Intentar Validar el Text Input Category Name, al añadir una Cadena de texto Alfanumérica.', inputTextTC: 'Postre37', whenTC: '⚡ WHEN: completa el Text Input añadiendo una Cadena de texto Alfanumérica,', butTC: '🚫 BUT: con un mínimo de un (1) carácter 🧩 AND: un máximo de cincuenta (50) caracteres, ', thenTC: '✔️ THEN: Debería el sistema redirigirlo automaticamente hacia el Text Input Category Name.', andThenTC: 'Debería aparecer una advertencia con un mensaje de color rojo, al lado derecho de la Label (Category Name), con el texto “Name must be in character only”.', validationError: '(Name must be in character only)',
        },
        {
            titleTC: 'US 004 - TS 004 - TC 006 - Intentar Validar el Text Input Category Name, al añadir una Cadena de texto Alfabética con caracteres Especiales.', inputTextTC: 'Postre$%*&', whenTC: '⚡ WHEN: completa el Text Input añadiendo una Cadena de texto Alfabética con caracteres Especiales,', butTC: '🚫 BUT: con un mínimo de un (1) carácter 🧩 AND: un máximo de cincuenta (50) caracteres, ', thenTC: '✔️ THEN: Debería el sistema redirigirlo automaticamente hacia el Text Input Category Name.', andThenTC: 'Debería aparecer una advertencia con un mensaje de color rojo, al lado derecho de la Label (Category Name), con el texto “Name must be in character only”.', validationError: '(Name must be in character only)',
        },
        {
            titleTC: 'US 004 - TS 004 - TC 007 - Intentar Validar el Text Input Category Name, con cero (0) carácter, campo vacío.', inputTextTC: '', whenTC: '⚡ WHEN: NO completa el Text Input, cero (0) carácter, campo vacío,', butTC: '', thenTC: '✔️ THEN: Debería el sistema redirigirlo automaticamente hacia el Text Input Category Name.', andThenTC: 'Debería aparecer una advertencia con un mensaje de color rojo, al lado derecho de la Label (Category Name), con el texto “Required Category Name”.', validationError: '(Required Category Name)',
        }

    ];

    for (const section of sectionsBath) {

        test(`${section.titleTC}`, async ({ page }) => {

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
    }
});


test.describe('🔬 US 005 | TS 005 | File Input Categoría Formulario | Completar los campos del formulario, para crear una Categoría.', () => {

    test.beforeEach(async ({ page }) => {

        test.info().annotations.push({
            type: `📑 US 005 | File Input Categoría Formulario | Completar los campos del formulario, para crear una Categoría.`,
            description: `COMO: Admin de la web FastFood, QUIERO:  agregar una imagen, PARA: identificar la categoría con una representación visual.`,
        });

        test.info().annotations.push({
            type: `📋 Especificaciones`,
            description: `El admin se encuentre situado en http://desarrollowebecommerce.somee.com/Admin/CategoryForm.aspx, podrá agregar una categoría, con el botón que se sitúa en la parte inferior de la tabla. Generado el evento, lo redireccionara a la primera parte del formulario para completar la categoría. En el caso que quiera agregar una imagen deberá dirigirse al File Input, que se encuentra debajo de la Label con texto “Category Image”, a continuación, deberá hacer Click en el Input, en el que se le abrirá el Explorador de Archivo, para elegir la imagen. Cada campo que esté incorrectamente completado mostrará una advertencia y no permitirá continuar con los siguientes pasos. Formulario Categoria: •	Category Name* (formato string) •	Category Image (formato string) •	Active (formato bool) •   Offer/NoOffer (formato: booleano).`,
        });

        test.info().annotations.push({
            type: `🎯 Scope`,
            description: `QA deberá validar únicamente la funcionalidad del File Input, al presionar el botón Add.`,
        });

        test.info().annotations.push({
            type: `🚫 OOS:`,
            description: `QA no deberá validar, el evento que suceda después de presionar el botón Add, excepto lo declarado en el scope.`,
        });
    });

    test.beforeEach('🔲 BACKGROUND - 📝 GIVEN: que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador', async ({ page }) => {
        await page.goto('/');
        const goFormCategory = new fastFoodPage(page);
        await goFormCategory.loginAndGoFormCategoryAdminCardCategoriesIco();
    });

    test.beforeEach('🧩 AND: el usuario se encuentra en la Interfaz Formulario "Add Category" de Administración - http://desarrollowebecommerce.somee.com/Admin/CategoryForm.aspx', async ({ page }) => {

        await expect(page).toHaveURL('http://desarrollowebecommerce.somee.com/Admin/CategoryForm.aspx');
        await expect(page.getByText('Add Category'), 'El Texto Add Category, NO esta Visible').toBeVisible();

    });

    test.beforeEach('🧩 AND: completa el Text Input “Category Name”, con la Cadena de Texto Postre.', async ({ page }) => {

        const categoryNameTextbox = new fastFoodPage(page);
        await categoryNameTextbox.preconditionClickAndFillCategoryNameTextBox();

        await page.waitForLoadState('load');
        const waitLoader = new fastFoodPage(page);
        await waitLoader.hiddenAdminLoader();

        test.info().attach('Pagina Formulario "Add Category"', {
            body: await page.screenshot(),
            contentType: 'image/png',
        })
    });



    test('001', async ({ page }) => {

        await test.step('WHEN : hace Click en el File Input Category Image', async () => {

            await expect(page.getByText('Category Image'), 'Texto NO es Visible').toBeVisible();
            await expect(page.locator('#ContentPlaceHolder1_txtImage')).toBeVisible();
            await expect(page.locator('#ContentPlaceHolder1_imgForm')).toBeVisible();

            test.info().attach('Imagen - Placeholder', {
                body: await page.screenshot(),
                contentType: 'image/png'
            });

        });

        await test.step(' AND: carga una Imagen', async () => {
            await page.locator('#ContentPlaceHolder1_txtImage').setInputFiles('C:/Users/Fernando/Desktop/Testing_Automatizado_QA2_ECommerce/tests/imgTest/Desserts.png');


            const fileInput = new fastFoodPage(page);
            const fileInputText = await fileInput.categoryImageInputFile.inputValue()
            await expect(fileInputText).toContain('Desserts.png')

            test.info().attach('Imagen - Nueva Imagen a Cargar', {
                body: await page.screenshot(),
                contentType: 'image/png'
            });
        });

        await test.step('', async () => {

        });
        

    });

});


