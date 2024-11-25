
import { Locator, Page } from "playwright";

export class CategoryFormPage{

    readonly page : Page;

    readonly $categoryAddTitle: Locator;
    readonly $categoryNameTitle: Locator;
    readonly $categoryNameTextBox: Locator;
    readonly $categoryImageInputFile: Locator;
    readonly $categoryImageImg: Locator;
    readonly $activeCheckbox: Locator;
    readonly $activeLabel: Locator;
    readonly $inactiveLabel: Locator;
    readonly $addButton: Locator;
    readonly $categoryImageTitle: Locator;
    readonly $offerNoOfferCheckBox: Locator;
    readonly $noOfferLabel: Locator;
    readonly $offerLabel: Locator;

    constructor(page : Page){

        this.page = page;

        this.$categoryNameTitle = page.locator('xpath=//div[@class="mb-3"]//span[@class="form-label" and text()="Category Name"]');
        this.$categoryNameTextBox = page.getByRole('textbox', { name: 'Category Name' });
        this.$categoryImageInputFile = page.locator('#ContentPlaceHolder1_txtImage');
        this.$categoryImageImg = page.locator('#ContentPlaceHolder1_imgForm');
        this.$activeCheckbox = page.locator("xpath=//input[@id='ContentPlaceHolder1_cbActivo']");
        this.$activeLabel = page.locator("//span[@id='ContentPlaceHolder1_lblActive']");
        this.$inactiveLabel = page.locator("xpath=//span[@id='ContentPlaceHolder1_lblInactive']");
        this.$addButton = page.getByRole('button', { name: 'Add' });
        this.$categoryImageTitle = page.getByText('Category Image');
        this.$categoryAddTitle = page.getByText('Add Category');
        this.$offerNoOfferCheckBox = page.locator("//input[@id='ContentPlaceHolder1_cbOffert']");
        this.$noOfferLabel = page.locator("//span[@id='ContentPlaceHolder1_Label2']");
        this.$offerLabel = page.locator("span#ContentPlaceHolder1_Label1");
    }


    async clickAndFillCategoryNameTextBox(nameCategory: string) {
        await this.$categoryNameTextBox.click({ force: true })
        await this.$categoryNameTextBox.fill(nameCategory)
    }

    async clickActiveCheckbox() {
        await this.$activeCheckbox.click({ force: true });
    }

    async clickOfferNoOfferCheckBox() {
        await this.$offerNoOfferCheckBox.click({ force: true });
    }

    //Precondicion ya Establecida -
    async preconditionClickAndFillCategoryNameTextBox() {
        await this.$categoryNameTextBox.click({ force: true })
        await this.$categoryNameTextBox.fill('Postre')
    }
}