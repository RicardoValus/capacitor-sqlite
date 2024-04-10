import { UtilsSQLite } from "./utils-sqlite";
import { UtilsSQLStatement } from "./utils-sqlstatement";
class UtilsDeleteError {
    static findReferencesAndUpdate(message) {
        return new UtilsDeleteError(message);
    }
    static getRefs(message) {
        return new UtilsDeleteError(message);
    }
    static getReferences(message) {
        return new UtilsDeleteError(message);
    }
    static searchForRelatedItems(message) {
        return new UtilsDeleteError(message);
    }
    static upDateWhereForDefault(message) {
        return new UtilsDeleteError(message);
    }
    static upDateWhereForRestrict(message) {
        return new UtilsDeleteError(message);
    }
    static upDateWhereForCascade(message) {
        return new UtilsDeleteError(message);
    }
    static executeUpdateForDelete(message) {
        return new UtilsDeleteError(message);
    }
    constructor(message) {
        this.message = message;
    }
}
export class UtilsDelete {
    static async findReferencesAndUpdate(mDB, tableName, whereStmt, initColNames, values) {
        try {
            let retBool = true;
            const result = await UtilsDelete.getReferences(mDB, tableName);
            const references = result.retRefs;
            const tableNameWithRefs = result.tableWithRefs;
            if (references.length <= 0) {
                return retBool;
            }
            if (tableName === tableNameWithRefs) {
                return retBool;
            }
            // Loop through references
            for (const ref of references) {
                // Extract the FOREIGN KEY constraint info from the ref statement
                const foreignKeyInfo = UtilsSQLStatement.extractForeignKeyInfo(ref);
                // Get the tableName of the references
                const refTable = foreignKeyInfo.tableName;
                if (refTable === '' || refTable !== tableName) {
                    continue;
                }
                // Get the with ref column names
                const withRefsNames = foreignKeyInfo.forKeys;
                // Get the column names
                const colNames = foreignKeyInfo.refKeys;
                if (colNames.length !== withRefsNames.length) {
                    const msg = "findReferencesAndUpdate: mismatch length";
                    throw UtilsDeleteError.findReferencesAndUpdate(msg);
                }
                const action = foreignKeyInfo.action;
                if (action === 'NO_ACTION') {
                    continue;
                }
                let updTableName = tableNameWithRefs;
                let updColNames = withRefsNames;
                let results = {
                    uWhereStmt: '',
                    setStmt: '',
                };
                if (!UtilsDelete.checkValuesMatch(withRefsNames, initColNames)) {
                    // Case: no match
                    // Search for related items in tableName
                    const result = await UtilsDelete
                        .searchForRelatedItems(mDB, updTableName, tableName, whereStmt, withRefsNames, colNames, values);
                    if (result.relatedItems.length === 0 && result.key.length <= 0) {
                        continue;
                    }
                    if (updTableName !== tableName) {
                        switch (action) {
                            case 'RESTRICT':
                                results = await UtilsDelete
                                    .upDateWhereForRestrict(result);
                                break;
                            case 'CASCADE':
                                results = await UtilsDelete
                                    .upDateWhereForCascade(result);
                                break;
                            default:
                                results = await UtilsDelete
                                    .upDateWhereForDefault(withRefsNames, result);
                                break;
                        }
                    }
                }
                else {
                    throw UtilsDeleteError.findReferencesAndUpdate('Not implemented. Please transfer your example to the maintener');
                }
                if (results.setStmt.length > 0 &&
                    results.uWhereStmt.length > 0) {
                    UtilsDelete.executeUpdateForDelete(mDB, updTableName, results.uWhereStmt, results.setStmt, updColNames, values);
                }
            }
            return retBool;
        }
        catch (error) {
            const msg = error.message ? error.message : error;
            if (error instanceof UtilsDeleteError) {
                throw UtilsDeleteError.findReferencesAndUpdate(msg);
            }
            else {
                throw error;
            }
        }
    }
    static async getReferences(db, tableName) {
        const sqlStmt = "SELECT sql FROM sqlite_master " +
            "WHERE sql LIKE('%FOREIGN KEY%') AND sql LIKE('%REFERENCES%') AND " +
            "sql LIKE('%" + tableName + "%') AND sql LIKE('%ON DELETE%');";
        try {
            const res = await UtilsSQLite.queryAll(db, sqlStmt, []);
            // get the reference's string(s)
            let retRefs = [];
            let tableWithRefs = "";
            if (res.length > 0) {
                let result = UtilsDelete.getRefs(res[0].sql);
                retRefs = result.foreignKeys;
                tableWithRefs = result.tableName;
            }
            return Promise.resolve({ tableWithRefs: tableWithRefs, retRefs: retRefs });
        }
        catch (err) {
            const error = err.message ? err.message : err;
            const msg = `getReferences: ${error}`;
            throw UtilsDeleteError.getReferences(msg);
        }
    }
    static getRefs(sqlStatement) {
        let tableName = '';
        const foreignKeys = [];
        const statement = UtilsSQLStatement.flattenMultilineString(sqlStatement);
        try {
            // Regular expression pattern to match the table name
            const tableNamePattern = /CREATE\s+TABLE\s+(\w+)\s+\(/;
            const tableNameMatch = statement.match(tableNamePattern);
            if (tableNameMatch) {
                tableName = tableNameMatch[1];
            }
            // Regular expression pattern to match the FOREIGN KEY constraints
            const foreignKeyPattern = /FOREIGN\s+KEY\s+\([^)]+\)\s+REFERENCES\s+(\w+)\s*\([^)]+\)\s+ON\s+DELETE\s+(CASCADE|RESTRICT|SET\s+DEFAULT|SET\s+NULL|NO\s+ACTION)/g;
            const foreignKeyMatches = statement.matchAll(foreignKeyPattern);
            for (const foreignKeyMatch of foreignKeyMatches) {
                const foreignKey = foreignKeyMatch[0];
                foreignKeys.push(foreignKey);
            }
        }
        catch (error) {
            const msg = `getRefs: Error creating regular expression: ${error}`;
            throw UtilsDeleteError.getRefs(msg);
        }
        return { tableName, foreignKeys };
    }
    static async getReferencedTableName(refValue) {
        var tableName = '';
        if (refValue.length > 0) {
            const arr = refValue.split(new RegExp('REFERENCES', 'i'));
            if (arr.length === 2) {
                const oPar = arr[1].indexOf("(");
                tableName = arr[1].substring(0, oPar).trim();
            }
        }
        return tableName;
    }
    static async searchForRelatedItems(mDB, updTableName, tableName, whStmt, withRefsNames, colNames, values) {
        const relatedItems = [];
        let key = "";
        const t1Names = withRefsNames.map((name) => `t1.${name}`);
        const t2Names = colNames.map((name) => `t2.${name}`);
        try {
            // addPrefix to the whereClause and swap colNames with  withRefsNames
            let whereClause = UtilsSQLStatement
                .addPrefixToWhereClause(whStmt, colNames, withRefsNames, "t2.");
            // look at the whereclause and change colNames with  withRefsNames
            if (whereClause.endsWith(";")) {
                whereClause = whereClause.slice(0, -1);
            }
            const resultString = t1Names
                .map((t1, index) => `${t1} = ${t2Names[index]}`)
                .join(" AND ");
            const sql = `SELECT t1.rowid FROM ${updTableName} t1 ` +
                `JOIN ${tableName} t2 ON ${resultString} ` +
                `WHERE ${whereClause} AND t1.sql_deleted = 0;`;
            const vals = await UtilsSQLite.queryAll(mDB, sql, values);
            if (vals.length > 0) {
                key = (Object.keys(vals[0]))[0];
                relatedItems.push(...vals);
            }
            return { key: key, relatedItems: relatedItems };
        }
        catch (error) {
            const msg = error.message ? error.message : error;
            throw UtilsDeleteError.searchForRelatedItems(msg);
        }
    }
    static async upDateWhereForDefault(withRefsNames, results) {
        let setStmt = '';
        let uWhereStmt = '';
        try {
            const key = results.key;
            const cols = [];
            for (const relItem of results.relatedItems) {
                const mVal = relItem[key];
                if (mVal !== undefined) {
                    cols.push(mVal);
                }
            }
            // Create the set statement
            for (const name of withRefsNames) {
                setStmt += `${name} = NULL, `;
            }
            setStmt += 'sql_deleted = 0';
            //      const curTime = UtilsDelete.getCurrentTimeAsInteger() + 5;
            //      setStmt += `last_modified = ${curTime}`;
            // Create the where statement
            uWhereStmt = `WHERE ${key} IN (`;
            for (const col of cols) {
                uWhereStmt += `${col},`;
            }
            if (uWhereStmt.endsWith(',')) {
                uWhereStmt = uWhereStmt.slice(0, -1);
            }
            uWhereStmt += ');';
        }
        catch (error) {
            const msg = error.message ? error.message : error;
            throw UtilsDeleteError.upDateWhereForDefault(msg);
        }
        return { setStmt, uWhereStmt };
    }
    static async upDateWhereForRestrict(results) {
        try {
            const setStmt = '';
            const uWhereStmt = '';
            if (results.relatedItems.length > 0) {
                const msg = 'Restrict mode related items exist, please delete them first';
                throw UtilsDeleteError.upDateWhereForRestrict(msg);
            }
            return { setStmt, uWhereStmt };
        }
        catch (error) {
            const msg = error.message ? error.message : error;
            throw UtilsDeleteError.upDateWhereForRestrict(msg);
        }
    }
    static async upDateWhereForCascade(results) {
        let setStmt = '';
        let uWhereStmt = '';
        try {
            const key = results.key;
            const cols = [];
            for (const relItem of results.relatedItems) {
                const mVal = relItem[key];
                if (mVal !== undefined) {
                    cols.push(mVal);
                }
            }
            setStmt += 'sql_deleted = 1';
            // Create the where statement
            uWhereStmt = `WHERE ${key} IN (`;
            for (const col of cols) {
                uWhereStmt += `${col},`;
            }
            if (uWhereStmt.endsWith(',')) {
                uWhereStmt = uWhereStmt.slice(0, -1);
            }
            uWhereStmt += ');';
        }
        catch (error) {
            const msg = error.message ? error.message : error;
            throw UtilsDeleteError.upDateWhereForCascade(msg);
        }
        return { setStmt, uWhereStmt };
    }
    static executeUpdateForDelete(mDB, tableName, whereStmt, setStmt, colNames, values) {
        try {
            let lastId = -1;
            // Update sql_deleted for this references
            const stmt = `UPDATE ${tableName} SET ${setStmt} ${whereStmt}`;
            const selValues = [];
            if (values.length > 0) {
                const arrVal = whereStmt.split('?');
                if (arrVal[arrVal.length - 1] === ';') {
                    arrVal.pop();
                }
                for (let jdx = 0; jdx < arrVal.length; jdx++) {
                    for (const updVal of colNames) {
                        const indices = UtilsSQLStatement.indicesOf(arrVal[jdx], updVal);
                        if (indices.length > 0) {
                            selValues.push(values[jdx]);
                        }
                    }
                }
            }
            const retObj = UtilsSQLite.run(mDB, stmt, selValues, false, 'no');
            lastId = retObj["lastId"];
            if (lastId === -1) {
                const msg = `UPDATE sql_deleted failed for table: ${tableName}`;
                throw UtilsDeleteError.executeUpdateForDelete(msg);
            }
        }
        catch (error) {
            const msg = error.message ? error.message : error;
            throw UtilsDeleteError.executeUpdateForDelete(msg);
        }
    }
    static getCurrentTimeAsInteger() {
        const currentTime = Math.floor(Date.now() / 1000);
        return currentTime;
    }
    static checkValuesMatch(array1, array2) {
        for (const value of array1) {
            if (!array2.includes(value)) {
                return false;
            }
        }
        return true;
    }
}
//# sourceMappingURL=utils-delete.js.map
