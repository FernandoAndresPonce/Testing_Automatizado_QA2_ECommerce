import { Locator, Page } from "playwright";

export class CategoryDetail{

    public endpoint : string = "/Admin/CategoryDetail.aspx";

    readonly page : Page;
    readonly $viewCategoryTitle : Locator;
    readonly $categoryLabel : Locator;
    readonly $idCategoryLabel : Locator;
    readonly $activeLabel : Locator;
    readonly $inactiveLabel : Locator;
    readonly $offerLabel : Locator;
    readonly $noOfferLabel : Locator;

    constructor ( page : Page) {
        this.page = page;
        this.$viewCategoryTitle = page.getByText("View Category");
        this.$categoryLabel = page.locator("//div[@class='card']//span[text()='Category: ']");
        this.$idCategoryLabel = page.locator("//div[@class='card']//span[@id='ContentPlaceHolder1_lblIdCategory']");
        this.$activeLabel = page.locator("div.card span#ContentPlaceHolder1_lblActive");
        this.$inactiveLabel = page.locator("div.card span#ContentPlaceHolder1_lblInactive");
        this.$offerLabel = page.locator("div.card span#ContentPlaceHolder1_lblOffer");
        this.$noOfferLabel = page.locator("div.card span#ContentPlaceHolder1_lblNoOffert");

    };

    async _goToEndpointId ( id : string) {
        await this.page.goto(`${this.endpoint}?Id=${id}`)
    }

};