import { db, dbManager } from "../../database.ts";
import { DeepPartial, DatabaseValues } from "../../deps.ts";

abstract class BaseRepository<T> {
    constructor(private modelClass: { new (): T }) {}

    sqlQuery(query: string, values?: DatabaseValues[]) {
        return db.query(query, values);
    }

    getQueryBuilder() {
        return dbManager.query(this.modelClass);
    }

    async getAll(): Promise<T[]> {
        return await this.getQueryBuilder().all();
    }

    async get(id: number): Promise<T | null> {
        return await this.getQueryBuilder().where("id", id).first();
    }

    async edit(id: number, data: DeepPartial<T>): Promise<void> {
        await this.getQueryBuilder().where("id", id).update(data);
    }

    async save(object: T | T[]): Promise<T | T[]> {
        return await dbManager.save(object);
    }

    async remove(object: T | T[]): Promise<void> {
        await dbManager.remove(object);
    }
}

export default BaseRepository;
