"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = exports.MESSAGE_ID = void 0;
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
const utils_1 = require("@angular-eslint/utils");
exports.MESSAGE_ID = 'preferControlFlow';
exports.RULE_NAME = 'prefer-control-flow';
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Ensures that the built-in control flow is used.',
        },
        schema: [],
        messages: {
            [exports.MESSAGE_ID]: 'Use built-in control flow instead of directive {{name}}.',
        },
    },
    defaultOptions: [],
    create(context) {
        const parserServices = (0, utils_1.getTemplateParserServices)(context);
        return {
            'BoundAttribute[name=/^(ngForOf|ngIf|ngSwitch)$/]'({ sourceSpan, name, }) {
                const loc = parserServices.convertNodeSourceSpanToLoc(sourceSpan);
                context.report({
                    messageId: exports.MESSAGE_ID,
                    loc,
                    data: { name },
                });
            },
        };
    },
});
