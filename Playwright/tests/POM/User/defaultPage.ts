
import { Locator, Page } from "playwright";

export class DefaultPage{

    public endpoint : string = "/User/Default.aspx";

    readonly page : Page;

    constructor(page : Page){

        this.page = page;
    }

    //endpoint
    async _goToEndpoint() {
        await this.page.goto(this.endpoint);
    }
}