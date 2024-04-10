import { ProjectConfiguration } from '../../config/workspace-json-project-json';
import { NxJsonConfiguration } from '../../config/nx-json';
import { ConfigurationResult } from './project-configuration-utils';
import { LoadedNxPlugin } from '../../utils/nx-plugin';
/**
 * Walks the workspace directory to create the `projectFileMap`, `ProjectConfigurations` and `allWorkspaceFiles`
 * @throws
 * @param workspaceRoot
 * @param nxJson
 */
export declare function retrieveWorkspaceFiles(workspaceRoot: string, projectRootMap: Record<string, string>): Promise<{
    allWorkspaceFiles: import("nx/src/devkit-exports").FileData[];
    fileMap: {
        projectFileMap: ProjectFiles;
        nonProjectFiles: import("nx/src/native").FileData[];
    };
    rustReferences: import("nx/src/native").NxWorkspaceFilesExternals;
}>;
/**
 * Walk through the workspace and return `ProjectConfigurations`. Only use this if the projectFileMap is not needed.
 *
 * @param workspaceRoot
 * @param nxJson
 */
export declare function retrieveProjectConfigurations(workspaceRoot: string, nxJson: NxJsonConfiguration): Promise<ConfigurationResult>;
export declare function retrieveProjectConfigurationsWithAngularProjects(workspaceRoot: string, nxJson: NxJsonConfiguration): Promise<ConfigurationResult>;
export declare function retrieveProjectConfigurationPaths(root: string, plugins: LoadedNxPlugin[]): string[];
export declare function retrieveProjectConfigurationsWithoutPluginInference(root: string): Promise<Record<string, ProjectConfiguration>>;
export declare function configurationGlobs(plugins: LoadedNxPlugin[]): string[];
