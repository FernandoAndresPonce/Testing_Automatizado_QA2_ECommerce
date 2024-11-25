import { Locator, Page } from "playwright/test";

export class LoginPage{
    
    readonly page : Page;

    readonly $usernameLoginInput: Locator;
    readonly $passwordLoginInput: Locator;
    readonly $loginButton: Locator;

    constructor(page : Page){

        this.page = page;

        this.$usernameLoginInput = page.getByRole('textbox', { name: 'Username' });
        this.$passwordLoginInput = page.getByRole('textbox', { name: 'Password' });
        this.$loginButton = page.getByRole('button', { name: 'Login' });
    }

    async completeLogin(user: string, password: string) {
        user && await this.$usernameLoginInput.fill(user);
        password && this.$passwordLoginInput.fill(password);
    }

    async clickLoginButton() {
        await this.$loginButton.click({ force: true });
    }
} 