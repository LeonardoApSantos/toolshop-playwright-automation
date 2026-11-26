import { Page, Locator } from "@playwright/test"

export class CatalogPage {
    readonly productsContainer: Locator
    readonly comparisonButton: Locator
    readonly clearComparisonButton: Locator
    readonly searchBar: Locator
    readonly searchButton: Locator
    readonly searchResultLabel: Locator
    readonly productCards: Locator
    readonly noFoundLabel: Locator
    readonly searchResetButton: Locator
    readonly searchedForLabel: Locator

    constructor(private page: Page) { 
        this.productsContainer = page.locator('//div[@class="col-md-9"]')
        this.comparisonButton = page.locator('//a[text()=" Compare Now "]')
        this.clearComparisonButton = page.locator('//button[text()=" Clear All "]')
        this.searchBar = page.locator('//input[@id="search-query"]')
        this.searchButton = page.locator('//button[text()="Search "]')
        this.searchResultLabel = page.locator('//p[contains(text(), "found for")]')
        this.productCards = page.locator('//a[@class="card"]')
        this.noFoundLabel = page.locator('//div[text()="There are no products found."]')
        this.searchResetButton = page.locator('//button[text()="X "]')
        this.searchedForLabel = page.locator('//h3[text()="Searched for: "]')
    }

    async goto() {
        await this.page.goto('/')
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

    async searchProductByName(name: string){
        await this.searchBar.fill(name)
        await this.searchButton.click()
    }

    async clearSearch() {
        await this.searchResetButton.click()
    }

    async selectFilterByType(text: string){
        await this.getLabelByText(text).locator('//input').click()
    }

    getProductByName(name: string) {
        return this.productsContainer.locator(`//h5[text()=" ${name} "]`)
    }

    getComparisonButtonByName(name: string) {
        return this.getProductByName(name).locator("//../../div/button")
    }

    getLabelByText(text: string){
        return this.page.locator(`//label[text()=" ${text} "]`)
    }



}