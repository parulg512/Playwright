
import {test} from '../../fixtures/myfixture.fixture';

//Use Absolute Paths (Optional but Clean)
// I have configured TypeScript or Node.js to use absolute paths, which avoids this problem altogether.

// Step 1: In tsconfig.json, add:
// json
// Copy
// Edit
// {
//   "compilerOptions": {
//     "baseUrl": ".", 
//     "paths": {
//       "@pages/*": ["page-objects/*"]
//     }
//   }
// }
// Step 2: Use imports like:
// ts
// Copy
// Edit
// import { NavigationPage } fr(om '@pages/navigation-page'

test.beforeEach(async({page}) =>
{
  await page.goto("http://localhost:4200/pages/iot-dashboard")
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
test('Naivagation to form page',async({page, navigationPage})=>
{
  await navigationPage.formLayoutPage();
  await navigationPage.datePickerPage();
  await navigationPage.Smarttable();

})

test('filling the form', async({formLayoutPage,navigationPage}) =>
{
     
      await navigationPage.formLayoutPage();
      await formLayoutPage.submitUsingtheGridform("testuser@test.com", "secret123", "Option 1")
      await formLayoutPage.submitInLine("firstname lastname","firstname_lastname@test.com", true)    
    // await navigateTo.datePickerPage();
    // await navigateTo.Smarttable();
  
}) 