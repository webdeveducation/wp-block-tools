'use client';
Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var blockRenderer = require('../../../context/blockRenderer.js');
var parse = require('html-dom-parser');
var createReactNodes = require('../../../utils/createReactNodes.js');
require('uuid');
require('change-case');
var getLinkTextStyle = require('../../../utils/getLinkTextStyle.js');
var getCustomInternalLinkComponent = require('../../../utils/getCustomInternalLinkComponent.js');
var getBlockById = require('../../../utils/getBlockById.js');
var hasClass = require('../../../utils/hasClass.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var parse__default = /*#__PURE__*/_interopDefaultLegacy(parse);

const TerminalBlock = ({ block }) => {
    const { blocks: allBlocks, customInternalLinkComponent, wpDomain, internalHrefReplacement, siteDomain, } = blockRenderer.useBlockRendererContext();
    const parsedHTML = parse__default["default"](block.htmlContent || '') || [];
    const traverse = (els) => {
        els.forEach((el) => {
            var _a, _b;
            // process social link based on parent "core/social-links" block attributes
            if (block.name === 'core/social-link') {
                // get parent
                if (block.parentId) {
                    const parentBlock = getBlockById.getBlockById(allBlocks, block.parentId);
                    if (!el.attribs) {
                        el.attribs = {};
                    }
                    if (el.name === 'a') {
                        if ((_a = parentBlock === null || parentBlock === void 0 ? void 0 : parentBlock.attributes) === null || _a === void 0 ? void 0 : _a.openInNewTab) {
                            el.attribs.target = '_blank';
                            el.attribs.rel = 'noopener nofollow';
                        }
                    }
                    if (((_b = parentBlock === null || parentBlock === void 0 ? void 0 : parentBlock.attributes) === null || _b === void 0 ? void 0 : _b.showLabels) &&
                        hasClass.hasClass(el, 'wp-block-social-link-label')) {
                        el.attribs.class = el.attribs.class.replace('screen-reader-text', '');
                    }
                }
            }
            if (el.type === 'tag' && el.name === 'a') {
                // if anchor tag, check to see if it's being rendered within a paragraph block
                if (block.name === 'core/paragraph') {
                    // get the link styles
                    const linkStyles = getLinkTextStyle.getLinkTextStyle(block.attributes);
                    if (!el.attribs) {
                        el.attribs = {};
                    }
                    el.attribs.style = `color: ${linkStyles.color};${el.attribs.style || ''}`;
                }
                const internalLinkComponent = getCustomInternalLinkComponent.getCustomInternalLinkComponent({
                    node: el,
                    block,
                    allBlocks,
                    customInternalLinkComponent,
                    internalHrefReplacement,
                    wpDomain,
                    siteDomain,
                });
                if (!!internalLinkComponent) {
                    el.type = 'react';
                    el.component = internalLinkComponent;
                }
            }
            if (el.children) {
                traverse(el.children);
            }
        });
    };
    traverse(parsedHTML);
    return (React__default["default"].createElement(React.Fragment, null, createReactNodes.createReactNodes({
        html: parsedHTML,
        block,
        allBlocks,
        wpDomain,
        siteDomain,
        customInternalLinkComponent,
        internalHrefReplacement,
    })));
};

exports.TerminalBlock = TerminalBlock;
//# sourceMappingURL=TerminalBlock.js.map
