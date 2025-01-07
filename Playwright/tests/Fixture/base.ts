
import {test as base} from "@playwright/test"

//admin
import { AdminPage } from "../POM/admin/adminPage"
import { CategoryPage } from "../POM/admin/categoryPage"
import { CategoryFormPage } from "../POM/admin/categoryFormPage"
import { DashboardPage } from "../POM/admin/dashboardPage"
import { CategoryDetail } from "../POM/admin/categoryDetail"

//user
import { HeaderPage } from "../POM/user/headerPage"
import { InitialPage } from "../POM/user/initialPage"
import { LoginPage } from "../POM/user/loginPage"
import { DefaultPage } from "../POM/user/defaultPage"


//allPage
import { SuperPage } from "../POM/superPage/superPage"



type MyFixtures = {

    //admin
    adminPage : AdminPage,
    categoryPage : CategoryPage,
    categoryFormPage : CategoryFormPage,
    dashboardPage : DashboardPage,
    categoryDetail : CategoryDetail,
    
    //user
    headerPage : HeaderPage,
    initialPage : InitialPage,
    defaultPage : DefaultPage,
    loginPage : LoginPage,

    //allPage
    superPage : SuperPage,

}

export const test = base.extend<MyFixtures>({

    //admin
    adminPage : async ({page}, use ) => {
        await use(new AdminPage(page))
    },
    categoryPage : async ({page}, use ) => {
        await use (new CategoryPage(page))
    },

    categoryFormPage : async ({page}, use ) => {
        await use (new CategoryFormPage(page))
    },

    dashboardPage : async ({page}, use ) => {
        await use (new DashboardPage(page))
    },

    categoryDetail : async ({page}, use) => {
        await use (new CategoryDetail(page))
    },
    //user
    headerPage : async ({page}, use ) => {
        await use (new HeaderPage(page))
    },

    initialPage : async ({page}, use ) => {
        await use (new InitialPage(page))
    },

    defaultPage : async ({page}, use ) => {
        await use (new DefaultPage(page))
    },

    loginPage : async ({page}, use ) => {
        await use (new LoginPage(page))
    },

    //allPage
    superPage : async ({page}, use ) => {
        await use (new SuperPage(page))
    },

})

export { expect } from "@playwright/test"