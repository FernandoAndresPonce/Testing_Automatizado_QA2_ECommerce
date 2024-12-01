
import { Locator, Page } from "playwright";

export class DashboardPage{

    public endpoint: string = "/Admin/Dashboard.aspx";

    readonly page : Page;

    readonly $cardCategoriesIco: Locator;
    readonly $cardCategoriesViewDetails: Locator;

    constructor(page : Page){

        this.page = page;

        this.$cardCategoriesIco = page.locator('div.card-block-small i.icofont-muffin');
        this.$cardCategoriesViewDetails = page.locator("//div[@class='card-block-small']//i[@id='categoriesDetails']"); 
    }


    //Endpoint
    async _goToEndpoint() {
        await this.page.goto(this.endpoint);
    }


    //Funcionalidades
    async _clickCardCategoriesIco() {
        await this.$cardCategoriesIco.click({ force: true })
    }

    async _clickCardCategoriesViewDetails() {
        await this.$cardCategoriesViewDetails.click({ force: true });
    }
}