import {SQLiteDatabase} from "expo-sqlite";
import {IUser} from "@/types/user";

class UserRepository {
    async createUser(db: SQLiteDatabase, name: string, email: string, password: string): Promise<number> {
        const result = await db.runAsync(
            `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
            [name, email, password]
        );
        return result.lastInsertRowId;
    }

    async getUserById(db: SQLiteDatabase, id: number): Promise<IUser | null> {
        const result = await db.getFirstAsync<IUser>(`
            SELECT * FROM users WHERE id = ?
        `, [id]);
        return result;
    }

    async getUserByEmail(db: SQLiteDatabase, email: string): Promise<IUser | null> {
        const result = await db.getFirstAsync<IUser>(`
            SELECT * FROM users WHERE email = ?
        `, [email]);
        return result;
    }
}

export const userRepository = new UserRepository();