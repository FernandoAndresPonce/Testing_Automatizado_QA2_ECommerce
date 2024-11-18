import test, { expect } from "playwright/test";
import { fastFoodPage } from "./PageObject/fastFoodPage";


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