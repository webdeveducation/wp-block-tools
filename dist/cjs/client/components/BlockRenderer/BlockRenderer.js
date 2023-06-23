'use client';
Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var blockRenderer = require('../../context/blockRenderer.js');
var TerminalBlock = require('./TerminalBlock/TerminalBlock.js');
var createReactNodes = require('../../utils/createReactNodes.js');
var parse = require('html-dom-parser');
var Navigation = require('../Blocks/Navigation.js');
require('uuid');
var getStyles = require('../../utils/getStyles.js');
var getBlockById = require('../../utils/getBlockById.js');
var getClasses = require('../../utils/getClasses.js');
var getUnstableGalleryGapStyle = require('../../utils/getUnstableGalleryGapStyle.js');
var Query = require('../Blocks/Query.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var parse__default = /*#__PURE__*/_interopDefaultLegacy(parse);

const BlockRenderer = ({ blocks = [] }) => {
    const { renderComponent, blocks: allBlocks, wpDomain, siteDomain, customInternalLinkComponent, } = blockRenderer.useBlockRendererContext();
    return (React__default["default"].createElement(React__default["default"].Fragment, null, blocks.map((block) => {
        var _a, _b, _c, _d;
        // render custom component for this block if exists
        const component = renderComponent === null || renderComponent === void 0 ? void 0 : renderComponent({
            block,
            styles: getStyles.getStyles(block),
            classNames: getClasses.getClasses(block),
        });
        if (component) {
            return React__default["default"].createElement(React__default["default"].Fragment, { key: block.id }, component);
        }
        // if no htmlContent but has inner blocks, just render the inner blocks
        if (!block.htmlContent && ((_a = block.innerBlocks) === null || _a === void 0 ? void 0 : _a.length)) {
            return React__default["default"].createElement(BlockRenderer, { key: block.id, blocks: block.innerBlocks });
        }
        // if no inner blocks
        // here we need to render the terminal block which will
        // also cater for the siteDomain replace
        let parsedHTML = parse__default["default"](block.htmlContent || '') || [];
        if (block.htmlContent && !((_b = block.innerBlocks) === null || _b === void 0 ? void 0 : _b.length)) {
            return React__default["default"].createElement(TerminalBlock.TerminalBlock, { key: block.id, block: block });
        }
        // if html content and inner blocks
        if (block.htmlContent && ((_c = block.innerBlocks) === null || _c === void 0 ? void 0 : _c.length)) {
            switch (block.name) {
                case 'core/block':
                    return (React__default["default"].createElement(BlockRenderer, { key: block.id, blocks: block.innerBlocks }));
                case 'core/gallery': {
                    return (React__default["default"].createElement("figure", { key: block.id, className: getClasses.getClasses(block), style: Object.assign(Object.assign({}, getStyles.getStyles(block)), getUnstableGalleryGapStyle.getUnstableGalleryGapStyle(block.attributes)) },
                        React__default["default"].createElement(BlockRenderer, { blocks: block.innerBlocks })));
                }
                case 'core/media-text': {
                    return (React__default["default"].createElement(React__default["default"].Fragment, { key: block.id }, createReactNodes.createReactNodes({
                        html: parsedHTML,
                        block,
                        allBlocks,
                        component: React__default["default"].createElement(BlockRenderer, { blocks: block.innerBlocks }),
                        className: 'wp-block-media-text__content',
                        wpDomain,
                        siteDomain,
                        customInternalLinkComponent,
                    })));
                }
                case 'core/cover': {
                    return (React__default["default"].createElement(React__default["default"].Fragment, { key: block.id }, createReactNodes.createReactNodes({
                        html: parsedHTML,
                        block,
                        allBlocks,
                        component: React__default["default"].createElement(BlockRenderer, { blocks: block.innerBlocks }),
                        className: 'wp-block-cover__inner-container',
                        wpDomain,
                        siteDomain,
                        customInternalLinkComponent,
                    })));
                }
                case 'core/navigation-submenu': {
                    // get parent block
                    let showSubmenuIcon = false;
                    if (block.parentId) {
                        const parentBlock = getBlockById.getBlockById(allBlocks, block.parentId);
                        if (parentBlock) {
                            showSubmenuIcon = !!((_d = parentBlock.attributes) === null || _d === void 0 ? void 0 : _d.showSubmenuIcon);
                        }
                    }
                    if (showSubmenuIcon) {
                        let newHtmlContent = `${block.htmlContent}`;
                        newHtmlContent = newHtmlContent.replace('</a>', `</a><button class="wp-block-navigation__submenu-icon wp-block-navigation-submenu__toggle" aria-expanded="false"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" focusable="false"><path d="M1.50002 4L6.00002 8L10.5 4" stroke-width="1.5"></path></svg></button>`);
                        parsedHTML = parse__default["default"](newHtmlContent || '') || [];
                    }
                    return (React__default["default"].createElement(React__default["default"].Fragment, { key: block.id }, createReactNodes.createReactNodes({
                        html: parsedHTML,
                        block,
                        allBlocks,
                        component: React__default["default"].createElement(BlockRenderer, { blocks: block.innerBlocks }),
                        className: 'wp-block-navigation__submenu-container',
                        wpDomain,
                        siteDomain,
                        customInternalLinkComponent,
                    })));
                }
                case 'core/query': {
                    return (React__default["default"].createElement(Query["default"], { key: block.id, block: block, allBlocks: allBlocks }));
                }
                case 'core/navigation': {
                    return (React__default["default"].createElement(Navigation["default"], { key: block.id, block: block, allBlocks: allBlocks }));
                }
                default: {
                    return (React__default["default"].createElement(React__default["default"].Fragment, { key: block.id }, createReactNodes.createReactNodes({
                        html: parsedHTML,
                        block,
                        allBlocks,
                        component: React__default["default"].createElement(BlockRenderer, { blocks: block.innerBlocks }),
                        wpDomain,
                        siteDomain,
                        customInternalLinkComponent,
                    })));
                }
            }
        }
        return null;
    })));
};
const RootBlockRenderer = ({ blocks = [] }) => {
    const { blocks: allBlocks } = blockRenderer.useBlockRendererContext();
    return (React__default["default"].createElement("div", { className: "wp-site-blocks" },
        React__default["default"].createElement(BlockRenderer, { blocks: allBlocks || blocks })));
};

exports.BlockRenderer = BlockRenderer;
exports.RootBlockRenderer = RootBlockRenderer;
//# sourceMappingURL=BlockRenderer.js.map
