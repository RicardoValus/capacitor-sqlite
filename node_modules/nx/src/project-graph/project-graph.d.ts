import { ProcessDependenciesError, ProcessProjectGraphError } from './build-project-graph';
import { ProjectGraph } from '../config/project-graph';
import { ProjectConfiguration, ProjectsConfigurations } from '../config/workspace-json-project-json';
import { ConfigurationSourceMaps, CreateNodesError, MergeNodesError } from './utils/project-configuration-utils';
import { DaemonProjectGraphError } from '../daemon/daemon-project-graph-error';
/**
 * Synchronously reads the latest cached copy of the workspace's ProjectGraph.
 * @throws {Error} if there is no cached ProjectGraph to read from
 */
export declare function readCachedProjectGraph(): ProjectGraph;
export declare function readCachedProjectConfiguration(projectName: string): ProjectConfiguration;
/**
 * Get the {@link ProjectsConfigurations} from the {@link ProjectGraph}
 */
export declare function readProjectsConfigurationFromProjectGraph(projectGraph: ProjectGraph): ProjectsConfigurations;
export declare function buildProjectGraphAndSourceMapsWithoutDaemon(): Promise<{
    projectGraph: ProjectGraph;
    sourceMaps: ConfigurationSourceMaps;
}>;
export declare class ProjectGraphError extends Error {
    #private;
    constructor(errors: Array<CreateNodesError | MergeNodesError | ProcessDependenciesError | ProcessProjectGraphError>, partialProjectGraph: ProjectGraph, partialSourceMaps: ConfigurationSourceMaps);
    /**
     * The daemon cannot throw errors which contain methods as they are not serializable.
     *
     * This method creates a new {@link ProjectGraphError} from a {@link DaemonProjectGraphError} with the methods based on the same serialized data.
     */
    static fromDaemonProjectGraphError(e: DaemonProjectGraphError): ProjectGraphError;
    /**
     * This gets the partial project graph despite the errors which occured.
     * This partial project graph may be missing nodes, properties of nodes, or dependencies.
     * This is useful mostly for visualization/debugging. It should not be used for running tasks.
     */
    getPartialProjectGraph(): ProjectGraph;
    getPartialSourcemaps(): ConfigurationSourceMaps;
    getErrors(): (ProcessDependenciesError | ProcessProjectGraphError | CreateNodesError)[];
}
/**
 * Computes and returns a ProjectGraph.
 *
 * Nx will compute the graph either in a daemon process or in the current process.
 *
 * Nx will compute it in the current process if:
 * * The process is running in CI (CI env variable is to true or other common variables used by CI providers are set).
 * * It is running in the docker container.
 * * The daemon process is disabled because of the previous error when starting the daemon.
 * * `NX_DAEMON` is set to `false`.
 * * `useDaemonProcess` is set to false in the options of the tasks runner inside `nx.json`
 *
 * `NX_DAEMON` env variable takes precedence:
 * * If it is set to true, the daemon will always be used.
 * * If it is set to false, the graph will always be computed in the current process.
 *
 * Tip: If you want to debug project graph creation, run your command with NX_DAEMON=false.
 *
 * Nx uses two layers of caching: the information about explicit dependencies stored on the disk and the information
 * stored in the daemon process. To reset both run: `nx reset`.
 */
export declare function createProjectGraphAsync(opts?: {
    exitOnError: boolean;
    resetDaemonClient?: boolean;
}): Promise<ProjectGraph>;
export declare function createProjectGraphAndSourceMapsAsync(opts?: {
    exitOnError: boolean;
    resetDaemonClient?: boolean;
}): Promise<{
    projectGraph: ProjectGraph;
    sourceMaps: ConfigurationSourceMaps;
}>;
