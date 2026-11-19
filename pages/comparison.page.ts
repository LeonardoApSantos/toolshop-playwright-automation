import { Page, Locator } from "@playwright/test";

export class ComparisonPage {
    readonly comparisonTable: Locator;

    constructor(private page: Page) {
        this.comparisonTable = page.locator('//table[@class="comparison-table"]')
    }
    
    getLocatorByProductName(name: string) {
        return this.comparisonTable.locator(`//a[text()="${name}"]`);
    }
}