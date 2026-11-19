import { Page, Locator } from "@playwright/test";

export class CheckoutPage {
    readonly cartView: Locator;

    constructor(private page: Page) {
        this.cartView = page.locator('//app-cart');
    }

    getProductByName(name: string) {
        return this.cartView.locator(`//span[contains(text(), '${name}')]`);
    }
}