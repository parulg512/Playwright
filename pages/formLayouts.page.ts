// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Locator, type Page  } from "@playwright/test";

export class FormLayoutPage{

    readonly page: Page

    constructor(page:Page)
    {
        this.page=page;

    }
    async submitUsingtheGridform (email: string, password: string, optionSelect: string)
    {
        
        const usingGridForm = this.page.locator('nb-card').filter({hasText:"Using the Grid"});
        await usingGridForm.getByRole('textbox',{name:"Email"}).fill(email);
        await usingGridForm.getByRole('textbox',{name:"Password"}).fill(password);
        await usingGridForm.getByRole('radio',{name: optionSelect}).check({force:true});
        await usingGridForm.getByRole('button',{name:"Sign in"}).click();
    
    }
    /**
     * 
     * @param username 
     * @param email 
     * @param rememberMe 
     */
async submitInLine (username: string, email: string, rememberMe: boolean)
    {
        
        const inlineForm = this.page.locator('nb-card').filter({hasText:"Inline form"});
        await inlineForm.getByRole('textbox',{name:"Jane Doe"}).fill(username);
        await inlineForm.getByRole('textbox',{name:"Email"}).fill(email);

        if(rememberMe)
        {
            await inlineForm.getByRole('checkbox').check({force:true})
        }

    
    }

}