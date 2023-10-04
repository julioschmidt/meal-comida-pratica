import bcrypt from 'bcrypt';

export async function hashPassword(password: string) {
    return bcrypt.hash(password, 10).then((hash: string) => {
        return hash;
    })
}

export function isSamePassword(unHashPass: string, hashPassword: string) {
    return bcrypt.compare(unHashPass, hashPassword).then((result: boolean) => {
        return result;
    })
}