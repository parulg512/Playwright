import{expect,test} from 'playwright/test';


test.beforeEach ( async ({page}) => {
await page.goto("http://localhost:4200/pages/iot-dashboard");

})

test.describe('form layout page',() =>
{
    test.beforeEach (async () =>{

    // await page.getByText("Forms").click();
    // await page.getByText("Form Layouts").click();
    })

test ("Different Input Fields",async ({page})=>
{

 const usingGridEmailInput = page.locator('nb-card').filter({hasText:"Using the Grid"}).getByRole('textbox',{name:'Email'});
 
 
 await usingGridEmailInput.fill("user01@google.com");
 await usingGridEmailInput.clear();
 await usingGridEmailInput.pressSequentially("test-user@google.com",{delay:1000});
//assertions
 await expect(usingGridEmailInput).toHaveValue('test-user@google.com');
})

test("handle radio buttons", async ({page})=>
{
 const usingGridForm = page.locator('nb-card').filter({hasText:'Using the Grid'});

 await usingGridForm.getByRole('radio',{name:'Option 1'}).check({force:true});

//generic way
//  const checkradiotatus = await usingGridForm.getByRole('radio',{name:'Option 1'}).isChecked();
//  expect(checkradiotatus).toBeTruthy();
//locator based-recommended way
 await expect(usingGridForm.getByRole('radio',{name:'Option 1'})).toBeChecked();
}
)  
test("handle the checkbox", async ({page}) =>{
await page.getByText("Modal & Overlays").click();
await page.getByText("Toastr").click();

await page.getByRole('checkbox', {name:"Hide on click"}).uncheck({force:true});
await page.getByRole('checkbox', {name:"Prevent arising of duplicate toast"}).check({force:true});

const allCheckBoxes = page.getByRole('checkbox')
for(const box of await allCheckBoxes.all())
    {
    await box.uncheck({force:true})
    await expect(box).not.toBeChecked();
    }
})

test('handle drop down and list',async({page}) => {
const dropDown = page.locator('ngx-header nb-select')
await dropDown.click();

// page.locator('list')
// page.locator('list').locator('nb-option')

const optionList = page.locator('nb-option-list nb-option')
await expect(optionList).toHaveText(['Light','Dark','Cosmic','Corporate'])
await optionList.filter({hasText:'Cosmic'}).click();
})
test('handle tooltip', async ({page})=>
{
await page.getByText("Modal & Overlays").click();
await page.getByText("Tooltip").click();

const toolTip = page.locator('nb-card').filter({hasText:'Tooltip Placements'})
await toolTip.getByRole('button',{name:'Top'}).hover();

const toolTipText = page.locator('text=This is a tooltip ');
await expect(toolTipText).toBeVisible();
await expect(toolTipText).toHaveText('This is a tooltip');
//nbtooltip="This is a tooltip" finds the value of attribute name
})
test('Dialog Box Test',async ({page})=>
{
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();
//before clicking the trash icon we need to handle the dialog box
//<table> use role as table
//by default palywright clicks on cancelor dismiss
//page.on('dialog', dialog => dialog.accept());
                    //or
//We can also do assertation with dialog box

page.on('dialog', async dialog => {
    expect(dialog.message()).toEqual('Are you sure you want to delete?')
    await dialog.accept(); //dialog.dismiss();
}
);
   await page.getByRole('table').locator('tr', { hasText:'mdo@gmail.com'}).locator('.nb-trash')
   .click();
})

test('handling web tables/smart tables', async({page})=>
{
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    const row = page.getByRole('row',{name:'fat@yandex.ru'})
    await row.locator('.nb-edit').click();

   //my assignment approach const ageInput = row.locator('input[placeholder="Age"]');
   // await ageInput.fill('20');
   //await row.locator('.nb-checkmark').click();
    // await expect(row).toContainText('20');

    await page.locator('input-editor').getByPlaceholder('Age').clear(); 
    await page.locator('input-editor').getByPlaceholder('Age').fill('31');

    //testing whether filter on the web page is working
    const ages=["20","40","100"]

    for(const age of ages)
    {
        await page.locator('input-filter').getByPlaceholder('Age').clear();
        await page.locator('input-filter').getByPlaceholder('Age').fill(age);

        await page.waitForTimeout(1000); //not recommend

        const ageRows = page.locator('tbody tr')//5 row{}

        for(const row of await ageRows.all())
        {
                const cellValue = await row.locator('td').last().textContent(); //age=20 for first
                if(age==="100")
                {
                    expect(await page.locator('table').textContent()).toContain('No data found')
                }
                else
                {
                expect(cellValue).toEqual(age);
                }
                
        }
    }
   

})

test('handle dates/calenders',async({page}) =>
    
{

await page.getByText('Forms').click();
await page.getByText('Datepicker').click();

const calenderInput = page.getByPlaceholder('Form Picker');

await calenderInput.click();

//to make code robust and reusable
const date = new Date();

//case 1 - insurance today, and insurance is valid for 1 year
//date.setDate(date.getDate() +365) //when insurance expire
date.setDate(date.getDate() +1)
const expecteddate = date.getDate().toString();
const expectedmonth = date.toLocaleString('en-US', {month: 'short'})
const expectedyear = date.getFullYear();
const dateAssert = `${expectedmonth} ${expecteddate}, ${expectedyear}` 

// Select the date in the calendar dynamically
  await page.locator('.day-cell').getByText(expecteddate.toString(), { exact: true }).first().click();

  // Assert input value matches expected string
  await expect(calenderInput).toHaveValue(dateAssert);
});

//this way code is not robust and reusable
// await page.locator('[class= "day-cell ng-star-inserted"]').getByText('1', { exact: true }).first().click();

// await expect(calenderInput).toHaveValue('Jun 1, 2025');

test('handle sliders',async ({page})=>{
 
await page.getByText('Temperature').click();

const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')

await tempGauge.evaluate(node =>{
    node.setAttribute('cx','232.6309883354377');
    node.setAttribute('cy','232.6309883354377');
})

await tempGauge.click();

//Goal is to move the mouse only within the mentioned box
const tempbox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
const box = await tempbox.boundingBox();

if (box) {
    const x = box.x + box.width / 2;
    const y = box.y + box.height / 2;

    await page.mouse.move(x, y);
    // await page.mouse.down ();
    await page.mouse.move(300, 300);
    //page.locator('[tabtitle="Humidity"] ngx-temperature-dragger circle')
} else {
    throw new Error('Could not determine bounding box for temperature dragger.');
}



})

})