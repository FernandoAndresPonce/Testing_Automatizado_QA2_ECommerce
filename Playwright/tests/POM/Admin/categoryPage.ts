
import { Locator, Page } from "playwright";

export class CategoryPage{

    readonly page : Page;

    readonly $categoryTitle: Locator;
    readonly $searchFilterTextbox: Locator;
    readonly $addButton: Locator;

    constructor(page : Page){

        this.page = page;

        this.$categoryTitle = page.getByRole('heading', { name: 'CATEGORIES' });
        this.$addButton = page.getByRole('button', { name: 'Add Category' });
        this.$searchFilterTextbox = page.getByRole('textbox', { name: 'Category quick search...' });
    }

    async clickAddButton() {
        await this.$addButton.click({ force: true });
    }
}