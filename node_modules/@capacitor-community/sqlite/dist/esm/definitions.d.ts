/**
 * CapacitorSQLitePlugin Interface
 */
export interface CapacitorSQLitePlugin {
    /**
     * Initialize the web store
     *
     * @return Promise<void>
     * @since 3.2.3-1
     */
    initWebStore(): Promise<void>;
    /**
     * Save database to  the web store
     *
     * @param options: capSQLiteOptions
     * @return Promise<void>
     * @since 3.2.3-1
     */
    saveToStore(options: capSQLiteOptions): Promise<void>;
    /**
     * Get database from local disk and save it to store
     *
     * @param options: capSQLiteLocalDiskOptions
     * @return Promise<void>
     * @since 4.6.3
     */
    getFromLocalDiskToStore(options: capSQLiteLocalDiskOptions): Promise<void>;
    /**
     * Save database to local disk
     *
     * @param options: capSQLiteOptions
     * @return Promise<void>
     * @since 4.6.3
     */
    saveToLocalDisk(options: capSQLiteOptions): Promise<void>;
    /**
     * Check if a passphrase exists in a secure store
     *
     * @return Promise<capSQLiteResult>
     * @since 3.0.0-beta.13
     */
    isSecretStored(): Promise<capSQLiteResult>;
    /**
     * Store a passphrase in a secure store
     * Update the secret of previous encrypted databases with GlobalSQLite
     * !!! Only to be used once if you wish to encrypt database !!!
     *
     * @param options capSetSecretOptions
     * @return Promise<void>
     * @since 3.0.0-beta.13
     */
    setEncryptionSecret(options: capSetSecretOptions): Promise<void>;
    /**
     * Change the passphrase in a secure store
     * Update the secret of previous encrypted databases with passphrase
     * in secure store
     *
     * @param options capChangeSecretOptions
     * @return Promise<void>
     * @since 3.0.0-beta.13
     */
    changeEncryptionSecret(options: capChangeSecretOptions): Promise<void>;
    /**
     * Clear the passphrase in the secure store
     *
     * @return Promise<void>
     * @since 3.5.1
     */
    clearEncryptionSecret(): Promise<void>;
    /**
     * Check encryption passphrase
     *
     * @return Promise<capSQLiteResult>
     * @since 4.6.1
     */
    checkEncryptionSecret(options: capSetSecretOptions): Promise<capSQLiteResult>;
    /**
     * create a database connection
     * @param options capConnectionOptions
     * @return Promise<void>
     * @since 2.9.0 refactor
     */
    createConnection(options: capConnectionOptions): Promise<void>;
    /**
     * close a database connection
     * @param options capSQLiteOptions
     * @return Promise<void>
     * @since 2.9.0 refactor
     */
    closeConnection(options: capSQLiteOptions): Promise<void>;
    /**
     * Echo a given string
     *
     * @param options: capEchoOptions
     * @return Promise<capEchoResult>
     * @since 0.0.1
     */
    echo(options: capEchoOptions): Promise<capEchoResult>;
    /**
     * Opens a SQLite database.
     * Attention: This re-opens a database if it's already open!
     *
     * @param options: capSQLiteOptions
     * @returns Promise<void>
     * @since 0.0.1
     */
    open(options: capSQLiteOptions): Promise<void>;
    /**
     * Close a SQLite database
     * @param options: capSQLiteOptions
     * @returns Promise<void>
     * @since 0.0.1
     */
    close(options: capSQLiteOptions): Promise<void>;
    /**
     * Begin Database Transaction
     * @param options
     * @returns capSQLiteChanges
     * @since 5.0.7
     */
    beginTransaction(options: capSQLiteOptions): Promise<capSQLiteChanges>;
    /**
     * Commit Database Transaction
     * @param options
     * @returns capSQLiteChanges
     * @since 5.0.7
     */
    commitTransaction(options: capSQLiteOptions): Promise<capSQLiteChanges>;
    /**
     * Rollback Database Transaction
     * @param options
     * @returns capSQLiteChanges
     * @since 5.0.7
     */
    rollbackTransaction(options: capSQLiteOptions): Promise<capSQLiteChanges>;
    /**
     * Is Database Transaction Active
     * @param options
     * @returns capSQLiteResult
     * @since 5.0.7
     */
    isTransactionActive(options: capSQLiteOptions): Promise<capSQLiteResult>;
    /**
     * Load a SQlite extension
     * @param options :capSQLiteExtensionPath
     * @returns Promise<void>
     * @since 5.0.6
     */
    /**
     * Enable Or Disable Extension Loading
     * @param options
     * @returns Promise<void>
     * @since 5.0.6
     */
    /**
     * GetUrl get the database Url
     * @param options: capSQLiteOptions
     * @returns Promise<capSQLiteUrl>
     * @since 3.3.3-4
     */
    getUrl(options: capSQLiteOptions): Promise<capSQLiteUrl>;
    /**
     * Get a SQLite database version
     * @param options: capSQLiteOptions
     * @returns Promise<void>
     * @since 3.2.0
     */
    getVersion(options: capSQLiteOptions): Promise<capVersionResult>;
    /**
     * Execute a Batch of Raw Statements as String
     * @param options: capSQLiteExecuteOptions
     * @returns Promise<capSQLiteChanges>
     * @since 0.0.1
     */
    execute(options: capSQLiteExecuteOptions): Promise<capSQLiteChanges>;
    /**
     * Execute a Set of Raw Statements as Array of CapSQLiteSet
     * @param options: capSQLiteSetOptions
     * @returns Promise<capSQLiteChanges>
     * @since 2.2.0-2
     */
    executeSet(options: capSQLiteSetOptions): Promise<capSQLiteChanges>;
    /**
     * Execute a Single Statement
     * @param options: capSQLiteRunOptions
     * @returns Promise<capSQLiteChanges>
     * @since 0.0.1
     */
    run(options: capSQLiteRunOptions): Promise<capSQLiteChanges>;
    /**
     * Query a Single Statement
     * @param options: capSQLiteQueryOptions
     * @returns Promise<capSQLiteValues>
     * @since 0.0.1
     */
    query(options: capSQLiteQueryOptions): Promise<capSQLiteValues>;
    /**
     * Check if a SQLite database exists with opened connection
     * @param options: capSQLiteOptions
     * @returns Promise<capSQLiteResult>
     * @since 2.0.1-1
     */
    isDBExists(options: capSQLiteOptions): Promise<capSQLiteResult>;
    /**
     * Check if a SQLite database is opened
     * @param options: capSQLiteOptions
     * @returns Promise<capSQLiteResult>
     * @since 3.0.0-beta.5
     */
    isDBOpen(options: capSQLiteOptions): Promise<capSQLiteResult>;
    /**
     * Check if a SQLite database is encrypted
     * @param options: capSQLiteOptions
     * @returns Promise<capSQLiteResult>
     * @since 4.6.2-2
     */
    isDatabaseEncrypted(options: capSQLiteOptions): Promise<capSQLiteResult>;
    /**
     * Check encryption value in capacitor.config
     * @returns Promise<capSQLiteResult>
     * @since 4.6.2-2
     */
    isInConfigEncryption(): Promise<capSQLiteResult>;
    /**
     * Check encryption value in capacitor.config
     * @returns Promise<capSQLiteResult>
     * @since 4.6.2-2
     */
    isInConfigBiometricAuth(): Promise<capSQLiteResult>;
    /**
     * Check if a SQLite database exists without connection
     * @param options: capSQLiteOptions
     * @returns Promise<capSQLiteResult>
     * @since 3.0.0-beta.5
     */
    isDatabase(options: capSQLiteOptions): Promise<capSQLiteResult>;
    /**
     * Check if a table exists in a SQLite database
     * @param options: capSQLiteTableOptions
     * @returns Promise<capSQLiteResult>
     * @since 3.0.0-beta.5
     */
    isTableExists(options: capSQLiteTableOptions): Promise<capSQLiteResult>;
    /**
     * Delete a SQLite database
     * @param options: capSQLiteOptions
     * @returns Promise<void>
     * @since 0.0.1
     */
    deleteDatabase(options: capSQLiteOptions): Promise<void>;
    /**
     * Is Json Object Valid
     * @param options: capSQLiteImportOptions
     * @returns Promise<capSQLiteResult>
     * @since 2.0.1-1
     */
    isJsonValid(options: capSQLiteImportOptions): Promise<capSQLiteResult>;
    /**
     * Import from Json Object
     * @param options: capSQLiteImportOptions
     * @returns Promise<capSQLiteChanges>
     * @since 2.0.0-3
     */
    importFromJson(options: capSQLiteImportOptions): Promise<capSQLiteChanges>;
    /**
     * Export to Json Object
     * @param options: capSQLiteExportOptions
     * @returns Promise<capSQLiteJson>
     * @since 2.0.1-1
     */
    exportToJson(options: capSQLiteExportOptions): Promise<capSQLiteJson>;
    /**
     * Create a synchronization table
     * @param options: capSQLiteOptions
     * @returns Promise<capSQLiteChanges>
     * @since 2.0.1-1
     */
    createSyncTable(options: capSQLiteOptions): Promise<capSQLiteChanges>;
    /**
     * Set the synchronization date
     * @param options: capSQLiteSyncDateOptions
     * @returns Promise<void>
     * @since 2.0.1-1
     */
    setSyncDate(options: capSQLiteSyncDateOptions): Promise<void>;
    /**
     * Get the synchronization date
     * @param options: capSQLiteOptions
     * @returns Promise<capSQLiteSyncDate>
     * @since 2.9.0
     */
    getSyncDate(options: capSQLiteOptions): Promise<capSQLiteSyncDate>;
    /**
     * Remove rows with sql_deleted = 1 after an export
     * @param options
     * @returns Promise<void>
     * @since 3.4.3-2
     */
    deleteExportedRows(options: capSQLiteOptions): Promise<void>;
    /**
     * Add the upgrade Statement for database version upgrading
     * @param options: capSQLiteUpgradeOptions
     * @returns Promise<void>
     * @since 2.4.2-6 iOS & Electron 2.4.2-7 Android
     */
    addUpgradeStatement(options: capSQLiteUpgradeOptions): Promise<void>;
    /**
     * Copy databases from public/assets/databases folder to application databases folder
     * @param options: capSQLiteFromAssets  since 3.2.5-2
     * @returns Promise<void>
     * @since 2.9.0 refactor
     */
    copyFromAssets(options: capSQLiteFromAssetsOptions): Promise<void>;
    /**
     * Get database or zipped database(s) from url
     * @param options: capSQLiteHTTPOptions
     * @returns Promise<void>
     * @since 4.1.1
     */
    getFromHTTPRequest(options: capSQLiteHTTPOptions): Promise<void>;
    /**
     * Get the database list
     * @returns Promise<capSQLiteValues>
     * @since 3.0.0-beta.5
     */
    getDatabaseList(): Promise<capSQLiteValues>;
    /**
     * Get the database's table list
     * @param options
     * @returns Promise<capSQLiteValues>
     * @since 3.4.2-3
     */
    getTableList(options: capSQLiteOptions): Promise<capSQLiteValues>;
    /**
     * Get the Migratable database list
     * @param options: capSQLitePathOptions // only iOS & Android since 3.2.4-2
     * @returns Promise<capSQLiteValues>
     * @since 3.0.0-beta.5
     */
    getMigratableDbList(options: capSQLitePathOptions): Promise<capSQLiteValues>;
    /**
     * Add SQLIte Suffix to existing databases
     * @param options: capSQLitePathOptions
     * @returns Promise<void>
     * @since 3.0.0-beta.5
     */
    addSQLiteSuffix(options: capSQLitePathOptions): Promise<void>;
    /**
     * Delete Old Cordova databases
     * @param options: capSQLitePathOptions
     * @returns Promise<void>
     * @since 3.0.0-beta.5
     */
    deleteOldDatabases(options: capSQLitePathOptions): Promise<void>;
    /**
     * Moves databases to the location the plugin can read them, and adds sqlite suffix
     * This resembles calling addSQLiteSuffix and deleteOldDatabases, but it is more performant as it doesn't copy but moves the files
     * @param options: capSQLitePathOptions
     */
    moveDatabasesAndAddSuffix(options: capSQLitePathOptions): Promise<void>;
    /**
     * Check Connection Consistency JS <=> Native
     * return true : consistency, connections are opened
     * return false : no consistency, connections are closed
     * @param options: capAllConnectionsOptions
     * @returns Promise<capSQLiteResult>
     * @since 3.0.0-beta.11
     */
    checkConnectionsConsistency(options: capAllConnectionsOptions): Promise<capSQLiteResult>;
    /**
     * get a non conformed database path
     * @param options capNCDatabasePathOptions
     * @return Promise<capNCDatabasePathResult>
     * @since 3.3.3-1
     */
    getNCDatabasePath(options: capNCDatabasePathOptions): Promise<capNCDatabasePathResult>;
    /**
     * create a non conformed database connection
     * @param options capNCConnectionOptions
     * @return Promise<void>
     * @since 3.3.3-1
     */
    createNCConnection(options: capNCConnectionOptions): Promise<void>;
    /**
     * close a non conformed database connection
     * @param options capNCOptions
     * @return Promise<void>
     * @since 3.3.3-1
     */
    closeNCConnection(options: capNCOptions): Promise<void>;
    /**
     * Check if a non conformed database exists without connection
     * @param options: capNCOptions
     * @returns Promise<capSQLiteResult>
     * @since 3.3.3-1
     */
    isNCDatabase(options: capNCOptions): Promise<capSQLiteResult>;
}
export interface capSetSecretOptions {
    /**
     * The passphrase for Encrypted Databases
     */
    passphrase?: string;
}
export interface capChangeSecretOptions {
    /**
     * The new passphrase for Encrypted Databases
     */
    passphrase?: string;
    /**
     * The old passphrase for Encrypted Databases
     */
    oldpassphrase?: string;
}
export interface capEchoOptions {
    /**
     *  String to be echoed
     */
    value?: string;
}
export interface capSQLiteExtensionPath {
    /**
     * The database name
     */
    database?: string;
    /**
     * The extension path
     */
    path?: string;
    /**
     * ReadOnly / ReadWrite
     * default ReadWrite (false)
     * @since 4.1.0-7
     */
    readonly?: boolean;
}
export interface capSQLiteExtensionEnable {
    /**
     * The database name
     */
    database?: string;
    /**
     * The enabling toggle (1: ON, 0: OFF)
     */
    toggle?: boolean;
    /**
     * ReadOnly / ReadWrite
     * default ReadWrite (false)
     * @since 4.1.0-7
     */
    readonly?: boolean;
}
export interface capConnectionOptions {
    /**
     * The database name
     */
    database?: string;
    /**
     * The database  version
     */
    version?: number;
    /**
     * Set to true (database encryption) / false
     */
    encrypted?: boolean;
    /**
     * Set the mode for database encryption
     * ["encryption", "secret", "newsecret"]
     */
    mode?: string;
    /**
     * Set to true (database in read-only mode) / false
     */
    readonly?: boolean;
}
export interface capAllConnectionsOptions {
    /**
     * the dbName of all connections
     * @since 3.0.0-beta.10
     */
    dbNames?: string[];
    /**
     * the openMode ("RW" read&write, "RO" readonly) of all connections
     * @since 4.1.0
     */
    openModes?: string[];
}
export interface capSQLiteOptions {
    /**
     * The database name
     */
    database?: string;
    /**
     * Set to true (database in read-only mode) / false
     */
    readonly?: boolean;
}
export interface capNCDatabasePathOptions {
    /**
     * the database path
     */
    path?: string;
    /**
     * The database name
     */
    database?: string;
}
export interface capNCConnectionOptions {
    /**
     * The database path
     */
    databasePath?: string;
    /**
     * The database  version
     */
    version?: number;
}
export interface capNCOptions {
    /**
     * The database path
     */
    databasePath?: string;
}
export interface capSQLiteExecuteOptions {
    /**
     * The database name
     */
    database?: string;
    /**
     * The batch of raw SQL statements as string
     */
    statements?: string;
    /**
     * Enable / Disable transactions
     * default Enable (true)
     * @since 3.0.0-beta.10
     */
    transaction?: boolean;
    /**
     * ReadOnly / ReadWrite
     * default ReadWrite (false)
     * @since 4.1.0-7
     */
    readonly?: boolean;
    /**
     * Compatibility SQL92
     * !!! ELECTRON ONLY
     * default (true)
     * @since 5.0.7
     */
    isSQL92?: boolean;
}
export interface capSQLiteSetOptions {
    /**
     * The database name
     */
    database?: string;
    /**
     * The batch of raw SQL statements as Array of capSQLLiteSet
     */
    set?: capSQLiteSet[];
    /**
     * Enable / Disable transactions
     * default Enable (true)
     * @since 3.0.0-beta.10
     */
    transaction?: boolean;
    /**
     * ReadOnly / ReadWrite
     * default ReadWrite (false)
     * @since 4.1.0-7
     */
    readonly?: boolean;
    /**
     * return mode
     * default 'no'
     * value 'all'
     * value 'one' for Electron platform
     * @since 5.0.5-3
     */
    returnMode?: string;
    /**
     * Compatibility SQL92
     * !!! ELECTRON ONLY
     * default (true)
     * @since 5.0.7
     */
    isSQL92?: boolean;
}
export interface capSQLiteRunOptions {
    /**
     * The database name
     */
    database?: string;
    /**
     * A statement
     */
    statement?: string;
    /**
     * A set of values for a statement
     */
    values?: any[];
    /**
     * Enable / Disable transactions
     * default Enable (true)
     * @since 3.0.0-beta.10
     */
    transaction?: boolean;
    /**
     * ReadOnly / ReadWrite
     * default ReadWrite (false)
     * @since 4.1.0-7
     */
    readonly?: boolean;
    /**
     * return mode
     * default 'no'
     * value 'all'
     * value 'one' for Electron platform
     * @since 5.0.5-3
     */
    returnMode?: string;
    /**
     * Compatibility SQL92
     * !!! ELECTRON ONLY
     * default (true)
     * @since 5.0.7
     */
    isSQL92?: boolean;
}
export interface capSQLiteQueryOptions {
    /**
     * The database name
     */
    database?: string;
    /**
     * A statement
     */
    statement?: string;
    /**
     * A set of values for a statement
     * Change to any[]
     * @since 3.0.0-beta.11
     */
    values?: any[];
    /**
     * ReadOnly / ReadWrite
     * default ReadWrite (false)
     * @since 4.1.0-7
     */
    readonly?: boolean;
    /**
     * Compatibility SQL92
     * !!! ELECTRON ONLY
     * default (true)
     * @since 5.0.7
     */
    isSQL92?: boolean;
}
export interface capTask {
    /**
     * define task for executeTransaction
     * @since 5.6.3
     */
    /**
     * A SQLite statement
     */
    statement: string;
    /**
     * A set of values to bind to the statement (optional)
     */
    values?: any[];
}
export interface capSQLiteImportOptions {
    /**
     * Set the JSON object to import
     *
     */
    jsonstring?: string;
}
export interface capSQLiteExportOptions {
    /**
     * The database name
     */
    database?: string;
    /**
     * Set the mode to export JSON Object:
     * "full" or "partial"
     *
     */
    jsonexportmode?: string;
    /**
     * ReadOnly / ReadWrite
     * default ReadWrite (false)
     * @since 4.1.0-7
     */
    readonly?: boolean;
    /**
     * Encrypted
     * When your database is encrypted
     * Choose the export Json Object
     * Encrypted (true) / Unencrypted (false)
     * default false
     * @since 5.0.8
     */
    encrypted?: boolean;
}
export interface capSQLiteFromAssetsOptions {
    /**
     * Set the overwrite mode for the copy from assets
     * "true"/"false"  default to "true"
     *
     */
    overwrite?: boolean;
}
export interface capSQLiteLocalDiskOptions {
    /**
     * Set the overwrite mode for saving the database from local disk to store
     * "true"/"false"  default to "true"
     *
     */
    overwrite?: boolean;
}
export interface capSQLiteHTTPOptions {
    /**
     * The url of the database or the zipped database(s)
     */
    url?: string;
    /**
     * Set the overwrite mode for the copy from assets
     * "true"/"false"  default to "true"
     *
     */
    overwrite?: boolean;
}
export interface capSQLiteSyncDateOptions {
    /**
     * The database name
     */
    database?: string;
    /**
     * Set the synchronization date
     * Format yyyy-MM-dd'T'HH:mm:ss.SSSZ
     */
    syncdate?: string;
    /**
     * ReadOnly / ReadWrite
     * default ReadWrite (false)
     * @since 4.1.0-7
     */
    readonly?: boolean;
}
export interface capSQLiteSet {
    /**
     * A statement
     */
    statement?: string;
    /**
     * the data values list as an Array
     */
    values?: any[];
}
export interface capSQLiteUpgradeOptions {
    /**
     * The database name
     */
    database?: string;
    /**
     * The upgrade options for version upgrade
     * Array of length 1 to easiest the iOS plugin
     */
    upgrade?: capSQLiteVersionUpgrade[];
}
export interface capSQLitePathOptions {
    /**
     * The folder path of existing databases
     * If not given folder path is "default"
     */
    folderPath?: string;
    /**
     * The database name's list to be copied and/or deleted
     * since 3.2.4-1
     * If not given all databases in the specify folder path
     */
    dbNameList?: string[];
}
export interface capSQLiteTableOptions {
    /**
     * The database name
     */
    database?: string;
    /**
     * The table name
     */
    table?: string;
    /**
     * ReadOnly / ReadWrite
     * default ReadWrite (false)
     * @since 4.1.0-7
     */
    readonly?: boolean;
}
export interface capEchoResult {
    /**
     * String returned
     */
    value?: string;
}
export interface capNCDatabasePathResult {
    /**
     * String returned
     */
    path?: string;
}
export interface capVersionResult {
    /**
     * Number returned
     */
    version?: number;
}
export interface capSQLiteResult {
    /**
     * result set to true when successful else false
     */
    result?: boolean;
}
export interface capSQLiteUrl {
    /**
     * a returned url
     */
    url?: string;
}
export interface capSQLiteChanges {
    /**
     * a returned Changes
     */
    changes?: Changes;
}
export interface Changes {
    /**
     * the number of changes from an execute or run command
     */
    changes?: number;
    /**
     * the lastId created from a run command
     */
    lastId?: number;
    /**
     * values when RETURNING
     */
    values?: any[];
}
export interface capSQLiteValues {
    /**
     * the data values list as an Array
     * iOS the first row is the returned ios_columns name list
     */
    values?: any[];
}
export interface DBSQLiteValues {
    /**
     * the data values list as an Array
     */
    values?: any[];
}
export interface capSQLiteJson {
    /**
     * an export JSON object
     */
    export?: JsonSQLite;
}
export interface capSQLiteSyncDate {
    /**
     * the synchronization date
     */
    syncDate?: number;
}
export interface EncryptJson {
    /**
     * The encrypted JsonSQLite base64 string
     */
    expData: string;
}
export interface JsonSQLite {
    /**
     * The database name
     */
    database: string;
    /**
     *  The database version
     */
    version: number;
    /**
     * Delete the database prior to import (default false)
     */
    overwrite?: boolean;
    /**
     * Set to true (database encryption) / false
     */
    encrypted: boolean;
    /***
     * Set the mode
     * ["full", "partial"]
     */
    mode: string;
    /***
     * Array of Table (JsonTable)
     */
    tables: JsonTable[];
    /***
     * Array of View (JsonView)
     */
    views?: JsonView[];
}
export interface JsonTable {
    /**
     * The database name
     */
    name: string;
    /***
     * Array of Schema (JsonColumn)
     */
    schema?: JsonColumn[];
    /***
     * Array of Index (JsonIndex)
     */
    indexes?: JsonIndex[];
    /***
     * Array of Trigger (JsonTrigger)
     */
    triggers?: JsonTrigger[];
    /***
     * Array of Table data
     */
    values?: any[][];
}
export interface JsonColumn {
    /**
     * The column name
     */
    column?: string;
    /**
     * The column data (type, unique, ...)
     */
    value: string;
    /**
     * The column foreign key constraints
     */
    foreignkey?: string;
    /**
     * the column constraint
     */
    constraint?: string;
}
export interface JsonTrigger {
    /**
     * The trigger name
     */
    name: string;
    /**
     * The trigger time event fired
     */
    timeevent: string;
    /**
     * The trigger condition
     */
    condition?: string;
    /**
     * The logic of the trigger
     */
    logic: string;
}
export interface JsonIndex {
    /**
     * The index name
     */
    name: string;
    /**
     * The value of the index can have the following formats:
     * email
     * email ASC
     * email, MobileNumber
     * email ASC, MobileNumber DESC
     */
    value: string;
    /**
     * the mode (Optional)
     * UNIQUE
     */
    mode?: string;
}
export interface JsonView {
    /**
     * The view name
     */
    name: string;
    /**
     * The view create statement
     */
    value: string;
}
export interface capBiometricListener {
    /**
     * Biometric ready
     */
    result: boolean;
    message: string;
}
export interface capJsonProgressListener {
    /**
     * Progress message
     */
    progress?: string;
}
export interface capHttpRequestEndedListener {
    /**
     * Message
     */
    message?: string;
}
export interface capPickOrSaveDatabaseEndedListener {
    /**
     * Pick Database's name
     */
    db_name?: string;
    /**
     * Message
     */
    message?: string;
}
export interface capSQLiteVersionUpgrade {
    toVersion: number;
    statements: string[];
}
/**
 * SQLiteConnection Interface
 */
export interface ISQLiteConnection {
    /**
     * Init the web store
     * @returns Promise<void>
     * @since 3.2.3-1
     */
    initWebStore(): Promise<void>;
    /**
     * Save the datbase to the web store
     * @param database
     * @returns Promise<void>
     * @since 3.2.3-1
     */
    saveToStore(database: string): Promise<void>;
    /**
     * Get database from local disk and save it to store
     *
     * @param overwrite: boolean
     * @return Promise<void>
     * @since 4.6.3
     */
    getFromLocalDiskToStore(overwrite: boolean): Promise<void>;
    /**
     * Save database to local disk
     *
     * @param database: string
     * @return Promise<void>
     * @since 4.6.3
     */
    saveToLocalDisk(database: string): Promise<void>;
    /**
     * Echo a value
     * @param value
     * @returns Promise<capEchoResult>
     * @since 2.9.0 refactor
     */
    echo(value: string): Promise<capEchoResult>;
    /**
     * Check if a secret is stored
     * @returns Promise<capSQLiteResult>
     * @since 3.0.0-beta.13
     */
    isSecretStored(): Promise<capSQLiteResult>;
    /**
     * Set a passphrase in a secure store
     * @param passphrase
     * @returns Promise<void>
     * @since 3.0.0-beta.13
     */
    setEncryptionSecret(passphrase: string): Promise<void>;
    /**
     * Change the passphrase in a secure store
     * @param passphrase
     * @param oldpassphrase
     * @returns Promise<void>
     * @since 3.0.0-beta.13
     */
    changeEncryptionSecret(passphrase: string, oldpassphrase: string): Promise<void>;
    /**
     * Clear the passphrase in a secure store
     * @returns Promise<void>
     * @since 3.5.1
     */
    clearEncryptionSecret(): Promise<void>;
    /**
     * Check the passphrase stored in a secure store
     * @param oldPassphrase
     * @returns Promise<capSQLiteResult>
     * @since 4.6.1
     */
    checkEncryptionSecret(passphrase: string): Promise<capSQLiteResult>;
    /**
     * Add the upgrade Statement for database version upgrading
     * @param database
     * @param upgrade @since 5.6.4
     * @returns Promise<void>
     * @since 2.9.0 refactor
     */
    addUpgradeStatement(database: string, upgrade: capSQLiteVersionUpgrade[]): Promise<void>;
    /**
     * Create a connection to a database
     * @param database
     * @param encrypted
     * @param mode
     * @param version
     * @param readonly
     * @returns Promise<SQLiteDBConnection>
     * @since 2.9.0 refactor
     */
    createConnection(database: string, encrypted: boolean, mode: string, version: number, readonly: boolean): Promise<SQLiteDBConnection>;
    /**
     * Check if a connection exists
     * @param database
     * @param readonly
     * @returns Promise<capSQLiteResult>
     * @since 3.0.0-beta.5
     */
    isConnection(database: string, readonly: boolean): Promise<capSQLiteResult>;
    /**
     * Retrieve an existing database connection
     * @param database
     * @param readonly
     * @returns Promise<SQLiteDBConnection>
     * @since 2.9.0 refactor
     */
    retrieveConnection(database: string, readonly: boolean): Promise<SQLiteDBConnection>;
    /**
     * Retrieve all database connections
     * @returns Promise<Map<string, SQLiteDBConnection>>
     * @since 2.9.0 refactor
     */
    retrieveAllConnections(): Promise<Map<string, SQLiteDBConnection>>;
    /**
     * Close a database connection
     * @param database
     * @param readonly
     * @returns Promise<void>
     * @since 2.9.0 refactor
     */
    closeConnection(database: string, readonly: boolean): Promise<void>;
    /**
     * Close all database connections
     * @returns Promise<void>
     * @since 2.9.0 refactor
     */
    closeAllConnections(): Promise<void>;
    /**
     * Check the consistency between Js Connections
     * and Native Connections
     * if inconsistency all connections are removed
     * @returns Promise<capSQLiteResult>
     * @since 3.0.0-beta.10
     */
    checkConnectionsConsistency(): Promise<capSQLiteResult>;
    /**
     * get a non-conformed database path
     * @param path
     * @param database
     * @returns Promise<capNCDatabasePathResult>
     * @since 3.3.3-1
     */
    getNCDatabasePath(path: string, database: string): Promise<capNCDatabasePathResult>;
    /**
     * Create a non-conformed database connection
     * @param databasePath
     * @param version
     * @returns Promise<SQLiteDBConnection>
     * @since 3.3.3-1
     */
    createNCConnection(databasePath: string, version: number): Promise<SQLiteDBConnection>;
    /**
     * Close a non-conformed database connection
     * @param databasePath
     * @returns Promise<void>
     * @since 3.3.3-1
     */
    closeNCConnection(databasePath: string): Promise<void>;
    /**
     * Check if a non-conformed databaseconnection exists
     * @param databasePath
     * @returns Promise<capSQLiteResult>
     * @since 3.3.3-1
     */
    isNCConnection(databasePath: string): Promise<capSQLiteResult>;
    /**
     * Retrieve an existing non-conformed database connection
     * @param databasePath
     * @returns Promise<SQLiteDBConnection>
     * @since 3.3.3-1
     */
    retrieveNCConnection(databasePath: string): Promise<SQLiteDBConnection>;
    /**
     * Import a database From a JSON
     * @param jsonstring string
     * @returns Promise<capSQLiteChanges>
     * @since 2.9.0 refactor
     */
    importFromJson(jsonstring: string): Promise<capSQLiteChanges>;
    /**
     * Check the validity of a JSON Object
     * @param jsonstring string
     * @returns Promise<capSQLiteResult>
     * @since 2.9.0 refactor
     */
    isJsonValid(jsonstring: string): Promise<capSQLiteResult>;
    /**
     * Copy databases from public/assets/databases folder to application databases folder
     * @param overwrite  since 3.2.5-2
     * @returns Promise<void>
     * @since 2.9.0 refactor
     */
    copyFromAssets(overwrite?: boolean): Promise<void>;
    /**
     *
     * @param url
     * @param overwrite
     * @returns Promise<void>
     * @since 4.1.1
     */
    getFromHTTPRequest(url?: string, overwrite?: boolean): Promise<void>;
    /**
     * Check if a SQLite database is encrypted
     * @param options: capSQLiteOptions
     * @returns Promise<capSQLiteResult>
     * @since 4.6.2-2
     */
    isDatabaseEncrypted(database: string): Promise<capSQLiteResult>;
    /**
     * Check encryption value in capacitor.config
     * @returns Promise<capSQLiteResult>
     * @since 4.6.2-2
     */
    isInConfigEncryption(): Promise<capSQLiteResult>;
    /**
     * Check encryption value in capacitor.config
     * @returns Promise<capSQLiteResult>
     * @since 4.6.2-2
     */
    isInConfigBiometricAuth(): Promise<capSQLiteResult>;
    /**
     * Check if a database exists
     * @param database
     * @returns Promise<capSQLiteResult>
     * @since 3.0.0-beta.5
     */
    isDatabase(database: string): Promise<capSQLiteResult>;
    /**
     * Check if a non conformed database exists
     * @param databasePath
     * @returns Promise<capSQLiteResult>
     * @since 3.3.3-1
     */
    isNCDatabase(databasePath: string): Promise<capSQLiteResult>;
    /**
     * Get the database list
     * @returns Promise<capSQLiteValues>
     * @since 3.0.0-beta.5
     */
    getDatabaseList(): Promise<capSQLiteValues>;
    /**
     * Get the Migratable database list
     * @param folderPath: string // only iOS & Android since 3.2.4-2
     * @returns Promise<capSQLiteValues>
     * @since 3.0.0-beta.5
     */
    getMigratableDbList(folderPath?: string): Promise<capSQLiteValues>;
    /**
     * Add SQLIte Suffix to existing databases
     * @param folderPath
     * @param dbNameList since 3.2.4-1
     * @returns Promise<void>
     * @since 3.0.0-beta.5
     */
    addSQLiteSuffix(folderPath?: string, dbNameList?: string[]): Promise<void>;
    /**
     * Delete Old Cordova databases
     * @param folderPath
     * @param dbNameList since 3.2.4-1
     * @returns Promise<void>
     * @since 3.0.0-beta.5
     */
    deleteOldDatabases(folderPath?: string, dbNameList?: string[]): Promise<void>;
    /**
     * Moves databases to the location the plugin can read them, and adds sqlite suffix
     * This resembles calling addSQLiteSuffix and deleteOldDatabases, but it is more performant as it doesn't copy but moves the files
     * @param folderPath the origin from where to move the databases
     * @param dbNameList the names of the databases to move, check out the getMigratableDbList to get a list, an empty list will result in copying all the databases with '.db' extension.
     */
    moveDatabasesAndAddSuffix(folderPath?: string, dbNameList?: string[]): Promise<void>;
}
/**
 * SQLiteConnection Class
 */
export declare class SQLiteConnection implements ISQLiteConnection {
    private sqlite;
    private _connectionDict;
    constructor(sqlite: any);
    initWebStore(): Promise<void>;
    saveToStore(database: string): Promise<void>;
    saveToLocalDisk(database: string): Promise<void>;
    getFromLocalDiskToStore(overwrite?: boolean): Promise<void>;
    echo(value: string): Promise<capEchoResult>;
    isSecretStored(): Promise<capSQLiteResult>;
    setEncryptionSecret(passphrase: string): Promise<void>;
    changeEncryptionSecret(passphrase: string, oldpassphrase: string): Promise<void>;
    clearEncryptionSecret(): Promise<void>;
    checkEncryptionSecret(passphrase: string): Promise<capSQLiteResult>;
    addUpgradeStatement(database: string, upgrade: capSQLiteVersionUpgrade[]): Promise<void>;
    createConnection(database: string, encrypted: boolean, mode: string, version: number, readonly: boolean): Promise<SQLiteDBConnection>;
    closeConnection(database: string, readonly: boolean): Promise<void>;
    isConnection(database: string, readonly: boolean): Promise<capSQLiteResult>;
    retrieveConnection(database: string, readonly: boolean): Promise<SQLiteDBConnection>;
    getNCDatabasePath(path: string, database: string): Promise<capNCDatabasePathResult>;
    createNCConnection(databasePath: string, version: number): Promise<SQLiteDBConnection>;
    closeNCConnection(databasePath: string): Promise<void>;
    isNCConnection(databasePath: string): Promise<capSQLiteResult>;
    retrieveNCConnection(databasePath: string): Promise<SQLiteDBConnection>;
    isNCDatabase(databasePath: string): Promise<capSQLiteResult>;
    retrieveAllConnections(): Promise<Map<string, SQLiteDBConnection>>;
    closeAllConnections(): Promise<void>;
    checkConnectionsConsistency(): Promise<capSQLiteResult>;
    importFromJson(jsonstring: string): Promise<capSQLiteChanges>;
    isJsonValid(jsonstring: string): Promise<capSQLiteResult>;
    copyFromAssets(overwrite?: boolean): Promise<void>;
    getFromHTTPRequest(url: string, overwrite?: boolean): Promise<void>;
    isDatabaseEncrypted(database: string): Promise<capSQLiteResult>;
    isInConfigEncryption(): Promise<capSQLiteResult>;
    isInConfigBiometricAuth(): Promise<capSQLiteResult>;
    isDatabase(database: string): Promise<capSQLiteResult>;
    getDatabaseList(): Promise<capSQLiteValues>;
    getMigratableDbList(folderPath?: string): Promise<capSQLiteValues>;
    addSQLiteSuffix(folderPath?: string, dbNameList?: string[]): Promise<void>;
    deleteOldDatabases(folderPath?: string, dbNameList?: string[]): Promise<void>;
    moveDatabasesAndAddSuffix(folderPath?: string, dbNameList?: string[]): Promise<void>;
}
/**
 * SQLiteDBConnection Interface
 */
export interface ISQLiteDBConnection {
    /**
     * Get SQLite DB Connection DB name
     * @returns string
     * @since 2.9.0 refactor
     */
    getConnectionDBName(): string;
    /**
     * Get SQLite DB Connection read-only mode
     * @returns boolean
     * @since 4.1.0
     */
    getConnectionReadOnly(): boolean;
    /**
     * Open a SQLite DB Connection
     * @returns Promise<void>
     * @since 2.9.0 refactor
     */
    open(): Promise<void>;
    /**
     * Close a SQLite DB Connection
     * @returns Promise<void>
     * @since 2.9.0 refactor
     */
    close(): Promise<void>;
    /**
     * Begin Database Transaction
     * @returns capSQLiteChanges
     * @since 5.0.7
     */
    beginTransaction(): Promise<capSQLiteChanges>;
    /**
     * Commit Database Transaction
     * @returns capSQLiteChanges
     * @since 5.0.7
     */
    commitTransaction(): Promise<capSQLiteChanges>;
    /**
     * Rollback Database Transaction
     * @returns capSQLiteChanges
     * @since 5.0.7
     */
    rollbackTransaction(): Promise<capSQLiteChanges>;
    /**
     * Is Database Transaction Active
     * @returns capSQLiteResult
     * @since 5.0.7
     */
    isTransactionActive(): Promise<capSQLiteResult>;
    /**
     * Get Database Url
     * @returns Promise<capSQLiteUrl>
     * @since 3.3.3-4
     */
    getUrl(): Promise<capSQLiteUrl>;
    /**
     * Get the a SQLite DB Version
     * @returns Promise<capVersionResult>
     * @since 3.2.0
     */
    getVersion(): Promise<capVersionResult>;
    /**
     * Load a SQlite extension
     * @param path :SQlite extension path
     * @returns Promise<void>
     * @since 5.0.6
     */
    loadExtension(path: string): Promise<void>;
    /**
     * Enable Or Disable Extension Loading
     * @param toggle true:on false:off
     * @returns Promise<void>
     * @since 5.0.6
     */
    enableLoadExtension(toggle: boolean): Promise<void>;
    /**
     * Execute SQLite DB Connection Statements
     * @param statements
     * @param transaction (optional)
     * @param isSQL92 (optional)
     * @returns Promise<capSQLiteChanges>
     * @since 2.9.0 refactor
     */
    execute(statements: string, transaction?: boolean, isSQL92?: boolean): Promise<capSQLiteChanges>;
    /**
     * Execute SQLite DB Connection Query
     * @param statement
     * @param values (optional)
     * @param isSQL92 (optional)
     * @returns Promise<Promise<DBSQLiteValues>
     * @since 2.9.0 refactor
     */
    query(statement: string, values?: any[], isSQL92?: boolean): Promise<DBSQLiteValues>;
    /**
     * Execute SQLite DB Connection Raw Statement
     * @param statement
     * @param values (optional)
     * @param transaction (optional)
     * @param returnMode (optional)
     * @param isSQL92 (optional)
     * @returns Promise<capSQLiteChanges>
     * @since 2.9.0 refactor
     */
    run(statement: string, values?: any[], transaction?: boolean, returnMode?: string, isSQL92?: boolean): Promise<capSQLiteChanges>;
    /**
     * Execute SQLite DB Connection Set
     * @param set
     * @param transaction (optional)
     * @param returnMode (optional)
     * @param isSQL92 (optional)
     * @returns Promise<capSQLiteChanges>
     * @since 2.9.0 refactor
     */
    executeSet(set: capSQLiteSet[], transaction?: boolean, returnMode?: string, isSQL92?: boolean): Promise<capSQLiteChanges>;
    /**
     * Check if a SQLite DB Connection exists
     * @returns Promise<capSQLiteResult>
     * @since 2.9.0 refactor
     */
    isExists(): Promise<capSQLiteResult>;
    /**
     * Check if a SQLite database is opened
     * @returns Promise<capSQLiteResult>
     * @since 3.0.0-beta.5
     */
    isDBOpen(): Promise<capSQLiteResult>;
    /**
     * Check if a table exists
     * @returns Promise<capSQLiteResult>
     * @since 3.0.0-beta.5
     */
    isTable(table: string): Promise<capSQLiteResult>;
    /**
     * Get database's table list
     * @since 3.4.2-3
     */
    getTableList(): Promise<DBSQLiteValues>;
    /**
     * Delete a SQLite DB Connection
     * @returns Promise<void>
     * @since 2.9.0 refactor
     */
    delete(): Promise<void>;
    /**
     * Create a synchronization table
     * @returns Promise<capSQLiteChanges>
     * @since 2.9.0 refactor
     */
    createSyncTable(): Promise<capSQLiteChanges>;
    /**
     * Set the synchronization date
     * @param syncdate
     * @returns Promise<void>
     * @since 2.9.0 refactor
     */
    setSyncDate(syncdate: string): Promise<void>;
    /**
     * Get the synchronization date
     * @returns Promise<capSQLiteSyncDate>
     * @since 2.9.0 refactor
     */
    getSyncDate(): Promise<string>;
    /**
     * Export the given database to a JSON Object
     * @param mode
     * @param encrypted (optional) since 5.0.8 not for Web platform
     * @returns Promise<capSQLiteJson>
     * @since 2.9.0 refactor
     */
    exportToJson(mode: string, encrypted?: boolean): Promise<capSQLiteJson>;
    /**
     * Remove rows with sql_deleted = 1 after an export
     * @returns Promise<void>
     * @since 3.4.3-2
     */
    deleteExportedRows(): Promise<void>;
    /**
     *
     * @param txn
     * @param isSQL92
     * @returns Promise<capSQLiteChanges> since 5.0.7
     * @since 3.4.0
     */
    executeTransaction(txn: capTask[], isSQL92: boolean): Promise<capSQLiteChanges>;
}
/**
 * SQLiteDBConnection Class
 */
export declare class SQLiteDBConnection implements ISQLiteDBConnection {
    private dbName;
    private readonly;
    private sqlite;
    constructor(dbName: string, readonly: boolean, sqlite: any);
    getConnectionDBName(): string;
    getConnectionReadOnly(): boolean;
    open(): Promise<void>;
    close(): Promise<void>;
    beginTransaction(): Promise<capSQLiteChanges>;
    commitTransaction(): Promise<capSQLiteChanges>;
    rollbackTransaction(): Promise<capSQLiteChanges>;
    isTransactionActive(): Promise<capSQLiteResult>;
    loadExtension(path: string): Promise<void>;
    enableLoadExtension(toggle: boolean): Promise<void>;
    getUrl(): Promise<capSQLiteUrl>;
    getVersion(): Promise<capVersionResult>;
    getTableList(): Promise<DBSQLiteValues>;
    execute(statements: string, transaction?: boolean, isSQL92?: boolean): Promise<capSQLiteChanges>;
    query(statement: string, values?: any[], isSQL92?: boolean): Promise<DBSQLiteValues>;
    run(statement: string, values?: any[], transaction?: boolean, returnMode?: string, isSQL92?: boolean): Promise<capSQLiteChanges>;
    executeSet(set: capSQLiteSet[], transaction?: boolean, returnMode?: string, isSQL92?: boolean): Promise<capSQLiteChanges>;
    isExists(): Promise<capSQLiteResult>;
    isTable(table: string): Promise<capSQLiteResult>;
    isDBOpen(): Promise<capSQLiteResult>;
    delete(): Promise<void>;
    createSyncTable(): Promise<capSQLiteChanges>;
    setSyncDate(syncdate: string): Promise<void>;
    getSyncDate(): Promise<string>;
    exportToJson(mode: string, encrypted?: boolean): Promise<capSQLiteJson>;
    deleteExportedRows(): Promise<void>;
    executeTransaction(txn: capTask[], isSQL92?: boolean): Promise<capSQLiteChanges>;
    private reorderRows;
}
