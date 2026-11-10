import { Page, Locator } from "@playwright/test"

export class HomePage{
    readonly title: Locator

    constructor(private page: Page){
        this.title = page.getByTitle(/Toolshop/)
    }

    async goto(){
        await this.page.goto('/')
    }
}