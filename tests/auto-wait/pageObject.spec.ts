import {test} from 'playwright/test';
import { NavigationPage } from 'pages/navigation.page';
import { formLayoutPage } from 'pages/formLayouts.page'

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


test('filling the form', async({page}) =>
{
      const navigateTo= new NavigationPage(page);
      const onFormLayouts =new formLayoutPage(page);
      await navigateTo.formLayoutPage();
      await onFormLayouts.submitUsingtheGridform("testuser@test.com", "secret123","Option 1")
      await onFormLayouts.submitInLine("firstname lastname","firstname_lastname@test.com", true)    
    // await navigateTo.datePickerPage();
    // await navigateTo.Smarttable();
  
}) 