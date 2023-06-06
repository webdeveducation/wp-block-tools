import React from 'react';
import { CustomInternalLinkComponent, IBlockBase, InternalHrefReplacement } from '../types';
export declare const getCustomInternalLinkComponent: (options: {
    node: any;
    block: IBlockBase;
    allBlocks: IBlockBase[];
    wpDomain?: string;
    siteDomain?: string;
    customInternalLinkComponent?: CustomInternalLinkComponent;
    internalHrefReplacement?: InternalHrefReplacement;
}) => React.ReactElement<any, string | React.JSXElementConstructor<any>> | null | undefined;
