import {SQLiteDatabase} from "expo-sqlite";

export async function migrateDb(db: SQLiteDatabase) {

    let DATABASE_VERSION = 1;


    if(DATABASE_VERSION === 1) {
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS blogs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT NOT NULL
            );
        `);

        DATABASE_VERSION = 2;
    }

    if(DATABASE_VERSION === 2) {
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            );
        `);

        DATABASE_VERSION = 3;
    }
}