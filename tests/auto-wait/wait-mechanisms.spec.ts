import { test, expect } from '@playwright/test';

test.beforeEach (async({ page }) => {
  await page.goto('https://uitestingplayground.com/ajax'); // url is not opened in playwright
  await page.getByText("Button Triggering AJAX Request").click();

//after clicking on this button we need to wait for 15 secs

})

test('case0',async({page}) =>
{
const successButton = page.locator('.bg-success'); //only after 15 secs
await successButton.click();
}
)
test("case1",async ({page}) =>{
const successButton = page.locator('.bg-success'); //only after 15 secs
await expect(successButton).toBeAttached({timeout: 30_000});
await successButton.waitFor(); //is more visible
await successButton.click();
}
);