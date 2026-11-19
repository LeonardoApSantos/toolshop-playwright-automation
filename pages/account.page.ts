import { Page, Locator } from "@playwright/test";

export class AccountPage {
    readonly title: Locator;

    constructor(private page: Page) {
        this.title = page.locator('h1', { hasText: 'My Account' });
    }

    getLocatorByText(text: string) {
        return this.page.getByText(text, { exact: true })
    }
}