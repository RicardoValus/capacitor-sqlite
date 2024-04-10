import initSqlJs from "sql.js";
import { UtilsStore } from "./utils-store";
import { UtilsImportJSON } from "./utils-importJson";
import { UtilsJSON } from "./utils-json";
import { UtilsExportJSON } from "./utils-exportJson";
import { UtilsUpgrade } from "./utils-upgrade";
import { UtilsSQLite } from "./utils-sqlite";
export class Database {
    constructor(databaseName, version, upgDict, store, autoSave, wasmPath) {
        this.vUpgDict = {};
        this.autoSave = false;
        this.wasmPath = '/assets';
        this.isBackup = false;
        this.isTransactionActive = false;
        this.dbName = databaseName;
        this.store = store;
        this.version = version;
        this.mDb = null;
        this.vUpgDict = upgDict;
        this._isDBOpen = false;
        this.autoSave = autoSave;
        this.wasmPath = wasmPath;
    }
    async open() {
        const config = {
            locateFile: (file) => `${this.wasmPath}/${file}`
        };
        return new Promise((resolve, reject) => {
            try {
                initSqlJs(config).then(async (SQL) => {
                    // retrieve the database if stored on localforage
                    const retDB = await UtilsStore.getDBFromStore(this.dbName, this.store);
                    if (retDB != null) {
                        // Open existing database
                        this.mDb = new SQL.Database(retDB);
                    }
                    else {
                        // Create a new database
                        this.mDb = new SQL.Database();
                        await UtilsStore.setInitialDBToStore(this.dbName, this.store);
                    }
                    this._isDBOpen = true;
                    // get the current version
                    let curVersion = await UtilsSQLite.getVersion(this.mDb);
                    if (this.version > curVersion && (Object.keys(this.vUpgDict)).length > 0) {
                        try {
                            // copy the db
                            const isDB = await UtilsStore.isDBInStore(this.dbName, this.store);
                            if (isDB) {
                                await UtilsStore.copyDBToStore(this.dbName, `backup-${this.dbName}`, this.store);
                                this.isBackup = true;
                            }
                            // execute the upgrade flow process
                            const changes = await UtilsUpgrade.onUpgrade(this, this.vUpgDict, curVersion, this.version);
                            if (changes === -1) {
                                // restore the database from backup
                                try {
                                    if (this.isBackup) {
                                        await UtilsStore.restoreDBFromStore(this.dbName, 'backup', this.store);
                                    }
                                }
                                catch (err) {
                                    const msg = err.message ? err.message : err;
                                    return reject(new Error(`Open: ${msg}`));
                                }
                            }
                            // delete the backup database
                            if (this.isBackup) {
                                await UtilsStore.removeDBFromStore(`backup-${this.dbName}`, this.store);
                            }
                        }
                        catch (err) {
                            // restore the database from backup
                            try {
                                if (this.isBackup) {
                                    await UtilsStore.restoreDBFromStore(this.dbName, 'backup', this.store);
                                }
                            }
                            catch (err) {
                                const msg = err.message ? err.message : err;
                                return reject(new Error(`Open: ${msg}`));
                            }
                        }
                    }
                    if (this.autoSave) {
                        try {
                            await this.saveToStore();
                        }
                        catch (err) {
                            this._isDBOpen = false;
                            const msg = err.message ? err.message : err;
                            return reject(new Error(`Open: ${msg}`));
                        }
                    }
                    // set Foreign Keys On
                    await UtilsSQLite.setForeignKeyConstraintsEnabled(this.mDb, true);
                    return resolve();
                });
            }
            catch (err) {
                this._isDBOpen = false;
                const msg = err.message ? err.message : err;
                return reject(new Error(`Open: ${msg}`));
            }
        });
    }
    isDBOpen() {
        return this._isDBOpen;
    }
    async close() {
        if (this.mDb != null && this._isDBOpen) {
            try {
                // save the database to store
                await this.saveToStore(false);
                // close the database
                this.mDb.close();
                this._isDBOpen = false;
            }
            catch (err) {
                this._isDBOpen = false;
                const msg = err.message ? err.message : err;
                return Promise.reject(new Error(`in close ${msg}`));
            }
        }
        return Promise.resolve();
    }
    async saveToStore(setFK = true) {
        if (this.mDb != null && this._isDBOpen) {
            try {
                // save the database to store
                await UtilsStore.setDBToStore(this.mDb, this.dbName, this.store);
                if (setFK) {
                    // set Foreign Keys On
                    await UtilsSQLite.setForeignKeyConstraintsEnabled(this.mDb, true);
                }
            }
            catch (err) {
                const msg = err.message ? err.message : err;
                return Promise.reject(new Error(`in saveToStore ${msg}`));
            }
        }
        return Promise.resolve();
    }
    async exportDB() {
        // export the database
        try {
            const data = this.mDb.export();
            return data;
        }
        catch (err) {
            const msg = err.message ? err.message : err;
            return Promise.reject(new Error(`exportDB: ${msg}`));
        }
    }
    async getVersion() {
        if (this.mDb != null && this._isDBOpen) {
            try {
                // save the database to store
                const curVersion = await UtilsSQLite.getVersion(this.mDb);
                return Promise.resolve(curVersion);
            }
            catch (err) {
                this._isDBOpen = false;
                const msg = err.message ? err.message : err;
                return Promise.reject(new Error(`in getVersion ${msg}`));
            }
        }
    }
    async isDBExists(database) {
        try {
            const isExists = await UtilsStore.isDBInStore(database, this.store);
            return Promise.resolve(isExists);
        }
        catch (err) {
            const msg = err.message ? err.message : err;
            return Promise.reject(new Error(`in isDBExists ${msg}`));
        }
    }
    async deleteDB(database) {
        try {
            // test if file exists
            const isExists = await this.isDBExists(database);
            if (isExists && !this._isDBOpen) {
                // open the database
                await this.open();
            }
            // close the database
            await this.close();
            // delete the database
            if (isExists) {
                await UtilsStore.removeDBFromStore(database, this.store);
            }
            return Promise.resolve();
        }
        catch (err) {
            const msg = err.message ? err.message : err;
            return Promise.reject(new Error(`DeleteDB: ${msg}`));
        }
    }
    async beginTransaction() {
        if (!this._isDBOpen) {
            let msg = `BeginTransaction: Database ${this.dbName} `;
            msg += `not opened`;
            return Promise.reject(new Error(msg));
        }
        try {
            await UtilsSQLite.beginTransaction(this.mDb, true);
            this.setIsTransActive(true);
            return 0;
        }
        catch (err) {
            let msg = `BeginTransaction: ${err.message ? err.message : err}`;
            return Promise.reject(new Error(`${msg}`));
        }
    }
    async commitTransaction() {
        if (!this._isDBOpen) {
            let msg = `CommitTransaction: Database ${this.dbName} `;
            msg += `not opened`;
            return Promise.reject(new Error(msg));
        }
        try {
            await UtilsSQLite.commitTransaction(this.mDb, true);
            this.setIsTransActive(false);
            return 0;
        }
        catch (err) {
            let msg = `CommitTransaction: ${err.message ? err.message : err}`;
            return Promise.reject(new Error(`${msg}`));
        }
    }
    async rollbackTransaction() {
        if (!this._isDBOpen) {
            let msg = `RollbackTransaction: Database ${this.dbName} `;
            msg += `not opened`;
            return Promise.reject(new Error(msg));
        }
        try {
            await UtilsSQLite.rollbackTransaction(this.mDb, true);
            this.setIsTransActive(false);
            return 0;
        }
        catch (err) {
            let msg = `RollbackTransaction: ${err.message ? err.message : err}`;
            return Promise.reject(new Error(`${msg}`));
        }
    }
    isTransActive() {
        return this.isTransactionActive;
    }
    setIsTransActive(value) {
        this.isTransactionActive = value;
    }
    async executeSQL(sql, transaction = true) {
        if (!this._isDBOpen) {
            let msg = `ExecuteSQL: Database ${this.dbName} `;
            msg += `not opened`;
            return Promise.reject(new Error(msg));
        }
        let initChanges = -1;
        try {
            initChanges = await UtilsSQLite.dbChanges(this.mDb);
            if (transaction && !this.isTransactionActive) {
                await this.beginTransaction();
            }
        }
        catch (err) {
            let msg = `executeSQL: ${err.message ? err.message : err}`;
            return Promise.reject(new Error(`${msg}`));
        }
        try {
            const mChanges = await UtilsSQLite.execute(this.mDb, sql, false);
            if (mChanges < 0) {
                return Promise.reject(new Error('ExecuteSQL: changes < 0'));
            }
            if (transaction && this.isTransactionActive) {
                await this.commitTransaction();
            }
            const changes = (await UtilsSQLite.dbChanges(this.mDb)) - initChanges;
            return Promise.resolve(changes);
        }
        catch (err) {
            let msg = `ExecuteSQL: ${err.message ? err.message : err}`;
            try {
                if (transaction && this.isTransactionActive)
                    await this.rollbackTransaction();
            }
            catch (err) {
                msg += ` : ${err.message ? err.message : err}`;
            }
            return Promise.reject(new Error(`ExecuteSQL: ${msg}`));
        }
        finally {
            if (transaction)
                this.isTransactionActive = false;
            if (this.autoSave && !this.isTransactionActive) {
                try {
                    await this.saveToStore();
                }
                catch (err) {
                    this._isDBOpen = false;
                    const msg = err.message ? err.message : err;
                    return Promise.reject(`ExecuteSQL: ${msg}`);
                }
            }
        }
    }
    async execSet(set, transaction = true, returnMode = 'no') {
        if (!this._isDBOpen) {
            let msg = `ExecSet: Database ${this.dbName} `;
            msg += `not opened`;
            return Promise.reject(new Error(msg));
        }
        const retRes = { changes: -1, lastId: -1 };
        let initChanges = -1;
        try {
            initChanges = await UtilsSQLite.dbChanges(this.mDb);
            if (transaction && !this.isTransactionActive) {
                await this.beginTransaction();
            }
        }
        catch (err) {
            const msge = err.message ? err.message : err;
            let msg = `ExecSet: ${msge}`;
            return Promise.reject(new Error(`${msg}`));
        }
        try {
            const retObj = await UtilsSQLite.executeSet(this.mDb, set, false, returnMode);
            let lastId = retObj["lastId"];
            if (lastId < 0) {
                return Promise.reject(new Error('ExecSet: changes < 0'));
            }
            if (transaction && this.isTransactionActive)
                await this.commitTransaction();
            const changes = (await UtilsSQLite.dbChanges(this.mDb)) - initChanges;
            retRes.changes = changes;
            retRes.lastId = lastId;
            retRes.values = retObj["values"] ? retObj["values"] : [];
            return Promise.resolve(retRes);
        }
        catch (err) {
            const msge = err.message ? err.message : err;
            let msg = `ExecSet: ${msge}`;
            try {
                if (transaction && this.isTransactionActive)
                    await this.rollbackTransaction();
            }
            catch (err) {
                msg += ` : ${err.message ? err.message : err}`;
            }
            return Promise.reject(new Error(`ExecSet: ${msg}`));
        }
        finally {
            if (transaction)
                this.isTransactionActive = false;
            if (this.autoSave && !this.isTransactionActive) {
                try {
                    await this.saveToStore();
                }
                catch (err) {
                    const msg = err.message ? err.message : err;
                    this._isDBOpen = false;
                    return Promise.reject(`ExecSet: ${msg}`);
                }
            }
        }
    }
    async selectSQL(sql, values) {
        if (!this._isDBOpen) {
            let msg = `SelectSQL: Database ${this.dbName} `;
            msg += `not opened`;
            return Promise.reject(new Error(msg));
        }
        try {
            let retArr = await UtilsSQLite.queryAll(this.mDb, sql, values);
            return Promise.resolve(retArr);
        }
        catch (err) {
            const msg = err.message ? err.message : err;
            return Promise.reject(new Error(`SelectSQL: ${msg}`));
        }
    }
    async runSQL(statement, values, transaction = true, returnMode) {
        let lastId = -1;
        if (!this._isDBOpen) {
            let msg = `RunSQL: Database ${this.dbName} `;
            msg += `not opened`;
            return Promise.reject(new Error(msg));
        }
        const retRes = { changes: -1, lastId: -1 };
        let initChanges = -1;
        try {
            initChanges = await UtilsSQLite.dbChanges(this.mDb);
            if (transaction && !this.isTransactionActive) {
                await this.beginTransaction();
            }
        }
        catch (err) {
            const msge = err.message ? err.message : err;
            let msg = `RunSQL: ${msge}`;
            return Promise.reject(new Error(`${msg}`));
        }
        try {
            const retObj = await UtilsSQLite.run(this.mDb, statement, values, false, returnMode);
            lastId = retObj["lastId"];
            if (lastId < 0) {
                return Promise.reject(new Error('RunSQL: lastId < 0'));
            }
            if (transaction && this.isTransactionActive) {
                await this.commitTransaction();
            }
            const changes = (await UtilsSQLite.dbChanges(this.mDb)) - initChanges;
            retRes.changes = changes;
            retRes.lastId = lastId;
            retRes.values = retObj["values"] ? retObj["values"] : [];
            return Promise.resolve(retRes);
        }
        catch (err) {
            const msge = err.message ? err.message : err;
            let msg = `RunSQL: ${msge}`;
            try {
                if (transaction && this.isTransactionActive) {
                    await this.rollbackTransaction();
                }
            }
            catch (err) {
                msg += ` : ${err.message ? err.message : err}`;
            }
            return Promise.reject(new Error(`${msg}`));
        }
        finally {
            if (transaction)
                this.setIsTransActive(false);
            if (this.autoSave && !this.isTransactionActive) {
                try {
                    await this.saveToStore();
                }
                catch (err) {
                    this._isDBOpen = false;
                    const msg = err.message ? err.message : err;
                    return Promise.reject(`ExecSet: ${msg}`);
                }
            }
        }
    }
    async getTableNames() {
        if (!this._isDBOpen) {
            let msg = `GetTableNames: Database ${this.dbName} `;
            msg += `not opened`;
            return Promise.reject(new Error(msg));
        }
        try {
            let retArr = await UtilsSQLite.getTableList(this.mDb);
            return Promise.resolve(retArr);
        }
        catch (err) {
            const msg = err.message ? err.message : err;
            return Promise.reject(new Error(`GetTableNames: ${msg}`));
        }
    }
    async isTable(tableName) {
        if (!this._isDBOpen) {
            let msg = `isTable: Database ${this.dbName} `;
            msg += `not opened`;
            return Promise.reject(new Error(msg));
        }
        try {
            const retB = await UtilsSQLite.isTableExists(this.mDb, tableName);
            return Promise.resolve(retB);
        }
        catch (err) {
            const msg = `IsTable: ${err.message ? err.message : err}`;
            return Promise.reject(new Error(msg));
        }
    }
    async createSyncTable() {
        if (!this._isDBOpen) {
            let msg = `createSyncTable: Database ${this.dbName} `;
            msg += `not opened`;
            return Promise.reject(new Error(msg));
        }
        let changes = -1;
        try {
            const retB = await UtilsSQLite.isTableExists(this.mDb, 'sync_table');
            if (!retB) {
                const isLastMod = await UtilsSQLite.isLastModified(this.mDb, this._isDBOpen);
                const isDel = await UtilsSQLite.isSqlDeleted(this.mDb, this._isDBOpen);
                if (isLastMod && isDel) {
                    const date = Math.round(new Date().getTime() / 1000);
                    let stmts = `
                          CREATE TABLE IF NOT EXISTS sync_table (
                              id INTEGER PRIMARY KEY NOT NULL,
                              sync_date INTEGER
                              );`;
                    stmts += `INSERT INTO sync_table (sync_date) VALUES (
                              "${date}");`;
                    changes = await UtilsSQLite.execute(this.mDb, stmts, false);
                    return Promise.resolve(changes);
                }
                else {
                    return Promise.reject(new Error('No last_modified/sql_deleted columns in tables'));
                }
            }
            else {
                return Promise.resolve(0);
            }
        }
        catch (err) {
            const msge = err.message ? err.message : err;
            const msg = `CreateSyncTable: ${msge}`;
            return Promise.reject(new Error(msg));
        }
    }
    async getSyncDate() {
        if (!this._isDBOpen) {
            let msg = `getSyncDate: Database ${this.dbName} `;
            msg += `not opened`;
            return Promise.reject(new Error(msg));
        }
        try {
            const isTable = await UtilsSQLite.isTableExists(this.mDb, 'sync_table');
            if (!isTable) {
                return Promise.reject(new Error('No sync_table available'));
            }
            const res = await UtilsExportJSON.getSynchroDate(this.mDb);
            return Promise.resolve(res);
        }
        catch (err) {
            const msge = err.message ? err.message : err;
            const msg = `getSyncDate: ${msge}`;
            return Promise.reject(new Error(msg));
        }
    }
    async setSyncDate(syncDate) {
        if (!this._isDBOpen) {
            let msg = `SetSyncDate: Database ${this.dbName} `;
            msg += `not opened`;
            return { result: false, message: msg };
        }
        try {
            const isTable = await UtilsSQLite.isTableExists(this.mDb, 'sync_table');
            if (!isTable) {
                return Promise.reject(new Error('No sync_table available'));
            }
            const sDate = Math.round(new Date(syncDate).getTime() / 1000);
            let stmt = `UPDATE sync_table SET sync_date = `;
            stmt += `${sDate} WHERE id = 1;`;
            const changes = await UtilsSQLite.execute(this.mDb, stmt, false);
            if (changes < 0) {
                return { result: false, message: 'setSyncDate failed' };
            }
            else {
                return { result: true };
            }
        }
        catch (err) {
            const msg = err.message ? err.message : err;
            return { result: false, message: `setSyncDate failed: ${msg}` };
        }
    }
    async importJson(jsonData, importProgress) {
        let changes = 0;
        if (this._isDBOpen) {
            try {
                // set Foreign Keys Off
                await UtilsSQLite.setForeignKeyConstraintsEnabled(this.mDb, false);
                if (jsonData.tables && jsonData.tables.length > 0) {
                    // create the database schema
                    changes = await UtilsImportJSON.createDatabaseSchema(this, jsonData);
                    let msg = `Schema creation completed changes: ${changes}`;
                    importProgress.emit({ progress: msg });
                    if (changes != -1) {
                        // create the tables data
                        changes += await UtilsImportJSON.createTablesData(this, jsonData, importProgress);
                        let msg = `Tables data creation completed changes: ${changes}`;
                        importProgress.emit({ progress: msg });
                    }
                }
                if (jsonData.views && jsonData.views.length > 0) {
                    // create the views
                    changes += await UtilsImportJSON.createViews(this, jsonData);
                }
                // set Foreign Keys On
                await UtilsSQLite.setForeignKeyConstraintsEnabled(this.mDb, true);
                await this.saveToStore();
                return Promise.resolve(changes);
            }
            catch (err) {
                const msg = err.message ? err.message : err;
                return Promise.reject(new Error(`ImportJson: ${msg}`));
            }
        }
        else {
            return Promise.reject(new Error(`ImportJson: database is closed`));
        }
    }
    async exportJson(mode, exportProgress) {
        const inJson = {};
        inJson.database = this.dbName.slice(0, -9);
        inJson.version = this.version;
        inJson.encrypted = false;
        inJson.mode = mode;
        if (this._isDBOpen) {
            try {
                const isTable = await UtilsSQLite.isTableExists(this.mDb, 'sync_table');
                if (isTable) {
                    await UtilsExportJSON
                        .setLastExportDate(this.mDb, (new Date()).toISOString());
                }
                else {
                    if (inJson.mode !== 'full') {
                        const msg = `No sync_table available for partial mode`;
                        return Promise.reject(new Error(msg));
                    }
                }
                const retJson = await UtilsExportJSON
                    .createExportObject(this.mDb, inJson, exportProgress);
                const keys = Object.keys(retJson);
                if (keys.length === 0) {
                    const msg = `ExportJson: return Object is empty ` +
                        `No data to synchronize`;
                    return Promise.reject(new Error(msg));
                }
                const isValid = UtilsJSON.isJsonSQLite(retJson);
                if (isValid) {
                    return Promise.resolve(retJson);
                }
                else {
                    return Promise.reject(new Error(`ExportJson: retJson not valid`));
                }
            }
            catch (err) {
                const msg = err.message ? err.message : err;
                return Promise.reject(new Error(`ExportJson: ${msg}`));
            }
        }
        else {
            return Promise.reject(new Error(`ExportJson: database is closed`));
        }
    }
    async deleteExportedRows() {
        if (this._isDBOpen) {
            try {
                await UtilsExportJSON.delExportedRows(this.mDb);
                return Promise.resolve();
            }
            catch (err) {
                const msg = err.message ? err.message : err;
                return Promise.reject(new Error(`deleteExportedRows: ${msg}`));
            }
        }
        else {
            return Promise.reject(new Error(`deleteExportedRows: database is closed`));
        }
    }
}
//# sourceMappingURL=database.js.map
