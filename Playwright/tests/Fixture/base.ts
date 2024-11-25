
import {test as base} from "@playwright/test"

//admin
import { AdminPage } from "../POM/Admin/adminPage"
import { CategoryPage } from "../POM/Admin/categoryPage"
import { CategoryFormPage } from "../POM/Admin/categoryFormPage"
import { DashboardPage } from "../POM/Admin/dashboardPage"

//user
import { HeaderPage } from "../POM/User/headerPage"
import { InitialPage } from "../POM/User/initialPage"
import { LoginPage } from "../POM/User/loginPage"
import { DefaultPage } from "../POM/User/defaultPage"


//allPage
import { FastFoodPage } from "../POM/AllPage/fastFoodPage"



type MyFixtures = {

    //admin
    adminPage : AdminPage,
    categoryPage : CategoryPage,
    categoryFormPage : CategoryFormPage,
    dashboardPage : DashboardPage,
    
    //user
    headerPage : HeaderPage,
    initialPage : InitialPage,
    defaultPage : DefaultPage,
    loginPage : LoginPage,

    //allPage
    fastFoodPage : FastFoodPage,

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
    fastFoodPage : async ({page}, use ) => {
        await use (new FastFoodPage(page))
    },

})

export { expect } from "@playwright/test"