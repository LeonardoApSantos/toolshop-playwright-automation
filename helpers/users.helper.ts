import data from '../data/users.json';

export interface UserModel {
    firstName: string;
    lastName: string;
    phone: string;
    dateOfBirth: string;
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
    return { ...data.valid, ...overrides };
}