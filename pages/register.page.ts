import { Page, Locator } from "@playwright/test";

export class RegisterPage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly dateBirth: Locator;
  readonly country: Locator;
  readonly postalCode: Locator;
  readonly houseNumber: Locator;
  readonly street: Locator;
  readonly city: Locator;
  readonly state: Locator;
  readonly phone: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly btnSubmit: Locator;

  constructor(private page: Page) {
    this.firstName = page.getByPlaceholder("First name *");
    this.lastName = page.getByPlaceholder("Your last name *");
    this.dateBirth = page.getByPlaceholder("YYYY-MM-DD");
    this.country = page.locator(
      '//label[text()="Country"]/following-sibling::select',
    );
    this.postalCode = page.getByPlaceholder("Your Postcode *");
    this.houseNumber = page.getByPlaceholder("e.g. 42 *");
    this.street = page.getByPlaceholder("Your Street *");
    this.city = page.getByPlaceholder("Your City *");
    this.state = page.getByPlaceholder("Your State *");
    this.phone = page.getByPlaceholder("Your phone *");
    this.email = page.getByPlaceholder("Your email *");
    this.password = page.getByPlaceholder("Your password");
    this.btnSubmit = page.getByText("Register ");
  }

  async goto() {
    await this.page.goto("/auth/register");
  }

  async fillFirstName(text: string) {
    await this.firstName.fill(text);
  }

  async fillLastName(text: string) {
    await this.lastName.fill(text);
  }

  async fillDateBirth(text: string) {
    await this.dateBirth.fill(text);
  }

  async fillCountry(text: string) {
    await this.country.selectOption(text);
  }

  async fillPostalCode(text: string) {
    await this.postalCode.fill(text);
  }

  async fillHouseNumber(text: string) {
    await this.houseNumber.fill(text);
  }

  async fillStreet(text: string) {
    await this.street.fill(text);
  }

  async fillCity(text: string) {
    await this.city.fill(text);
  }

  async fillState(text: string) {
    await this.state.fill(text);
  }

  async fillPhone(text: string) {
    await this.phone.fill(text);
  }

  async fillEmail(text: string) {
    await this.email.fill(text);
  }

  async fillPassword(text: string) {
    await this.password.fill(text);
  }

  async clickSubmit(){
    await this.btnSubmit.click()
  }

  async fillForm(user: any){
    await this.fillFirstName(user.firstName)
    await this.fillLastName(user.lastName)
    await this.fillDateBirth(user.dateOfBirth)
    await this.fillCountry(user.country)
    await this.fillPostalCode(user.postal_code)
    await this.fillHouseNumber(user.house_number)
    await this.fillStreet(user.street)
    await this.fillCity(user.city)
    await this.fillState(user.state)
    await this.fillPhone(user.phone)
    await this.fillEmail(user.email)
    await this.fillPassword(user.password)
    await this.clickSubmit()
  }

  getLocatorByText(text: string){
    return this.page.getByText(text, {exact: true})
  }

  getValidationMessageByLocator(locator: Locator){
    return locator.evaluate(e =>(e as HTMLInputElement).validationMessage)
  }
}
