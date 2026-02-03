import {IBlog} from "@/types/blog";
import {SQLiteDatabase} from "expo-sqlite";

class BlogRepository {
    async createBlog(db: SQLiteDatabase, title: string, description: string): Promise<number> {
        const result = await db.runAsync(
            `INSERT INTO blogs (title, description) VALUES (?, ?)`,
            [title, description]);
        return result.lastInsertRowId;
    }

    async getBlogs(db: SQLiteDatabase): Promise<IBlog[]> {
        const result = await db.getAllAsync<IBlog>(
            `SELECT * FROM blogs`
        );
        return result;
    }

    async getBlog(db: SQLiteDatabase, id: number): Promise<IBlog | null> {
        const result = await db.getFirstAsync<IBlog>(
            `SELECT * FROM blogs WHERE id = ?`,
            [id]
        );
        return result;
    }

    async updateBlog(db: SQLiteDatabase, id: number, title: string = '', description: string = '') {
        const result = await db.runAsync(
            `UPDATE blogs SET title = ?, description = ? WHERE id = ?`,
            [title, description, id]
        );
        return result;
    }

    async deleteBlog(db: SQLiteDatabase, id: number) {
        const result = await db.runAsync(
            `DELETE FROM blogs WHERE id = ?`,
            [id]
        );
        return result;
    }
}

export const blogRepository = new BlogRepository();