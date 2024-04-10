export declare class UtilsSQLite {
    static beginTransaction(db: any, isOpen: boolean): Promise<void>;
    static rollbackTransaction(db: any, isOpen: boolean): Promise<void>;
    static commitTransaction(db: any, isOpen: boolean): Promise<void>;
    static dbChanges(db: any): Promise<number>;
    static getLastId(db: any): Promise<number>;
    static setForeignKeyConstraintsEnabled(db: any, toggle: boolean): Promise<void>;
    static getVersion(db: any): Promise<number>;
    static setVersion(db: any, version: number): Promise<void>;
    static execute(db: any, sql: string, fromJson: boolean): Promise<number>;
    static executeSet(db: any, set: any, fromJson: boolean, returnMode: string): Promise<any>;
    static queryAll(db: any, sql: string, values: any[]): Promise<any[]>;
    static run(db: any, statement: string, values: any[], fromJson: boolean, returnMode: string): Promise<any>;
    static getReturnedValues(result: any, returnMode: string): any[];
    static deleteSQL(db: any, statement: string, values: any[]): Promise<string>;
    static getTableList(db: any): Promise<any[]>;
    static isTableExists(db: any, tableName: string): Promise<boolean>;
    /**
     * isLastModified
     * @param db
     * @param isOpen
     */
    static isLastModified(db: any, isOpen: boolean): Promise<boolean>;
    /**
     * isSqlDeleted
     * @param db
     * @param isOpen
     */
    static isSqlDeleted(db: any, isOpen: boolean): Promise<boolean>;
    static replaceUndefinedByNull(values: any[]): Promise<any[]>;
    static backupTables(db: any): Promise<Record<string, string[]>>;
    static backupTable(db: any, table: string): Promise<string[]>;
    static getTableColumnNames(db: any, tableName: string): Promise<string[]>;
    static findCommonColumns(db: any, alterTables: Record<string, string[]>): Promise<Record<string, string[]>>;
    static arraysIntersection(a1: any[], a2: any[]): any[];
    static updateNewTablesData(db: any, commonColumns: Record<string, string[]>): Promise<void>;
}
