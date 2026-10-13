// find user by email 
import { pool } from '../lib/db';
import { DBUserWithPasswordRow, DBUserRow, User } from '../types/user.js';

export async function findUserByEmail(email: string): Promise<User | null> {
    const query = `
    SELECT id , email , role  FROM users WHERE email = $1
    `;
    const result = await pool.query<DBUserRow>(query, [email]);
    return result.rows[0] ?? null;
}

export async function createUser(email: string, hashedPassword: string): Promise<User> {
    const query = `
    INSERT INTO users (email , password_hash) VALUES ($1 , $2) RETURNING id , email , role , created_at
    `;
    const result = await pool.query<DBUserRow>(query, [email, hashedPassword]);
    return result.rows[0] ?? null;
}

export async function findUserByEmailWithPassword(email: string): Promise<DBUserWithPasswordRow | null> {
    const result = await pool.query<DBUserWithPasswordRow>(
        `
        SELECT id , email , role , password_hash , created_at from users 
        where email = $1
        `,
        [email]
    );
    return result.rows[0] ?? null;
}