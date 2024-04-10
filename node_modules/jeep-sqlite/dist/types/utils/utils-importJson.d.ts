import { EventEmitter } from '../stencil-public-runtime';
import { JsonSQLite, JsonProgressListener, JsonView } from '../interfaces/interfaces';
import { Database } from './database';
export declare class UtilsImportJSON {
    static createDatabaseSchema(mDB: Database, jsonData: JsonSQLite): Promise<number>;
    static createSchema(mDB: Database, jsonData: any): Promise<number>;
    static createSchemaStatement(jsonData: any): Promise<string[]>;
    static createTablesData(mDB: Database, jsonData: JsonSQLite, importProgress: EventEmitter<JsonProgressListener>): Promise<number>;
    static createTableData(db: any, table: any, mode: string): Promise<number>;
    static createRowStatement(db: any, tColNames: string[], row: any[], j: number, tableName: string, mode: string): Promise<string>;
    static checkUpdate(db: any, stmt: string, values: any[], tbName: string, tColNames: string[]): Promise<boolean>;
    static isIdExists(db: any, dbName: string, firstColumnName: string, key: any): Promise<boolean>;
    static isType(type: string, value: any): Promise<void>;
    static checkColumnTypes(tableTypes: any[], rowValues: any[]): Promise<void>;
    static createQuestionMarkString(length: number): Promise<string>;
    static setNameForUpdate(names: string[]): Promise<string>;
    static createView(db: any, view: JsonView): Promise<void>;
    static createViews(mDB: Database, jsonData: JsonSQLite): Promise<number>;
}
