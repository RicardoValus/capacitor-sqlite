"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readTargetDefaultsForTarget = exports.resolveNxTokensInOptions = exports.isCompatibleTarget = exports.mergeTargetConfigurations = exports.MergeNodesError = exports.CreateNodesError = exports.ProjectConfigurationsError = exports.readProjectConfigurationsFromRootMap = exports.createProjectConfigurations = exports.mergeProjectConfigurationIntoRootMap = void 0;
const logger_1 = require("../../utils/logger");
const fileutils_1 = require("../../utils/fileutils");
const workspace_root_1 = require("../../utils/workspace-root");
const target_defaults_plugin_1 = require("../../plugins/target-defaults/target-defaults-plugin");
const minimatch_1 = require("minimatch");
const path_1 = require("path");
const perf_hooks_1 = require("perf_hooks");
function mergeProjectConfigurationIntoRootMap(projectRootMap, project, configurationSourceMaps, sourceInformation, 
// This function is used when reading project configuration
// in generators, where we don't want to do this.
skipCommandNormalization) {
    if (configurationSourceMaps && !configurationSourceMaps[project.root]) {
        configurationSourceMaps[project.root] = {};
    }
    const sourceMap = configurationSourceMaps?.[project.root];
    let matchingProject = projectRootMap.get(project.root);
    if (!matchingProject) {
        projectRootMap.set(project.root, {
            root: project.root,
        });
        matchingProject = projectRootMap.get(project.root);
        if (sourceMap) {
            sourceMap[`root`] = sourceInformation;
        }
    }
    // This handles top level properties that are overwritten.
    // e.g. `srcRoot`, `projectType`, or other fields that shouldn't be extended
    // Note: `name` is set specifically here to keep it from changing. The name is
    // always determined by the first inference plugin to ID a project, unless it has
    // a project.json in which case it was already updated above.
    const updatedProjectConfiguration = {
        ...matchingProject,
    };
    for (const k in project) {
        if (![
            'tags',
            'implicitDependencies',
            'generators',
            'targets',
            'metadata',
            'namedInputs',
        ].includes(k)) {
            updatedProjectConfiguration[k] = project[k];
            if (sourceMap) {
                sourceMap[`${k}`] = sourceInformation;
            }
        }
    }
    // The next blocks handle properties that should be themselves merged (e.g. targets, tags, and implicit dependencies)
    if (project.tags) {
        updatedProjectConfiguration.tags = Array.from(new Set((matchingProject.tags ?? []).concat(project.tags)));
        if (sourceMap) {
            sourceMap['tags'] ??= sourceInformation;
            project.tags.forEach((tag) => {
                sourceMap[`tags.${tag}`] = sourceInformation;
            });
        }
    }
    if (project.implicitDependencies) {
        updatedProjectConfiguration.implicitDependencies = (matchingProject.implicitDependencies ?? []).concat(project.implicitDependencies);
        if (sourceMap) {
            sourceMap['implicitDependencies'] ??= sourceInformation;
            project.implicitDependencies.forEach((implicitDependency) => {
                sourceMap[`implicitDependencies.${implicitDependency}`] =
                    sourceInformation;
            });
        }
    }
    if (project.generators) {
        // Start with generators config in new project.
        updatedProjectConfiguration.generators = { ...project.generators };
        if (sourceMap) {
            sourceMap['generators'] ??= sourceInformation;
            for (const generator in project.generators) {
                sourceMap[`generators.${generator}`] = sourceInformation;
                for (const property in project.generators[generator]) {
                    sourceMap[`generators.${generator}.${property}`] = sourceInformation;
                }
            }
        }
        if (matchingProject.generators) {
            // For each generator that was already defined, shallow merge the options.
            // Project contains the new info, so it has higher priority.
            for (const generator in matchingProject.generators) {
                updatedProjectConfiguration.generators[generator] = {
                    ...matchingProject.generators[generator],
                    ...project.generators[generator],
                };
            }
        }
    }
    if (project.namedInputs) {
        updatedProjectConfiguration.namedInputs = {
            ...matchingProject.namedInputs,
            ...project.namedInputs,
        };
        if (sourceMap) {
            sourceMap['namedInputs'] ??= sourceInformation;
            for (const namedInput in project.namedInputs) {
                sourceMap[`namedInputs.${namedInput}`] = sourceInformation;
            }
        }
    }
    if (project.targets) {
        // We merge the targets with special handling, so clear this back to the
        // targets as defined originally before merging.
        updatedProjectConfiguration.targets = matchingProject?.targets ?? {};
        if (sourceMap) {
            sourceMap['targets'] ??= sourceInformation;
        }
        // For each target defined in the new config
        for (const targetName in project.targets) {
            // Always set source map info for the target, but don't overwrite info already there
            // if augmenting an existing target.
            const target = project.targets?.[targetName];
            if (sourceMap && !target?.[target_defaults_plugin_1.ONLY_MODIFIES_EXISTING_TARGET]) {
                sourceMap[`targets.${targetName}`] = sourceInformation;
            }
            // If ONLY_MODIFIES_EXISTING_TARGET is true, and its not on the matching project
            // we shouldn't merge its info into the graph
            if (target?.[target_defaults_plugin_1.ONLY_MODIFIES_EXISTING_TARGET] &&
                !matchingProject.targets?.[targetName]) {
                continue;
            }
            const mergedTarget = mergeTargetConfigurations(skipCommandNormalization
                ? target
                : resolveCommandSyntacticSugar(target, project.root), matchingProject.targets?.[targetName], sourceMap, sourceInformation, `targets.${targetName}`);
            // We don't want the symbol to live on past the merge process
            if (mergedTarget?.[target_defaults_plugin_1.ONLY_MODIFIES_EXISTING_TARGET])
                delete mergedTarget?.[target_defaults_plugin_1.ONLY_MODIFIES_EXISTING_TARGET];
            updatedProjectConfiguration.targets[targetName] = mergedTarget;
        }
    }
    if (project.metadata) {
        if (sourceMap) {
            sourceMap['targets'] ??= sourceInformation;
        }
        for (const [metadataKey, value] of Object.entries({
            ...project.metadata,
        })) {
            const existingValue = matchingProject.metadata?.[metadataKey];
            if (Array.isArray(value) && Array.isArray(existingValue)) {
                for (const item of [...value]) {
                    const newLength = updatedProjectConfiguration.metadata[metadataKey].push(item);
                    if (sourceMap) {
                        sourceMap[`metadata.${metadataKey}.${newLength - 1}`] =
                            sourceInformation;
                    }
                }
            }
            else if (Array.isArray(value) && existingValue === undefined) {
                updatedProjectConfiguration.metadata ??= {};
                updatedProjectConfiguration.metadata[metadataKey] ??= value;
                if (sourceMap) {
                    sourceMap[`metadata.${metadataKey}`] = sourceInformation;
                }
                for (let i = 0; i < value.length; i++) {
                    if (sourceMap) {
                        sourceMap[`metadata.${metadataKey}.${i}`] = sourceInformation;
                    }
                }
            }
            else if (typeof value === 'object' &&
                typeof existingValue === 'object') {
                for (const key in value) {
                    const existingValue = matchingProject.metadata?.[metadataKey]?.[key];
                    if (Array.isArray(value[key]) && Array.isArray(existingValue)) {
                        for (const item of value[key]) {
                            const i = updatedProjectConfiguration.metadata[metadataKey][key].push(item);
                            if (sourceMap) {
                                sourceMap[`metadata.${metadataKey}.${key}.${i - 1}`] =
                                    sourceInformation;
                            }
                        }
                    }
                    else {
                        updatedProjectConfiguration.metadata[metadataKey] = value;
                        if (sourceMap) {
                            sourceMap[`metadata.${metadataKey}`] = sourceInformation;
                        }
                    }
                }
            }
            else {
                updatedProjectConfiguration.metadata[metadataKey] = value;
                if (sourceMap) {
                    sourceMap[`metadata.${metadataKey}`] = sourceInformation;
                    if (typeof value === 'object') {
                        for (const k in value) {
                            sourceMap[`metadata.${metadataKey}.${k}`] = sourceInformation;
                            if (Array.isArray(value[k])) {
                                for (let i = 0; i < value[k].length; i++) {
                                    sourceMap[`metadata.${metadataKey}.${k}.${i}`] =
                                        sourceInformation;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    projectRootMap.set(updatedProjectConfiguration.root, updatedProjectConfiguration);
}
exports.mergeProjectConfigurationIntoRootMap = mergeProjectConfigurationIntoRootMap;
/**
 * Transforms a list of project paths into a map of project configurations.
 *
 * @param root The workspace root
 * @param nxJson The NxJson configuration
 * @param workspaceFiles A list of non-ignored workspace files
 * @param plugins The plugins that should be used to infer project configuration
 */
function createProjectConfigurations(root = workspace_root_1.workspaceRoot, nxJson, workspaceFiles, // making this parameter allows devkit to pick up newly created projects
plugins) {
    perf_hooks_1.performance.mark('build-project-configs:start');
    const results = [];
    const errors = [];
    // We iterate over plugins first - this ensures that plugins specified first take precedence.
    for (const { plugin, options, include, exclude } of plugins) {
        const [pattern, createNodes] = plugin.createNodes ?? [];
        const pluginResults = [];
        perf_hooks_1.performance.mark(`${plugin.name}:createNodes - start`);
        if (!pattern) {
            continue;
        }
        const matchingConfigFiles = [];
        for (const file of workspaceFiles) {
            if ((0, minimatch_1.minimatch)(file, pattern, { dot: true })) {
                if (include) {
                    const included = include.some((includedPattern) => (0, minimatch_1.minimatch)(file, includedPattern, { dot: true }));
                    if (!included) {
                        continue;
                    }
                }
                if (exclude) {
                    const excluded = include.some((excludedPattern) => (0, minimatch_1.minimatch)(file, excludedPattern, { dot: true }));
                    if (excluded) {
                        continue;
                    }
                }
                matchingConfigFiles.push(file);
            }
        }
        for (const file of matchingConfigFiles) {
            perf_hooks_1.performance.mark(`${plugin.name}:createNodes:${file} - start`);
            try {
                let r = createNodes(file, options, {
                    nxJsonConfiguration: nxJson,
                    workspaceRoot: root,
                    configFiles: matchingConfigFiles,
                });
                if (r instanceof Promise) {
                    pluginResults.push(r
                        .catch((error) => {
                        perf_hooks_1.performance.mark(`${plugin.name}:createNodes:${file} - end`);
                        errors.push(new CreateNodesError({
                            file,
                            pluginName: plugin.name,
                            error,
                        }));
                        return {
                            projects: {},
                        };
                    })
                        .then((r) => {
                        perf_hooks_1.performance.mark(`${plugin.name}:createNodes:${file} - end`);
                        perf_hooks_1.performance.measure(`${plugin.name}:createNodes:${file}`, `${plugin.name}:createNodes:${file} - start`, `${plugin.name}:createNodes:${file} - end`);
                        return { ...r, file, pluginName: plugin.name };
                    }));
                }
                else {
                    perf_hooks_1.performance.mark(`${plugin.name}:createNodes:${file} - end`);
                    perf_hooks_1.performance.measure(`${plugin.name}:createNodes:${file}`, `${plugin.name}:createNodes:${file} - start`, `${plugin.name}:createNodes:${file} - end`);
                    pluginResults.push({
                        ...r,
                        file,
                        pluginName: plugin.name,
                    });
                }
            }
            catch (error) {
                errors.push(new CreateNodesError({
                    file,
                    pluginName: plugin.name,
                    error,
                }));
            }
        }
        results.push(Promise.all(pluginResults).then((results) => {
            perf_hooks_1.performance.mark(`${plugin.name}:createNodes - end`);
            perf_hooks_1.performance.measure(`${plugin.name}:createNodes`, `${plugin.name}:createNodes - start`, `${plugin.name}:createNodes - end`);
            return results;
        }));
    }
    return Promise.all(results).then((results) => {
        perf_hooks_1.performance.mark('createNodes:merge - start');
        const projectRootMap = new Map();
        const externalNodes = {};
        const configurationSourceMaps = {};
        for (const result of results.flat()) {
            const { projects: projectNodes, externalNodes: pluginExternalNodes, file, pluginName, } = result;
            const sourceInfo = [file, pluginName];
            if (result[target_defaults_plugin_1.OVERRIDE_SOURCE_FILE]) {
                sourceInfo[0] = result[target_defaults_plugin_1.OVERRIDE_SOURCE_FILE];
            }
            for (const node in projectNodes) {
                const project = {
                    root: node,
                    ...projectNodes[node],
                };
                try {
                    mergeProjectConfigurationIntoRootMap(projectRootMap, project, configurationSourceMaps, sourceInfo);
                }
                catch (error) {
                    errors.push(new MergeNodesError({
                        file,
                        pluginName,
                        error,
                    }));
                }
            }
            Object.assign(externalNodes, pluginExternalNodes);
        }
        const projects = readProjectConfigurationsFromRootMap(projectRootMap);
        const rootMap = createRootMap(projectRootMap);
        perf_hooks_1.performance.mark('createNodes:merge - end');
        perf_hooks_1.performance.measure('createNodes:merge', 'createNodes:merge - start', 'createNodes:merge - end');
        perf_hooks_1.performance.mark('build-project-configs:end');
        perf_hooks_1.performance.measure('build-project-configs', 'build-project-configs:start', 'build-project-configs:end');
        if (errors.length === 0) {
            return {
                projects,
                externalNodes,
                projectRootMap: rootMap,
                sourceMaps: configurationSourceMaps,
            };
        }
        else {
            throw new ProjectConfigurationsError(errors, {
                projects,
                externalNodes,
                projectRootMap: rootMap,
                sourceMaps: configurationSourceMaps,
            });
        }
    });
}
exports.createProjectConfigurations = createProjectConfigurations;
function readProjectConfigurationsFromRootMap(projectRootMap) {
    const projects = {};
    // If there are projects that have the same name, that is an error.
    // This object tracks name -> (all roots of projects with that name)
    // to provide better error messaging.
    const errors = new Map();
    for (const [root, configuration] of projectRootMap.entries()) {
        // We're setting `// targets` as a comment `targets` is empty due to Project Crystal.
        // Strip it before returning configuration for usage.
        if (configuration['// targets'])
            delete configuration['// targets'];
        if (!configuration.name) {
            try {
                const { name } = (0, fileutils_1.readJsonFile)((0, path_1.join)(root, 'package.json'));
                configuration.name = name;
            }
            catch {
                throw new Error(`Project at ${root} has no name provided.`);
            }
        }
        if (configuration.name in projects) {
            let rootErrors = errors.get(configuration.name) ?? [
                projects[configuration.name].root,
            ];
            rootErrors.push(root);
            errors.set(configuration.name, rootErrors);
        }
        else {
            projects[configuration.name] = configuration;
        }
    }
    if (errors.size > 0) {
        throw new Error([
            `The following projects are defined in multiple locations:`,
            ...Array.from(errors.entries()).map(([project, roots]) => [`- ${project}: `, ...roots.map((r) => `  - ${r}`)].join('\n')),
            '',
            "To fix this, set a unique name for each project in a project.json inside the project's root. If the project does not currently have a project.json, you can create one that contains only a name.",
        ].join('\n'));
    }
    return projects;
}
exports.readProjectConfigurationsFromRootMap = readProjectConfigurationsFromRootMap;
class ProjectConfigurationsError extends Error {
    constructor(errors, partialProjectConfigurationsResult) {
        super('Failed to create project configurations');
        this.errors = errors;
        this.partialProjectConfigurationsResult = partialProjectConfigurationsResult;
        this.name = this.constructor.name;
    }
}
exports.ProjectConfigurationsError = ProjectConfigurationsError;
class CreateNodesError extends Error {
    constructor({ file, pluginName, error, }) {
        const msg = `The "${pluginName}" plugin threw an error while creating nodes from ${file}:`;
        super(msg, { cause: error });
        this.name = this.constructor.name;
        this.file = file;
        this.pluginName = pluginName;
        this.stack = `${this.message}\n  ${error.stack.split('\n').join('\n  ')}`;
    }
}
exports.CreateNodesError = CreateNodesError;
class MergeNodesError extends Error {
    constructor({ file, pluginName, error, }) {
        const msg = `The nodes created from ${file} by the "${pluginName}" could not be merged into the project graph:`;
        super(msg, { cause: error });
        this.name = this.constructor.name;
        this.file = file;
        this.pluginName = pluginName;
        this.stack = `${this.message}\n  ${error.stack.split('\n').join('\n  ')}`;
    }
}
exports.MergeNodesError = MergeNodesError;
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
function mergeTargetConfigurations(target, baseTarget, projectConfigSourceMap, sourceInformation, targetIdentifier) {
    const { configurations: defaultConfigurations, options: defaultOptions, ...baseTargetProperties } = baseTarget ?? {};
    // Target is "compatible", e.g. executor is defined only once or is the same
    // in both places. This means that it is likely safe to merge
    const isCompatible = isCompatibleTarget(baseTargetProperties, target);
    // If the targets are not compatible, we would normally overwrite the old target
    // with the new one. However, we have a special case for targets that have the
    // ONLY_MODIFIES_EXISTING_TARGET symbol set. This prevents the merged target
    // equaling info that should have only been used to modify the existing target.
    if (!isCompatible && target[target_defaults_plugin_1.ONLY_MODIFIES_EXISTING_TARGET]) {
        return baseTarget;
    }
    if (!isCompatible && projectConfigSourceMap) {
        // if the target is not compatible, we will simply override the options
        // we have to delete old entries from the source map
        for (const key in projectConfigSourceMap) {
            if (key.startsWith(`${targetIdentifier}`)) {
                delete projectConfigSourceMap[key];
            }
        }
    }
    // merge top level properties if they're compatible
    const result = {
        ...(isCompatible ? baseTargetProperties : {}),
        ...target,
    };
    // record top level properties in source map
    if (projectConfigSourceMap) {
        projectConfigSourceMap[targetIdentifier] = sourceInformation;
        // record root level target properties to source map
        for (const targetProperty in target) {
            const targetPropertyId = `${targetIdentifier}.${targetProperty}`;
            projectConfigSourceMap[targetPropertyId] = sourceInformation;
        }
    }
    // merge options if there are any
    // if the targets aren't compatible, we simply discard the old options during the merge
    if (target.options || defaultOptions) {
        result.options = mergeOptions(target.options, isCompatible ? defaultOptions : undefined, projectConfigSourceMap, sourceInformation, targetIdentifier);
    }
    // merge configurations if there are any
    // if the targets aren't compatible, we simply discard the old configurations during the merge
    if (target.configurations || defaultConfigurations) {
        result.configurations = mergeConfigurations(target.configurations, isCompatible ? defaultConfigurations : undefined, projectConfigSourceMap, sourceInformation, targetIdentifier);
    }
    return result;
}
exports.mergeTargetConfigurations = mergeTargetConfigurations;
/**
 * Checks if targets options are compatible - used when merging configurations
 * to avoid merging options for @nx/js:tsc into something like @nx/webpack:webpack.
 *
 * If the executors are both specified and don't match, the options aren't considered
 * "compatible" and shouldn't be merged.
 */
function isCompatibleTarget(a, b) {
    const oneHasNoExecutor = !a.executor || !b.executor;
    const bothHaveSameExecutor = a.executor === b.executor;
    if (oneHasNoExecutor)
        return true;
    if (!bothHaveSameExecutor)
        return false;
    const isRunCommands = a.executor === 'nx:run-commands';
    if (isRunCommands) {
        const aCommand = a.options?.command ?? a.options?.commands.join(' && ');
        const bCommand = b.options?.command ?? b.options?.commands.join(' && ');
        const oneHasNoCommand = !aCommand || !bCommand;
        const hasSameCommand = aCommand === bCommand;
        return oneHasNoCommand || hasSameCommand;
    }
    const isRunScript = a.executor === 'nx:run-script';
    if (isRunScript) {
        const aScript = a.options?.script;
        const bScript = b.options?.script;
        const oneHasNoScript = !aScript || !bScript;
        const hasSameScript = aScript === bScript;
        return oneHasNoScript || hasSameScript;
    }
    return true;
}
exports.isCompatibleTarget = isCompatibleTarget;
function mergeConfigurations(newConfigurations, baseConfigurations, projectConfigSourceMap, sourceInformation, targetIdentifier) {
    const mergedConfigurations = {};
    const configurations = new Set([
        ...Object.keys(baseConfigurations ?? {}),
        ...Object.keys(newConfigurations ?? {}),
    ]);
    for (const configuration of configurations) {
        mergedConfigurations[configuration] = {
            ...(baseConfigurations?.[configuration] ?? {}),
            ...(newConfigurations?.[configuration] ?? {}),
        };
    }
    // record new configurations & configuration properties in source map
    if (projectConfigSourceMap) {
        for (const newConfiguration in newConfigurations) {
            projectConfigSourceMap[`${targetIdentifier}.configurations.${newConfiguration}`] = sourceInformation;
            for (const configurationProperty in newConfigurations[newConfiguration]) {
                projectConfigSourceMap[`${targetIdentifier}.configurations.${newConfiguration}.${configurationProperty}`] = sourceInformation;
            }
        }
    }
    return mergedConfigurations;
}
function mergeOptions(newOptions, baseOptions, projectConfigSourceMap, sourceInformation, targetIdentifier) {
    const mergedOptions = {
        ...(baseOptions ?? {}),
        ...(newOptions ?? {}),
    };
    // record new options & option properties in source map
    if (projectConfigSourceMap) {
        for (const newOption in newOptions) {
            projectConfigSourceMap[`${targetIdentifier}.options.${newOption}`] =
                sourceInformation;
        }
    }
    return mergedOptions;
}
function resolveNxTokensInOptions(object, project, key) {
    const result = Array.isArray(object) ? [...object] : { ...object };
    for (let [opt, value] of Object.entries(object ?? {})) {
        if (typeof value === 'string') {
            const workspaceRootMatch = /^(\{workspaceRoot\}\/?)/.exec(value);
            if (workspaceRootMatch?.length) {
                value = value.replace(workspaceRootMatch[0], '');
            }
            if (value.includes('{workspaceRoot}')) {
                throw new Error(`${logger_1.NX_PREFIX} The {workspaceRoot} token is only valid at the beginning of an option. (${key})`);
            }
            value = value.replace(/\{projectRoot\}/g, project.root);
            result[opt] = value.replace(/\{projectName\}/g, project.name);
        }
        else if (typeof value === 'object' && value) {
            result[opt] = resolveNxTokensInOptions(value, project, [key, opt].join('.'));
        }
    }
    return result;
}
exports.resolveNxTokensInOptions = resolveNxTokensInOptions;
function readTargetDefaultsForTarget(targetName, targetDefaults, executor) {
    if (executor) {
        // If an executor is defined in project.json, defaults should be read
        // from the most specific key that matches that executor.
        // e.g. If executor === run-commands, and the target is named build:
        // Use, use nx:run-commands if it is present
        // If not, use build if it is present.
        const key = [executor, targetName].find((x) => targetDefaults?.[x]);
        return key ? targetDefaults?.[key] : null;
    }
    else {
        // If the executor is not defined, the only key we have is the target name.
        return targetDefaults?.[targetName];
    }
}
exports.readTargetDefaultsForTarget = readTargetDefaultsForTarget;
function createRootMap(projectRootMap) {
    const map = {};
    for (const [projectRoot, { name: projectName }] of projectRootMap) {
        map[projectRoot] = projectName;
    }
    return map;
}
function resolveCommandSyntacticSugar(target, key) {
    const { command, ...config } = target ?? {};
    if (!command) {
        return target;
    }
    if (config.executor) {
        throw new Error(`${logger_1.NX_PREFIX} Project at ${key} should not have executor and command both configured.`);
    }
    else {
        return {
            ...config,
            executor: 'nx:run-commands',
            options: {
                ...config.options,
                command: command,
            },
        };
    }
}
