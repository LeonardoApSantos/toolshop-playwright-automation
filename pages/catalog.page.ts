import { Page, Locator } from "@playwright/test"

export class CatalogPage {
    readonly productsContainer: Locator
    readonly comparisonButton: Locator
    readonly clearComparisonButton: Locator

    constructor(private page: Page) { 
        this.productsContainer = page.locator('//div[@class="col-md-9"]')
        this.comparisonButton = page.locator('//a[text()=" Compare Now "]')
        this.clearComparisonButton = page.locator('//button[text()=" Clear All "]')
    }

    async goto() {
        await this.page.goto('/')
    }

    getProductByName(name: string) {
        return this.productsContainer.locator(`//h5[text()=" ${name} "]`)
    }

    getComparisonButtonByName(name: string) {
        return this.getProductByName(name).locator("//../../div/button")
    }

    async openProductByName(name: string) {
        await this.getProductByName(name).click()
    }

    async selectProductForComparison(name: string) {
        await this.getComparisonButtonByName(name).click()
    }

    async clickComparisonButton() {
        await this.comparisonButton.click()
    }

    async clearComparisonSelection() {
        await this.clearComparisonButton.click()
    }
}