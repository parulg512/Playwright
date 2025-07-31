import {test} from 'playwright/test';

test('handle drag and drop',async({page}) =>
{
await page.goto('https://www.globalsqa.com/demo-site/draganddrop/')

const cookieButton = page.getByRole('button', { name: 'Consent' });
if (await cookieButton.isVisible()) {
  await cookieButton.click();
}

//locate the frame
const frame = page.frameLocator('[rel-title="Photo Manager"] iframe');

//identify the list
//
// page.getByRole('list');

//source locator 
const sourceLocator = frame.locator('li', { hasText: "High Tatras 2" })


//target locator
const targetLocator= frame.locator('#trash');

// //drag&drop
await sourceLocator.dragTo(targetLocator);

//drag&drop manually
await sourceLocator.hover();
await page.mouse.down();
await targetLocator.hover();
await page.mouse.up();

});