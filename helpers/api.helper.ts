import { APIRequestContext } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

let adminToken: string
let headers: { Authorization: string }

const API_URL = process.env.API_URL;

export async function getAdminToken(
    request: APIRequestContext,
): Promise<string> {
    const response = await request.post(`${API_URL}/users/login`, {
        data: {
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
        },
    });
    if (!response.ok())
        throw new Error(`Login do admin falhou: ${response.status()}`);

    const body = await response.json();
    return body.access_token;
}

export async function deleteUserByEmail(
    request: APIRequestContext,
    adminToken: string,
    email: string,
) {
    headers = { Authorization: `Bearer ${adminToken}` };

    const user = await getUserByEmail(request, adminToken, email);
    if (user) {
        const del = await request.delete(`${API_URL}/users/${user.id}`, { headers });
        if (!del.ok())
            throw new Error(`Falha ao deletar usuário: ${del.status()}`);
    }
}

export async function getUserByEmail(request: APIRequestContext, adminToken: string, email: string) {
    headers = { Authorization: `Bearer ${adminToken}` };
    
    const search = await request.get(`${API_URL}/users/search`, {
        params: { q: email }, headers
    })

    if (!search.ok())
        throw new Error(`Falha ao buscar usuário: ${search.status()}`);

    const users = (await search.json()).data ?? [];
    return users.find((u: { email: string }) => u.email === email);
}
