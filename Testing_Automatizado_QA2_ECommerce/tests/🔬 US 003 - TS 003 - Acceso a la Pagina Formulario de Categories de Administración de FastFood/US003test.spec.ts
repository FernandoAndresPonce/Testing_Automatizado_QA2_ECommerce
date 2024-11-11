import { describe } from "node:test";
import { expect, test } from "playwright/test";
import { fastFoodPage } from "../PageObject/fastFoodPage";

test.beforeEach(async ({ page }) => {
    await page.goto('/');
})

describe('🎬 Scenario: El admin accede exitosamente a la Interfaz “Formulario de Categories” de Administración ', async () => {

    test('pedro', async ({ page }) => {

        test.info().annotations.push({
            type: '📑 US 003 | Redirección |Acceso a la Pagina "Formulario de Categories" de Administración de FastFood.',
            description: `COMO: admin de la plataforma FastFood,
        QUIERO: acceder al “Formulario Categories”,
        PARA: agregar una nueva categoría.
        `,
        })

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

2.	Acceso directo mediante URL:
Es posible acceder directamente a la interfaz " Formulario Categories" utilizando la siguiente URL:
http://desarrollowebecommerce.somee.com/Admin/CategoryForm.aspx`,

        });

        test.info().annotations.push({
            type: '🎯 Scope:',
            description: `•	QA: deberá validar el acceso tanto a través de la URL como desde la Interfaz Categories de Administración, asegurando el correcto redireccionamiento a la interfaz "Formulario de Categories".`,
        });

        await test.step('📝 GIVEN: que el Usuario esta Logeado como Admin -  ha pasado por un proceso de autenticación y autorizacion, es decir, ha iniciado sesión con credenciales con rol Administrador.', async () => {
            const goCategoriesAdmin = new fastFoodPage(page);
            await goCategoriesAdmin.goCategoriesAdmin();

            // await page.waitForLoadState('load');
            // const loader = page.locator('.contain');
            // await loader.waitFor({ state: 'hidden' });

            // await goDashboardAdmin.clickTabMenuCategoriesLink();
        });

        await test.step('AND: el usuario se encuentra en la Interfaz Categories de Administración - http://desarrollowebecommerce.somee.com/Admin/Category.aspx', async () => {



            await expect(page).toHaveURL('http://desarrollowebecommerce.somee.com/Admin/Category.aspx');
        });


    });
});

