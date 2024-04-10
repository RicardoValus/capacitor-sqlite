export declare class UtilsStore {
    static getDBFromStore(dbName: string, store: LocalForage): Promise<Uint8Array>;
    static setInitialDBToStore(dbName: string, store: LocalForage): Promise<void>;
    static setDBToStore(mDb: any, dbName: string, store: LocalForage): Promise<void>;
    static saveDBToStore(dbName: string, data: Uint8Array, store: LocalForage): Promise<void>;
    static removeDBFromStore(dbName: string, store: LocalForage): Promise<void>;
    static isDBInStore(dbName: string, store: LocalForage): Promise<boolean>;
    static restoreDBFromStore(dbName: string, prefix: string, store: LocalForage): Promise<void>;
    static copyDBToStore(dbName: string, toDb: string, store: LocalForage): Promise<void>;
    static getDBListFromStore(store: LocalForage): Promise<string[]>;
}
