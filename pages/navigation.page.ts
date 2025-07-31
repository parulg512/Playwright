import { Locator, Page } from "@playwright/test";


//allow follow camel casing
export class NavigationPage
{
   
    readonly page: Page ;
    readonly formLayoutButton: Locator
    readonly formLayouts: Locator
    readonly datePicker: Locator
    readonly table: Locator
    readonly tooltip: Locator
    readonly dialogPageLocator: Locator
    readonly dragAndDrop: Locator   
    readonly tableandData: Locator
    readonly modalOverlays: Locator
    constructor(page:Page)
    {
      this.page = page 
      this.formLayoutButton = page.getByText("Forms");
      this.formLayouts = page.getByText("Form Layouts");
      this.datePicker = page.getByText("Datepicker");       
      this.table = page.getByText("Smart Table");
      this.tooltip = page.getByText("Tooltip");
      this.dialogPageLocator = page.getByText("Dialog");
      this.dragAndDrop = page.getByText("Drag and Drop");
      this.tableandData = page.getByText("Tables & Data");
      this.modalOverlays = page.getByText("Modal & Overlays");
    }

async formLayoutPage(): Promise<void>
    {
    await this.formLayoutButton.click();
    await this.formLayouts.click();
    }

async datePickerPage(): Promise<void>
    {
        await this.formLayoutButton.click();
        await this.datePicker.click();
    }

async Smarttable(): Promise<void>
    {
    await this.tableandData.click();
    await this.table.click();
    
    }

async tooltipPage(): Promise<void> 
{
    await this.modalOverlays.click();
    await this.tooltip.click();
} 
async dialogPage(): Promise<void>
{
    await this.modalOverlays.click();
    await this.dialogPageLocator.click();
}

async dragAndDropPage(): Promise<void>
{
    await this.dragAndDrop.click();
    await this.page.getByText("Drag and Drop").click();
}
}