
import { Locator, Page } from "playwright";

export class CategoryPage{

    public endpoint: string = "/Admin/Category.aspx";

    readonly page : Page;

    readonly $categoryTitle: Locator;
    readonly $searchFilterTextbox: Locator;
    readonly $addButton: Locator;
    readonly $table: Locator;

    constructor(page : Page){

        this.page = page;

        this.$categoryTitle = page.getByRole('heading', { name: 'CATEGORIES' });
        this.$addButton = page.getByRole('button', { name: 'Add Category' });
        this.$searchFilterTextbox = page.getByRole('textbox', { name: 'Category quick search...' });
        this.$table = page.locator("//div[@class='main-body']//table[@id='ContentPlaceHolder1_dgvCategory']");
    }

    async _goToEndpoint() {
        await this.page.goto(this.endpoint);
    }

    async _clickAddButton() {
        await this.$addButton.click({ force: true });
    }
}