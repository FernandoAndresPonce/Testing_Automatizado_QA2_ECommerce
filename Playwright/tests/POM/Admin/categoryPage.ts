
import { Locator, Page } from "playwright";

export class CategoryPage {

    public endpoint: string = "/Admin/Category.aspx";

    readonly page: Page;

    readonly $categoryTitle: Locator;
    readonly $searchFilterTextbox: Locator;
    readonly $addButton: Locator;
    readonly $table: Locator;
    readonly $tableRows: Locator;
    readonly $tableCells: Locator;

    constructor(page: Page) {

        this.page = page;

        this.$categoryTitle = page.getByRole('heading', { name: 'CATEGORIES' });
        this.$addButton = page.getByRole('button', { name: 'Add Category' });
        this.$searchFilterTextbox = page.getByRole('textbox', { name: 'Category quick search...' });
        this.$table = page.locator("//div[@class='main-body']//table[@id='ContentPlaceHolder1_dgvCategory']");
        this.$tableRows = page.locator("//div[@class='main-body']//table[@id='ContentPlaceHolder1_dgvCategory']//tr");
        this.$tableCells = page.locator("//div[@class='main-body']//table[@id='ContentPlaceHolder1_dgvCategory']//tr//td");
    }

    async _goToEndpoint() {
        await this.page.goto(this.endpoint);
    }

    async _clickAddButton() {
        await this.$addButton.click({ force: true });
    }

    async _clickEyeRowButton (row : number ) {
        await this.$tableRows.nth(row).locator("input[alt='Select']").click({ force : true });
    }

    $eyeRowButton( row: number) : Locator {
        return this.$tableRows.nth(row).locator("input[alt='Select']");
    }
}