import {test, expect} from '@playwright/test'
import { fastFoodPage } from '../PageObject/fastFoodPage'

// test('Prueba', async ({page}) => {

//     await page.goto('http://desarrollowebecommerce.somee.com/')
    
//     const irPaginaPrincipalAdmin = new fastFoodPage(page);
//     await irPaginaPrincipalAdmin.clickinitialHomeLink();
//     await irPaginaPrincipalAdmin.clickNavbarLoginLink();
//     await irPaginaPrincipalAdmin.completeLogin('Admin', '1234');
//     await irPaginaPrincipalAdmin.clickLoginButton();


// })

test('Prueba', async ({page}) => {

    await page.goto('http://desarrollowebecommerce.somee.com/');

    const goDashboardAdmin = new fastFoodPage(page);

    await goDashboardAdmin.goDashboardAdmin();


})