import { TargetConfiguration } from '../../config/workspace-json-project-json';
import { NxPluginV2 } from '../../utils/nx-plugin';
/**
 * This marks that a target provides information which should modify a target already registered
 * on the project via other plugins. If the target has not already been registered, and this symbol is true,
 * the information provided by it will be discarded.
 *
 * NOTE: This cannot be a symbol, as they are not serialized in JSON the communication
 * between the plugin-worker and the main process.
 */
export declare const ONLY_MODIFIES_EXISTING_TARGET = "NX_ONLY_MODIFIES_EXISTING_TARGET";
/**
 * This is used to override the source file for the target defaults plugin.
 * This allows the plugin to use the project files as the context, but point to nx.json as the source file.
 *
 * NOTE: This cannot be a symbol, as they are not serialized in JSON the communication
 * between the plugin-worker and the main process.
 */
export declare const OVERRIDE_SOURCE_FILE = "NX_OVERRIDE_SOURCE_FILE";
export declare const TargetDefaultsPlugin: NxPluginV2;
/**
 * This fn gets target info that would make a target uniquely compatible
 * with what is described by project.json or package.json. As the merge process
 * for config happens, without this, the target defaults may be compatible
 * with a config from a plugin and then that combined target be incompatible
 * with the project json configuration resulting in the target default values
 * being scrapped. By adding enough information from the project.json / package.json,
 * we can make sure that the target after merging is compatible with the defined target.
 */
export declare function getTargetInfo(target: string, projectJsonTargets: Record<string, TargetConfiguration>, packageJsonTargets: Record<string, TargetConfiguration>): {
    command: string;
    executor?: undefined;
    options?: undefined;
} | {
    executor: string;
    options: {
        command: any;
        commands?: undefined;
        script?: undefined;
    };
    command?: undefined;
} | {
    executor: string;
    options: {
        commands: any;
        command?: undefined;
        script?: undefined;
    };
    command?: undefined;
} | {
    executor: string;
    command?: undefined;
    options?: undefined;
} | {
    executor: string;
    options: {
        script: any;
        command?: undefined;
        commands?: undefined;
    };
    command?: undefined;
} | {
    command?: undefined;
    executor?: undefined;
    options?: undefined;
};
