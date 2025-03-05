import { Locator, Page } from "playwright";

export class EditCategory {
    
    public endpoint : string = "/Admin/CategoryForm.aspx";

    readonly page : Page;
    
    readonly $editCategoryTitle : Locator;
    readonly $categoryIdInput : Locator;
    readonly $categoryNameLabel : Locator;
    readonly $categoryNameInput : Locator;
    readonly $activeInactiveCheckBox : Locator;
    readonly $activeLabel : Locator;
    readonly $inactiveLabel : Locator;
    readonly $offerNoOfferCheckBox : Locator;
    readonly $offerLabel : Locator;
    readonly $offerPercentageLabel : Locator;
    readonly $offerPercentageInput : Locator;
    readonly $noOfferLabel : Locator;


    constructor ( page : Page ) {

        this.page = page;

        this.$editCategoryTitle = page.locator("//div[@class='card']//span[@id='ContentPlaceHolder1_lblCategoryTitle']"),
        this.$categoryIdInput = page.locator("xpath=//div[@class='card']//input[@id='ContentPlaceHolder1_txtCategoryId']"),
        this.$categoryNameLabel = page.locator("xpath=//div[@class='card']//span[@class='form-label' and text()='Category Name']"),
        this.$categoryNameInput = page.getByRole('textbox', { name: 'Category Name' }),
        this.$activeInactiveCheckBox = page.locator("xpath=//div[@class='card']//input[@id='ContentPlaceHolder1_cbActivo']"),
        this.$activeLabel = page.locator("xpath=//div[@class='card']//span[@id='ContentPlaceHolder1_lblActive' and text()='Active']"),
        this.$inactiveLabel = page.locator("xpath=//div[@class='card']//span[@id='ContentPlaceHolder1_lblInactive' and text()='Inactive']"),
        this.$offerNoOfferCheckBox = page.locator("xpath=//div[@class='card']//input[@id='ContentPlaceHolder1_cbOffert']"),
        this.$offerLabel = page.locator("xpath=//div[@class='card']//span[@id='ContentPlaceHolder1_Label1']"),
        this.$offerPercentageLabel = page.locator("xpath=//div[@class='card']//span[@class='form-label' and text()='Offer Percentage']"),
        this.$offerPercentageInput = page.locator("xpath=//div[@class='card']//input[@id='ContentPlaceHolder1_txtofferPercentage']"),
        this.$noOfferLabel = page.locator("//div[@class='card']//span[@id='ContentPlaceHolder1_Label2']")

    };
};