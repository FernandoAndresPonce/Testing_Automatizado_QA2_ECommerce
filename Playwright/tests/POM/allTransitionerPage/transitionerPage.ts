import { type test, type expect, type Locator, Page } from '@playwright/test'

export class TransitionerPage {
    
    readonly page: Page;

    //Page https://desarrollowebecommerce.somee.com/User/
    readonly initialHomeLink: Locator;//

    //Page https://desarrollowebecommerce.somee.com/ => General
    readonly navbarLoginLink: Locator;//

    //http://desarrollowebecommerce.somee.com/User/Login.aspx
    readonly usernameLogin: Locator;//
    readonly passwordLogin: Locator;//
    readonly loginButton: Locator;//

    //http://desarrollowebecommerce.somee.com/Admin/ => General
    readonly tabMenuCategoriesLink: Locator;//
    readonly adminLoader: Locator;//

    //http://desarrollowebecommerce.somee.com/Admin/Category.aspx
    readonly categoryTitle: Locator;//
    readonly searchFilterCategorTextbox: Locator;//
    readonly addCategoryButton: Locator;//

    //http://desarrollowebecommerce.somee.com/Admin/Dashboard.aspx
    readonly cardCategoriesIco: Locator;//
    readonly cardCategoriesViewDetails: Locator;

    //http://desarrollowebecommerce.somee.com/Admin/CategoryForm.aspx

    readonly categoryAddTitle: Locator;//
    readonly categoryNameTitle: Locator;//
    readonly categoryNameTextBox: Locator;//
    readonly categoryImageInputFile: Locator;//
    readonly categoryImageImg: Locator;//
    readonly categoryActiveCheckbox: Locator;//
    readonly categoryActiveLabel: Locator;//
    readonly categoryInactiveLabel: Locator;//
    readonly categoryFormAddButton: Locator;//
    readonly categoryImageTitle: Locator;//
    readonly categoryOfferNoOfferCheckBox: Locator;//
    readonly categoryNoOfferLabel: Locator;//
    readonly categoryOfferLabel: Locator;//

    constructor(page: Page) {
        this.page = page;

        //Page https://desarrollowebecommerce.somee.com/User/
        this.initialHomeLink = page.locator("xpath=//div[contains(@class, 'popup-content')]//a");//

        //Page https://desarrollowebecommerce.somee.com/ => General
        this.navbarLoginLink = page.getByRole('link', { name: 'Login' });//

        //http://desarrollowebecommerce.somee.com/User/Login.aspx
        this.usernameLogin = page.getByRole('textbox', { name: 'Username' });//
        this.passwordLogin = page.getByRole('textbox', { name: 'Password' });//
        this.loginButton = page.getByRole('button', { name: 'Login' });//

        //http://desarrollowebecommerce.somee.com/Admin/ => General
        this.tabMenuCategoriesLink = page.getByRole('link', { name: ' Categories' });//
        this.adminLoader = page.locator('.contain');//

        //http://desarrollowebecommerce.somee.com/Admin/Category.aspx
        this.categoryTitle = page.getByRole('heading', { name: 'CATEGORIES' });//
        this.addCategoryButton = page.getByRole('button', { name: 'Add Category' });//
        this.searchFilterCategorTextbox = page.getByRole('textbox', { name: 'Category quick search...' });//

        //http://desarrollowebecommerce.somee.com/Admin/Dashboard.aspx
        this.cardCategoriesIco = page.locator('div.card-block-small i.icofont-muffin');//
        this.cardCategoriesViewDetails = page.locator("//div[@class='card-block-small']//i[@id='categoriesDetails']");//

        //http://desarrollowebecommerce.somee.com/Admin/CategoryForm.aspx
        this.categoryNameTitle = page.locator('xpath=//div[@class="mb-3"]//span[@class="form-label" and text()="Category Name"]');
        this.categoryNameTextBox = page.getByRole('textbox', { name: 'Category Name' });
        this.categoryImageInputFile = page.locator('#ContentPlaceHolder1_txtImage');
        this.categoryImageImg = page.locator('#ContentPlaceHolder1_imgForm');
        this.categoryActiveCheckbox = page.locator("xpath=//input[@id='ContentPlaceHolder1_cbActivo']");
        this.categoryActiveLabel = page.locator("//span[@id='ContentPlaceHolder1_lblActive']");
        this.categoryInactiveLabel = page.locator("xpath=//span[@id='ContentPlaceHolder1_lblInactive']");
        this.categoryFormAddButton = page.getByRole('button', { name: 'Add' });
        this.categoryImageTitle = page.getByText('Category Image');
        this.categoryAddTitle = page.getByText('Add Category');
        this.categoryOfferNoOfferCheckBox = page.locator("//input[@id='ContentPlaceHolder1_cbOffert']");
        this.categoryNoOfferLabel = page.locator("//span[@id='ContentPlaceHolder1_Label2']");
        this.categoryOfferLabel = page.locator("span#ContentPlaceHolder1_Label1");

    }

    // Acciones con elementos PUNTUALES.

    // <<<<<<< USER >>>>>>>>>>
    //Pagina Inicial de Carga.
    async clickinitialHomeLink() {
        await this.initialHomeLink.click({ force: true });//
    }

    //Menu de Barra Principal.
    async clickNavbarLoginLink() {
        await this.navbarLoginLink.click({ force: true });//
    }

    //Pagina Login.
    async completeLogin(user: string, password: string) {
        user && await this.usernameLogin.fill(user);//
        password && this.passwordLogin.fill(password);//
    }

    async clickLoginButton() {
        await this.loginButton.click({ force: true });//
    }

    // <<<<<<< ADMIN >>>>>>>>>>
    //Barra Lateral Pagina Administracion.
    async clickTabMenuCategoriesLink() {
        await this.tabMenuCategoriesLink.click({ force: true });//
    }

    //Cartas Centrales Seccion Dashboard

    async clickCardCategoriesIco() {
        await this.cardCategoriesIco.click({ force: true })//
    }

    async clickCardCategoriesViewDetails() {
        await this.cardCategoriesViewDetails.click({ force: true });//
    }

    // Loader Cargar y Ocultar
    async hiddenAdminLoader() {
        await this.adminLoader.waitFor({ state: 'hidden' });//
    }

    //Boton Agregar Categoria (Categories)
    async clickAddCategoryButton() {
        await this.addCategoryButton.click({ force: true });//
    }

    //Formulario Agregar Categoria.
    async clickAndFillCategoryNameTextBox(nameCategory: string) {
        await this.categoryNameTextBox.click({ force: true })
        await this.categoryNameTextBox.fill(nameCategory)
    }

    async clickCategoryActiveCheckbox() {
        await this.categoryActiveCheckbox.click({ force: true });
    }

    async clickCategoryOfferNoOfferCheckBox() {
        await this.categoryOfferNoOfferCheckBox.click({ force: true });
    }

    //Precondicion ya Establecida -
    async preconditionClickAndFillCategoryNameTextBox() {
        await this.categoryNameTextBox.click({ force: true })
        await this.categoryNameTextBox.fill('Postre')
    }

    //Acciones con MULTIPLES elementos.

    async loginAndGoDashboardAdmin() {
        await this.clickinitialHomeLink();
        await this.clickNavbarLoginLink();
        await this.completeLogin(`${process.env.ADMINUSERNAME}`, `${process.env.ADMINPASSWORD}`);
        await this.clickLoginButton();
    };

    async loginAndGoCategoriesAdmin() {
        await this.clickinitialHomeLink();
        await this.clickNavbarLoginLink();
        await this.completeLogin(`${process.env.ADMINUSERNAME}`, `${process.env.ADMINPASSWORD}`);
        await this.clickLoginButton();
        await this.page.waitForLoadState('load');
        await this.hiddenAdminLoader();
        await this.clickTabMenuCategoriesLink();
    }

    async loginAndGoFormCategoryAdminTabMenuLink() {
        await this.clickinitialHomeLink();
        await this.clickNavbarLoginLink();
        await this.completeLogin(`${process.env.ADMINUSERNAME}`, `${process.env.ADMINPASSWORD}`);
        await this.clickLoginButton();
        await this.page.waitForLoadState('load');
        await this.hiddenAdminLoader();
        await this.clickTabMenuCategoriesLink();
        await this.page.waitForLoadState('load');
        await this.hiddenAdminLoader();
        await this.clickAddCategoryButton();
    }

    async loginAndGoFormCategoryAdminCardCategoriesIco() {
        await this.clickinitialHomeLink();
        await this.clickNavbarLoginLink();
        await this.completeLogin(`${process.env.ADMINUSERNAME}`, `${process.env.ADMINPASSWORD}`);
        await this.clickLoginButton();
        await this.page.waitForLoadState('load');
        await this.hiddenAdminLoader();
        await this.clickCardCategoriesIco();
        await this.page.waitForLoadState('load');
        await this.hiddenAdminLoader();
        await this.clickAddCategoryButton();
    }

    async loginAndGoFormCategoryAdminCardCategoriesViewDetails() {

        await this.clickinitialHomeLink();
        await this.clickNavbarLoginLink();
        await this.completeLogin(`${process.env.ADMINUSERNAME}`, `${process.env.ADMINPASSWORD}`);
        await this.clickLoginButton();
        await this.page.waitForLoadState('load');
        await this.hiddenAdminLoader();
        await this.clickCardCategoriesViewDetails();
        await this.page.waitForLoadState('load');
        await this.hiddenAdminLoader();
        await this.clickAddCategoryButton();
    }

    async loginAndGoFormCategoryAdminRandomRoute() {

        const routeAddCategory = [this.cardCategoriesViewDetails, this.tabMenuCategoriesLink, this.cardCategoriesIco]

        const randomIndex = Math.floor(Math.random() * routeAddCategory.length);
        const randomRouteAddCategory = routeAddCategory[randomIndex];

        await this.clickinitialHomeLink();
        await this.clickNavbarLoginLink();
        await this.completeLogin(`${process.env.ADMINUSERNAME}`, `${process.env.ADMINPASSWORD}`);
        await this.clickLoginButton();
        await this.page.waitForLoadState('load');
        await this.hiddenAdminLoader();
        await randomRouteAddCategory.click();
        await this.page.waitForLoadState('load');
        await this.hiddenAdminLoader();
        await this.clickAddCategoryButton();
    }
}
