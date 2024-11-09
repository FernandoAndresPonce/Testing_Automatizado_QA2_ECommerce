import { type test, type expect, type Locator, Page } from '@playwright/test'

export class fastFoodPage {
    readonly page: Page;
    readonly initialHomeLink: Locator;
    readonly navbarLoginLink: Locator;
    readonly usernameLogin: Locator;
    readonly passwordLogin: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.initialHomeLink = page.locator("xpath=//div[contains(@class, 'popup-content')]//a");
        this.navbarLoginLink = page.getByRole('link', { name: 'Login' });
        this.usernameLogin = page.getByRole('textbox', { name: 'Username' });
        this.passwordLogin = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });


    }

    async clickinitialHomeLink() {
        await this.initialHomeLink.click({ force: true });
    }

    async clickNavbarLoginLink() {
        await this.navbarLoginLink.click({ force: true });
    }

    async completeLogin(user: string, password: string) {
        await this.usernameLogin.fill(`${user}`);
        await this.passwordLogin.fill(`${password}`);
    }

    async clickLoginButton() {
        await this.loginButton.click({ force: true });
    }

    async goDashboardAdmin(){
        await this.clickinitialHomeLink();
        await this.clickNavbarLoginLink();
        await this.completeLogin('Admin', '1234');
        await this.clickLoginButton();
    }



}
