import { test, expect, Browser, Page } from '@playwright/test'
import { describe } from 'node:test';
import { fastFoodPage } from '../PageObject/fastFoodPage';

let username: string = 'Admin';
let password: string = '1234';

//Ejemplo de la Posible Arquitectura de diseño.

test.beforeEach(async ({page}) => {
    await page.goto('/');
});

test.describe('🎬 Scenario: el admin accede exitosamente a la Interfaz Principal de Administración', () => {

    test(' 🧪 US 001 | TS 001 | TC 001 | Validar, redireccionar a la Interfaz Principal de Administración, cuando se introduce la URL correspondiente', async ({ page }) => {

        test.info().annotations.push({
            type: '📑 US 001 | Acceso a la Página Principal de Administración de FastFood.',
            description: `      
        COMO: admin de la web FastFood,
        QUIERO: acceder a la interfaz principal de administración,
        PARA: gestionar todas las tareas relacionadas con la plataforma.
    `
        });

        test.info().annotations.push({
            type: '📋 Especificaciones:',
            description: 'Al acceder a la URL, la aplicación debe cargarse correctamente y mostrar un menú lateral con las siguientes opciones funcionales: Categorías, Productos, Usuarios, Contacto'
        });

        test.info().annotations.push({
            type: '🎯 Scope:',
            description: 'QA: Se encargará de validar únicamente el acceso a la URL y el correcto redireccionamiento a la interfaz principal.',
        })


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

            await test.info().attach('Pagina HOME',{
                body: await page.screenshot(),
                contentType: 'image/png',
            }) 
        });


        await test.step('⚡ WHEN: Selecciona la barra de direcciones del navegador, 🧩AND: introduce la URL, 🧩AND: presiona la tecla Enter,', async () => {

            await page.goto('http://desarrollowebecommerce.somee.com/Admin/Dashboard.aspx')
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