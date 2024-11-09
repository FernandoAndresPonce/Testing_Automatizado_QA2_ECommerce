import { test, expect } from '@playwright/test'
import { describe } from 'node:test';
import { fastFoodPage } from '../PageObject/fastFoodPage';

let username: string = 'Admin';
let password: string = '1234';

//Ejemplo de la Posible Arquitectura de diseno.

test.describe('🎬 Scenario: el admin accede exitosamente a la Interfaz Principal de Administración', () => {

    test('🧪 US 001| TS 001 |TC 001 | Validar la correcta redirección a la Interfaz Principal de Administración.', async ({ page }) => {

        test.info().annotations.push({
            type: '📑 US 001 | Acceso a la Página Principal de Administración de FastFood.',
            description: `      
        Como: admin de la web FastFood,
        Quiero: acceder a la interfaz principal de administración,
        Para: gestionar todas las tareas relacionadas con la plataforma.
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


        await test.step('Navegar a la  Pagina Inicial, y validar el Link "Home"', async () => {
            await page.goto('http://desarrollowebecommerce.somee.com/');
            await expect(page.locator("xpath=//div[contains(@class, 'popup-content')]//a"), 'El link "Home", no esta Visible').toBeVisible();
        });


        const goDashboardAdmin = new fastFoodPage(page);
        await test.step('Hacer Click en el Link "Home", y se redirecciona a la Pagina "Home"', async () => {
            await goDashboardAdmin.clickinitialHomeLink();
            await expect(page).toHaveURL('http://desarrollowebecommerce.somee.com/User/Default.aspx');
        });

        await test.step('Hacer Click en Login, y se Redireccion a la Pagina Login', async () => {
            await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
            await goDashboardAdmin.clickNavbarLoginLink();
            await expect(page).toHaveURL('http://desarrollowebecommerce.somee.com/User/Login.aspx');
        });

        await test.step('Completar el Login con los datos de Admin, y se redirecciona a la Pagina Principal del Administrador', async () => {
            await page.getByRole('textbox', { name: 'Username' }).fill(`${username}`);
            await page.getByRole('textbox', { name: 'Password' }).fill(`${password}`);
            await goDashboardAdmin.clickLoginButton();
        });

        await test.step('Validar URL de la Pagina Principal del Administrador, deberia ser "http://desarrollowebecommerce.somee.com/Admin/Dashboard.aspx"', async () => {
            await expect(page).toHaveURL('http://desarrollowebecommerce.somee.com/Admin/Dashboard.aspx')
        });

        await test.step('Validar el Titulo de la Pagina, deberia ser : "FastFood - Admin"', async () => {
            await expect(page).toHaveTitle('FastFood - Admin');
        });

        // await page.waitForLoadState();
        await test.info().attach('screenshot', {
            body: await page.screenshot(),
            contentType: 'image/png'
        })
    });
});