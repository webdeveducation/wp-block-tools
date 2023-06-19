'use client';
import React from 'react';
import { TerminalBlock } from './TerminalBlock/TerminalBlock.js';
import { createReactNodes } from '../../utils/createReactNodes.js';
import parse from 'html-dom-parser';
import { assignIds } from '../../utils/assignIds.js';
import { getStyles } from '../../utils/getStyles.js';
import { getBlockById } from '../../utils/getBlockById.js';
import { getClasses } from '../../utils/getClasses.js';
import ServerContext from '../../serverContext/index.js';
import { Navigation } from '../Blocks/Navigation.js';
import { Query } from '../Blocks/Query.js';

const BlockRenderer = ({ blocks = [] }) => {
    const { renderComponent, blocks: allBlocks, wpDomain, siteDomain, customInternalLinkComponent, internalHrefReplacement, postId, } = ServerContext.getInstance();
    return (React.createElement(React.Fragment, null, blocks.map((block) => {
        var _a, _b, _c, _d;
        // render custom component for this block if exists
        const component = renderComponent === null || renderComponent === void 0 ? void 0 : renderComponent({
            block,
            styles: getStyles(block),
            classNames: getClasses(block),
        });
        if (component) {
            return React.createElement(React.Fragment, { key: block.id }, component);
        }
        // if no htmlContent but has inner blocks, just render the inner blocks
        if (!block.htmlContent && ((_a = block.innerBlocks) === null || _a === void 0 ? void 0 : _a.length)) {
            return React.createElement(BlockRenderer, { key: block.id, blocks: block.innerBlocks });
        }
        // if no inner blocks
        // here we need to render the terminal block which will
        // also cater for the siteDomain replace
        let parsedHTML = parse(block.htmlContent || '') || [];
        if (block.htmlContent && !((_b = block.innerBlocks) === null || _b === void 0 ? void 0 : _b.length)) {
            return React.createElement(TerminalBlock, { key: block.id, block: block });
        }
        // if html content and inner blocks
        if (block.htmlContent && ((_c = block.innerBlocks) === null || _c === void 0 ? void 0 : _c.length)) {
            switch (block.name) {
                case 'core/block':
                    return (React.createElement(BlockRenderer, { key: block.id, blocks: block.innerBlocks }));
                case 'core/media-text': {
                    return (React.createElement(React.Fragment, { key: block.id }, createReactNodes({
                        html: parsedHTML,
                        block,
                        allBlocks,
                        component: React.createElement(BlockRenderer, { blocks: block.innerBlocks }),
                        className: 'wp-block-media-text__content',
                        wpDomain,
                        siteDomain,
                        customInternalLinkComponent,
                    })));
                }
                case 'core/cover': {
                    return (React.createElement(React.Fragment, { key: block.id }, createReactNodes({
                        html: parsedHTML,
                        block,
                        allBlocks,
                        component: React.createElement(BlockRenderer, { blocks: block.innerBlocks }),
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
                        const parentBlock = getBlockById(allBlocks, block.parentId);
                        if (parentBlock) {
                            showSubmenuIcon = !!((_d = parentBlock.attributes) === null || _d === void 0 ? void 0 : _d.showSubmenuIcon);
                        }
                    }
                    if (showSubmenuIcon) {
                        let newHtmlContent = `${block.htmlContent}`;
                        newHtmlContent = newHtmlContent.replace('</a>', `</a><button class="wp-block-navigation__submenu-icon wp-block-navigation-submenu__toggle" aria-expanded="false"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" focusable="false"><path d="M1.50002 4L6.00002 8L10.5 4" stroke-width="1.5"></path></svg></button>`);
                        parsedHTML = parse(newHtmlContent || '') || [];
                    }
                    return (React.createElement(React.Fragment, { key: block.id }, createReactNodes({
                        html: parsedHTML,
                        block,
                        allBlocks,
                        component: React.createElement(BlockRenderer, { blocks: block.innerBlocks }),
                        className: 'wp-block-navigation__submenu-container',
                        wpDomain,
                        siteDomain,
                        customInternalLinkComponent,
                    })));
                }
                case 'core/query': {
                    return (React.createElement(Query, { key: block.id, block: block, allBlocks: allBlocks, wpDomain: wpDomain, customInternalLinkComponent: customInternalLinkComponent, internalHrefReplacement: internalHrefReplacement, postId: postId, siteDomain: siteDomain }));
                }
                case 'core/navigation': {
                    return (React.createElement(Navigation, { key: block.id, htmlContent: block.htmlContent }, createReactNodes({
                        html: parsedHTML,
                        block,
                        allBlocks,
                        component: React.createElement(BlockRenderer, { blocks: block.innerBlocks }),
                        className: 'wp-block-navigation__container',
                        wpDomain,
                        siteDomain,
                        customInternalLinkComponent,
                        internalHrefReplacement,
                    })));
                }
                default: {
                    return (React.createElement(React.Fragment, { key: block.id }, createReactNodes({
                        html: parsedHTML,
                        block,
                        allBlocks,
                        component: React.createElement(BlockRenderer, { blocks: block.innerBlocks }),
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
const RootBlockRenderer = (props) => {
    ServerContext.setData(props);
    const blocksWithIds = assignIds(props.blocks);
    if (props.internalHrefReplacement === 'absolute' && !props.siteDomain) {
        console.warn('`siteDomain` must be specified when internalHrefReplacement="absolute"');
    }
    return (React.createElement("div", { className: "wp-site-blocks" },
        React.createElement(BlockRenderer, { blocks: blocksWithIds })));
};

export { BlockRenderer, RootBlockRenderer };
//# sourceMappingURL=BlockRenderer.js.map
