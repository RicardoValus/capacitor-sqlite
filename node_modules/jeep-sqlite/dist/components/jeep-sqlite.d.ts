import type { Components, JSX } from "../types/components";

interface JeepSqlite extends Components.JeepSqlite, HTMLElement {}
export const JeepSqlite: {
    prototype: JeepSqlite;
    new (): JeepSqlite;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
