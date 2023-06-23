'use client';
import React, { useContext } from 'react';
import { RootBlockRenderer } from '../components/BlockRenderer/BlockRenderer.js';
import { assignIds } from '../utils/assignIds.js';
import 'change-case';
import 'html-dom-parser';
import 'uuid';

const BlockRendererContext = React.createContext({
    blocks: [],
    postId: 0,
});
const BlockRendererProvider = ({ renderComponent, customInternalLinkComponent, wpDomain, siteDomain, internalHrefReplacement = 'relative', blocks, children, postId, }) => {
    const blocksWithIds = assignIds(blocks);
    if (internalHrefReplacement === 'absolute' && !siteDomain) {
        console.warn('`siteDomain` must be specified when internalHrefReplacement="absolute"');
    }
    console.log({ blocks });
    return (React.createElement(BlockRendererContext.Provider, { value: {
            postId,
            renderComponent,
            customInternalLinkComponent,
            internalHrefReplacement,
            wpDomain,
            siteDomain,
            blocks: blocksWithIds,
        } }, children ? children : React.createElement(RootBlockRenderer, null)));
};
const useBlockRendererContext = () => {
    const blockRendererContext = useContext(BlockRendererContext);
    return blockRendererContext;
};

export { BlockRendererContext, BlockRendererProvider, useBlockRendererContext };
//# sourceMappingURL=blockRenderer.js.map
