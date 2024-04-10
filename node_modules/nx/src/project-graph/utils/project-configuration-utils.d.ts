import { NxJsonConfiguration, TargetDefaults } from '../../config/nx-json';
import { ProjectGraphExternalNode } from '../../config/project-graph';
import { ProjectConfiguration, TargetConfiguration } from '../../config/workspace-json-project-json';
import { LoadedNxPlugin } from '../../utils/nx-plugin';
import { ONLY_MODIFIES_EXISTING_TARGET } from '../../plugins/target-defaults/target-defaults-plugin';
export type SourceInformation = [file: string, plugin: string];
export type ConfigurationSourceMaps = Record<string, Record<string, SourceInformation>>;
export declare function mergeProjectConfigurationIntoRootMap(projectRootMap: Map<string, ProjectConfiguration>, project: ProjectConfiguration & {
    targets?: Record<string, TargetConfiguration & {
        [ONLY_MODIFIES_EXISTING_TARGET]?: boolean;
    }>;
}, configurationSourceMaps?: ConfigurationSourceMaps, sourceInformation?: SourceInformation, skipCommandNormalization?: boolean): void;
export type ConfigurationResult = {
    projects: Record<string, ProjectConfiguration>;
    externalNodes: Record<string, ProjectGraphExternalNode>;
    projectRootMap: Record<string, string>;
    sourceMaps: ConfigurationSourceMaps;
};
/**
 * Transforms a list of project paths into a map of project configurations.
 *
 * @param root The workspace root
 * @param nxJson The NxJson configuration
 * @param workspaceFiles A list of non-ignored workspace files
 * @param plugins The plugins that should be used to infer project configuration
 */
export declare function createProjectConfigurations(root: string, nxJson: NxJsonConfiguration, workspaceFiles: string[], // making this parameter allows devkit to pick up newly created projects
plugins: LoadedNxPlugin[]): Promise<ConfigurationResult>;
export declare function readProjectConfigurationsFromRootMap(projectRootMap: Map<string, ProjectConfiguration>): Record<string, ProjectConfiguration>;
export declare class ProjectConfigurationsError extends Error {
    readonly errors: Array<MergeNodesError | CreateNodesError>;
    readonly partialProjectConfigurationsResult: ConfigurationResult;
    constructor(errors: Array<MergeNodesError | CreateNodesError>, partialProjectConfigurationsResult: ConfigurationResult);
}
export declare class CreateNodesError extends Error {
    file: string;
    pluginName: string;
    constructor({ file, pluginName, error, }: {
        file: string;
        pluginName: string;
        error: Error;
    });
}
export declare class MergeNodesError extends Error {
    file: string;
    pluginName: string;
    constructor({ file, pluginName, error, }: {
        file: string;
        pluginName: string;
        error: Error;
    });
}
/**
 * Merges two targets.
 *
 * Most properties from `target` will overwrite any properties from `baseTarget`.
 * Options and configurations are treated differently - they are merged together if the executor definition is compatible.
 *
 * @param target The target definition with higher priority
 * @param baseTarget The target definition that should be overwritten. Can be undefined, in which case the target is returned as-is.
 * @param projectConfigSourceMap The source map to be filled with metadata about where each property came from
 * @param sourceInformation The metadata about where the new target was defined
 * @param targetIdentifier The identifier for the target to merge, used for source map
 * @returns A merged target configuration
 */
export declare function mergeTargetConfigurations(target: TargetConfiguration, baseTarget?: TargetConfiguration, projectConfigSourceMap?: Record<string, SourceInformation>, sourceInformation?: SourceInformation, targetIdentifier?: string): TargetConfiguration;
/**
 * Checks if targets options are compatible - used when merging configurations
 * to avoid merging options for @nx/js:tsc into something like @nx/webpack:webpack.
 *
 * If the executors are both specified and don't match, the options aren't considered
 * "compatible" and shouldn't be merged.
 */
export declare function isCompatibleTarget(a: TargetConfiguration, b: TargetConfiguration): boolean;
export declare function resolveNxTokensInOptions<T extends Object | Array<unknown>>(object: T, project: ProjectConfiguration, key: string): T;
export declare function readTargetDefaultsForTarget(targetName: string, targetDefaults: TargetDefaults, executor?: string): TargetDefaults[string];
