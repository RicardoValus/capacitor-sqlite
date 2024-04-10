import { registerPlugin } from '@capacitor/core';
const CapacitorSQLite = registerPlugin('CapacitorSQLite', {
    web: () => import('./web').then(m => new m.CapacitorSQLiteWeb()),
    electron: () => window.CapacitorCustomPlatform.plugins.CapacitorSQLite,
});
export { CapacitorSQLite };
export * from './definitions';
//# sourceMappingURL=index.js.map