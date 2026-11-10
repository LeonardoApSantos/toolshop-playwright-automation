import { test, expect } from "../../fixtures/baseTest";
import { deleteUserByEmail, getAdminToken, getUserByEmail } from "../../helpers/api.helper";
import { buildUser, UserModel } from "../../helpers/users.helper";
import data from '../../data/users.json';

test.describe("Cadastro de usuário", () => {
    test("Cadastrar novo usuário válido.", async ({ registerPage, page, request }) => {
        // Dado que o usuário não exista
        const adminToken = await getAdminToken(request);
        const user = buildUser()
        await deleteUserByEmail(request, adminToken, user.email);
        // Quando o usuário preenche o formulário de cadastro com dados válidos
        await registerPage.goto()
        await registerPage.fillForm(user)
        // Então o usuário é redirecionado para a página de login
        await expect(page).toHaveTitle(/Login/)
        // E o usuário é criado no banco de dados
        const newUser = await getUserByEmail(request, adminToken, user.email)
        expect(newUser?.email).toBe(user.email);
    });
    test(`Tentar cadastrar novo usuário ${data.invalidRegistration[0].case}`, async ({ registerPage, page, request }) => {
        // Dado que estou na página de cadastro
        const user = buildUser(data.invalidRegistration[0].overrides)
        await registerPage.goto()
        // Quando o usuário preenche o formulário de cadastro com e-mail inválido
        await registerPage.fillForm(user)
        // Então o usuário vê uma mensagem de erro de validação de e-mail
        await expect(registerPage.getLocatorByText(' Email format is invalid ')).toBeVisible()
    });
})