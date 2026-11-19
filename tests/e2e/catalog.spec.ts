import { test, expect } from "../../fixtures/baseTest";
import data from "../../data/searches.json"

test("Adicionar um produto no carrinho", async ({ catalogPage, productPage, checkoutPage }) => {
    // Dado que estou na página de catalogo
    await catalogPage.goto()
    // Quando selecionar um produto
    await catalogPage.openProductByName(data.products[0].name)
    // E adicionar ao carrinho
    await productPage.addToCart()
    await productPage.viewCart()
    // Então o produto estará no carrinho
    await expect(checkoutPage.getProductByName(data.products[0].name)).toBeVisible()
});

test("Comparar produtos", async ({ catalogPage, comparisonPage }) => {
    // Dado que estou na página de catalogo
    await catalogPage.goto()
    // Quando selecionar alguns produtos para comparar
    for (const product of data.products) {
        await catalogPage.selectProductForComparison(product.name)
    }
    // E clicar no botão de comparar
    await catalogPage.clickComparisonButton()
    // Então os produtos selecionados estarão na página de comparação
    for (const product of data.products) {
        await expect(comparisonPage.getLocatorByProductName(product.name)).toBeVisible()
    }
})

test("Limpar produtos selecionados para comparação", async ({ catalogPage, comparisonPage }) => {
    // Dado que estou na página de catalogo
    await catalogPage.goto()
    // Quando selecionar alguns produtos para comparar
    for (const product of data.products) {
        await catalogPage.selectProductForComparison(product.name)
    }
    // E clicar no botão de limpar
    await catalogPage.clearComparisonSelection()
    // Então os produtos NÃO estaram mais selecionados na página de catalogo
    for (const product of data.products) {
        await expect(catalogPage.getComparisonButtonByName(product.name)).toHaveAttribute("aria-pressed", "false")
    }
})
