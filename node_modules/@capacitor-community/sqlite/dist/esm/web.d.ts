import { WebPlugin } from '@capacitor/core';
import type { CapacitorSQLitePlugin, capConnectionOptions, capAllConnectionsOptions, capChangeSecretOptions, capEchoOptions, capEchoResult, capNCConnectionOptions, capNCDatabasePathOptions, capNCDatabasePathResult, capNCOptions, capSetSecretOptions, capSQLiteChanges, capSQLiteExecuteOptions, capSQLiteExportOptions, capSQLiteFromAssetsOptions, capSQLiteHTTPOptions, capSQLiteLocalDiskOptions, capSQLiteImportOptions, capSQLiteJson, capSQLiteOptions, capSQLitePathOptions, capSQLiteQueryOptions, capSQLiteResult, capSQLiteRunOptions, capSQLiteSetOptions, capSQLiteSyncDate, capSQLiteSyncDateOptions, capSQLiteTableOptions, capSQLiteUpgradeOptions, capSQLiteUrl, capSQLiteValues, capVersionResult, capSQLiteExtensionPath, capSQLiteExtensionEnable } from './definitions';
export declare class CapacitorSQLiteWeb extends WebPlugin implements CapacitorSQLitePlugin {
    private jeepSqliteElement;
    private isWebStoreOpen;
    initWebStore(): Promise<void>;
    saveToStore(options: capSQLiteOptions): Promise<void>;
    getFromLocalDiskToStore(options: capSQLiteLocalDiskOptions): Promise<void>;
    saveToLocalDisk(options: capSQLiteOptions): Promise<void>;
    echo(options: capEchoOptions): Promise<capEchoResult>;
    createConnection(options: capConnectionOptions): Promise<void>;
    open(options: capSQLiteOptions): Promise<void>;
    closeConnection(options: capSQLiteOptions): Promise<void>;
    getVersion(options: capSQLiteOptions): Promise<capVersionResult>;
    checkConnectionsConsistency(options: capAllConnectionsOptions): Promise<capSQLiteResult>;
    close(options: capSQLiteOptions): Promise<void>;
    beginTransaction(options: capSQLiteOptions): Promise<capSQLiteChanges>;
    commitTransaction(options: capSQLiteOptions): Promise<capSQLiteChanges>;
    rollbackTransaction(options: capSQLiteOptions): Promise<capSQLiteChanges>;
    isTransactionActive(options: capSQLiteOptions): Promise<capSQLiteResult>;
    getTableList(options: capSQLiteOptions): Promise<capSQLiteValues>;
    execute(options: capSQLiteExecuteOptions): Promise<capSQLiteChanges>;
    executeSet(options: capSQLiteSetOptions): Promise<capSQLiteChanges>;
    run(options: capSQLiteRunOptions): Promise<capSQLiteChanges>;
    query(options: capSQLiteQueryOptions): Promise<capSQLiteValues>;
    isDBExists(options: capSQLiteOptions): Promise<capSQLiteResult>;
    isDBOpen(options: capSQLiteOptions): Promise<capSQLiteResult>;
    isDatabase(options: capSQLiteOptions): Promise<capSQLiteResult>;
    isTableExists(options: capSQLiteTableOptions): Promise<capSQLiteResult>;
    deleteDatabase(options: capSQLiteOptions): Promise<void>;
    isJsonValid(options: capSQLiteImportOptions): Promise<capSQLiteResult>;
    importFromJson(options: capSQLiteImportOptions): Promise<capSQLiteChanges>;
    exportToJson(options: capSQLiteExportOptions): Promise<capSQLiteJson>;
    createSyncTable(options: capSQLiteOptions): Promise<capSQLiteChanges>;
    setSyncDate(options: capSQLiteSyncDateOptions): Promise<void>;
    getSyncDate(options: capSQLiteOptions): Promise<capSQLiteSyncDate>;
    deleteExportedRows(options: capSQLiteOptions): Promise<void>;
    addUpgradeStatement(options: capSQLiteUpgradeOptions): Promise<void>;
    copyFromAssets(options: capSQLiteFromAssetsOptions): Promise<void>;
    getFromHTTPRequest(options: capSQLiteHTTPOptions): Promise<void>;
    getDatabaseList(): Promise<capSQLiteValues>;
    /**
     * Checks if the `jeep-sqlite` element is present in the DOM.
     * If it's not in the DOM, this method throws an Error.
     *
     * Attention: This will always fail, if the `intWebStore()` method wasn't called before.
     */
    private ensureJeepSqliteIsAvailable;
    private ensureWebstoreIsOpen;
    getUrl(): Promise<capSQLiteUrl>;
    getMigratableDbList(options: capSQLitePathOptions): Promise<capSQLiteValues>;
    addSQLiteSuffix(options: capSQLitePathOptions): Promise<void>;
    deleteOldDatabases(options: capSQLitePathOptions): Promise<void>;
    moveDatabasesAndAddSuffix(options: capSQLitePathOptions): Promise<void>;
    isSecretStored(): Promise<capSQLiteResult>;
    setEncryptionSecret(options: capSetSecretOptions): Promise<void>;
    changeEncryptionSecret(options: capChangeSecretOptions): Promise<void>;
    clearEncryptionSecret(): Promise<void>;
    checkEncryptionSecret(options: capSetSecretOptions): Promise<capSQLiteResult>;
    getNCDatabasePath(options: capNCDatabasePathOptions): Promise<capNCDatabasePathResult>;
    createNCConnection(options: capNCConnectionOptions): Promise<void>;
    closeNCConnection(options: capNCOptions): Promise<void>;
    isNCDatabase(options: capNCOptions): Promise<capSQLiteResult>;
    isDatabaseEncrypted(options: capSQLiteOptions): Promise<capSQLiteResult>;
    isInConfigEncryption(): Promise<capSQLiteResult>;
    isInConfigBiometricAuth(): Promise<capSQLiteResult>;
    loadExtension(options: capSQLiteExtensionPath): Promise<void>;
    enableLoadExtension(options: capSQLiteExtensionEnable): Promise<void>;
}
