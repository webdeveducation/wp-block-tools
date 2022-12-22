"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockRenderer = void 0;
const react_1 = __importStar(require("react"));
const html_to_react_1 = __importStar(require("@hedgedoc/html-to-react"));
const hasClass = (nd, className) => {
    var _a, _b, _c;
    return (!!((_a = nd.attribs) === null || _a === void 0 ? void 0 : _a.class) &&
        ((_c = (_b = nd.attribs) === null || _b === void 0 ? void 0 : _b.class) === null || _c === void 0 ? void 0 : _c.split(' ').find((c) => c === className)));
};
const Blocks = ({ blocks = [], render }) => {
    return (react_1.default.createElement(react_1.default.Fragment, null, blocks.map((block) => {
        var _a;
        const component = render === null || render === void 0 ? void 0 : render(block);
        if (component) {
            return component;
        }
        if (block.inlineStylesheet) {
            const styleElement = document.createElement('style');
            styleElement.innerHTML = block.inlineStylesheet;
            document.head.append(styleElement);
        }
        const processNode = (shouldProcessNode) => {
            var _a;
            if ((_a = block.innerBlocks) === null || _a === void 0 ? void 0 : _a.length) {
                const InnerBlocks = (react_1.default.createElement(Blocks, { key: block.id, blocks: block.innerBlocks || [], render: render }));
                let topLevelFound = false;
                return (0, html_to_react_1.default)(block.originalContent || '', {
                    transform: (node, i) => {
                        var _a, _b, _c, _d, _e, _f;
                        if (i === 0 && !topLevelFound) {
                            topLevelFound = true;
                            if (!((_a = node.attribs) === null || _a === void 0 ? void 0 : _a.class)) {
                                if (!node.attribs) {
                                    node.attribs = {};
                                }
                            }
                            if ((_c = (_b = block.attributes) === null || _b === void 0 ? void 0 : _b.layout) === null || _c === void 0 ? void 0 : _c.type) {
                                node.attribs.class = `${node.attribs.class} is-layout-${(_e = (_d = block.attributes) === null || _d === void 0 ? void 0 : _d.layout) === null || _e === void 0 ? void 0 : _e.type}`;
                            }
                            if (block.inlineClassnames) {
                                node.attribs.class = `${node.attribs.class} ${block.inlineClassnames}`;
                            }
                            if (block.name === 'core/cover' &&
                                block.attributes.useFeaturedImage) {
                                node.attribs.style = `background-image:url(${block.attributes.url});`;
                            }
                            if (block.name === 'core/buttons' ||
                                block.name === 'core/columns' ||
                                block.name === 'core/social-links' ||
                                block.name === 'core/gallery') {
                                node.attribs.class = `${node.attribs.class} is-layout-flex`;
                            }
                        }
                        // FIX when children have no data value,
                        // it doesn't correctly "convertNodeToReactElement" / doesn't render
                        if (!((_f = node.children) === null || _f === void 0 ? void 0 : _f.length)) {
                            node.children = [
                                {
                                    data: '\n',
                                },
                            ];
                        }
                        if (shouldProcessNode(node)) {
                            return (0, html_to_react_1.convertNodeToReactElement)(node, i, () => InnerBlocks);
                        }
                    },
                });
            }
            return (react_1.default.createElement(react_1.Fragment, { key: block.id }, (0, html_to_react_1.default)(block.originalContent || block.dynamicContent || '', {
                transform: (node, index) => {
                    return (0, html_to_react_1.convertNodeToReactElement)(node, index);
                },
            })));
        };
        if (!block.originalContent && block.dynamicContent) {
            return processNode(() => true);
        }
        if (!block.originalContent && ((_a = block.innerBlocks) === null || _a === void 0 ? void 0 : _a.length)) {
            return (react_1.default.createElement("div", { key: block.id },
                react_1.default.createElement(Blocks, { blocks: block.innerBlocks, render: render })));
        }
        switch (block.name) {
            case 'core/cover': {
                return processNode((node) => hasClass(node, 'wp-block-cover__inner-container'));
            }
            default: {
                return processNode(() => true);
            }
        }
    })));
};
const BlockRenderer = ({ blocks = [], render }) => {
    return (react_1.default.createElement("div", { className: "wp-site-blocks" },
        react_1.default.createElement("main", { className: "is-layout-flow wp-block-group" },
            react_1.default.createElement("div", { className: "has-global-padding is-layout-constrained entry-content wp-block-post-content" },
                react_1.default.createElement(Blocks, { blocks: blocks, render: render })))));
};
exports.BlockRenderer = BlockRenderer;
