
import { Locator, Page } from "playwright";

export class AdminPage{

    readonly page : Page;

    readonly $tabMenuCategoriesLink: Locator;
    readonly $loader: Locator;

    constructor(page : Page){

        this.page = page;

        this.$tabMenuCategoriesLink = page.getByRole('link', { name: ' Categories' });
        this.$loader = page.locator('.contain');
    }

    async clickTabMenuCategoriesLink() {
        await this.$tabMenuCategoriesLink.click({ force: true });
    }

    async hiddenLoader() {
        await this.$loader.waitFor({ state: 'hidden' });
    }

}