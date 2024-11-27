
import {test as base} from "@playwright/test"

//admin
import { AdminPage } from "../POM/admin/adminPage"
import { CategoryPage } from "../POM/admin/categoryPage"
import { CategoryFormPage } from "../POM/admin/categoryFormPage"
import { DashboardPage } from "../POM/admin/dashboardPage"

//user
import { HeaderPage } from "../POM/user/headerPage"
import { InitialPage } from "../POM/user/initialPage"
import { LoginPage } from "../POM/user/loginPage"
import { DefaultPage } from "../POM/user/defaultPage"


//allPage
import { TransitionerPage } from "../POM/allTransitionerPage/transitionerPage"



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
    transitionerPage : TransitionerPage,

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
    transitionerPage : async ({page}, use ) => {
        await use (new TransitionerPage(page))
    },

})

export { expect } from "@playwright/test"