export declare class UtilsSQLStatement {
    static extractTableName(statement: string): string | null;
    static extractWhereClause(statement: string): string | null;
    static addPrefixToWhereClause(whereClause: string, colNames: string[], refNames: string[], prefix: string): string;
    static findIndexOfStringInArray(target: string, array: string[]): number;
    static getStringAtIndex(array: string[], index: number): string | undefined;
    static extractForeignKeyInfo(sqlStatement: string): {
        forKeys: string[];
        tableName: string;
        refKeys: string[];
        action: string;
    };
    static extractColumnNames(whereClause: string): string[];
    static flattenMultilineString(input: string): string;
    static getStmtAndRetColNames(sqlStmt: string, retMode: string): {
        stmt: string;
        names: string;
    };
    static extractCombinedPrimaryKey(whereClause: string): string[][] | null;
    static getWhereStmtForCombinedPK(whStmt: string, withRefs: string[], colNames: string[], keys: string[][]): string;
    static replaceAllString(originalStr: string, searchStr: string, replaceStr: string): string;
    static replaceString: (originalStr: string, searchStr: string, replaceStr: string) => string;
    static indicesOf(str: string, searchStr: string, fromIndex?: number): number[];
    static getWhereStmtForNonCombinedPK(whStmt: string, withRefs: string[], colNames: string[]): string;
    static updateWhere(whStmt: string, withRefs: string[], colNames: string[]): string;
}
