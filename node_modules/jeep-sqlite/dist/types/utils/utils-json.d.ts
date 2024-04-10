import { JsonColumn, JsonIndex, JsonTrigger, JsonView } from '../interfaces/interfaces';
export declare class UtilsJSON {
    static isJsonSQLite(obj: any): Promise<boolean>;
    static isTable(obj: any): Promise<boolean>;
    static isSchema(obj: any): Promise<boolean>;
    static isIndexes(obj: any): Promise<boolean>;
    static isTriggers(obj: any): Promise<boolean>;
    static isView(obj: any): Promise<boolean>;
    static checkSchemaValidity(schema: JsonColumn[]): Promise<void>;
    static checkIndexesValidity(indexes: JsonIndex[]): Promise<void>;
    static checkTriggersValidity(triggers: JsonTrigger[]): Promise<void>;
    static checkViewsValidity(views: JsonView[]): Promise<void>;
    static getTableColumnNamesTypes(db: any, tableName: string): Promise<any>;
    static getValues(db: any, query: string, tableName: string): Promise<any[]>;
}
