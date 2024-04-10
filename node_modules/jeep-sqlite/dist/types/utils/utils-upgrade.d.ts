import { SQLiteVersionUpgrade } from '../interfaces/interfaces';
import { Database } from './database';
export declare class UtilsUpgrade {
    static onUpgrade(mDB: Database, vUpgDict: Record<number, SQLiteVersionUpgrade>, curVersion: number, targetVersion: number): Promise<number>;
    static executeStatementsProcess(mDB: Database, statements: string[]): Promise<void>;
}
