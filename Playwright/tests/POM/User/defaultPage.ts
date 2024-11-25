
import { Locator, Page } from "playwright";

export class DefaultPage{

    public defaultUrl: string = "http://desarrollowebecommerce.somee.com/User/Default.aspx";

    readonly page : Page;

    constructor(page : Page){

        this.page = page;
    }

    //endpoint
    async goDefaultUrl() {
        await this.page.goto(this.defaultUrl);
    }
}