import { test, expect } from "../../fixtures/baseTest";
import { createUser, deleteUserByEmail, getAdminToken, getUserByEmail } from "../../helpers/api.helper";
import { buildUser } from "../../helpers/users.helper";
import data from '../../data/users.json';

test.describe("Cadastro de usuário", () => {
    test("Cadastrar usuário válido.", async ({ registerPage, page, request }) => {
        // Dado que o usuário não exista
        const adminToken = await getAdminToken(request);
        const user = buildUser(data.validUser)
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

    test("Tentar cadastrar usuário com email inválido", async ({ registerPage }) => {
        // Dado que estou na página de cadastro
        const user = buildUser(data.AlternativeCases[0].overrides)
        await registerPage.goto()
        // Quando o usuário preenche o formulário de cadastro com e-mail inválido
        await registerPage.fillForm(user)
        // Então o usuário vê uma mensagem de erro de validação de e-mail
        await expect(registerPage.getLocatorByText(' Email format is invalid ')).toBeVisible()
    });

    test("Tentar cadastrar usuário existente", async ({ registerPage, request }) => {
        // Dado que possuo um usuário já cadastrado
        const adminToken = await getAdminToken(request);
        const user = buildUser(data.AlternativeCases[1].overrides)
        await deleteUserByEmail(request, adminToken, user.email);
        await createUser(request, adminToken, user);
        // Quando preenche o formulário de cadastro com o mesmo e-mail
        await registerPage.goto()
        await registerPage.fillForm(user)
        // Então o usuário vê uma mensagem de erro de e-mail duplicado
        await expect(registerPage.getLocatorByText('A customer with this email address already exists.')).toBeVisible()
    });
})