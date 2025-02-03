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
    readonly $returnButton : Locator;
    readonly $editButton : Locator;

    constructor ( page : Page) {
        this.page = page;
        this.$viewCategoryTitle = page.getByText("View Category");
        this.$categoryLabel = page.locator("//div[@class='card']//span[text()='Category: ']");
        this.$idCategoryLabel = page.locator("//div[@class='card']//span[@id='ContentPlaceHolder1_lblIdCategory']");
        this.$activeLabel = page.locator("div.card span#ContentPlaceHolder1_lblActive");
        this.$inactiveLabel = page.locator("div.card span#ContentPlaceHolder1_lblInactive");
        this.$offerLabel = page.locator("div.card span#ContentPlaceHolder1_lblOffer");
        this.$noOfferLabel = page.locator("div.card span#ContentPlaceHolder1_lblNoOffert");
        this.$returnButton = page.getByRole("button", {name : "Return"});
        this.$editButton = page.getByRole("button", {name : "Edit"});


    };

    async _goToEndpointId ( id : string) {
        await this.page.goto(`${this.endpoint}?Id=${id}`)
    };

    async _clickReturnButton() {
        await this.$returnButton.click({ force  : true });
    };

    async _clickEditButton () {
        await this.$editButton.click({ force : true });
    };

};