import { test, expect } from '@playwright/test'
import { fastFoodPage } from '../PageObject/fastFoodPage'
import { describe } from 'node:test';

// test('Prueba', async ({page}) => {

//     await page.goto('http://desarrollowebecommerce.somee.com/')

//     const irPaginaPrincipalAdmin = new fastFoodPage(page);
//     await irPaginaPrincipalAdmin.clickinitialHomeLink();
//     await irPaginaPrincipalAdmin.clickNavbarLoginLink();
//     await irPaginaPrincipalAdmin.completeLogin('Admin', '1234');
//     await irPaginaPrincipalAdmin.clickLoginButton();


// })

test.describe('📑 US 002 | Acceso a la Página "Categories" de Administración de FastFood.', () => {


    test('🔬 US 002 | TS 002 | Acceso a la Página "Categories" de Administración de FastFood.', async ({ page }) => {

        test.info().annotations.push({
            type: 'Historia de Usuario',
            description: 'Como: Admin de la plataforma FastFood, Quiero: acceder a la interfaz “Categories” de administración, Para: visualizar la lista de categorías.',
        });

        test.info().annotations.push({
            type: 'Especificaciones',
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
                http://desarrollowebecommerce.somee.com/Admin/Category.aspx
                `,

        });

        await test.step('pre', async () => {
            
            await page.goto('http://desarrollowebecommerce.somee.com/');
    
            const goDashboardAdmin = new fastFoodPage(page);
            await goDashboardAdmin.goDashboardAdmin();
        })
        






    });

});