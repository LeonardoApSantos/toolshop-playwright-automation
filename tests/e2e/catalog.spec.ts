import { test, expect } from "../../fixtures/baseTest";
import data from "../../data/searches.json"

test.describe("Adicionar produtos no carrinho", () => {
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
})

test.describe("Comparação de produtos", () => {
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

    test("Limpar produtos selecionados para comparação", async ({ catalogPage }) => {
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
})

test.describe("Pesquisar produtos", () => {
    test("Pesquisar produto pelo nome único", async ({ catalogPage }) => {
        // Dado que estou na página de catalogo
        await catalogPage.goto()
        // Quando pesquisar por um produto pelo nome único
        await catalogPage.searchProductByName(data.products[0].name)
        // Então apenas esse produto será exibido na tela
        await expect(catalogPage.searchResultLabel).toHaveText(`1 product found for '${data.products[0].name}'`)
        await expect(catalogPage.getProductByName(data.products[0].name)).toBeVisible()
    })

    test("Pesquisar produtos pela palavra chave que o nome contém", async ({ catalogPage }) => {
        // Dado que estou na página de catalogo
        await catalogPage.goto()
        // Quando pesquisar por palavra chave
        await catalogPage.searchProductByName(data.products[1].name)
        // Então mais de um produto será exibido na tela
        await expect(catalogPage.searchResultLabel).toContainText(`products found for '${data.products[1].name}'`)
        await expect(catalogPage.productCards).not.toHaveCount(0);
        await expect(
            catalogPage.productCards.filter({ hasNotText: new RegExp(data.products[1].name, 'i') }),
        ).toHaveCount(0);
    })

    test("Pesquisar produto que não existe", async ({ catalogPage }) => {
        // Dado que estou na página de catalogo
        await catalogPage.goto()
        // Quando pesquisar por um produto que não existe
        await catalogPage.searchProductByName(data.nonProducts[0].name)
        // Então nenhum produto será exibido na tela
        await expect(catalogPage.noFoundLabel).toBeVisible()
    })

    test("Limpar pesquisa por nome do catálogo", async ({ catalogPage }) => {
        // Dado que estou na página de catalogo
        await catalogPage.goto()
        // Quando pesquisar por um produto com nome genérico
        await catalogPage.searchProductByName(data.searchs[0].name)
        // E limpar a pesquisa no X
        await expect(catalogPage.searchedForLabel).toBeVisible()
        await catalogPage.clearSearch()
        // Então o filtro será resetado
        await expect(catalogPage.searchedForLabel).not.toBeVisible()
    })

    test("Filtrar catálogo por categoria", async ({ catalogPage }) => {
        // Dado que estou na página de catalogo
        await catalogPage.goto()
        // Quando filtrar por uma categoria com nome genérico
        await catalogPage.selectFilterByType(data.filters[0].category[0])
        // Então apenas produtos daquela categoria devem aparecer no catalogo
        await expect(catalogPage.productCards).not.toHaveCount(0);
        await expect(
            catalogPage.productCards.filter({ hasNotText: new RegExp(data.filters[0].name.join('|'), 'i') }),
        ).toHaveCount(0);
    })

    test("Filtrar catálogo múltiplas categoria", async ({ catalogPage }) => {
        await catalogPage.goto()
        await catalogPage.selectFilterByType(data.filters[1].category[0])
        await catalogPage.selectFilterByType(data.filters[1].category[1])
        await expect(catalogPage.productCards).not.toHaveCount(0);
        await expect(
            catalogPage.productCards.filter({ hasNotText: new RegExp(data.filters[1].name.join('|'), 'i') }),
        ).toHaveCount(0);
    })

    test("Filtrar catálogo por categoria com nenhum produto vinculado", async ({ catalogPage }) => {
        await catalogPage.goto()
        await catalogPage.selectFilterByType(data.filters[2].category[0])
        await expect(catalogPage.productCards).toHaveCount(0);
        await expect(catalogPage.noFoundLabel).toBeVisible()
    })

    test("Limpar pesquisa por filtro do catálogo", async ({ catalogPage }) => {
        await catalogPage.goto()
        await catalogPage.selectFilterByType(data.filters[0].category[0])
        await expect(catalogPage.productCards).not.toHaveCount(0);
        await expect(
            catalogPage.productCards.filter({ hasNotText: new RegExp(data.filters[0].name.join('|'), 'i') }),
        ).toHaveCount(0);
        await catalogPage.clearSearch()
        await expect(catalogPage.productCards).toHaveCount(9);
    })
})