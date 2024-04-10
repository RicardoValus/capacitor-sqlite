"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaemonProjectGraphError = void 0;
class DaemonProjectGraphError extends Error {
    constructor(errors, projectGraph, sourceMaps) {
        super(`The Daemon Process threw an error while calculating the project graph. Convert this error to a ProjectGraphError to get more information.`);
        this.errors = errors;
        this.projectGraph = projectGraph;
        this.sourceMaps = sourceMaps;
        this.name = this.constructor.name;
    }
}
exports.DaemonProjectGraphError = DaemonProjectGraphError;
