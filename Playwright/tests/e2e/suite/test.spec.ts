
import { expect, Browser, Page } from '@playwright/test'
import { describe } from 'node:test';
import { threadId } from 'node:worker_threads';

import { CategoryTable } from '../../interface/categoryPage.ts';
import { test } from "../../fixture/base";
import { validRandomCategoryName, validRandomCategoryName1Character, validRandomCategoryName50Character, invalidRandomCategoryNameOnlyNumber, invalidRandomCategoryNameOnlySpecialCharacter, invalidRandomOfferPercentageOnlySpecialChar, invalidRandomOfferPercentageDecimal, invalidRandomOfferPercentageNegativeNumber, validRandomCategoryImage, invalidRandomOfferPercentageAbove100, validRandomOfferPercentage, validRandomOfferPercentageCheckbox, validRandomActiveInactiveCheckbox } from '../../variables/categoryFormPage.ts';

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

        await test.step("🧩 AND: de que el Admin se encuentra en la Interfaz Formulario “Add Category”- /Admin/CategoryForm.aspx", async () => {

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
            value: `e`,
            then: "✨ THEN: deberia mostrarse una advertencia que indica que el campo ha sido completado incorrectamente, según las especificaciones previas (valor fuera de rango, valor negativo o decimal, o campo vacío)",
            validationError: "(Required Offer Percentage)"
        },
        {
            title_TC: "US 009 - TS 009 - TC 004 - Validar, completar Campo de Texto (Text Input) “Offer Percentage”, al ingresar Caracteres Especiales.",
            when_And1: "🧩 AND: Completar el campo con un valor no númerico, ",
            value: invalidRandomOfferPercentageOnlySpecialChar(),
            then: "✨ THEN: deberia mostrarse una advertencia que indica que el campo ha sido completado incorrectamente, según las especificaciones previas (valor fuera de rango, valor negativo o decimal, o campo vacío)",
            validationError: "(Required Offer Percentage)"
        },

        {
            title_TC: "US 009 - TS 009 - TC 005 - Intentar Validar, completar Campo de Texto (Text Input) “Offer Percentage”, al ingresar un Valor Numérico con Decimales.",
            when_And1: "🧩 AND: completa el campo con un valor númerico con Decimales, ",
            value: invalidRandomOfferPercentageDecimal(),
            then: "✨ THEN: deberia mostrarse una advertencia que indica que el campo ha sido completado incorrectamente, según las especificaciones previas (valor fuera de rango, valor negativo o decimal, o campo vacío)",
            validationError: "Does not allow negative numbers or decimals"
        },

        {
            title_TC: "US 009 - TS 009 - TC 006 - Intentar Validar, completar Campo de Texto (Text Input) “Offer Percentage”, al ingresar un Valor Numérico Negativo.",
            when_And1: "🧩 AND: completar el campo con un valor númerico Negativo, ",
            value: invalidRandomOfferPercentageNegativeNumber(),
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


test.describe("🔬 US 010 - TS 010 - Completar el Formulario para Crear una Categoría.", async () => {

    test.beforeEach("🔲 BACKGROUND:", async ({ page, superPage, categoryFormPage }) => {

        await test.step("📝 GIVEN: que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador", async () => {

            await categoryFormPage._goToEndpoint();
        });

        await test.step("🧩 AND: de que el Admin se encuentra en la Interfaz Formulario “Add Category” - /Admin/CategoryForm.aspx", async () => {

            await expect(page).toHaveURL("/Admin/CategoryForm.aspx");
            await expect(categoryFormPage.$categoryAddTitle, "El Texto Add Category No es Visible.").toBeVisible();
        });
    });


    const valid_Test_Cases = [
        {
            title_case: "US 010 - TS 010 - TC 001 - Intentar validar, crear Categoría al completar Category Name con un (1) carácter Alfabético (String), Category Image cadena de texto Alfabética (String), la Casilla de verificación Active/Inactive Marcada (Checked), la Casilla de verificacion Offer/NoOffer Marcada (Checked), y Offer Percentage con un Valor Numerico entre 0 y 100",
            categoryName_TextBox: validRandomCategoryName1Character(),
            categoryImage_InputFile: "tests/e2e/suite/Image/Desserts.png",
            active_inactive_CheckBox: "Active",
            offerPercentage_CheckBox: "Offer",
            offerPercentage_TextBox: 0,

        },

        {
            title_case: "US 010 - TS 010 - TC 002 - Intentar validar, crear Categoría al completar Category Name con cincuenta (50) carácteres Alfabéticos (String), Category Image cadena de texto No Alfabetica ,y la Casilla de verificación Active/Inactive Desmarcada (Unhecked)",
            categoryName_TextBox: validRandomCategoryName50Character(),
            categoryImage_InputFile: "tests/e2e/suite/Image/12$34.png",
            active_inactive_CheckBox: "Inactive",
        },

        {
            title_case: "US 010 - TS 010 - TC 003 - Intentar validar, crear Categoría al completar Category Name con un (1) carácter Alfabético (String), Category Image con un String con Espacio, la Casilla de verificación Active/Inactive Marcada (Checked),y la Casilla de verificacion Offer/NoOffer Desmarcada (Unchecked).",
            categoryName_TextBox: validRandomCategoryName1Character(),
            categoryImage_InputFile: "tests/e2e/suite/Image/12$34 Desserts.png",
            active_inactive_CheckBox: "Active",
            offerPercentage_CheckBox: "NoOffer"
        },

        {
            title_case: "US 010 - TS 010 - TC 004 - Intentar validar, crear Categoría al completar Category Name con cincuenta (50) carácteres Alfabéticos (String), Category Image Vacia ,y la Casilla de verificación Active/Inactive Marcada (Checked), la Casilla de verificacion Offer/NoOffer Marcada (Checked),y Offer Percentage con un Valor Numerico entre 0 y 100",
            categoryName_TextBox: validRandomCategoryName50Character(),
            categoryImage_InputFile: "",
            active_inactive_CheckBox: "Active",
            offerPercentage_CheckBox: "Offer",
            offerPercentage_TextBox: 100,
        },

    ];

    for (let test_case of valid_Test_Cases) {

        test(`${test_case.title_case}`, async ({ page, categoryFormPage, adminPage }) => {

            await test.step("⚡ WHEN: completa el formulario de categoría de forma Correcta", async () => {

                await categoryFormPage._clickAndFillCategoryNameTextBox(`${test_case.categoryName_TextBox}`);

                if (test_case.categoryImage_InputFile != "") {

                    await categoryFormPage.$categoryImageInputFile.setInputFiles(`${test_case.categoryImage_InputFile}`)
                };

                if (test_case.active_inactive_CheckBox === "Active") {
                    await categoryFormPage.$activeCheckbox.check();

                    if (test_case.offerPercentage_CheckBox === "Offer") {

                        await categoryFormPage.$offerNoOfferCheckBox.check();

                        await categoryFormPage._fillOfferPercentageTextBox(`${test_case.offerPercentage_TextBox}`);
                    }
                    else {
                        await categoryFormPage.$offerNoOfferCheckBox.uncheck();
                    };
                }
                else {
                    await categoryFormPage.$activeCheckbox.uncheck();
                };



                const screenshot = await page.screenshot({ fullPage: true });
                await test.info().attach("Formulario con datos Validos", {
                    body: screenshot,
                    contentType: "image/png"
                })
            });

            await test.step("🧩 AND: hace Click en el Botón Add", async () => {

                await categoryFormPage._clickAddButton();
            });


            await test.step("✨ THEN: el sistema deberia desplegar un mensaje emergente (Pop-Up) con un mensaje amigable que la categoria ha sido creado con exito (Mensaje Pop-Up: Category has been successfully CREATED), con el nombre de la Categoria Creada", async () => {

                await expect(page.locator("div.main-body span#ContentPlaceHolder1_lblMsg")).toBeVisible();
                await expect(page.locator("div.main-body span#ContentPlaceHolder1_lblMsg")).toContainText("Category has been successfully CREATED");
                await expect(page.locator("div.main-body span#ContentPlaceHolder1_lblMsg")).toContainText(`${test_case.categoryName_TextBox}`);

                await adminPage._hiddenLoader();

                const screenshot = await page.screenshot();
                await test.info().attach(`Mensaje emergente se visualiza, con nombre de la Categoria Creada ${test_case.categoryName_TextBox} exitosamente`, {
                    body: screenshot,
                    contentType: "image/png"
                })
            });

            await test.step("🧩 AND: a los cinco segundo, el mensaje emergente desaparece.", async () => {

                // await page.locator("div.main-body span#ContentPlaceHolder1_lblMsg").waitFor({ state: "hidden" });
                await page.waitForTimeout(5000);
                await expect(page.locator("div.main-body span#ContentPlaceHolder1_lblMsg")).toBeHidden();
                await expect(page.locator("div.main-body span#ContentPlaceHolder1_lblMsg")).not.toBeVisible();

                const screenshot = await page.screenshot();
                await test.info().attach(`Mensaje Emergente se Oculta`, {
                    body: screenshot,
                    contentType: "image/png"
                })
            });
        });
    }

    const invalid_test_case = [
        {
            title_case: "US 010 - TS 010 - TC 005 - Intentar validar, crear Categoría al completar Category Name con datos Invalido( cadena de texto Numerica), y el resto de los Campos con datos Validos.",
            categoryName_TextBox: invalidRandomCategoryNameOnlyNumber(),
            categoryImage_InputFile: validRandomCategoryImage(),
            active_inactive_CheckBox: validRandomActiveInactiveCheckbox(),
            offerPercentage_CheckBox: validRandomOfferPercentageCheckbox(),
            offerPercentage_TextBox: validRandomOfferPercentage(),
        },

        {
            title_case: "US 010 - TS 010 - TC 006 - Intentar validar, crear Categoría al completar Category Name con datos Invalido( Caracteres Especiales), y el resto de los Campos con datos Validos.",
            categoryName_TextBox: invalidRandomCategoryNameOnlySpecialCharacter(),
            categoryImage_InputFile: validRandomCategoryImage(),
            active_inactive_CheckBox: validRandomActiveInactiveCheckbox(),
            offerPercentage_CheckBox: validRandomOfferPercentageCheckbox(),
            offerPercentage_TextBox: validRandomOfferPercentage(),
        },

        {
            title_case: "US 010 - TS 010 - TC 007 - Intentar validar, crear Categoría al completar Category Name con datos Invalido(Campo Vacio), y el resto de los Campos con datos Validos.",
            categoryName_TextBox: "",
            categoryImage_InputFile: validRandomCategoryImage(),
            active_inactive_CheckBox: validRandomActiveInactiveCheckbox(),
            offerPercentage_CheckBox: validRandomOfferPercentageCheckbox(),
            offerPercentage_TextBox: validRandomOfferPercentage(),
        },

        {
            title_case: "US 010 - TS 010 - TC 008 - Intentar validar, crear Categoría al completar Offer Percentage Input con datos Invalidos(String Alfabetico), y el resto de los Campos con datos Validos.",
            categoryName_TextBox: validRandomCategoryName(),
            categoryImage_InputFile: validRandomCategoryImage(),
            active_inactive_CheckBox: "Active",
            offerPercentage_CheckBox: "Offer",
            offerPercentage_TextBox: "e",
        },

        {
            title_case: "US 010 - TS 010 - TC 009 - Intentar validar, crear Categoría al completar Offer Percentage Input con datos Invalidos(String Caracteres Especiales), y el resto de los Campos con datos Validos.",
            categoryName_TextBox: validRandomCategoryName(),
            categoryImage_InputFile: validRandomCategoryImage(),
            active_inactive_CheckBox: "Active",
            offerPercentage_CheckBox: "Offer",
            offerPercentage_TextBox: invalidRandomOfferPercentageOnlySpecialChar(),
        },

        {
            title_case: "US 010 - TS 010 - TC 010 - Intentar validar, crear Categoría al completar Offer Percentage Input con datos Invalidos(Numerico con Decimales), y el resto de los Campos con datos Validos.",
            categoryName_TextBox: validRandomCategoryName(),
            categoryImage_InputFile: validRandomCategoryImage(),
            active_inactive_CheckBox: "Active",
            offerPercentage_CheckBox: "Offer",
            offerPercentage_TextBox: invalidRandomOfferPercentageDecimal(),
        },

        {
            title_case: "US 010 - TS 010 - TC 011 - Intentar validar, crear Categoría al completar Offer Percentage Input con datos Invalidos(Numerico Negativo), y el resto de los Campos con datos Validos.",
            categoryName_TextBox: validRandomCategoryName(),
            categoryImage_InputFile: validRandomCategoryImage(),
            active_inactive_CheckBox: "Active",
            offerPercentage_CheckBox: "Offer",
            offerPercentage_TextBox: invalidRandomOfferPercentageNegativeNumber(),
        },

        {
            title_case: "US 010 - TS 010 - TC 012 - Intentar validar, crear Categoría al completar Offer Percentage Input con datos Invalidos(Fuera del Valor Limite), y el resto de los Campos con datos Validos.",
            categoryName_TextBox: validRandomCategoryName(),
            categoryImage_InputFile: validRandomCategoryImage(),
            active_inactive_CheckBox: "Active",
            offerPercentage_CheckBox: "Offer",
            offerPercentage_TextBox: invalidRandomOfferPercentageAbove100(),
        },

        {
            title_case: "US 010 - TS 010 - TC 013 - Intentar validar, crear Categoría al completar Offer Percentage Input con datos Invalidos(Campo Vacio), y el resto de los Campos con datos Validos.",
            categoryName_TextBox: validRandomCategoryName(),
            categoryImage_InputFile: validRandomCategoryImage(),
            active_inactive_CheckBox: "Active",
            offerPercentage_CheckBox: "Offer",
            offerPercentage_TextBox: "",
        },
    ];

    for (let test_case of invalid_test_case) {

        test(`${test_case.title_case}`, async ({ page, categoryFormPage, adminPage }) => {

            await test.step("⚡ WHEN: completa el formulario de categoría de forma Incorrecta", async () => {



                await categoryFormPage._clickAndFillCategoryNameTextBox(`${test_case.categoryName_TextBox}`);

                if (test_case.categoryImage_InputFile != "") {

                    await categoryFormPage.$categoryImageInputFile.setInputFiles(`${test_case.categoryImage_InputFile}`)
                };

                if (test_case.active_inactive_CheckBox === "Active") {
                    await categoryFormPage.$activeCheckbox.check();

                    if (test_case.offerPercentage_CheckBox === "Offer") {

                        await categoryFormPage.$offerNoOfferCheckBox.check();

                        await categoryFormPage._fillOfferPercentageTextBox(`${test_case.offerPercentage_TextBox}`);
                    }
                    else {
                        await categoryFormPage.$offerNoOfferCheckBox.uncheck();
                    };
                }
                else {
                    await categoryFormPage.$activeCheckbox.uncheck();
                };

                await adminPage._hiddenLoader();

                const screenshot = await page.screenshot({ fullPage: true });
                await test.info().attach("Formulario con datos Validos", {
                    body: screenshot,
                    contentType: "image/png"
                })
            });

            await test.step("🧩 AND: hace Click en el Botón Add", async () => {

                await categoryFormPage._clickAddButton();
            });

            await test.step("✨ THEN: se deberia mantener en la pagina Add Category como /Admin/CategoryForm.aspx, para que la información ingresada incorrectamente sea corregida.", async () => {

                await expect(page).toHaveURL("/Admin/CategoryForm.aspx");
                await expect(categoryFormPage.$categoryAddTitle).toBeVisible();

            });

            await test.step("🧩AND: Deberia redirigirse al campo ha corregir el Error", async () => {

                await page.waitForTimeout(500);

                const specialChar = /[!#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~°©®™€£¥αβγΔπΩ√¿¡«»“‘’"]/;

                //variables Category Name
                const textCategoryNameInput = await categoryFormPage.$categoryNameTextBox.inputValue();
                const isNumeric = Number(textCategoryNameInput);

                //Validation Category Name
                if (!isNaN(isNumeric)) {

                    if (test_case.categoryName_TextBox == "") {

                        await expect(categoryFormPage.$categoryNameTextBox).toBeFocused();
                        await expect(categoryFormPage.$categoryNameTextBox).toBeVisible();

                        await expect(page.locator('xpath=//div[@class="mb-3"]//span[@id="ContentPlaceHolder1_rfValidator"]')).toBeVisible();
                    } else {


                        await expect(categoryFormPage.$categoryNameTextBox).toBeFocused();
                        await expect(categoryFormPage.$categoryNameTextBox).toBeVisible();

                        await expect(page.locator('xpath=//div[@class="mb-3"]//span[@id="ContentPlaceHolder1_revName"]')).toBeVisible();
                    }
                }
                else if (specialChar.test(textCategoryNameInput)) {

                    await expect(categoryFormPage.$categoryNameTextBox).toBeFocused();
                    await expect(categoryFormPage.$categoryNameTextBox).toBeVisible();

                    await expect(page.locator('xpath=//div[@class="mb-3"]//span[@id="ContentPlaceHolder1_revName"]')).toBeVisible();
                };

                // const textOfferPercentageInput = await categoryFormPage.$offerPercentageTextBox.inputValue();

                //Variable Offer Percentage
                const isNumericOfferPercentage = Number(test_case.offerPercentage_TextBox)
                const isSpecialChar = String(test_case.offerPercentage_TextBox)

                //Validations Offer Percentage
                if (isNaN(isNumericOfferPercentage)) {
                    if (specialChar.test(isSpecialChar)) {

                        await expect(categoryFormPage.$offerPercentageTextBox).toBeFocused();
                        await expect(categoryFormPage.$offerPercentageTextBox).toBeVisible();

                        await expect(categoryFormPage.$offerPercentageRequiredOfferPercentageValidationSpan).toBeVisible();

                    }
                    else {

                        await expect(categoryFormPage.$offerPercentageTextBox).toBeFocused();
                        await expect(categoryFormPage.$offerPercentageTextBox).toBeVisible();

                        await expect(categoryFormPage.$offerPercentageRequiredOfferPercentageValidationSpan).toBeVisible()
                    }
                }
                // decimalRegex.test(Number(isNumericOfferPercentage)) => solo la uso cuando es un String.
                else {
                    if (isNumericOfferPercentage % 1 !== 0) {

                        await expect(categoryFormPage.$offerPercentageTextBox).toBeFocused();
                        await expect(categoryFormPage.$offerPercentageTextBox).toBeVisible();

                        await expect(categoryFormPage.$offerPercentageDoesNotAllowNegativeNumbersOrDecimalsValidationSpan).toBeVisible();
                    } else if (isNumericOfferPercentage < 0) {

                        await expect(categoryFormPage.$offerPercentageTextBox).toBeFocused();
                        await expect(categoryFormPage.$offerPercentageTextBox).toBeVisible();

                        await expect(categoryFormPage.$offerPercentageDoesNotAllowNegativeNumbersOrDecimalsValidationSpan).toBeVisible();
                    } else if (isNumericOfferPercentage > 100) {

                        await expect(categoryFormPage.$offerPercentageTextBox).toBeFocused();
                        await expect(categoryFormPage.$offerPercentageTextBox).toBeVisible();

                        await expect(categoryFormPage.$offerPercentageAllowedRange0100ValidationSpan).toBeVisible();
                    } else if (isNumericOfferPercentage == 0) {

                        await expect(categoryFormPage.$offerPercentageTextBox).toBeFocused();
                        await expect(categoryFormPage.$offerPercentageTextBox).toBeVisible();

                        await expect(categoryFormPage.$offerPercentageRequiredOfferPercentageValidationSpan).toBeVisible();
                    }
                };

                const screenshot = await page.screenshot();
                await test.info().attach("Formulario con datos Invalidos", {
                    body: screenshot,
                    contentType: "image/png"
                });
            })
        });
    }
});

test.describe("🔬 US 011 - TS 011 - Data Griew Category - Visualizar la Categoría agregada en la tabla de Categoría.", async () => {

    test.use({ storageState: { cookies: [], origins: [] } });
    test.beforeEach("🔲 BACKGROUND:", async ({ page, superPage, categoryFormPage, adminPage }) => {

        await test.step("📝 GIVEN: que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador", async () => {

            await page.goto("/");
            await superPage._loginThenRamdonFormCategoryByElements();

        });

        await test.step("🧩 AND: de que el Admin se encuentra en la Interfaz Formulario Add Category como “/Admin/CategoryForm.aspx”", async () => {

            await expect(categoryFormPage.$categoryAddTitle, "El Titulo Add Category No es Visible.").toBeVisible();
            await expect(page).toHaveURL(`${categoryFormPage.endpoint}`);

            await page.waitForLoadState('load');
            await adminPage._hiddenLoader();

            await test.info().attach("Formulario Category", {
                body: await page.screenshot(),
                contentType: "image/png"
            });
        });
    });


    const valid_Test_Cases = [
        {
            title_case: "US 011 - TS 011 - TC 001 - Intentar validar, visualizar Categoria creada en la Tabla (DataGriwView), al completar Category Name con un (1) carácter Alfabético (String), Category Image cadena de texto Alfabética (String), la Casilla de verificación Active/Inactive Marcada (Checked), la Casilla de verificacion Offer/NoOffer Marcada (Checked), y Offer Percentage con un Valor Numerico entre 0 y 100",
            categoryName_TextBox: validRandomCategoryName1Character(),
            categoryImage_InputFile: "tests/e2e/suite/Image/Desserts.png",
            active_inactive_CheckBox: "Active",
            offerPercentage_CheckBox: "Offer",
            offerPercentage_TextBox: 0,

        },

        {
            title_case: "US 011 - TS 011 - TC 002 - Intentar validar, visualizar Categoria creada en la Tabla (DataGriwView), al completar Category Name con cincuenta (50) carácteres Alfabéticos (String), Category Image cadena de texto No Alfabetica ,y la Casilla de verificación Active/Inactive Desmarcada (Unhecked)",
            categoryName_TextBox: validRandomCategoryName50Character(),
            categoryImage_InputFile: "tests/e2e/suite/Image/12$34.png",
            active_inactive_CheckBox: "Inactive",

        },

        {
            title_case: "US 011 - TS 011 - TC 003 - Intentar validar, visualizar Categoria creada en la Tabla (DataGriwView), al completar Category Name con un (1) carácter Alfabético (String), Category Image con un String con Espacio, la Casilla de verificación Active/Inactive Marcada (Checked),y la Casilla de verificacion Offer/NoOffer Desmarcada (Unchecked).",
            categoryName_TextBox: validRandomCategoryName1Character(),
            categoryImage_InputFile: "tests/e2e/suite/Image/12$34 Desserts.png",
            active_inactive_CheckBox: "Active",
            offerPercentage_CheckBox: "NoOffer"
        },

        {
            title_case: "US 011 - TS 011 - TC 004 - Intentar validar, visualizar Categoria creada en la Tabla (DataGriwView), al completar Category Name con cincuenta (50) carácteres Alfabéticos (String), Category Image Vacia ,y la Casilla de verificación Active/Inactive Marcada (Checked), la Casilla de verificacion Offer/NoOffer Marcada (Checked),y Offer Percentage con un Valor Numerico entre 0 y 100",
            categoryName_TextBox: validRandomCategoryName50Character(),
            categoryImage_InputFile: "",
            active_inactive_CheckBox: "Active",
            offerPercentage_CheckBox: "Offer",
            offerPercentage_TextBox: 100,
        },

    ];

    for (let test_case of valid_Test_Cases) {

        test(`${test_case.title_case}`, async ({ page, categoryFormPage, categoryPage, adminPage }) => {

            test.info().annotations.push({
                type: "Scenario ",
                description: "El Admin crea una Categoria en la plataforma de manera exitosa, que se refleja en la Tabla (Data Griew)."

            });

            await test.step("⚡ WHEN: completa el formulario de categoría de forma Correcta", async () => {

                await categoryFormPage._clickAndFillCategoryNameTextBox(`${test_case.categoryName_TextBox}`);

                if (test_case.categoryImage_InputFile != "") {

                    await categoryFormPage.$categoryImageInputFile.setInputFiles(`${test_case.categoryImage_InputFile}`)
                };

                if (test_case.active_inactive_CheckBox === "Active") {
                    await categoryFormPage.$activeCheckbox.check();

                    if (test_case.offerPercentage_CheckBox === "Offer") {

                        await categoryFormPage.$offerNoOfferCheckBox.check();

                        await categoryFormPage._fillOfferPercentageTextBox(`${test_case.offerPercentage_TextBox}`);
                    }
                    else {
                        await categoryFormPage.$offerNoOfferCheckBox.uncheck();
                    };
                }
                else {
                    await categoryFormPage.$activeCheckbox.uncheck();
                };

                await adminPage._hiddenLoader();

                const screenshot = await page.screenshot({ fullPage: true });
                await test.info().attach("Formulario con datos Validos", {
                    body: screenshot,
                    contentType: "image/png"
                })
            });

            await test.step("🧩 AND: hace Click en el Botón Add", async () => {

                await categoryFormPage._clickAddButton();
            });


            await test.step("🧩 AND: el sistema deberia desplegar un mensaje emergente (Pop-Up) con un mensaje amigable que la categoria ha sido creado con exito (Mensaje Pop-Up: Category has been successfully CREATED), con el nombre de la Categoria Creada", async () => {

                await expect(page.locator("div.main-body span#ContentPlaceHolder1_lblMsg")).toBeVisible();
                await expect(page.locator("div.main-body span#ContentPlaceHolder1_lblMsg")).toContainText("Category has been successfully CREATED");
                await expect(page.locator("div.main-body span#ContentPlaceHolder1_lblMsg")).toContainText(`${test_case.categoryName_TextBox}`);

                await adminPage._hiddenLoader();

                const screenshot = await page.screenshot();
                await test.info().attach(`Mensaje emergente se visualiza, con nombre de la Categoria Creada ${test_case.categoryName_TextBox} exitosamente`, {
                    body: screenshot,
                    contentType: "image/png"
                })
            });

            await test.step("🧩 AND: a los cinco segundo, el mensaje emergente desaparece.", async () => {

                // await page.locator("div.main-body span#ContentPlaceHolder1_lblMsg").waitFor({ state: "hidden" });
                await page.waitForTimeout(5000);
                await expect(page.locator("div.main-body span#ContentPlaceHolder1_lblMsg")).toBeHidden();
                await expect(page.locator("div.main-body span#ContentPlaceHolder1_lblMsg")).not.toBeVisible();

                const screenshot = await page.screenshot();
                await test.info().attach(`Mensaje Emergente se Oculta`, {
                    body: screenshot,
                    contentType: "image/png"
                })
            });

            await test.step("✨ THEN:  en el Tabla (Data Griew) se deberia ver reflejada la categoría recién creada.", async () => {

                await expect(categoryPage.$table, "La Tabla No esta Visible").toBeEnabled();
                await expect(categoryPage.$table, "La Tabla No esta Disponible").toBeVisible();

                const tableConteiner = await categoryPage.$table;

                const rows = await categoryPage.$tableRows.all();

                const categories: CategoryTable[] = [];

                for (let row of rows) {

                    const cells = await row.locator("xpath=.//td").all();

                    if (cells.length > 0) {


                        let category: CategoryTable = {
                            name: await cells[0].innerText(),
                            isActive: await cells[2].innerText(),
                            isOffer: await cells[3].innerText(),
                        };

                        categories.push(category);
                    }
                }

                for (let category of categories) {
                    console.log(category)
                }

                const filterCategoryName = await categories.filter(newCategory => newCategory.name == test_case.categoryName_TextBox);

                console.log(filterCategoryName);

                const actualCategoryName: string = filterCategoryName[0].name;
                const actualCategoryActiveInactive: string = filterCategoryName[0].isActive;
                const actualCategoryOfferNoOffer: string = filterCategoryName[0].isOffer;


                await expect(actualCategoryName).toEqual(test_case.categoryName_TextBox);
                await expect(actualCategoryActiveInactive).toEqual(test_case.active_inactive_CheckBox);
                if (test_case.active_inactive_CheckBox != "Inactive") {

                    await expect(actualCategoryOfferNoOffer).toEqual(test_case.offerPercentage_CheckBox);
                }

                const screenshot = await page.screenshot({ fullPage: true });
                await test.info().attach(`Se refleja en la Tabla la categoria recien Creada.`, {
                    body: screenshot,
                    contentType: "image/png"
                })
            });
        });
    }

    const invalid_Test_Cases = [
        {
            title_case: "US 011 - TS 011 - TC 005 - Intentar validar, crear Categoría al completar Category Name con datos Invalido( cadena de texto Numerica), y el resto de los Campos con datos Validos.",
            categoryName_TextBox: invalidRandomCategoryNameOnlyNumber(),
            categoryImage_InputFile: validRandomCategoryImage(),
            active_inactive_CheckBox: validRandomActiveInactiveCheckbox(),
            offerPercentage_CheckBox: validRandomOfferPercentageCheckbox(),
            offerPercentage_TextBox: validRandomOfferPercentage(),
        },

        {
            title_case: "US 011 - TS 011 - TC 006 - Intentar validar, crear Categoría al completar Category Name con datos Invalido( Caracteres Especiales), y el resto de los Campos con datos Validos.",
            categoryName_TextBox: invalidRandomCategoryNameOnlySpecialCharacter(),
            categoryImage_InputFile: validRandomCategoryImage(),
            active_inactive_CheckBox: validRandomActiveInactiveCheckbox(),
            offerPercentage_CheckBox: validRandomOfferPercentageCheckbox(),
            offerPercentage_TextBox: validRandomOfferPercentage(),
        },

        {
            title_case: "US 011 - TS 011 - TC 007 - Intentar validar, crear Categoría al completar Category Name con datos Invalido(Campo Vacio), y el resto de los Campos con datos Validos.",
            categoryName_TextBox: "",
            categoryImage_InputFile: validRandomCategoryImage(),
            active_inactive_CheckBox: validRandomActiveInactiveCheckbox(),
            offerPercentage_CheckBox: validRandomOfferPercentageCheckbox(),
            offerPercentage_TextBox: validRandomOfferPercentage(),
        },

        {
            title_case: "US 011 - TS 011 - TC 008 - Intentar validar, crear Categoría al completar Offer Percentage Input con datos Invalidos(String Alfabetico), y el resto de los Campos con datos Validos.",
            categoryName_TextBox: validRandomCategoryName(),
            categoryImage_InputFile: validRandomCategoryImage(),
            active_inactive_CheckBox: "Active",
            offerPercentage_CheckBox: "Offer",
            offerPercentage_TextBox: "e",
        },

        {
            title_case: "US 011 - TS 011 - TC 009 - Intentar validar, crear Categoría al completar Offer Percentage Input con datos Invalidos(String Caracteres Especiales), y el resto de los Campos con datos Validos.",
            categoryName_TextBox: validRandomCategoryName(),
            categoryImage_InputFile: validRandomCategoryImage(),
            active_inactive_CheckBox: "Active",
            offerPercentage_CheckBox: "Offer",
            offerPercentage_TextBox: invalidRandomOfferPercentageOnlySpecialChar(),
        },

        {
            title_case: "US 011 - TS 011 - TC 010 - Intentar validar, crear Categoría al completar Offer Percentage Input con datos Invalidos(Numerico con Decimales), y el resto de los Campos con datos Validos.",
            categoryName_TextBox: validRandomCategoryName(),
            categoryImage_InputFile: validRandomCategoryImage(),
            active_inactive_CheckBox: "Active",
            offerPercentage_CheckBox: "Offer",
            offerPercentage_TextBox: invalidRandomOfferPercentageDecimal(),
        },

        {
            title_case: "US 011 - TS 011 - TC 011 - Intentar validar, crear Categoría al completar Offer Percentage Input con datos Invalidos(Numerico Negativo), y el resto de los Campos con datos Validos.",
            categoryName_TextBox: validRandomCategoryName(),
            categoryImage_InputFile: validRandomCategoryImage(),
            active_inactive_CheckBox: "Active",
            offerPercentage_CheckBox: "Offer",
            offerPercentage_TextBox: invalidRandomOfferPercentageNegativeNumber(),
        },

        {
            title_case: "US 011 - TS 011 - TC 012 - Intentar validar, crear Categoría al completar Offer Percentage Input con datos Invalidos(Fuera del Valor Limite), y el resto de los Campos con datos Validos.",
            categoryName_TextBox: validRandomCategoryName(),
            categoryImage_InputFile: validRandomCategoryImage(),
            active_inactive_CheckBox: "Active",
            offerPercentage_CheckBox: "Offer",
            offerPercentage_TextBox: invalidRandomOfferPercentageAbove100(),
        },

        {
            title_case: "US 011 - TS 011 - TC 013 - Intentar validar, crear Categoría al completar Offer Percentage Input con datos Invalidos(Campo Vacio), y el resto de los Campos con datos Validos.",
            categoryName_TextBox: validRandomCategoryName(),
            categoryImage_InputFile: validRandomCategoryImage(),
            active_inactive_CheckBox: "Active",
            offerPercentage_CheckBox: "Offer",
            offerPercentage_TextBox: "",
        },
    ];

    for (let test_case of invalid_Test_Cases) {

        test(`${test_case.title_case}`, async ({ page, categoryFormPage, categoryPage, adminPage }) => {

            test.info().annotations.push({
                type: "Scenario ",
                description: "El Admin No puede crear una Categoria en la plataforma de manera exitosa, y que  No se ve reflejada en la Tabla (Data Griew)."

            });

            await test.step("⚡ WHEN: completa algun campo del formulario de categoría de manera Incorrecta", async () => {

                await categoryFormPage._clickAndFillCategoryNameTextBox(`${test_case.categoryName_TextBox}`);

                if (test_case.categoryImage_InputFile != "") {

                    await categoryFormPage.$categoryImageInputFile.setInputFiles(`${test_case.categoryImage_InputFile}`)
                };

                if (test_case.active_inactive_CheckBox === "Active") {
                    await categoryFormPage.$activeCheckbox.check();

                    if (test_case.offerPercentage_CheckBox === "Offer") {

                        await categoryFormPage.$offerNoOfferCheckBox.check();

                        await categoryFormPage._fillOfferPercentageTextBox(`${test_case.offerPercentage_TextBox}`);
                    }
                    else {
                        await categoryFormPage.$offerNoOfferCheckBox.uncheck();
                    };
                }
                else {
                    await categoryFormPage.$activeCheckbox.uncheck();
                };

                await adminPage._hiddenLoader();

                const screenshot = await page.screenshot({ fullPage: true });
                await test.info().attach("Formulario con datos Invalidos", {
                    body: screenshot,
                    contentType: "image/png"
                })
            });

            await test.step("🧩 AND: hace Click en el Botón Add", async () => {

                await categoryFormPage._clickAddButton();
            });

            await test.step("🧩 AND: se permanece en la pagina Add Category como /Admin/CategoryForm.aspx, para que la información ingresada incorrectamente sea corregida.", async () => {

                await expect(page).toHaveURL("/Admin/CategoryForm.aspx");
                await expect(categoryFormPage.$categoryAddTitle).toBeVisible();

            });

            await test.step("BUT: hace Click en el Boton Cancel.", async () => {

                await page.evaluate(() => {
                    window.scrollTo(0, document.body.scrollHeight); // Desplazamos hasta el final de la página
                });

                await page.waitForTimeout(500);
                await expect(categoryFormPage.$cancelButton).toBeVisible();
                await expect(categoryFormPage.$cancelButton).toBeEnabled();

                await categoryFormPage._clickCancelButton();
            })

            await test.step("✨ THEN: en la tabla (Data Grid) no debería reflejarse la categoría que se intentó crear recientemente.", async () => {

                await expect(categoryPage.$table, "La Tabla No esta Visible").toBeEnabled();
                await expect(categoryPage.$table, "La Tabla No esta Disponible").toBeVisible();

                // const tableConteiner = await categoryPage.$table;

                const rows = await categoryPage.$tableRows.all();

                const categories: CategoryTable[] = [];

                for (let row of rows) {

                    const cells = await row.locator("xpath=.//td").all();

                    if (cells.length > 0) {


                        let category: CategoryTable = {
                            name: await cells[0].innerText(),
                            isActive: await cells[2].innerText(),
                            isOffer: await cells[3].innerText(),
                        };

                        categories.push(category);
                    }
                }

                for (let category of categories) {
                    console.log(category)
                }

                const filterCategoryName = await categories.filter(newCategory => newCategory.name == test_case.categoryName_TextBox);

                await expect(filterCategoryName).toEqual([]);

                console.log(filterCategoryName);


                const screenshot = await page.screenshot({ fullPage: true });
                await test.info().attach(`No se Refleja la categoria que se ha intentado crear en la Tabla`, {
                    body: screenshot,
                    contentType: "image/png"
                })
            });
        });
    }
});

test.describe("🔬 US 012 - TS 012 - Detalle Categoría - Acceder a la Interfaz “Detalle de una Categoría” en la plataforma FastFood. ", async () => {

    let rowsLenght: number;

    test.beforeEach("🔲 BACKGROUND:", async ({ page, superPage, categoryPage }) => {
        await test.step("📝 GIVEN que el Usuario esta Logeado como Admin -  ha pasado por un proceso de auteclearnticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador", async () => {

            await page.goto("/");
            await superPage._goToCategoryAdmin();
        });



        await test.step("🧩 AND de que el Admin se encuentra en la Interfaz Category como “/Admin/Category.aspx”", async () => {

            await expect(page).toHaveURL(categoryPage.endpoint)
            await expect(categoryPage.$categoryTitle).toBeVisible();
        });

        await test.step("🧩 AND al menos hay Una Categoría Agregada a la tabla.", async () => {

            await expect(categoryPage.$table, "La Table No esta Disponible.").toBeEnabled();
            await expect(categoryPage.$table, "La Table No esta Visible.").toBeVisible();

            const rows = await categoryPage.$tableRows.all();

            rowsLenght = await rows.length;

            await expect(rowsLenght).toBeGreaterThanOrEqual(1);

            await test.info().attach(`Category Page | Table Lenght : ${rowsLenght}`, {
                body: await page.screenshot(),
                contentType: "image/png"
            })


        });
    });

    test("US 012 - TS 012 - TC 001 - Validar la correcta redirección a la Interfaz “Detalle de la Categoria” de mediante el Botón (“OJO de la fila”).", async ({ page, categoryPage, adminPage, categoryDetail }) => {

        await test.step("⚡WHEN hace Click en el Botón en la imagen del “OJO”, que se encuentra visible al final de una fila, en la parte derecha,", async () => {
            console.log(rowsLenght)

            let rowNumber: number;
            //con esta sintaxis devolvemos un numero entre 1 y el numero que pasamos como argumento.
            const randomIndex = Math.floor(Math.random() * (rowsLenght - 1)) + 1;
            rowNumber = randomIndex;

            await expect(categoryPage.$tableRows.nth(rowNumber), "La Fila No esta Disponible").toBeEnabled();
            await expect(categoryPage.$tableRows.nth(rowNumber), "La Fila NO es Visible.").toBeVisible();

            await expect(categoryPage.$eyeRowButton(rowNumber), "El Boton No es Visible.").toBeVisible()
            await expect(categoryPage.$eyeRowButton(rowNumber), "El Boton No esta Disponible.").toBeEnabled()

            await categoryPage._clickEyeRowButton(rowNumber);

            await page.waitForLoadState('load');
            await adminPage._hiddenLoader();
        });

        await test.step("✨ THEN el sistema se redirecciona a la Interfaz “Detalles de la categoría”.", async () => {

            await expect(categoryDetail.$title, "El Titulo View Category, No esta Visible.").toBeVisible();
            await expect(categoryDetail.$title, "El Titulo No contiene el texto View Category.").toHaveText("View Category");

            await test.info().attach("Category Detail Page", {
                body: await page.screenshot(),
                contentType: "image/png"
            });
        });
    });

    test("US 012 - TS 012 - TC 002 - Validar la correcta redirección a la Interfaz “Detalle de la Categoria”, mediante la URL.", async ({ page, categoryPage, adminPage, categoryDetail }) => {

        let categoryId: string;

        await test.step("📝 GIVEN conoce, además, el número de ID de la Categoría.", async () => {

            let rowNumber: number;

            const randomIndex = Math.floor(Math.random() * (rowsLenght - 1)) + 1;
            rowNumber = randomIndex;

            await expect(categoryPage.$tableRows.nth(rowNumber), "La Fila No esta Disponible").toBeEnabled();
            await expect(categoryPage.$tableRows.nth(rowNumber), "La Fila NO es Visible.").toBeVisible();

            await expect(categoryPage.$eyeRowButton(rowNumber), "El Boton No es Visible.").toBeVisible()
            await expect(categoryPage.$eyeRowButton(rowNumber), "El Boton No esta Disponible.").toBeEnabled()

            await categoryPage._clickEyeRowButton(rowNumber);

            await expect((categoryDetail.$categoryLabel), "El Titulo Category: No esta Visible.").toBeVisible();

            await expect(categoryDetail.$idCategoryLabel).toBeVisible();
            categoryId = await categoryDetail.$idCategoryLabel.innerText();

            await categoryPage._goToEndpoint();

            await adminPage._hiddenLoader();
            await page.waitForTimeout(1000);
        })

        await test.step("⚡WHEN introduce la Url con el agrega el ID de la Categoria, con su respectiva sintaxis", async () => [

            await categoryDetail._goToEndpointId(categoryId)
            // await page.goto(`/Admin/CategoryDetail.aspx?Id=${categoryId}`)    
        ]);

        await test.step("✨ THEN el sistema se redirecciona a la Interfaz “Detalles de la categoría”.", async () => {

            await expect(categoryDetail.$title, "El Titulo View Category, No esta Visible.").toBeVisible();
            await expect(categoryDetail.$title, "El Titulo No contiene el texto View Category.").toHaveText("View Category");
        });
    });

});




