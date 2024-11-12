import { type test, type expect, type Locator, Page } from '@playwright/test'

export class fastFoodPage {
    readonly page : Page;
    readonly initialHomeLink : Locator;
    readonly navbarLoginLink : Locator;
    readonly usernameLogin : Locator;
    readonly passwordLogin : Locator;
    readonly loginButton : Locator;
    readonly tabMenuCategoriesLink : Locator;
    readonly adminLoader : Locator;
    readonly addCategoryButton : Locator;
    userAdmin: string;
    passwordAdmin : string;


    constructor(page: Page) {
        this.page = page;
        this.initialHomeLink = page.locator("xpath=//div[contains(@class, 'popup-content')]//a");
        this.navbarLoginLink = page.getByRole('link', { name: 'Login' });
        this.usernameLogin = page.getByRole('textbox', { name: 'Username' });
        this.passwordLogin = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.tabMenuCategoriesLink = page.getByRole('link', {name: ' Categories'});
        this.adminLoader = page.locator('.contain');
        this.addCategoryButton = page.getByRole('button', {name: 'Add Category'});
        this.userAdmin = 'Admin';
        this.passwordAdmin = '1234';

    }

    // Acciones con elementos PUNTUALES.

     // <<<<<<< USER >>>>>>>>>>
    //Pagina Inicial de Carga.
    async clickinitialHomeLink() {
        await this.initialHomeLink.click({ force: true });
    }

    //Menu de Barra Principal.
    async clickNavbarLoginLink() {
        await this.navbarLoginLink.click({ force: true });
    }

    //Pagina Login.
    async completeLogin(user: string, password: string) {
        await this.usernameLogin.fill(`${user}`);
        await this.passwordLogin.fill(`${password}`);
    }

    async clickLoginButton() {
        await this.loginButton.click({ force: true });
    }

    // <<<<<<< ADMIN >>>>>>>>>>
    //Barra Lateral Pagina Administracion.
    async clickTabMenuCategoriesLink(){
        await this.tabMenuCategoriesLink.click({ force : true });
    }

    // Loader Cargar y Ocultar
    async hiddenAdminLoader(){
        await this.adminLoader.waitFor({ state: 'hidden' });
    }

    //Boton Agregar Categoria (Categories)
    async clickAddCategoryButton(){
        await this.addCategoryButton.click({ force : true });
    }

    
    //Acciones con MULTIPLES elementos.

    async loginAndGoDashboardAdmin(){
        await this.clickinitialHomeLink();
        await this.clickNavbarLoginLink();
        await this.completeLogin(this.userAdmin, this.passwordAdmin);
        await this.clickLoginButton();
    };

    async loginAndGoCategoriesAdmin(){
        await this.clickinitialHomeLink();
        await this.clickNavbarLoginLink();
        await this.completeLogin(this.userAdmin, this.passwordAdmin);
        await this.clickLoginButton();
        await this.page.waitForLoadState('load');
        await this.hiddenAdminLoader();
        await this.clickTabMenuCategoriesLink();
    }
}
