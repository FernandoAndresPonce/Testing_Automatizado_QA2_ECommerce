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
    readonly cardCategoriesIco : Locator;
    readonly cardCategoriesViewDetails : Locator;
    readonly categoryNameTextBox : Locator;
    readonly categoryImageInputFile : Locator;
    readonly categoryImageImg : Locator;
    readonly categoryActiveCheckbox : Locator;
    readonly categoryActiveLabel : Locator;
    readonly categoryInactiveLabel : Locator;
    userAdminValid: string;
    passwordAdminValid : string;


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
        this.cardCategoriesIco = page.locator('div.card-block-small i.icofont-muffin');
        this.cardCategoriesViewDetails = page.locator("//div[@class='card-block-small']//i[@id='categoriesDetails']");
        this.categoryNameTextBox = page.getByRole('textbox', { name: 'Category Name' });
        this.categoryImageInputFile = page.locator('#ContentPlaceHolder1_txtImage');
        this.categoryImageImg = page.locator('#ContentPlaceHolder1_imgForm');
        this.categoryActiveCheckbox = page.locator("xpath=//input[@id='ContentPlaceHolder1_cbActivo']");
        this.categoryActiveLabel = page.locator("//span[@id='ContentPlaceHolder1_lblActive']");
        this.categoryInactiveLabel = page.locator("xpath=//span[@id='ContentPlaceHolder1_lblInactive']");
        this.userAdminValid = 'Admin';
        this.passwordAdminValid = '1234';

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

    //Cartas Centrales Seccion Dashboard

    async clickCardCategoriesIco(){
        await this.cardCategoriesIco.click({ force : true })
    }

    async clickCardCategoriesViewDetails(){
        await this.cardCategoriesViewDetails.click({ force : true });
    }

    // Loader Cargar y Ocultar
    async hiddenAdminLoader(){
        await this.adminLoader.waitFor({ state: 'hidden' });
    }

    //Boton Agregar Categoria (Categories)
    async clickAddCategoryButton(){
        await this.addCategoryButton.click({ force : true });
    }

    //Formulario Agregar Categoria.
    async clickAndFillCategoryNameTextBox(nameCategory : string ){
        await this.categoryNameTextBox.click({ force : true })
        await this.categoryNameTextBox.fill(nameCategory)
    }

    async clickCategoryActiveCheckbox(){
        await this.categoryActiveCheckbox.click({ force : true });
    }

    //Precondicion ya Establecida -
    async preconditionClickAndFillCategoryNameTextBox(){
        await this.categoryNameTextBox.click({ force : true })
        await this.categoryNameTextBox.fill('Postre')
    }
    
    //Acciones con MULTIPLES elementos.

    async loginAndGoDashboardAdmin(){
        await this.clickinitialHomeLink();
        await this.clickNavbarLoginLink();
        await this.completeLogin(this.userAdminValid, this.passwordAdminValid);
        await this.clickLoginButton();
    };

    async loginAndGoCategoriesAdmin(){
        await this.clickinitialHomeLink();
        await this.clickNavbarLoginLink();
        await this.completeLogin(this.userAdminValid, this.passwordAdminValid);
        await this.clickLoginButton();
        await this.page.waitForLoadState('load');
        await this.hiddenAdminLoader();
        await this.clickTabMenuCategoriesLink();
    }

    async loginAndGoFormCategoryAdminTabMenuLink(){
        await this.clickinitialHomeLink();
        await this.clickNavbarLoginLink();
        await this.completeLogin(this.userAdminValid, this.passwordAdminValid);
        await this.clickLoginButton();
        await this.page.waitForLoadState('load');
        await this.hiddenAdminLoader();
        await this.clickTabMenuCategoriesLink();
        await this.page.waitForLoadState('load');
        await this.hiddenAdminLoader();
        await this.clickAddCategoryButton();
    }

    async loginAndGoFormCategoryAdminCardCategoriesIco(){
        await this.clickinitialHomeLink();
        await this.clickNavbarLoginLink();
        await this.completeLogin(this.userAdminValid, this.passwordAdminValid);
        await this.clickLoginButton();
        await this.page.waitForLoadState('load');
        await this.hiddenAdminLoader();
        await this.clickCardCategoriesIco();
        await this.page.waitForLoadState('load');
        await this.hiddenAdminLoader();
        await this.clickAddCategoryButton();
    }

    async loginAndGoFormCategoryAdminCardCategoriesViewDetails(){

        await this.clickinitialHomeLink();
        await this.clickNavbarLoginLink();
        await this.completeLogin(this.userAdminValid, this.passwordAdminValid);
        await this.clickLoginButton();
        await this.page.waitForLoadState('load');
        await this.hiddenAdminLoader();
        await this.clickCardCategoriesViewDetails();
        await this.page.waitForLoadState('load');
        await this.hiddenAdminLoader();
        await this.clickAddCategoryButton();
    }

    async loginAndGoFormCategoryAdminRandomRoute(){

        const routeAddCategory = [this.cardCategoriesViewDetails, this.tabMenuCategoriesLink, this.cardCategoriesIco]

        const randomIndex = Math.floor(Math.random() * routeAddCategory.length);
        const randomRouteAddCategory = routeAddCategory[randomIndex];

        await this.clickinitialHomeLink();
        await this.clickNavbarLoginLink();
        await this.completeLogin(this.userAdminValid, this.passwordAdminValid);
        await this.clickLoginButton();
        await this.page.waitForLoadState('load');
        await this.hiddenAdminLoader();
        await randomRouteAddCategory.click();
        await this.page.waitForLoadState('load');
        await this.hiddenAdminLoader();
        await this.clickAddCategoryButton();
    }
}
