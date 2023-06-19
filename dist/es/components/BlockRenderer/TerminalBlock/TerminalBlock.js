'use client';
import React, { Fragment } from 'react';
import parse from 'html-dom-parser';
import { createReactNodes } from '../../../utils/createReactNodes.js';
import 'uuid';
import 'change-case';
import { getLinkTextStyle } from '../../../utils/getLinkTextStyle.js';
import { getCustomInternalLinkComponent } from '../../../utils/getCustomInternalLinkComponent.js';
import { getBlockById } from '../../../utils/getBlockById.js';
import { hasClass } from '../../../utils/hasClass.js';
import ServerContext from '../../../serverContext/index.js';

const TerminalBlock = ({ block }) => {
    const { blocks: allBlocks, customInternalLinkComponent, wpDomain, internalHrefReplacement, siteDomain, } = ServerContext.getInstance();
    const parsedHTML = parse(block.htmlContent || '') || [];
    const traverse = (els) => {
        els.forEach((el) => {
            var _a, _b;
            // process social link based on parent "core/social-links" block attributes
            if (block.name === 'core/social-link') {
                // get parent
                if (block.parentId) {
                    const parentBlock = getBlockById(allBlocks, block.parentId);
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
                        hasClass(el, 'wp-block-social-link-label')) {
                        el.attribs.class = el.attribs.class.replace('screen-reader-text', '');
                    }
                }
            }
            if (el.type === 'tag' && el.name === 'a') {
                // if anchor tag, check to see if it's being rendered within a paragraph block
                if (block.name === 'core/paragraph') {
                    // get the link styles
                    const linkStyles = getLinkTextStyle(block.attributes);
                    if (!el.attribs) {
                        el.attribs = {};
                    }
                    el.attribs.style = `color: ${linkStyles.color};${el.attribs.style || ''}`;
                }
                const internalLinkComponent = getCustomInternalLinkComponent({
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
    return (React.createElement(Fragment, null, createReactNodes({
        html: parsedHTML,
        block,
        allBlocks,
        wpDomain,
        siteDomain,
        customInternalLinkComponent,
        internalHrefReplacement,
    })));
};

export { TerminalBlock };
//# sourceMappingURL=TerminalBlock.js.map
