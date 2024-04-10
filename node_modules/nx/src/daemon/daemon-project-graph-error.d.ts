import { ProjectGraph } from '../config/project-graph';
import { ConfigurationSourceMaps } from '../project-graph/utils/project-configuration-utils';
export declare class DaemonProjectGraphError extends Error {
    errors: any[];
    readonly projectGraph: ProjectGraph;
    readonly sourceMaps: ConfigurationSourceMaps;
    constructor(errors: any[], projectGraph: ProjectGraph, sourceMaps: ConfigurationSourceMaps);
}
