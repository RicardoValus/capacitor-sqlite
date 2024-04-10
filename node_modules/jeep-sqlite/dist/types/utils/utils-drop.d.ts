export declare class UtilsDrop {
    static getTablesNames(db: any): Promise<string[]>;
    static getViewsNames(mDb: any): Promise<string[]>;
    static dropElements(db: any, type: string): Promise<void>;
    static dropAll(db: any): Promise<void>;
    static dropTempTables(db: any, alterTables: Record<string, string[]>): Promise<void>;
}
