import data from '../data/users.json';

export interface UserModel {
    first_name: string;
    last_name: string;
    phone: string;
    date_of_birth: string;
    email: string;
    street: string;
    house_number: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
    password: string;
}

export function buildUser(overrides: Partial<UserModel> = {}): UserModel {
    return { ...data.validUser, ...overrides };
}