import { Page, Locator } from "@playwright/test";

export class ProductPage {
    readonly addToCartButton: Locator;
    readonly viewCartButton: Locator;

    constructor(private page: Page) {
        this.addToCartButton = page.locator('//button[@id="btn-add-to-cart"]');
        this.viewCartButton = page.locator('//a[@routerlink="/checkout"]');
    }

    async addToCart() {
        await this.addToCartButton.click();
    }

    async viewCart() {
        await this.viewCartButton.click();
    }
}