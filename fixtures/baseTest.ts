import { test as base } from "@playwright/test";
import { CatalogPage } from "../pages/catalog.page";
import { RegisterPage } from "../pages/register.page";
import { LoginPage } from "../pages/login.page";
import { AccountPage } from "../pages/account.page";
import { ProductPage } from "../pages/product.page";
import { CheckoutPage } from "../pages/checkout.page";
import { ComparisonPage } from "../pages/comparison.page";

type MyFixtures = {
  catalogPage: CatalogPage,
  registerPage: RegisterPage,
  loginPage: LoginPage,
  accountPage: AccountPage,
  productPage: ProductPage,
  checkoutPage: CheckoutPage,
  comparisonPage: ComparisonPage
  apiErrors: void
};

export const test = base.extend<MyFixtures>({
  catalogPage: async ({ page }, use) => {
    await use(new CatalogPage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  comparisonPage: async ({ page }, use) => {
    await use(new ComparisonPage(page));
  },

  apiErrors: [async ({ page }, use, testInfo) => {
    const errors: string[] = [];

    page.on('response', async (r) => {
      if (!r.url().startsWith(process.env.API_URL!)) return;

      if (r.status() >= 400) {
        errors.push(`${r.status()} ${r.request().method()} ${r.url()}`);
        return;
      }
      if (r.url().endsWith('/graphql')) {
        const body = await r.text().catch(() => '');
        if (body.includes('"errors"'))
          errors.push(`GraphQL com erros: ${body.slice(0, 300)}`);
      }
    });

    await use();

    if (errors.length)
      await testInfo.attach('api-errors', { body: errors.join('\n'), contentType: 'text/plain' });
  }, { auto: true }],
});

export { expect } from "@playwright/test";