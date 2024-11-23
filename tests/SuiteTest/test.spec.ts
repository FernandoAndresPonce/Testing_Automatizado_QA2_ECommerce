import { test, expect, Browser, Page } from '@playwright/test'
import { describe } from 'node:test';
import { fastFoodPage } from '../PageObjectModel/fastFoodPage';
import { threadId } from 'node:worker_threads';




//Ejemplo de la Posible Arquitectura de diseño.

test.describe('🔬 US 001 - TS 001 - Redireccion - Acceso a la Página Principal de Administración de FastFood', () => {

    test.beforeEach('Pagina Inicial de la Plataforma Web.', async ({ page }) => {
        await page.goto('/');
    });

    test('US 001 - TS 001 - TC 001 - Validar, redireccionar a la Interfaz Principal de Administración, cuando se introduce la URL correspondiente', async ({ page }) => {


        let username: string = 'Admin';
        let password: string = '1234';

        const the = new fastFoodPage(page);
        const when = new fastFoodPage(page);

        await test.step('📝 GIVEN:  que el usuario se encuentra en la Plataforma - http://desarrollowebecommerce.somee.com/ ', async () => {
            await expect(the.initialHomeLink, 'El link "Home", no esta Visible').toBeVisible();
        });

        await test.step('🧩AND: esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador.', async () => {

            await the.clickinitialHomeLink();

            await expect(page).toHaveURL('/User/Default.aspx');

            await expect(the.navbarLoginLink).toBeVisible();

            await the.clickNavbarLoginLink();
            await expect(page).toHaveURL('/User/Login.aspx');

            await the.usernameLogin.fill(username);
            await the.passwordLogin.fill(password);

            await when.clickLoginButton();
        });

        await test.step('🧩AND: se encuentra en el HOME de la plataforma - http://desarrollowebecommerce.somee.com/User/Default.aspx', async () => {

            await when.goUserDefaultUrl();
            await expect(page).toHaveURL('/User/Default.aspx');

            await test.info().attach('Pagina HOME', {
                body: await page.screenshot(),
                contentType: 'image/png',
            });
        });

        await test.step('⚡ WHEN: Selecciona la barra de direcciones del navegador, 🧩AND: introduce la URL, 🧩AND: presiona la tecla Enter,', async () => {

            await when.goAdminDashboardUrl();

            await when.hiddenAdminLoader();
        });

        await test.step('✔️ THEN: Debería redirecciónarse a la Interfaz Principal de Administración,  ', async () => {

            await expect(page).toHaveURL('/Admin/Dashboard.aspx');
            await expect(page).toHaveTitle('FastFood - Admin');
        });

        await test.step('🧩AND: Deberia renderizarse la Interfaz Principal de Administración exitosamente.', async () => {

            await when.hiddenAdminLoader();

            await test.info().attach('Pagina DASHBOARD', {
                body: await page.screenshot(),
                contentType: 'image/png'
            });
        });
    });
});


test.describe('🔬 US 002 - TS 002 - Redireccion - Acceso a la Página Categories de Administración de FastFood', () => {

    test.beforeEach('🔲 BACKGROUND:', async ({ page }) => {

        const when = new fastFoodPage(page);

        await test.step('📝 GIVEN: que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador.', async () => {

            await page.goto('/');

            await when.loginAndGoDashboardAdmin();
        });

        await test.step('🧩 AND: el Usuario se encuentra en la Interfaz Principal de Administración - Dashboard', async () => {

            await page.waitForLoadState('load');
            await when.hiddenAdminLoader();

            await test.info().attach('Pagina Dashboard', {
                body: await page.screenshot(),
                contentType: 'image/png'
            });
        });
    });

    test('US 002 - TS 002 - TC 001 - Validar la correcta redirección a la Interfaz “Categories” de Administración, mediante la URL.', async ({ page }) => {

        const the = new fastFoodPage(page);
        const when = new fastFoodPage(page);

        await test.step('⚡ WHEN: selecciona la barra de direcciones del Navegar, 🧩 AND: introduce la URL: http://desarrollowebecommerce.somee.com/Admin/Category.aspx', async () => {
            await when.goAdminCategoryUrl();
        });

        await test.step('✔️ THEN: el sistema se deberia redireccionar a la Interfaz Categories de Administración.', async () => {
            await expect(page).toHaveURL('/Admin/Category.aspx');
            await expect(the.categoryTitle).toBeVisible();
            await expect(the.categoryTitle).toHaveText('Categories');
        });

        await test.step('🧩 AND: el sistema se deberia renderizar la Interfaz Categories de Administración correctamente. ', async () => {

            await the.hiddenAdminLoader();

            await test.info().attach('Pagina Categories', {
                body: await page.screenshot(),
                contentType: 'image/png',
            });
        });
    });

    test('US 002 - TS 002 - TC 002 - Validar, redireccionar a la Interfaz “Categories” de Administración, mediante el TabMenu, seleccionando la opción funcional “Categories”.', async ({ page }) => {

        const the = new fastFoodPage(page);
        const when = new fastFoodPage(page);

        await test.step('⚡ WHEN: hace Click en Categories del Tab Menu visible en la parte izquierda de la pantalla,', async () => {

            await expect(the.tabMenuCategoriesLink, 'Categories del Tab Menu no esta Visible.').toBeVisible();

            await when.clickTabMenuCategoriesLink();
        });

        await test.step('✔️ THEN: El sistema se deberia redireccionar a la Interfaz Categories de Administración,', async () => {

            await expect(page).toHaveURL('/Admin/Category.aspx');
            await expect(the.categoryTitle).toBeVisible();
            await expect(the.categoryTitle).toHaveText('Categories');
        });

        await test.step('🧩 AND: el sistema se deberia renderizar la Interfaz Categories de Administración correctamente. ', async () => {

            await when.hiddenAdminLoader();

            await test.info().attach('Pagina Categories', {
                body: await page.screenshot(),
                contentType: 'image/png',
            });
        });
    });

    test('US 002 - TS 002 - TC 003 - Intentar Validar, redireccionar a la Interfaz “Categories” de Administración, mediante el Icono de la "Card Categories".', async ({ page }) => {

        const when = new fastFoodPage(page);
        const the = new fastFoodPage(page);

        await test.step('⚡ WHEN: hace Click en el ICONO de la "Card Categories", que se encuentra en el Panel central del Dashboard,', async () => {

            await expect(the.cardCategoriesIco, 'La Card Categories, NO esta Visible').toBeVisible();

            await when.clickCardCategoriesIco();
        });

        await test.step('✔️ THEN: El sistema se deberia redireccionar a la Interfaz Categories de Administración,', async () => {

            await expect(page).toHaveURL('/Admin/Category.aspx');
            await expect(the.categoryTitle).toBeVisible();
            await expect(the.categoryTitle).toHaveText('Categories');
        });


        await test.step('🧩 AND: el sistema se deberia renderizar la Interfaz Categories de Administración correctamente. ', async () => {

            await when.hiddenAdminLoader();

            await test.info().attach('Pagina Categories', {
                body: await page.screenshot(),
                contentType: 'image/png',
            });
        });
    });

    test('US 002 - TS 002 - TC 004 - Intentar Validar, redireccionar a la Interfaz “Categories” de Administración, mediante el View Details de la "Card Categories".', async ({ page }) => {

        const the = new fastFoodPage(page);
        const when = new fastFoodPage(page);

        await test.step('⚡ WHEN: hace Click en el Text "View Details" de la "Card Categories", que se encuentra en el Panel central del Dashboard,', async () => {

            await expect(the.cardCategoriesViewDetails, 'El "View Details", de la "Card Categories", NO es Visible.').toBeVisible();

            await when.clickCardCategoriesViewDetails();
        });

        await test.step('✔️ THEN: El sistema se deberia redireccionar a la Interfaz Categories de Administración,', async () => {

            await expect(page).toHaveURL('/Admin/Category.aspx');
            await expect(the.categoryTitle).toBeVisible();
            await expect(the.categoryTitle).toHaveText('Categories');
        });

        await test.step('🧩 AND: el sistema se deberia renderizar la Interfaz Categories de Administración correctamente. ', async () => {

            await when.hiddenAdminLoader();

            await test.info().attach('Pagina Categories', {
                body: await page.screenshot(),
                contentType: 'image/png',
            });
        });
    });
});


test.describe('🔬 US 003 - TS 003 - Acceso a la Pagina Formulario de Categories de Administración de FastFood', () => {

    test.beforeEach('🔲 BACKGROUND:', async ({ page }) => {

        const when = new fastFoodPage(page);

        await test.step('📝 GIVEN: que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador.', async () => {

            await page.goto('/');
            await when.loginAndGoCategoriesAdmin();
        });

        await test.step('🧩 AND: el usuario se encuentra en la Interfaz Categories de Administración - http://desarrollowebecommerce.somee.com/Admin/Category.aspx', async () => {
            await expect(page).toHaveURL('/Admin/Category.aspx');

            await page.waitForLoadState('load')
            await when.hiddenAdminLoader();

            await test.info().attach('Pagina Categories', {
                body: await page.screenshot(),
                contentType: 'image/png'
            });
        });
    });

    test('US 003 - TS 003 - TC 001 - Validar, redireccionar a la Interfaz “Formulario de Categories” de Administración, mediante el Botón Add.', async ({ page }) => {

        const the = new fastFoodPage(page);
        const when = new fastFoodPage(page);

        await test.step('⚡ WHEN: hace Click en el Boton Add, visible en la parte superior derecha del Filtro Rapido (Buscador),', async () => {

            await expect(the.addCategoryButton, 'El boton Add, NO es Visible.').toBeVisible();
            await expect(the.searchFilterCategorTextbox, 'El filtro rapido (Buscador), NO es Visible.').toBeVisible();

            await when.clickAddCategoryButton();
        });

        await test.step('✔️ THEN: El sistema se deberia redireccionar a la Interfaz Formulario "Add Category" de Administración.', async () => {

            await expect(page).toHaveURL('/Admin/CategoryForm.aspx');
        });

        await test.step('🧩 AND: Deberia renderizarse la Interfaz Formulario "Add Category" de Administración..', async () => {

            await expect(page.getByText('Add Category'), 'El texto ADD CATEGORY, NO contiene el Texto.').toBeVisible();

            await when.hiddenAdminLoader();

            await test.info().attach('Formulario "Add Category"', {
                body: await page.screenshot(),
                contentType: 'image/png',
            });
        });
    });


    test('US 003 - TS 003 - TC 002 - Validar, redireccionar a la Interfaz “Formulario de una Categoria” de Administración, mediante la URL.', async ({ page }) => {

        const when = new fastFoodPage(page);

        await test.step('⚡ WHEN: :al introducr la URL (http://localhost:52000/Admin/CategoryForm.aspx), en la barra de direcciones del navegador', async () => {

            await when.goAdminCategoryFormUrl();
        });

        await test.step('✔️ THEN: El sistema se deberia redireccionar a la Interfaz Formulario "Add Category" de Administración.', async () => {

            await expect(page).toHaveURL('/Admin/CategoryForm.aspx');
        });

        await test.step('🧩 AND: Deberia renderizarse la Interfaz Formulario "Add Category" de Administración..', async () => {

            await expect(page.getByText('Add Category'), 'El texto ADD CATEGORY, NO contiene el Texto.').toBeVisible();

            await when.hiddenAdminLoader();

            await test.info().attach('Formulario "Add Category"', {
                body: await page.screenshot(),
                contentType: 'image/png',
            });
        });
    });
});


test.describe('🔬 US 004 - TS 004 - Text Input Categoría Formulario | Completar los campos del formulario, para crear una Categoría.', () => {

    test.beforeEach('🔲 BACKGROUND:', async ({ page }) => {

        const when = new fastFoodPage(page);

        await test.step('📝 GIVEN: que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador', async () => {
            await page.goto('/');
            await when.loginAndGoFormCategoryAdminRandomRoute();
        })

        await test.step('🧩 AND: el usuario se encuentra en la Interfaz Formulario "Add Category" de Administración - http://desarrollowebecommerce.somee.com/Admin/CategoryForm.aspx', async () => {

            await expect(page).toHaveURL('/Admin/CategoryForm.aspx');
            await expect(page.getByText('Add Category'), 'El Texto Add Category, NO esta Visible').toBeVisible();

            await page.waitForLoadState('load');
            await when.hiddenAdminLoader();

            test.info().attach('Pagina Formulario "Add Category"', {
                body: await page.screenshot(),
                contentType: 'image/png',
            });
        });
    });


    //Variables ⬇️ TC

    const sections = [

        { titleTC: 'US 004 - TS 004 - TC 001 -  Validar el Text Input Category Name, al añadir un (1) carácter Alfabético (String).', inputTextTC: 'P', thenTC: '✔️ THEN: el Text Input Category Name no le dará ninguna advertencia 🧩 AND: el sistema lo redireccionara a la página Category.' },

        { titleTC: 'US 004 - TS 004 - TC 002 -  Validar el Text Input Category Name, al añadir cincuenta (50) caracteres Alfabéticos (String).', inputTextTC: 'qwertyuioplkjhgfdsazxcvbnmlkjhgfdsaqwertyuioplkjhg', butTC: '🚫 BUT: con un mínimo de un (1) carácter 🧩 AND: un máximo de cincuenta (50) caracteres, ', thenTC: '✔️ THEN: el Text Input Category Name no le dará ninguna advertencia 🧩 AND: el sistema lo redireccionara a la página Category.' }

    ];

    for (const section of sections) {

        test(`${section.titleTC}`, async ({ page }) => {

            const the = new fastFoodPage(page);
            const when = new fastFoodPage(page);

            await test.step('⚡ WHEN: completa el Text Input Category Name con una cadena de texto Alfabética,', async () => {

                await expect(the.categoryNameTitle, 'El Texto "Category Name", No es Visible.').toBeVisible();
                await expect(page.getByRole('textbox', { name: 'Category Name' }), 'El Text Input "Category Name", NO es Visible.').toBeVisible();


                await when.clickAndFillCategoryNameTextBox(`${section.inputTextTC}`)
            });

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

            await test.step('🧩 AND: presiona el botón Add,  ', async () => {

                await expect(the.categoryFormAddButton, 'El boton Add, No es Visible.').toBeVisible();
                await expect(the.categoryFormAddButton, 'El Texto NO Coincide.').toHaveText('Add');

                await the.categoryFormAddButton.click({ force: true })
            });

            await test.step(`${section.thenTC}`, async () => {

                await expect(page).toHaveURL('/Admin/Category.aspx');
                await expect(the.categoryTitle, 'El texto "CATEGORIES", NO es Visible.').toBeVisible();

                await page.waitForLoadState('load');
                await when.hiddenAdminLoader();

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

            const the = new fastFoodPage(page);
            const when = new fastFoodPage(page);

            await test.step(`${section.whenTC}`, async () => {

                await expect(the.categoryNameTitle, 'El Texto "Category Name", No es Visible.').toBeVisible();
                await expect(page.getByRole('textbox', { name: 'Category Name' }), 'El Text Input "Category Name", NO es Visible.').toBeVisible();

                await when.clickAndFillCategoryNameTextBox(`${section.inputTextTC}`)
            });

            const textTextbox = (await the.categoryNameTextBox.inputValue());
            const lenght = textTextbox.length;

            if (lenght > 0 && lenght < 51) {
                await test.step(`${section.butTC}`, async () => {

                    const textTextbox = (await the.categoryNameTextBox.inputValue());
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

                await expect(the.categoryFormAddButton, 'El boton Add, No es Visible.').toBeVisible();
                await expect(the.categoryFormAddButton, 'El Texto NO Coincide.').toHaveText('Add');

                await the.categoryFormAddButton.click({ force: true })
            });

            await test.step(`${section.thenTC}`, async () => {

                await expect(the.categoryNameTextBox).toBeFocused();
                await expect(the.categoryNameTextBox).toBeVisible();
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

    test.beforeEach('🔲 BACKGROUND:', async ({ page }) => {

        const when = new fastFoodPage(page);

        await test.step('📝 GIVEN: que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador', async () => {

            await page.goto('/');
            await when.loginAndGoFormCategoryAdminRandomRoute();
        });

        await test.step('🧩 AND: el usuario se encuentra en la Interfaz Formulario "Add Category" de Administración - http://desarrollowebecommerce.somee.com/Admin/CategoryForm.aspx', async () => {

            await expect(page).toHaveURL('/Admin/CategoryForm.aspx');
            await expect(page.getByText('Add Category'), 'El Texto Add Category, NO esta Visible').toBeVisible();
        });

        await test.step('🧩 AND: completa el Text Input “Category Name”, con la Cadena de Texto Postre.', async () => {

            await when.preconditionClickAndFillCategoryNameTextBox();

            await page.waitForLoadState('load');
            await when.hiddenAdminLoader();

            test.info().attach('Pagina Formulario "Add Category"', {
                body: await page.screenshot(),
                contentType: 'image/png',
            });
        });
    });

    test('US 005 - TS 005 - TC 001 - Validar, cargar previsualización de una imagen, al ingresar una imagen en el File-Input.', async ({ page }) => {

        const the = new fastFoodPage(page);

        await test.step('⚡ WHEN : hace Click en el File Input Category Image', async () => {

            await expect(the.categoryImageTitle, 'Texto NO es Visible').toBeVisible();
            await expect(the.categoryImageInputFile, 'File Input NO es Visible').toBeVisible();
            await expect(the.categoryImageImg, 'Imagen No es Visible').toBeVisible();

            await the.categoryImageInputFile.click();

            test.info().attach('Imagen - Placeholder', {
                body: await page.screenshot(),
                contentType: 'image/png'
            });
        });

        await test.step('🧩 AND: carga una Imagen', async () => {

            await the.categoryImageInputFile.setInputFiles('C:/Users/Fernando/Desktop/Testing_Automatizado_QA2_ECommerce/tests/imgTest/Desserts.png');

            const fileInputText = await the.categoryImageInputFile.inputValue()
            await expect(fileInputText).toContain('Desserts.png')
        });

        await test.step('✔️ THEN : Deberia previsualizarse la imagen añadida.', async () => {

            test.info().attach('Imagen - Nueva Imagen a Cargar', {
                body: await page.screenshot(),
                contentType: 'image/png'
            });
        });
    });


    test('US 005 - TS 005 - TC 002 - Validar, No cargar previsualización de una imagen.', async ({ page }) => {

        const the = new fastFoodPage(page);

        await test.step('✔️ THEN : Deberia previsualizarse un "Placeholder", como imagen pre establecida.', async () => {

            await expect(the.categoryImageTitle, 'Texto NO es Visible').toBeVisible();
            await expect(the.categoryImageInputFile).toBeVisible();
            await expect(the.categoryImageImg).toBeVisible();

            test.info().attach('Imagen - "Placeholder"', {
                body: await page.screenshot(),
                contentType: 'image/png'
            });
        });
    });


    test('US 005 - TS 005 - TC 003 - Validar, Cargar previsualización de una imagen,  al No ingresar una imagen en el File-Input.', async ({ page }) => {

        const the = new fastFoodPage(page);

        await test.step('⚡ WHEN : hace Click en el File Input Category Image', async () => {

            await expect(the.categoryImageTitle, 'Texto NO es Visible').toBeVisible();
            await expect(the.categoryImageInputFile).toBeVisible();
            await expect(the.categoryImageImg).toBeVisible();

            await the.categoryImageInputFile.click();

        });

        await test.step('🧩 AND: NO carga ninguna Imagen', async () => {

            await page.locator('#ContentPlaceHolder1_txtImage').setInputFiles([]);

            const fileInputText = await the.categoryImageInputFile.inputValue()
            await expect(fileInputText).toContain('')
        });

        await test.step('✔️ THEN : Deberia previsualizarse el "Placeholder".', async () => {

            test.info().attach('Imagen - imagen "Placeholder"', {
                body: await page.screenshot(),
                contentType: 'image/png'
            });
        });
    });
});


test.describe('🔬 US 006 - TS 006 - Check Box Formulario de Categorías | Crear una Categoría Activa o Inactiva.', async () => {


    test.beforeEach('🔲 BACKGROUND:', async ({ page }) => {

        const the = new fastFoodPage(page);
        const when = new fastFoodPage(page);

        await test.step('📝 GIVEN: que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador', async () => {

            await page.goto('/');
            await when.loginAndGoFormCategoryAdminRandomRoute();
        });

        await test.step('🧩 AND: el usuario se encuentra en la Interfaz Formulario "Add Category" de Administración - http://desarrollowebecommerce.somee.com/Admin/CategoryForm.aspx', async () => {

            await expect(page).toHaveURL('/Admin/CategoryForm.aspx');
            await expect(the.categoryAddTitle, 'El Texto Add Category, NO esta Visible').toBeVisible();
        });

        await test.step('🧩 AND: el Check Box está marcado o estado “Activo” (Checked)', async () => {

            await expect(the.categoryActiveCheckbox, 'El Checkbox, No esta Visible.').toBeVisible();
            await expect(the.categoryActiveCheckbox, 'El Checkbox, No esta Marcado.').toBeChecked();

            await expect(the.categoryActiveLabel, "El Label, No esta Visible").toBeVisible();
            await expect(the.categoryActiveLabel, "El Texto, No es Active").toHaveText("Active");


            await page.waitForLoadState('load');
            await when.hiddenAdminLoader();

            const screenshot = await page.screenshot({ fullPage: true });
            test.info().attach('Pagina Formulario: "Add Category" | CheckBox : Marcado (Checked)', {
                body: screenshot,
                contentType: 'image/png',
            });
        });
    });


    test('US 006 - TS 006 - TC 001 - Validar la transición de estado de la Etiqueta (Label) de "Active" a "Inactive" y el cambio del estado del Check Box de marcado (Checked) a desmarcado (Unchecked), al hacer Click en el Check Box.', async ({ page }) => {

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

    test('US 006 - TS 006 - TC 002 - Validar la transición de estado de la Etiqueta (Label) de "Inactive" a "Active" y el cambio del estado del Check Box de desmarcado (Unchecked) a marcado (Checked), al hacer Click en el Check Box.', async ({ page }) => {

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

        await test.step('🧩 AND: el CheckBox se establece en estado marcado (Checked).', async () => {

            await expect(the.categoryActiveCheckbox, "El CheckBox esta Desmarcado").toBeChecked();

            test.info().attach("CheckBox: Marcado (Checked) | Label: Active", {
                body: await page.screenshot(),
                contentType: "image/png"
            });
        });
    });
});

test.describe('', async () => {

    test.beforeEach('', async ({page}) => {

    });

    test('', async ({page}) => {

    });

});


