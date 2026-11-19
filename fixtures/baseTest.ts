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
};

export const test = base.extend<MyFixtures>({
  catalogPage: async ({ page }, use) => {
    await use(new CatalogPage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  loginPage: async ({ page }, use) =>{
    await use(new LoginPage(page));
  },
  accountPage: async ({ page }, use) =>{
    await use(new AccountPage(page));
  },
  productPage: async ({ page }, use) =>{
    await use(new ProductPage(page));
  },
  checkoutPage: async ({ page }, use) =>{
    await use(new CheckoutPage(page));
  },
  comparisonPage: async ({ page }, use) =>{
    await use(new ComparisonPage(page));
  }
});

export { expect } from "@playwright/test";