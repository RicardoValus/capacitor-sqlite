import { Database } from "./database";
export declare class UtilsDelete {
    static findReferencesAndUpdate(mDB: Database, tableName: string, whereStmt: string, initColNames: string[], values: any[]): Promise<boolean>;
    static getReferences(db: any, tableName: string): Promise<{
        tableWithRefs: string;
        retRefs: string[];
    }>;
    static getRefs(sqlStatement: string): {
        tableName: string;
        foreignKeys: string[];
    };
    static getReferencedTableName(refValue: string): Promise<string>;
    static searchForRelatedItems(mDB: Database, updTableName: string, tableName: string, whStmt: string, withRefsNames: string[], colNames: string[], values: any[]): Promise<{
        key: string;
        relatedItems: any[];
    }>;
    static upDateWhereForDefault(withRefsNames: string[], results: {
        key: string;
        relatedItems: any[];
    }): Promise<{
        setStmt: string;
        uWhereStmt: string;
    }>;
    static upDateWhereForRestrict(results: {
        key: string;
        relatedItems: any[];
    }): Promise<{
        setStmt: string;
        uWhereStmt: string;
    }>;
    static upDateWhereForCascade(results: {
        key: string;
        relatedItems: any[];
    }): Promise<{
        setStmt: string;
        uWhereStmt: string;
    }>;
    static executeUpdateForDelete(mDB: Database, tableName: string, whereStmt: string, setStmt: string, colNames: string[], values: any[]): void;
    static getCurrentTimeAsInteger(): number;
    static checkValuesMatch(array1: string[], array2: string[]): boolean;
}
