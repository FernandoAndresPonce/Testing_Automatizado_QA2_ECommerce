import { Locator, Page } from "playwright";

export class EditCategory {
    
    readonly page : Page;
    
    readonly $editCategoryTitle : Locator;

    constructor ( page : Page ) {

        this.page = page;

        this.$editCategoryTitle = page.locator("//div[@class='card']//span[@id='ContentPlaceHolder1_lblCategoryTitle']")

    };
};