import { Locator, Page } from "playwright";

export class HeaderPage{
    readonly page : Page;
    readonly $loginLink: Locator;

    constructor(page : Page){
        this.page = page;

        this.$loginLink = page.getByRole('link', { name: 'Login' });
    }

    async _clickLoginLink() {
        await this.$loginLink.click({ force: true });
    }
}