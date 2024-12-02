import { type expect, type Locator, Page } from '@playwright/test'

//User Class =>
import { InitialPage } from '../user/initialPage';
import { HeaderPage } from '../user/headerPage';
import { LoginPage } from '../user/loginPage';

//Admin Class =>
import { AdminPage } from '../admin/adminPage';
import { CategoryFormPage } from '../admin/categoryFormPage';
import { CategoryPage } from '../admin/categoryPage';
import { DashboardPage } from '../admin/dashboardPage';


export class TransitionerPage {

    readonly page: Page;

    //User Pages =>
    readonly initialPage : InitialPage;
    readonly headerPage : HeaderPage;
    readonly loginPage : LoginPage;

    //Admin Pages =>
    readonly adminPage : AdminPage;
    readonly categoryFormPage : CategoryFormPage;
    readonly categoryPage : CategoryPage;
    readonly dashboardPage : DashboardPage;


    constructor(page: Page) {
        this.page = page;

        //User =>
        this.initialPage = new InitialPage(page);
        this.headerPage = new HeaderPage(page);
        this.loginPage = new LoginPage(page);

        //Admin =>
        this.adminPage = new AdminPage(page);
        this.categoryFormPage = new CategoryFormPage(page);
        this.categoryPage = new CategoryPage(page);
        this.dashboardPage = new DashboardPage(page);

    }


    //Precondicion ya Establecida - /CORREGIR LA VARIABLE DINAMICA
    async preconditionClickAndFillCategoryNameTextBox() {
        await this.categoryFormPage._clickAndFillCategoryNameTextBox('Postre');
    }

    //Acciones con MULTIPLES elementos.

    async loginAndGoDashboardAdmin() {

        await this.initialPage._clickinitialHomeLink();
        await this.headerPage._clickLoginLink();
        await this.loginPage._adminLoginSuccess();
        await this.loginPage._clickLoginButton();
    };

    async loginAndGoCategoriesAdmin() {

        await this.loginAndGoDashboardAdmin();
        await this.page.waitForLoadState('load');
        await this.adminPage._hiddenLoader();
        await this.adminPage._clickTabMenuCategoriesLink();
    }

    async loginAndGoFormCategoryAdminTabMenuLink() {

        await this.loginAndGoCategoriesAdmin();
        await this.page.waitForLoadState('load');
        await this.adminPage._hiddenLoader();
        await this.categoryPage._clickAddButton();
    }

    async loginAndGoFormCategoryAdminCardCategoriesIco() {
        await this.loginAndGoDashboardAdmin();
        await this.page.waitForLoadState('load');
        await this.adminPage._hiddenLoader();
        await this.dashboardPage._clickCardCategoriesIco();
        await this.page.waitForLoadState('load');
        await this.adminPage._hiddenLoader();
        await this.categoryPage._clickAddButton();
    }

    async loginAndGoFormCategoryAdminCardCategoriesViewDetails() {

        await this.loginAndGoDashboardAdmin();
        await this.page.waitForLoadState('load');
        await this.adminPage._hiddenLoader();
        await this.dashboardPage._clickCardCategoriesViewDetails();
        await this.page.waitForLoadState('load');
        await this.adminPage._hiddenLoader();
        await this.categoryPage._clickAddButton();
    }

    async loginAndGoFormCategoryAdminRandomRoute() {

        const routeAddCategory = [this.dashboardPage.$cardCategoriesViewDetails, this.adminPage.$tabMenuCategoriesLink, this.dashboardPage.$cardCategoriesIco]

        const randomIndex = Math.floor(Math.random() * routeAddCategory.length);
        const randomRouteAddCategory = routeAddCategory[randomIndex];

        await this.loginAndGoDashboardAdmin();
        await this.page.waitForLoadState('load');
        await this.adminPage._hiddenLoader();
        await randomRouteAddCategory.click();
        await this.page.waitForLoadState('load');
        await this.adminPage._hiddenLoader();
        await this.categoryPage._clickAddButton();
    }
}
