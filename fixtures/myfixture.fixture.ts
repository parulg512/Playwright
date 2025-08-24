 
import { NavigationPage } from "@pages/navigation.page";
// Update the path below to the correct relative path if necessary, e.g.:
import { FormLayoutPage } from "@pages/formLayouts.page";
import { test as baseTest } from "@playwright/test";



//declare the type of your fixture

type MyFixture = 
{
navigationPage: NavigationPage;
formLayoutPage: FormLayoutPage;
};

export const test = baseTest.extend<MyFixture>({ 
    
    navigationPage: async ({page}, use) =>
    {

  const navigationPage = new NavigationPage(page);

 await use(navigationPage)
    },
    formLayoutPage: async ({page}, use) =>
    {
        const formLayoutPage = new FormLayoutPage(page);
        await use(formLayoutPage);
    }
});



