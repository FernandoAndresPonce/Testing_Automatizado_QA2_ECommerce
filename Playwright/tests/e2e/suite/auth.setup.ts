import { Browser, chromium, Page } from "playwright";
import { TransitionerPage } from "../../POM/allTransitionerPage/transitionerPage";

import { test as setup, expect } from '@playwright/test';

const authFile = "playwright/.auth/loginAuth.json";

setup("authenticate", async ({ page }) => {
    await page.goto('http://desarrollowebecommerce.somee.com/');
    await page.locator("xpath=//div[contains(@class, 'popup-content')]//a").click({ force: true });
    await page.getByRole('link', { name: 'Login' }).click({ force: true });
    await page.getByRole('textbox', { name: 'Username' }).fill("Admin");
    await page.getByRole('textbox', { name: 'Password' }).fill("1234");
    page.getByRole('button', { name: 'Login' }).click({ force: true });

    await page.waitForURL('/Admin/Dashboard.aspx');
    await expect(page).toHaveURL('/Admin/Dashboard.aspx');
    await expect(page).toHaveTitle('FastFood - Admin');

    await page.context().storageState({ path: authFile })

});