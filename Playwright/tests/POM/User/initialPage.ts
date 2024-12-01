import { Locator, Page } from "playwright";

export class InitialPage{

    readonly page: Page;

    readonly $homeLink: Locator;

    constructor(page : Page){
        this.page = page;

        this.$homeLink = page.locator("xpath=//div[contains(@class, 'popup-content')]//a");

    }

    async _clickinitialHomeLink() {
        await this.$homeLink.click({ force: true });
    }
}