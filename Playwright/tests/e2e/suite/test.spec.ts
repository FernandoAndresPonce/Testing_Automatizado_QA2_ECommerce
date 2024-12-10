
import { expect, Browser, Page } from '@playwright/test'
import { describe } from 'node:test';
import { threadId } from 'node:worker_threads';

import { test } from "../../fixture/base";

import { validRandomCategoryName, validRandomCategoryName1Character, validRandomCategoryName50Character,invalidRandomCategoryNameOnlyNumber, invalidRandomCategoryNameOnlySpecialCharacter, invalidRandomCategoryNameAlphanumeric, invalidRandomCategoryNameLetterWithSpecialChar } from '../../variables/categoryFormPage.ts';

//variables ambiente npm i dovenv --save-dev
import dotenv from 'dotenv';
dotenv.config();


test.describe('🔬 US 001 - TS 001 - Redireccion - Acceso a la Página Principal de Administración de FastFood', () => {

    //clear cookies
    test.use({ storageState: { cookies: [], origins: [] } })

    test.beforeEach('Pagina Inicial de la Plataforma Web.', async ({ page }) => {
        await page.goto('/');
    });


    test('US 001 - TS 001 - TC 001 - Validar, redireccionar a la Interfaz Principal de Administración, cuando se introduce la URL correspondiente', async ({ page, initialPage, headerPage, loginPage, defaultPage, dashboardPage, adminPage }) => {

        await test.step('📝 GIVEN:  que el usuario se encuentra en la Plataforma - http://desarrollowebecommerce.somee.com/ ', async () => {
            await expect(initialPage.$homeLink, 'El link "Home", no esta Visible').toBeVisible();
        });

        await test.step('🧩AND: esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador.', async () => {

            await initialPage._clickinitialHomeLink();

            await expect(page).toHaveURL('/User/Default.aspx');

            await expect(headerPage.$loginLink).toBeVisible();

            await headerPage._clickLoginLink();
            await expect(page).toHaveURL('/User/Login.aspx');

            await loginPage.$usernameLoginInput.fill(`${process.env.ADMINUSERNAME}`);
            await loginPage.$passwordLoginInput.fill(`${process.env.ADMINPASSWORD}`);

            await loginPage._clickLoginButton();
        });

        await test.step('🧩AND: se encuentra en el HOME de la plataforma - http://desarrollowebecommerce.somee.com/User/Default.aspx', async () => {

            await defaultPage._goToEndpoint();
            await expect(page).toHaveURL('/User/Default.aspx');

            await test.info().attach('Pagina HOME', {
                body: await page.screenshot(),
                contentType: 'image/png',
            });

        });

        await test.step('⚡ WHEN: Selecciona la barra de direcciones del navegador, 🧩AND: introduce la URL, 🧩AND: presiona la tecla Enter,', async () => {

            await dashboardPage._goToEndpoint();

            await adminPage._hiddenLoader();
        });

        await test.step('✨ THEN: Debería redirecciónarse a la Interfaz Principal de Administración,  ', async () => {

            await expect(page).toHaveURL('/Admin/Dashboard.aspx');
            await expect(page).toHaveTitle('FastFood - Admin');
        });

        await test.step('🧩AND: Deberia renderizarse la Interfaz Principal de Administración exitosamente.', async () => {

            await adminPage._hiddenLoader();

            await test.info().attach('Pagina DASHBOARD', {
                body: await page.screenshot(),
                contentType: 'image/png'
            });
        });
    });
});


test.describe('🔬 US 002 - TS 002 - Redireccion - Acceso a la Página Categories de Administración de FastFood', () => {

    test.beforeEach('🔲 BACKGROUND:', async ({ page, dashboardPage, adminPage }) => {

        await test.step('📝 GIVEN: que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador.', async () => {

            await dashboardPage._goToEndpoint();
        });

        await test.step('🧩 AND: el Usuario se encuentra en la Interfaz Principal de Administración - Dashboard', async () => {

            await page.waitForLoadState('load');
            await adminPage._hiddenLoader();

            await test.info().attach('Pagina Dashboard', {
                body: await page.screenshot(),
                contentType: 'image/png'
            });
        });
    });

    test('US 002 - TS 002 - TC 001 - Validar la correcta redirección a la Interfaz “Categories” de Administración, mediante la URL.', async ({ page, categoryPage, adminPage }) => {

        await test.step('⚡ WHEN: selecciona la barra de direcciones del Navegar, 🧩 AND: introduce la URL: http://desarrollowebecommerce.somee.com/Admin/Category.aspx', async () => {

            await categoryPage._goToEndpoint();
        });

        await test.step('✨ THEN: el sistema se deberia redireccionar a la Interfaz Categories de Administración.', async () => {

            await expect(page).toHaveURL('/Admin/Category.aspx');
            await expect(categoryPage.$categoryTitle).toBeVisible();
            await expect(categoryPage.$categoryTitle).toHaveText('Categories');
        });

        await test.step('🧩 AND: el sistema se deberia renderizar la Interfaz Categories de Administración correctamente. ', async () => {

            await adminPage._hiddenLoader();

            await test.info().attach('Pagina Categories', {
                body: await page.screenshot(),
                contentType: 'image/png',
            });
        });
    });

    test('US 002 - TS 002 - TC 002 - Validar, redireccionar a la Interfaz “Categories” de Administración, mediante el TabMenu, seleccionando la opción funcional “Categories”.', async ({ page, adminPage, categoryPage }) => {

        await test.step('⚡ WHEN: hace Click en Categories del Tab Menu visible en la parte izquierda de la pantalla,', async () => {

            await expect(adminPage.$tabMenuCategoriesLink, 'Categories del Tab Menu no esta Visible.').toBeVisible();

            await adminPage._clickTabMenuCategoriesLink();
        });

        await test.step('✨ THEN: El sistema se deberia redireccionar a la Interfaz Categories de Administración,', async () => {

            await expect(page).toHaveURL('/Admin/Category.aspx');
            await expect(categoryPage.$categoryTitle).toBeVisible();
            await expect(categoryPage.$categoryTitle).toHaveText('Categories');
        });

        await test.step('🧩 AND: el sistema se deberia renderizar la Interfaz Categories de Administración correctamente. ', async () => {

            await adminPage._hiddenLoader();

            await test.info().attach('Pagina Categories', {
                body: await page.screenshot(),
                contentType: 'image/png',
            });
        });
    });

    test('US 002 - TS 002 - TC 003 - Intentar Validar, redireccionar a la Interfaz “Categories” de Administración, mediante el Icono de la "Card Categories".', async ({ page, dashboardPage, categoryPage, adminPage }) => {

        await test.step('⚡ WHEN: hace Click en el ICONO de la "Card Categories", que se encuentra en el Panel central del Dashboard,', async () => {

            await expect(dashboardPage.$cardCategoriesIco, 'La Card Categories, NO esta Visible').toBeVisible();
            await dashboardPage._clickCardCategoriesIco();
        });

        await test.step('✨ THEN: El sistema se deberia redireccionar a la Interfaz Categories de Administración,', async () => {

            await expect(page).toHaveURL('/Admin/Category.aspx');
            await expect(categoryPage.$categoryTitle).toBeVisible();
            await expect(categoryPage.$categoryTitle).toHaveText('Categories');
        });


        await test.step('🧩 AND: el sistema se deberia renderizar la Interfaz Categories de Administración correctamente. ', async () => {

            await adminPage._hiddenLoader();

            await test.info().attach('Pagina Categories', {
                body: await page.screenshot(),
                contentType: 'image/png',
            });
        });
    });

    test('US 002 - TS 002 - TC 004 - Intentar Validar, redireccionar a la Interfaz “Categories” de Administración, mediante el View Details de la "Card Categories".', async ({ page, dashboardPage, categoryPage, adminPage }) => {

        await test.step('⚡ WHEN: hace Click en el Text "View Details" de la "Card Categories", que se encuentra en el Panel central del Dashboard,', async () => {

            await expect(dashboardPage.$cardCategoriesViewDetails, 'El "View Details", de la "Card Categories", NO es Visible.').toBeVisible();

            await dashboardPage._clickCardCategoriesViewDetails();
        });

        await test.step('✨ THEN: El sistema se deberia redireccionar a la Interfaz Categories de Administración,', async () => {

            await expect(page).toHaveURL('/Admin/Category.aspx');
            await expect(categoryPage.$categoryTitle).toBeVisible();
            await expect(categoryPage.$categoryTitle).toHaveText('Categories');
        });

        await test.step('🧩 AND: el sistema se deberia renderizar la Interfaz Categories de Administración correctamente. ', async () => {

            await adminPage._hiddenLoader();

            await test.info().attach('Pagina Categories', {
                body: await page.screenshot(),
                contentType: 'image/png',
            });
        });
    });
});


test.describe('🔬 US 003 - TS 003 - Acceso a la Pagina Formulario de Categories de Administración de FastFood', () => {

    test.beforeEach('🔲 BACKGROUND:', async ({ page, categoryPage, adminPage }) => {

        await test.step('📝 GIVEN: que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador.', async () => {

            await categoryPage._goToEndpoint();
        });

        await test.step('🧩 AND: el usuario se encuentra en la Interfaz Categories de Administración - http://desarrollowebecommerce.somee.com/Admin/Category.aspx', async () => {
            await expect(page).toHaveURL('/Admin/Category.aspx');

            await page.waitForLoadState('load')
            await adminPage._hiddenLoader();

            await test.info().attach('Pagina Categories', {
                body: await page.screenshot(),
                contentType: 'image/png'
            });
        });
    });

    test('US 003 - TS 003 - TC 001 - Validar, redireccionar a la Interfaz “Formulario de Categories” de Administración, mediante el Botón Add.', async ({ page, categoryPage, adminPage }) => {


        await test.step('⚡ WHEN: hace Click en el Boton Add, visible en la parte superior derecha del Filtro Rapido (Buscador),', async () => {

            await expect(categoryPage.$addButton, 'El boton Add, NO es Visible.').toBeVisible();
            await expect(categoryPage.$searchFilterTextbox, 'El filtro rapido (Buscador), NO es Visible.').toBeVisible();

            await categoryPage._clickAddButton();
        });

        await test.step('✨ THEN: El sistema se deberia redireccionar a la Interfaz Formulario "Add Category" de Administración.', async () => {

            await expect(page).toHaveURL('/Admin/CategoryForm.aspx');
        });

        await test.step('🧩 AND: Deberia renderizarse la Interfaz Formulario "Add Category" de Administración..', async () => {

            await expect(page.getByText('Add Category'), 'El texto ADD CATEGORY, NO contiene el Texto.').toBeVisible();

            await adminPage._hiddenLoader();

            await test.info().attach('Formulario "Add Category"', {
                body: await page.screenshot(),
                contentType: 'image/png',
            });
        });
    });


    test('US 003 - TS 003 - TC 002 - Validar, redireccionar a la Interfaz “Formulario de una Categoria” de Administración, mediante la URL.', async ({ page, categoryFormPage, adminPage }) => {

        await test.step('⚡ WHEN: :al introducr la URL (http://localhost:52000/Admin/CategoryForm.aspx), en la barra de direcciones del navegador', async () => {

            await categoryFormPage._goToEndpoint();
        });

        await test.step('✨ THEN: El sistema se deberia redireccionar a la Interfaz Formulario "Add Category" de Administración.', async () => {

            await expect(page).toHaveURL('/Admin/CategoryForm.aspx');
        });

        await test.step('🧩 AND: Deberia renderizarse la Interfaz Formulario "Add Category" de Administración..', async () => {

            await expect(page.getByText('Add Category'), 'El texto ADD CATEGORY, NO contiene el Texto.').toBeVisible();

            await adminPage._hiddenLoader();

            await test.info().attach('Formulario "Add Category"', {
                body: await page.screenshot(),
                contentType: 'image/png',
            });
        });
    });
});


test.describe('🔬 US 004 - TS 004 - Text Input Categoría Formulario - Completar los campos del formulario, para crear una Categoría.', () => {

    test.beforeEach('🔲 BACKGROUND:', async ({ page, superPage, adminPage }) => {

        await test.step('📝 GIVEN: que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador', async () => {

            await superPage._goToDashboardThenRandomFormCategoryByElements();
        })

        await test.step('🧩 AND: el usuario se encuentra en la Interfaz Formulario "Add Category" de Administración - http://desarrollowebecommerce.somee.com/Admin/CategoryForm.aspx', async () => {

            await expect(page).toHaveURL('/Admin/CategoryForm.aspx');
            await expect(page.getByText('Add Category'), 'El Texto Add Category, NO esta Visible').toBeVisible();

            await page.waitForLoadState('load');
            await adminPage._hiddenLoader();

            test.info().attach('Pagina Formulario "Add Category"', {
                body: await page.screenshot(),
                contentType: 'image/png',
            });
        });
    });


    //Variables ⬇️ TC

    const valid_Test_Cases = [

        {
            titleTC: 'US 004 - TS 004 - TC 001 -  Validar el Text Input Category Name, al añadir un (1) carácter Alfabético (String).',
            inputTextTC: `${validRandomCategoryName1Character()}`,
            thenTC: '✨ THEN: el Text Input Category Name no deberia dar ninguna advertencia 🧩 AND: el sistema lo redireccionara a la página Category.'
        },

        {
            titleTC: 'US 004 - TS 004 - TC 002 -  Validar el Text Input Category Name, al añadir cincuenta (50) caracteres Alfabéticos (String).',
            inputTextTC: `${validRandomCategoryName50Character()}`,
            butTC: '🚫 BUT: con un mínimo de un (1) carácter 🧩 AND: un máximo de cincuenta (50) caracteres, ',
            thenTC: '✨ THEN: el Text Input Category Name no deberia dar ninguna advertencia 🧩 AND: el sistema lo redireccionara a la página Category.'
        }

    ];

    for (const test_case of valid_Test_Cases) {

        test(`${test_case.titleTC}`, async ({ page, categoryFormPage, categoryPage, adminPage }) => {

            await test.step('⚡ WHEN: completa el Text Input Category Name con una cadena de texto Alfabética,', async () => {

                await expect(categoryFormPage.$categoryNameTitle, 'El Texto "Category Name", No es Visible.').toBeVisible();
                await expect(page.getByRole('textbox', { name: 'Category Name' }), 'El Text Input "Category Name", NO es Visible.').toBeVisible();


                await categoryFormPage._clickAndFillCategoryNameTextBox(`${test_case.inputTextTC}`)
            });

            await test.step(`${test_case.butTC}`, async () => {

                const textTextbox = (await categoryFormPage.$categoryNameTextBox.inputValue());
                const lenght = textTextbox.length;

                await expect(lenght).toBeGreaterThanOrEqual(1);
                await expect(lenght).toBeLessThanOrEqual(50);

                console.log(`La longitud del texto es: ${lenght}`);

                await test.info().attach(`Input Text "Category Name" : ${test_case.inputTextTC} | Longitud : ${lenght}`, {
                    body: await page.screenshot(),
                    contentType: 'image/png'
                })
            });

            await test.step('🧩 AND: presiona el botón Add,  ', async () => {

                await expect(categoryFormPage.$addButton, 'El boton Add, No es Visible.').toBeVisible();
                await expect(categoryFormPage.$addButton, 'El Texto NO Coincide.').toHaveText('Add');

                await categoryFormPage.$addButton.click({ force: true })
            });

            await test.step(`${test_case.thenTC}`, async () => {

                await expect(page).toHaveURL('/Admin/Category.aspx');
                await expect(categoryPage.$categoryTitle, 'El texto "CATEGORIES", NO es Visible.').toBeVisible();

                await page.waitForLoadState('load');
                await adminPage._hiddenLoader();

                await test.info().attach('Pagina "Categories"', {
                    body: await page.screenshot(),
                    contentType: 'image/png',
                });
            });
        });
    }


    const invalid_Test_Cases = [
        {
            titleTC: 'US 004 - TS 004 - TC 003 - Validar el Text Input Category Name, al añadir una Cadena de texto solo Numérica.',
            inputTextTC: `${invalidRandomCategoryNameOnlyNumber()}`,
            whenTC: '⚡ WHEN: completa el Text Input añadiendo una Cadena de texto solo Numérica,',
            butTC: '🚫 BUT: con un mínimo de un (1) carácter 🧩 AND: un máximo de cincuenta (50) caracteres, ',
            thenTC: '✨ THEN: Debería el sistema redirigirlo automaticamente hacia el Text Input Category Name.',
            andThenTC: 'Debería aparecer una advertencia con un mensaje de color rojo, al lado derecho de la Label (Category Name), con el texto “Name must be in character only”.',
            validationError: '(Name must be in character only)',
        },
        {
            titleTC: 'US 004 - TS 004 - TC 004 - Intentar Validar el Text Input Category Name, al añadir una Cadena de texto solo caracteres Especiales.', inputTextTC: `${invalidRandomCategoryNameOnlySpecialCharacter()}`, whenTC: '⚡ WHEN: completa el Text Input añadiendo una Cadena de texto solo caracteres Especiales,', butTC: '🚫 BUT: con un mínimo de un (1) carácter 🧩 AND: un máximo de cincuenta (50) caracteres, ', thenTC: '✨ THEN: Debería el sistema redirigirlo automaticamente hacia el Text Input Category Name.', andThenTC: 'Debería aparecer una advertencia con un mensaje de color rojo, al lado derecho de la Label (Category Name), con el texto “Name must be in character only”.', validationError: '(Name must be in character only)',
        },
        {
            titleTC: 'US 004 - TS 004 - TC 005 - Intentar Validar el Text Input Category Name, con cero (0) carácter, campo vacío.', 
            inputTextTC: '', 
            whenTC: '⚡ WHEN: NO completa el Text Input, cero (0) carácter, campo vacío,', 
            butTC: '', thenTC: '✨ THEN: Debería el sistema redirigirlo automaticamente hacia el Text Input Category Name.', andThenTC: 'Debería aparecer una advertencia con un mensaje de color rojo, al lado derecho de la Label (Category Name), con el texto “Required Category Name”.', 
            validationError: '(Required Category Name)',
        },

    ];

    for (const test_case of invalid_Test_Cases) {

        test(`${test_case.titleTC}`, async ({ page, categoryFormPage, adminPage }) => {


            await test.step(`${test_case.whenTC}`, async () => {

                await expect(categoryFormPage.$categoryNameTitle, 'El Texto "Category Name", No es Visible.').toBeVisible();
                await expect(page.getByRole('textbox', { name: 'Category Name' }), 'El Text Input "Category Name", NO es Visible.').toBeVisible();

                await categoryFormPage._clickAndFillCategoryNameTextBox(`${test_case.inputTextTC}`)
            });

            const textTextbox = (await categoryFormPage.$categoryNameTextBox.inputValue());
            const lenght = textTextbox.length;

            if (lenght > 0 && lenght < 51) {
                await test.step(`${test_case.butTC}`, async () => {

                    const textTextbox = (await categoryFormPage.$categoryNameTextBox.inputValue());
                    const lenght = textTextbox.length;

                    await expect(lenght).toBeGreaterThanOrEqual(1);
                    await expect(lenght).toBeLessThanOrEqual(50);

                    console.log(`La longitud del texto es: ${lenght}`);

                    await test.info().attach(`Input Text "Category Name" : ${test_case.inputTextTC} | Longitud : ${lenght}`, {
                        body: await page.screenshot(),
                        contentType: 'image/png'
                    })
                });
            }

            await test.step('🧩 AND: presiona el botón Add,  ', async () => {

                await expect(categoryFormPage.$addButton, 'El boton Add, No es Visible.').toBeVisible();
                await expect(categoryFormPage.$addButton, 'El Texto NO Coincide.').toHaveText('Add');

                await categoryFormPage.$addButton.click({ force: true })
            });

            await test.step(`${test_case.thenTC}`, async () => {

                await expect(categoryFormPage.$categoryNameTextBox).toBeFocused();
                await expect(categoryFormPage.$categoryNameTextBox).toBeVisible();
            });

            await test.step(`${test_case.andThenTC}`, async () => {

                if (lenght > 0 && lenght < 51) {

                    await page.getByText(`${test_case.validationError}`).waitFor({ state: 'visible' });
                    await expect(page.locator('xpath=//div[@class="mb-3"]//span[@id="ContentPlaceHolder1_revName"]')).toHaveText(`${test_case.validationError}`);
                }
                else {

                    await page.getByText(`${test_case.validationError}`).waitFor({ state: 'visible' });
                    await expect(page.locator('xpath=//div[@class="mb-3"]//span[@id="ContentPlaceHolder1_rfValidator"]')).toHaveText(`${test_case.validationError}`);
                }

                await page.waitForTimeout(100);
                await test.info().attach(`Focus Text Input "Category Name" - ${test_case.validationError}`, {
                    body: await page.screenshot(),
                    contentType: 'image/png',
                });
            });
        });
    }
});


test.describe('🔬 US 005 - TS 005 - File Input Categoría Formulario - Completar los campos del formulario, para crear una Categoría.', () => {

    test.use({ storageState: { cookies: [], origins: [] } });

    test.beforeEach('🔲 BACKGROUND:', async ({ page, superPage, adminPage }) => {

        await test.step('📝 GIVEN: que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador', async () => {

            await page.goto('/');
            await superPage._loginThenRamdonFormCategoryByElements();
        });

        await test.step('🧩 AND: el usuario se encuentra en la Interfaz Formulario "Add Category" de Administración - http://desarrollowebecommerce.somee.com/Admin/CategoryForm.aspx', async () => {

            await expect(page).toHaveURL('/Admin/CategoryForm.aspx');
            await expect(page.getByText('Add Category'), 'El Texto Add Category, NO esta Visible').toBeVisible();
        });

        await test.step('🧩 AND: completa el Text Input “Category Name”, con la Cadena de Texto Postre.', async () => {

            await superPage.preconditionClickAndFillCategoryNameTextBox();

            await page.waitForLoadState('load');
            await adminPage._hiddenLoader();

            test.info().attach('Pagina Formulario "Add Category"', {
                body: await page.screenshot(),
                contentType: 'image/png',
            });
        });
    });

    test('US 005 - TS 005 - TC 001 - Validar, cargar previsualización de una imagen, al ingresar una imagen en el File-Input.', async ({ page, categoryFormPage }) => {

        await test.step('⚡ WHEN : hace Click en el File Input Category Image', async () => {

            await expect(categoryFormPage.$categoryImageTitle, 'Texto NO es Visible').toBeVisible();
            await expect(categoryFormPage.$categoryImageInputFile, 'File Input NO es Visible').toBeVisible();
            await expect(categoryFormPage.$categoryImageImg, 'Imagen No es Visible').toBeVisible();

            await categoryFormPage.$categoryImageInputFile.click();

            test.info().attach('Imagen - Placeholder', {
                body: await page.screenshot(),
                contentType: 'image/png'
            });
        });

        await test.step('🧩 AND: carga una Imagen', async () => {

            await categoryFormPage.$categoryImageInputFile.setInputFiles('tests/e2e/suite/Image/Desserts.png');

            const fileInputText = await categoryFormPage.$categoryImageInputFile.inputValue()
            await expect(fileInputText).toContain('Desserts.png')
        });

        await test.step('✨ THEN : Deberia previsualizarse la imagen añadida.', async () => {

            test.info().attach('Imagen - Nueva Imagen a Cargar', {
                body: await page.screenshot(),
                contentType: 'image/png'
            });
        });
    });


    test('US 005 - TS 005 - TC 002 - Validar, No cargar previsualización de una imagen.', async ({ page, categoryFormPage }) => {

        await test.step('✨ THEN : Deberia previsualizarse un "Placeholder", como imagen pre establecida.', async () => {

            await expect(categoryFormPage.$categoryImageTitle, 'Texto NO es Visible').toBeVisible();
            await expect(categoryFormPage.$categoryImageInputFile).toBeVisible();
            await expect(categoryFormPage.$categoryImageImg).toBeVisible();

            test.info().attach('Imagen - "Placeholder"', {
                body: await page.screenshot(),
                contentType: 'image/png'
            });
        });
    });


    test('US 005 - TS 005 - TC 003 - Validar, Cargar previsualización de una imagen,  al No ingresar una imagen en el File-Input.', async ({ page, categoryFormPage }) => {

        await test.step('⚡ WHEN : hace Click en el File Input Category Image', async () => {

            await expect(categoryFormPage.$categoryImageTitle, 'Texto NO es Visible').toBeVisible();
            await expect(categoryFormPage.$categoryImageInputFile).toBeVisible();
            await expect(categoryFormPage.$categoryImageImg).toBeVisible();

            await categoryFormPage.$categoryImageInputFile.click();

        });

        await test.step('🧩 AND: NO carga ninguna Imagen', async () => {

            await page.locator('#ContentPlaceHolder1_txtImage').setInputFiles([]);

            const fileInputText = await categoryFormPage.$categoryImageInputFile.inputValue()
            await expect(fileInputText).toContain('')
        });

        await test.step('✨ THEN : Deberia previsualizarse el "Placeholder".', async () => {

            test.info().attach('Imagen - imagen "Placeholder"', {
                body: await page.screenshot(),
                contentType: 'image/png'
            });
        });
    });
});


test.describe('🔬 US 006 - TS 006 - Check Box Formulario de Categorías - Crear una Categoría Activa o Inactiva.', async () => {


    test.beforeEach('🔲 BACKGROUND:', async ({ page, superPage, categoryFormPage, adminPage }) => {

        await test.step('📝 GIVEN: que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador', async () => {

            await superPage._goToDashboardThenRandomFormCategoryByElements();
        });

        await test.step('🧩 AND: el usuario se encuentra en la Interfaz Formulario "Add Category" de Administración - http://desarrollowebecommerce.somee.com/Admin/CategoryForm.aspx', async () => {

            await expect(page).toHaveURL('/Admin/CategoryForm.aspx');
            await expect(categoryFormPage.$categoryAddTitle, 'El Texto Add Category, NO esta Visible').toBeVisible();
        });

        await test.step('🧩 AND: el Check Box está marcado o estado “Activo” (Checked)', async () => {

            await expect(categoryFormPage.$activeCheckbox, 'El Checkbox, No esta Visible.').toBeVisible();
            await expect(categoryFormPage.$activeCheckbox, 'El Checkbox, No esta Marcado.').toBeChecked();

            await expect(categoryFormPage.$activeLabel, "El Label, No esta Visible").toBeVisible();
            await expect(categoryFormPage.$activeLabel, "El Texto, No es Active").toHaveText("Active");


            await page.waitForLoadState('load');
            await adminPage._hiddenLoader();

            const screenshot = await page.screenshot({ fullPage: true });
            test.info().attach('Pagina Formulario: "Add Category" | CheckBox : Marcado (Checked)', {
                body: screenshot,
                contentType: 'image/png',
            });
        });
    });


    test('US 006 - TS 006 - TC 001 - Validar la transición de estado de la Etiqueta (Label) de "Active" a "Inactive" y el cambio del estado del Check Box de marcado (Checked) a desmarcado (Unchecked), al hacer Click en el Check Box.', async ({ page, categoryFormPage }) => {

        await test.step('⚡ WHEN: hace Click en el Check Box,', async () => {

            await categoryFormPage._clickActiveCheckbox();
        });

        await test.step('✨ THEN: la Etiqueta (Label) se deberia actualiza de “Active” a “Inactive”,', async () => {

            await expect(categoryFormPage.$inactiveLabel, "El Label, No esta Visible.").toBeVisible();
            await expect(categoryFormPage.$inactiveLabel, "El Texto, No es Inactive.").toHaveText("Inactive");
        })


        await test.step('🧩 AND: el Check Box se establece en estado desmarcado (Unchecked).', async () => {

            await expect(categoryFormPage.$activeCheckbox, "El Checkbox esta Marcado (Checked).").not.toBeChecked();

            test.info().attach("CheckBox: Desmarcado (Unchecked) | Label: Inactive", {
                body: await page.screenshot(),
                contentType: "image/png"
            });
        });
    });

    test('US 006 - TS 006 - TC 002 - Validar la transición de estado de la Etiqueta (Label) de "Inactive" a "Active" y el cambio del estado del Check Box de desmarcado (Unchecked) a marcado (Checked), al hacer Click en el Check Box.', async ({ page, categoryFormPage }) => {

        await test.step('⚡ WHEN: hace Click en el Check Box,', async () => {

            await categoryFormPage._clickActiveCheckbox();
        });

        await test.step('🧩 AND: la Etiqueta (Label) se actualiza de “Active” a “Inactive”,', async () => {

            await expect(categoryFormPage.$inactiveLabel, "El Label, No esta Visible.").toBeVisible();
            await expect(categoryFormPage.$inactiveLabel, "El Texto, No es Inactive.").toHaveText("Inactive");
        })


        await test.step('🧩 AND: el Check Box se establece en estado desmarcado (Unchecked).', async () => {

            await expect(categoryFormPage.$activeCheckbox, "El Checkbox esta Marcado (Checked).").not.toBeChecked();

            test.info().attach("CheckBox: Desmarcado (Unchecked) | Label: Inactive", {
                body: await page.screenshot(),
                contentType: "image/png"
            });
        });

        await test.step('🧩 AND: se ejecuta un segundo Click en el CheckBox', async () => {

            await categoryFormPage._clickActiveCheckbox();
        });

        await test.step('✨ THEN: la Etiqueta (Label) se deberia actualiza nuevamente de “Inactive” a “Active”', async () => {

            await expect(categoryFormPage.$activeLabel, "El Texto No es Active.").toHaveText("Active");
        });

        await test.step('🧩 AND: el CheckBox se establece en estado marcado (Checked).', async () => {

            await expect(categoryFormPage.$activeCheckbox, "El CheckBox esta Desmarcado").toBeChecked();

            test.info().attach("CheckBox: Marcado (Checked) | Label: Active", {
                body: await page.screenshot(),
                contentType: "image/png"
            });
        });
    });
});

test.describe('🔬 US 007 - TS 007 - Check Box - Check Box Add Category - Crear una Categoría en Oferta o que no esté.', async () => {

    test.beforeEach('🔲 BACKGROUND:', async ({ page, superPage, categoryFormPage }) => {


        await test.step('📝 GIVEN: que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador', async () => {


            await page.goto('/');
            await superPage._goToDashboardThenRandomFormCategoryByElements();
        });

        test.step('🧩 AND: el Admin se encuentra en la Interfaz Formulario “Add Category”. http://desarrollowebecommerce.somee.com/Admin/CategoryForm.aspx.', async () => {

            await expect(page).toHaveURL('/Admin/CategoryForm.aspx');
            await expect(categoryFormPage.$categoryAddTitle, 'El Texto Add Category, NO esta Visible').toBeVisible();
        });
    });

    test('US 007 - TS 007 - TC 001 - Validar, categoría activa, pero no en oferta, al marcar (Checked) el CheckBox(Active-Inactive de una Categoría), y No marcar(Unchecked) el CheckBox(Offer-NoOffer de una Categoría).', async ({ page, categoryFormPage, adminPage }) => {

        await test.step('⚡ WHEN: el Check Box (Categoría Activa/Inactiva) está marcado (estado “Active” - Checked).', async () => {

            await expect(categoryFormPage.$activeCheckbox, "El CheckBox No esta Marcado (Checked).").toBeChecked();

            await expect(categoryFormPage.$activeLabel, "El Texto No es Active.").toHaveText("Active");

            await page.waitForLoadState('load');
            await adminPage._hiddenLoader();

            const screenshot = await page.screenshot({ fullPage: true });
            test.info().attach("CheckBox Active/Inactive : Marcado (Checked) | Etiqueta (Label) : Active.", {
                body: screenshot,
                contentType: "image/png"
            });
        });

        await test.step('✨ THEN: se deberia visualiza un nuevo CheckBox(Categoria Offer/NoOffer) que está en estado Unchecked (no marcado),', async () => {
            await expect(categoryFormPage.$offerNoOfferCheckBox, "El Checkbox Bo esta Visible").toBeVisible();
            await expect(categoryFormPage.$offerNoOfferCheckBox, "El Checkbox esta Marcado (Checked).").not.toBeChecked();
        });

        await test.step('🧩 AND: acompañado de su etiqueta (Label) con el texto “No Offer”,', async () => {
            await expect(categoryFormPage.$noOfferLabel, "La Etiqueta No esta Visible.").toBeVisible();
            await expect(categoryFormPage.$noOfferLabel, "El texto No es 'No Offer'").toHaveText("No Offer");
        });

        await test.step('🧩 AND: el fondo (Background) de la etiqueta (Label), es de color “Rojo”.', async () => {
            const backgroundColor = await categoryFormPage.$noOfferLabel.evaluate(element => {
                return window.getComputedStyle(element).backgroundColor;
            });

            await expect(backgroundColor).toBe('rgb(252, 97, 128)');


            const screenshot = await page.screenshot({ fullPage: true })
            await test.info().attach("CheckBox Offer/No Offer : Desmarcado (Unchecked). | Label : No Offer.", {
                body: screenshot,
                contentType: "image/png"
            });
        });
    });


    test('US 007 - TS 007 - TC 002 - Validar, categoría en oferta, al marcar (Checked) el CheckBox(Active/Inactive de una Categoría), y a su vez, marcar(Checked) el CheckBox(Offer/NoOffer de una Categoría).', async ({ page, categoryFormPage, adminPage }) => {

        await test.step('⚡ WHEN: el Check Box (Categoría Activa/Inactiva) está marcado (estado “Active” - Checked).', async () => {

            await expect(categoryFormPage.$activeCheckbox, "El CheckBox No esta Marcado (Checked).").
                toBeChecked();

            await expect(categoryFormPage.$activeLabel, "El Texto No es Active.").
                toHaveText("Active");

            await page.waitForLoadState('load');
            await adminPage._hiddenLoader();

            const screenshot = await page.screenshot({ fullPage: true });
            test.info().attach("CheckBox Active/Inactive : Marcado (Checked) | Etiqueta (Label) : Active.", {
                body: screenshot,
                contentType: "image/png"
            });
        });

        await test.step('🧩 AND: se visualiza un nuevo CheckBox(Categoria Offer/NoOffer) que está en estado Unchecked (no marcado),', async () => {
            await expect(categoryFormPage.$offerNoOfferCheckBox, "El Checkbox Bo esta Visible").toBeVisible();
            await expect(categoryFormPage.$offerNoOfferCheckBox, "El Checkbox esta Marcado (Checked).").not.toBeChecked();
        });

        await test.step('🧩 AND: Hace click en el CheckBox(Categoria Offer/NoOffer)', async () => {

            await categoryFormPage._clickOfferNoOfferCheckBox();
        });

        await test.step('🧩 AND: este cambia a estado Checked (marcado).', async () => {

            await expect(categoryFormPage.$offerNoOfferCheckBox, "El CheckBox No esta Marcado (Unchecked).")
                .toBeChecked();
        });

        await test.step('✨ THEN: se deberia visualizar el cambio de estado de la etiqueta (Label), cambiando de "No Offer" a "Offer".', async () => {

            await expect(categoryFormPage.$offerLabel, "La Label No es Visible.")
                .toBeVisible();
            await expect(categoryFormPage.$offerLabel, "El Texto No es Offer.")
                .toHaveText("Offer");
        });

        await test.step('🧩 AND: el fondo (Background) de la etiqueta (Label), cambia a color “Rojo” a “Verde”.', async () => {

            const backgroundColor = await categoryFormPage.$offerLabel.evaluate(element => {
                return window.getComputedStyle(element).backgroundColor;
            });

            await expect(backgroundColor, "El Background No es de color Verde.")
                .toBe("rgb(147, 190, 82)");

            await test.info().attach("CheckBox (Offer/No Offer) : Marcado (Checked) | Label : Offer", {
                body: await page.screenshot(),
                contentType: "image/png"
            });
        });
    });

    test('US 007 - TS 007 - TC 003 - Validar, Categoría Inactiva, al No marcar (Unchecked) el CheckBox(Active/Inactive de una Categoría)..', async ({ page, categoryFormPage, adminPage }) => {

        await test.step('⚡ WHEN: el Check Box (Categoría Activa/Inactiva) No está marcado (estado “Inactive” - Unchecked).', async () => {

            await categoryFormPage.$activeCheckbox
                .uncheck()

            await expect(categoryFormPage.$activeCheckbox, "El CheckBox esta Marcado (Checked).").
                not.toBeChecked();


            await expect(categoryFormPage.$inactiveLabel, "El Texto es Active.").
                toHaveText("Inactive");

            await page.waitForLoadState('load');
            await adminPage._hiddenLoader();

            const screenshot = await page.screenshot();
            test.info().attach("CheckBox Active/Inactive : Desarcado (Unchecked) | Etiqueta (Label) : Inactive.", {
                body: screenshot,
                contentType: "image/png"
            });
        });

        await test.step('✨ THEN: el deberia usuario No visualizar el CheckBox(Categoria Offer/NoOffer)', async () => {

            await expect(categoryFormPage.$offerNoOfferCheckBox, "El Checkbox es Visible.")
                .toBeHidden();
        });

        await test.step('🧩 AND: No se visualiza la etiqueta (Label) correspondientes con sus textos "Offer" o "No Offer".', async () => {

            await expect(categoryFormPage.$offerLabel, "La Label Offer es Visible.")
                .toBeHidden();
            await expect(categoryFormPage.$noOfferLabel, "La Label No Offer es Visible.")
                .toBeHidden();
        });
    });
});

test.describe("🔬 US 008 - TS 008 - Text Input - Add Category - Crear una Categoría en Oferta y asignar un Porcentaje de Descuento.", async () => {

    test.beforeEach("🔲 BACKGROUND:", async ({ page, adminPage, superPage, categoryFormPage }) => {

        await test.step("📝 GIVEN: que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador", async () => {

            await page.goto("/");
            await superPage._goToDashboardThenRandomFormCategoryByElements();
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

            await adminPage._hiddenLoader();

            const screenshot = await page.screenshot({ fullPage: true });
            await test.info().attach("CheckBox Active/Inactive : Marcado (Checked) | CheckBox Offer/No Offer : Desmarcado (Unchecked)", {
                body: screenshot,
                contentType: "image/png"
            });
        });
    });

    test("US 008 - TS 008 - TC 001 - Validar, visualizar Campo de Texto (Text Input), para ingresar el porcentaje de descuento al marcar (Checked) el CheckBox(Offer/NoOffer).", async ({ page, categoryFormPage }) => {

        await test.step("⚡ WHEN: Hace click en el CheckBox(Categoria Offer/NoOffer)", async () => {

            await expect(categoryFormPage.$offerNoOfferCheckBox, "El CheckBox No esta Disponible.").toBeEnabled();

            await categoryFormPage._clickOfferNoOfferCheckBox();
        });

        await test.step("🧩 AND: este cambia a estado Checked (marcado)", async () => {

            await expect(categoryFormPage.$offerNoOfferCheckBox, "El CheckBox esta Desmarcado (Unchecked).").toBeChecked();
        });

        await test.step("🧩 AND: se visualiza el cambio de estado de la etiqueta (Label), pasando de No Offer a Offer.", async () => {

            await expect(categoryFormPage.$offerLabel, "Label No esta Visible.").toBeVisible();
            await expect(categoryFormPage.$offerLabel, "El Texto No es Offer.").toHaveText("Offer");
        });

        await test.step("🧩 AND: el fondo (Background) de la etiqueta (Label), cambia a color “Rojo” a “Verde”.", async () => {

            const backgroundColorLabel = await categoryFormPage.$offerLabel.evaluate(element => {
                return window.getComputedStyle(element).backgroundColor;
            });

            await expect(backgroundColorLabel, "El Background No es de color Verde.").toBe("rgb(147, 190, 82)");

            await test.info().attach("CheckBox Offer/ No Offer : Marcado (Checked) | Label : Offer | Background : Verde", {
                body: await page.screenshot(),
                contentType: "image/png"
            });
        });

        await test.step("✨ THEN: deberia visualizarse una Etiqueta (Label) con el Texto (Offer Percentage)", async () => {

            await expect(categoryFormPage.$offerPercentageLabel, "El Texto No es Offer Percentage.").toBeVisible();
        });

        await test.step("🧩 AND: un Campo de Texto (Text Input), debajo de la Etiqueta mencionada anteriormente.", async () => {

            await expect(categoryFormPage.$offerPercentageTextBox, "El Input Offer Percentage, No esta Visible.").toBeVisible();

            await test.info().attach("Visualizacion Label : Offer Percentage | Input Offer Percentage", {
                body: await page.screenshot(),
                contentType: "image/png"
            });
        });
    });

    test("US 008 - TS 008 - TC 002 - Validar, no visualizar ningún Campo de Texto (Text Input), al desmarcar (Unchecked) el CheckBox(Offer/NoOffer).", async ({ page, categoryFormPage }) => {

        await test.step("⚡ WHEN: Hace click en el CheckBox(Categoria Offer/NoOffer)", async () => {

            await expect(categoryFormPage.$offerNoOfferCheckBox, "El CheckBox No esta Disponible.").toBeEnabled();

            await categoryFormPage._clickOfferNoOfferCheckBox();
        });

        await test.step("🧩 AND: este cambia a estado Checked (marcado)", async () => {

            await expect(categoryFormPage.$offerNoOfferCheckBox, "El CheckBox esta Desmarcado (Unchecked).").toBeChecked();
        });

        await test.step("🧩 AND: se visualiza el cambio de estado de la etiqueta (Label), pasando de No Offer a Offer.", async () => {

            await expect(categoryFormPage.$offerLabel, "Label No esta Visible.").toBeVisible();
            await expect(categoryFormPage.$offerLabel, "El Texto No es Offer.").toHaveText("Offer");
        });

        await test.step("🧩 AND: el fondo (Background) de la etiqueta (Label), cambia a color “Rojo” a “Verde”.", async () => {

            const backgroundColorLabel = await categoryFormPage.$offerLabel.evaluate(element => {
                return window.getComputedStyle(element).backgroundColor;
            });

            await expect(backgroundColorLabel, "El Background No es de color Verde.").toBe("rgb(147, 190, 82)");

            await test.info().attach("CheckBox Offer/ No Offer : Marcado (Checked) | Label : Offer | Background : Verde", {
                body: await page.screenshot(),
                contentType: "image/png"
            });
        });

        await test.step("🧩 AND: Hace click nuevamente en el CheckBox(Categoria Offer/NoOffer)", async () => {

            await categoryFormPage._clickOfferNoOfferCheckBox();
        });

        await test.step("🧩 AND: este cambia a estado Unchecked (desmarcado).", async () => {

            await expect(categoryFormPage.$offerNoOfferCheckBox, "El CheckBox esta Marcado (Checked).").not.toBeChecked();
        });

        await test.step("🧩 AND: se visualiza el cambio de estado de la etiqueta (Label), cambiando de Offer a No Offer.", async () => {

            await expect(categoryFormPage.$noOfferLabel, "El Texto de la Label es Offer.").toHaveText("No Offer");
        });

        await test.step("🧩 AND: el fondo (Background) de la etiqueta (Label), cambia a color “Verde” a “Rojo”.", async () => {

            const backgroundColorLabel = await categoryFormPage.$noOfferLabel.evaluate(element => {
                return window.getComputedStyle(element).backgroundColor;
            });

            await expect(backgroundColorLabel, "El Color del Background No es Rojo.").toBe("rgb(252, 97, 128)")
        });

        await test.step("✨ THEN: No deberia visualizar Ninguna Etiqueta (Label) con el texto (Offer Percentage)", async () => {

            await expect(categoryFormPage.$offerPercentageLabel, "La Label Offer Percentage es Visible.").not.toBeVisible();
        });

        await test.step("🧩 AND: tampoco un Campo de texto (Text Input).", async () => {

            await expect(categoryFormPage.$offerPercentageTextBox, "El TextBox Offer Percentage es Visible.").not.toBeVisible();

            await test.info().attach("Label Offer Percentage : No Visible | TextBox Offer Percentage : No Visible", {
                body: await page.screenshot(),
                contentType: "image/png"
            });
        });
    });
});

test.describe("🔬 US 009 - TS 009 - Text Input - Ingreso de Porcentaje de Descuento en el Campo de Texto para la Categoría a Agregar", async () => {

    test.beforeEach("🔲 BACKGROUND:", async ({ page, superPage, categoryFormPage, adminPage }) => {



        await test.step("📝 GIVEN: que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador", async () => {

            await categoryFormPage._goToEndpoint();
        });

        test.step("🧩 AND: de que el Admin se encuentra en la Interfaz Formulario “Add Category”. http://desarrollowebecommerce.somee.com/Admin/CategoryForm.aspx", async () => {

            await expect(page).toHaveURL("/Admin/CategoryForm.aspx");
            await expect(categoryFormPage.$categoryAddTitle, "El Texto Add Cagegory No es Visible.").toBeVisible();
        });

        await test.step("🧩 AND: completa el Text Input “Category Name”, con una Cadena de Texto valida.", async () => {

            await expect(categoryFormPage.$categoryNameTextBox, "El Text Input “Category Name”, No es Visible").toBeVisible()
            await expect(categoryFormPage.$categoryNameTextBox, "El Text Input “Category Name”, No esta Disponible").toBeEnabled()
            await categoryFormPage._clickAndFillCategoryNameTextBox(validRandomCategoryName());
        });

        await test.step("🧩 AND: el Check Box (Categoría Activa/Inactiva) está marcado (estado “Active” - Checked).", async () => {

            await expect(categoryFormPage.$activeCheckbox, "El CheckBox No esta Visible.").toBeVisible();
            await expect(categoryFormPage.$activeCheckbox, "El CheckBox Desmarcado (Unchecked).").toBeChecked();
        });

        await test.step("🧩 AND: se visualiza el CheckBox(Categoria Offer/NoOffer) que está en estado Unchecked (no marcado),", async () => {

            await expect(categoryFormPage.$offerNoOfferCheckBox, "El CheckBox No esta Visible.").toBeVisible();
            await expect(categoryFormPage.$offerNoOfferCheckBox, "El CheckBox esta Marcado (Checked).").not.toBeChecked();

        });

        await test.step("🧩 AND: Hacer Click en el CheckBox(Categoria Offer/NoOffer), cambiando su estado de desmarcado (Unchecked) a marcado (Checked)", async () => {

            await expect(categoryFormPage.$offerNoOfferCheckBox, "").toBeEnabled();
            await categoryFormPage.$offerNoOfferCheckBox.check();

            await adminPage._hiddenLoader();
            await test.info().attach("CheckBox Active/Inactive : Marcado (Checked) | CheckBox Offer/No Offer : Marcado (Checked)", {
                body: await page.screenshot(),
                contentType: "image/png"

            });
        });
    });

    const valid_Test_Cases = [
        {
            title_TC: "US 009 - TS 009 - TC 001 - Validar, completar Campo de Texto (Text Input) “Offer Percentage”, al ingresar: 0.",
            when_And1: "🧩 AND: completa el campo con un valor númerico de tipo entero,",
            when_And2: "🧩 AND: el valor está dentro del rango 0 - 100,",
            value: '0'
        },
        {
            title_TC: "US 009 - TS 009 - TC 002 - Validar, completar Campo de Texto (Text Input) “Offer Percentage”, al ingresar: 100.",
            when_And1: "🧩 AND: completa el campo con un valor númerico de tipo entero,",
            when_And2: "🧩 AND: el valor está dentro del rango 0 - 100,",
            value: '100'
        }
    ];


    for (const test_case of valid_Test_Cases) {

        test(`${test_case.title_TC}`, async ({ page, categoryFormPage, adminPage }) => {

            await test.step("⚡ WHEN: Hace click en el Campo de Texto (Text Input) “Offer Percentage”", async () => {
                await expect(categoryFormPage.$offerPercentageTextBox, "El TextBox No esta Disponible").toBeEnabled();
                await expect(categoryFormPage.$offerPercentageTextBox, "El TextBox No esta Disponible").toBeVisible();

                await categoryFormPage._clickOfferPercentageTextBox();
            });

            await test.step(`${test_case.when_And1}`, async () => {
            });

            await test.step(`${test_case.when_And2}`, async () => {

                const numericValid = Number(test_case.value);

                // Si no es un número válido (NaN) o si es un string alfabético
                if (!(isNaN(numericValid))) {

                    await categoryFormPage._fillOfferPercentageTextBox(`${test_case.value}`);
                    const valueInput = await categoryFormPage.$offerPercentageTextBox.inputValue();
                    const numericValue = Number(valueInput);

                    await expect(numericValue, "Es menor a 0.").toBeGreaterThanOrEqual(0);
                    await expect(numericValue, "Es Mayor a 100").toBeLessThanOrEqual(100);

                } else {
                    throw new Error("El valor ingresado NO es un Valor Númerico");

                }
            });

            await test.step("🧩 AND: Hace Click en el Boton Add", async () => {

                await expect(categoryFormPage.$addButton, "No esta Visible el Boton Add.").toBeVisible();
                await expect(categoryFormPage.$addButton, "No esta Disponible el Boton Add.").toBeEnabled();

                await categoryFormPage._clickAddButton();
            })

            await test.step("✨ THEN: no deberia muestrarse ninguna advertencia, para el campo completado anteriormente.", async () => {

                await test.info().attach(`Valor Ingresado: ${test_case.value}`, {
                    body: await page.screenshot(),
                    contentType: "image/png"
                });
            });
        });
    }

    const invalid_Test_Cases = [
        {
            title_TC: "US 009 - TS 009 - TC 003 - Validar, completar Campo de Texto (Text Input) “Offer Percentage”, al ingresar una Cadena de Texto Alfabética (String).",
            when_And1: "🧩 AND: Completar el campo con un valor no númerico",
            value: 'e',
            then: "✨ THEN: deberia mostrarse una advertencia que indica que el campo ha sido completado incorrectamente, según las especificaciones previas (valor fuera de rango, valor negativo o decimal, o campo vacío)",
            validationError: "(Required Offer Percentage)"
        },
        {
            title_TC: "US 009 - TS 009 - TC 004 - Validar, completar Campo de Texto (Text Input) “Offer Percentage”, al ingresar Caracteres Especiales.",
            when_And1: "🧩 AND: Completar el campo con un valor no númerico, ",
            value: '+-.',
            then: "✨ THEN: deberia mostrarse una advertencia que indica que el campo ha sido completado incorrectamente, según las especificaciones previas (valor fuera de rango, valor negativo o decimal, o campo vacío)",
            validationError: "(Required Offer Percentage)"
        },

        {
            title_TC: "US 009 - TS 009 - TC 005 - Intentar Validar, completar Campo de Texto (Text Input) “Offer Percentage”, al ingresar un Valor Numérico con Decimales.",
            when_And1: "🧩 AND: completa el campo con un valor númerico con Decimales, ",
            value: '2.1',
            then: "✨ THEN: deberia mostrarse una advertencia que indica que el campo ha sido completado incorrectamente, según las especificaciones previas (valor fuera de rango, valor negativo o decimal, o campo vacío)",
            validationError: "Does not allow negative numbers or decimals"
        },

        {
            title_TC: "US 009 - TS 009 - TC 006 - Intentar Validar, completar Campo de Texto (Text Input) “Offer Percentage”, al ingresar un Valor Numérico Negativo.",
            when_And1: "🧩 AND: completar el campo con un valor númerico Negativo, ",
            value: '-1',
            then: "✨ THEN: deberia mostrarse una advertencia que indica que el campo ha sido completado incorrectamente, según las especificaciones previas (valor fuera de rango, valor negativo o decimal, o campo vacío)",
            validationError: "Does not allow negative numbers or decimals"
        },

        {
            title_TC: "US 009 - TS 009 - TC 007 - Intentar Validar, completar Campo de Texto (Text Input) “Offer Percentage”, al ingresar un Valor Numérico Entero Mayor a 100.",
            when_And1: "🧩 AND: completar el campo con un valor númerico Mayor a 100, ",
            value: '101',
            then: "✨ THEN: deberia mostrarse una advertencia que indica que el campo ha sido completado incorrectamente, según las especificaciones previas (valor fuera de rango, valor negativo o decimal, o campo vacío)",
            validationError: "(Allowed range 0-100)"
        },

        {
            title_TC: "US 009 - TS 009 - TC 008 - Intentar Validar, completar Campo de Texto (Text Input) “Offer Percentage”, al dejar el campo Vacío.",
            when_And1: "🧩 AND: deja el campo Vacio ",
            value: '',
            then: "✨ THEN: deberia mostrarse una advertencia que indica que el campo ha sido completado incorrectamente, según las especificaciones previas (valor fuera de rango, valor negativo o decimal, o campo vacío)",
            validationError: "(Required Offer Percentage)"
        },
    ];

    for (const test_case of invalid_Test_Cases) {

        test(`${test_case.title_TC}`, async ({ page, categoryFormPage }) => {


            await test.step("⚡ WHEN: Hace click en el Campo de Texto (Text Input) “Offer Percentage”", async () => {

                await expect(categoryFormPage.$offerPercentageTextBox, "El TextBox No esta Disponible").toBeEnabled();
                await expect(categoryFormPage.$offerPercentageTextBox, "El TextBox No esta Disponible").toBeVisible();

                await categoryFormPage._clickOfferPercentageTextBox();
            });

            await test.step(`${test_case.when_And1}`, async () => {

                await categoryFormPage._fillOfferPercentageTextBox(`${test_case.value}`);
            });

            await test.step("🧩 AND: Hace Click en el Boton Add", async () => {

                await expect(categoryFormPage.$addButton, "No esta Visible el Boton Add.").toBeVisible();
                await expect(categoryFormPage.$addButton, "No esta Disponible el Boton Add.").toBeEnabled();

                await categoryFormPage._clickAddButton();
            });

            const isValueNumeric = Number(test_case.value);

            if (isNaN(isValueNumeric) || test_case.value === "") {

                await test.step(`${test_case.then}, Advertencia : ${test_case.validationError}`, async () => {

                    await expect(categoryFormPage.$offerPercentageTextBox).toBeFocused();
                    await expect(categoryFormPage.$offerPercentageTextBox).toBeVisible();


                    await categoryFormPage.$offerPercentageRequiredOfferPercentageValidationSpan.waitFor({ state: "visible" })
                    await expect(categoryFormPage.$offerPercentageRequiredOfferPercentageValidationSpan).toBeVisible();
                    await expect(categoryFormPage.$offerPercentageRequiredOfferPercentageValidationSpan).toHaveText(`${test_case.validationError}`);
                });
            }
            else {

                if (isValueNumeric < 100) {

                    await test.step(`${test_case.then}, Advertencia : ${test_case.validationError}`, async () => {

                        await expect(categoryFormPage.$offerPercentageTextBox).toBeFocused();
                        await expect(categoryFormPage.$offerPercentageTextBox).toBeVisible();


                        await categoryFormPage.$offerPercentageDoesNotAllowNegativeNumbersOrDecimalsValidationSpan.waitFor({ state: "visible" })
                        await expect(categoryFormPage.$offerPercentageDoesNotAllowNegativeNumbersOrDecimalsValidationSpan).toBeVisible();
                        await expect(categoryFormPage.$offerPercentageDoesNotAllowNegativeNumbersOrDecimalsValidationSpan).toHaveText(`${test_case.validationError}`);

                    });
                }
                else {

                    await test.step(`${test_case.then}, Advertencia : ${test_case.validationError}`, async () => {

                        await expect(categoryFormPage.$offerPercentageTextBox).toBeFocused();
                        await expect(categoryFormPage.$offerPercentageTextBox).toBeVisible();


                        await categoryFormPage.$offerPercentageAllowedRange0100ValidationSpan.waitFor({ state: "visible" })
                        await expect(categoryFormPage.$offerPercentageAllowedRange0100ValidationSpan).toBeVisible();
                        await expect(categoryFormPage.$offerPercentageAllowedRange0100ValidationSpan).toHaveText(`${test_case.validationError}`);
                    });
                }
            }
            await test.info().attach(`Focus Text Input Offer Percentage - ${test_case.validationError}`, {
                body: await page.screenshot(),
                contentType: "image/png"
            });
        });
    }
});




