import {test} from "playwright/test"

test.beforeEach ( async ({page}) => {
await page.goto("http://localhost:4200/pages/iot-dashboard");
await page.getByText("Forms").click();
await page.getByText("Form Layouts").click();
})

test.describe("Suite01",() => {

test("TC01",async({page}) =>{
await page.getByText("Forms").click();
await page.getByText("Form Layouts").click();

})

test("TC02",async({page}) =>{
  await page.getByText("Forms").click();
  await page.getByText("Datepicker").click();
})  
})

