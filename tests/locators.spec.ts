import {expect, test} from "playwright/test"

test.beforeEach ( async ({page}) => {
await page.goto("http://localhost:4200/pages/iot-dashboard");
await page.getByText("Forms").click();
await page.getByText("Form Layouts").click();
})

test("Learning different Locator Syntax",async({page}) => {

    //by tag name
    await page.locator('input').click();

    //by ID #
    page.locator('#inputEmail1')

    //by class .
    page.locator('.status-basic')

    //by attribute
    page.locator('[type="email"]')

    //by mentioning all class values
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //by combination of two locators

    page.locator('input[placeholder="Email"]')

    //Xpath type of locator-not recommended * symbol is used to find wherever possible in the DOM

    page.locator('*[@id="inputEmail1"]')


// best practices using user facing locator

test("best practices using user facing locator", async({page})=>

{
   await page.getByRole("textbox",{name:"Email"}).first().click();
   await page.getByRole("button", {name:"Sign in"}).first().click();

   await page.getByLabel("Email").first().click();
   await page.getByPlaceholder("Jane Doe").first().click();

   await page.getByText("Using the Grid").first().click();
}

)

})

test("locating child elements",async({page})=> {

    await page.locator('nb-card nb-radio :text-is("Option 1")').click();

    //chaining in Locators
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click();

    await page.locator('nb-card').getByRole('button',{name:"Sign in"}).first().click();


    //indexing starts at 0
    //locating element using indexing must be avoided

    await page.locator('nb-card').nth(3).getByRole('button').click();
})

test('Locating Parent Elements', async({page})=>{

await page.locator('nb-card',{hasText:"Using the Grid"}).getByRole('textbox',{name:"Email"}).click();

await page.locator('nb-card',{has:page.locator("#inputEmail1")}).getByRole('textbox',{name:"Email"}).click();

await page.locator('nb-card').filter({hasText:"Basic form"}).getByRole('textbox',{name:"Email"}).click();

//travesing from child to parent --> Xpath Way

await page.locator(':test-is="Using the Grid"').locator('..').getByRole('textbox',{name:"Email"}).click();

})

test('Reuse Created Locator',async({page})=>{

const basicForm = page.locator('nb-card').filter({hasText:"Basic form"});
const email_textbox = basicForm.getByRole('textbox',{name:"Email"});

await email_textbox.fill ("user01@google.com");
await basicForm.getByRole('textbox',{name:"Password"}).fill("secret001");
await basicForm.getByRole('button',{name:"Submit"}).click();

await expect(email_textbox).toHaveValue("user01@google.com");

})

test("Extract Text/Value from locators", async({page}) =>
{
const basicForm = page.locator('nb-card').filter({hasText:"Basic form"});
const button_text= await basicForm.locator("button").textContent();

expect (button_text).toEqual("Submit");

const text_radiobuttons = await page.locator("nb-radio").allTextContents();
expect(text_radiobuttons).toContain("Option 3");
}
)