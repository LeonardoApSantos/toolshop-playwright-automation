import { test, expect } from "../../fixtures/baseTest";
import { createUser, deleteUserByEmail, getAdminToken } from "../../helpers/api.helper";
import { buildUser } from "../../helpers/users.helper";
import data from '../../data/users.json';

test.describe("Login de usuário", () => {
    test("Logar com usuário válido", async ({ loginPage, accountPage, request }) => {
        // Dado que possuo um usuário válido
        const adminToken = await getAdminToken(request);
        const user = buildUser(data.AlternativeCases[2].overrides)
        await deleteUserByEmail(request, adminToken, user.email);
        await createUser(request, adminToken, user);
        // Quando o usuário preenche o formulário de login com dados válidos
        await loginPage.goto();
        await loginPage.fillForm(user.email, user.password);
        // Então o usuário é redirecionado para sua página de conta
        await expect(accountPage.getLocatorByText(` ${user.first_name} ${user.last_name} `)).toBeVisible();
    })

    test("Logar com usuário inválido", async ({ loginPage, accountPage, request }) => {
        // Dado que possuo um usuário inválido
        const adminToken = await getAdminToken(request);
        const user = buildUser(data.AlternativeCases[3].overrides)
        await deleteUserByEmail(request, adminToken, user.email);
        // Quando o usuário preenche o formulário de login com dados válidos
        await loginPage.goto();
        await loginPage.fillForm(user.email, user.password);
        // Então o usuário vê uma mensagem de erro de login
        await expect(accountPage.getLocatorByText("Invalid email or password")).toBeVisible();
    })
})