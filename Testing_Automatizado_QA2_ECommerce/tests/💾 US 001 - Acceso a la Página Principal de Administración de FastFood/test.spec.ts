import { test, expect } from '@playwright/test'
import { describe } from 'node:test';

let username: string = 'Admin';
let password: string = '1234';

test.describe('📑 US 001 - Acceso a la Página Principal de Administración de FastFood', () => {

    test('🔬 US 001 | TS 001 | Acceso a la Página Principal de Administración de FastFood.', async ({ page }) => {
        test.info().annotations.push({
            type: 'Historia de Usuario',
            description: `
            Como: admin de la web FastFood,
            Quiero: acceder a la interfaz principal de administración,<br>
            Para: gestionar todas las tareas relacionadas con la plataforma.`
        });

        test.info().annotations.push({
            type: 'Especificaciones',
            description: 'Al acceder a la URL, la aplicación debe cargarse correctamente y mostrar un menú lateral con las siguientes opciones funcionales: Categorías, Productos, Usuarios, Contacto'
        });

        await test.step('Navegar a la  Pagina Inicial, y validar el Link "Home"', async () => {
            await page.goto('http://desarrollowebecommerce.somee.com/');
            await expect(page.locator("xpath=//div[contains(@class, 'popup-content')]//a")).toBeVisible();
        });

        await test.step('Hacer Click en el Link "Home", y se redirecciona a la Pagina "Home"', async () => {
            await page.locator("xpath=//div[contains(@class, 'popup-content')]//a").click({ force: true });
            await expect(page).toHaveURL('http://desarrollowebecommerce.somee.com/User/Default.aspx');
        });

        await test.step('Hacer Click en Login, y se Redireccion a la Pagina Login', async () => {
            await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
            await page.getByRole('link', { name: 'Login' }).click({ force: true });
            await expect(page).toHaveURL('http://desarrollowebecommerce.somee.com/User/Login.aspx');
        });

        await test.step('Completar el Login con los datos de Admin, y se redirecciona a la Pagina Principal del Administrador', async () => {
            await page.getByRole('textbox', { name: 'Username' }).fill(`${username}`);
            await page.getByRole('textbox', { name: 'Password' }).fill(`${password}`);
            await page.getByRole('button', { name: 'Login' }).click({ force: true });
        });

        await page.pause();
        await test.step('Validar URL de la Pagina Principal del Administrador, deberia ser "http://desarrollowebecommerce.somee.com/Admin/Dashboard.aspx"', async () => {
            await expect(page).toHaveURL('http://desarrollowebecommerce.somee.com/Admin/Dashboard.aspx')
        });

        await test.step('Validar el Titulo de la Pagina, deberia ser : "FastFood - Admin"', async () => {
            await expect(page).toHaveTitle('FastFood - Admin');
        });


    });

});