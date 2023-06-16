/// <reference types="react" />
import { CustomInternalLinkComponent, IBlockBase, InternalHrefReplacement } from '../types';
export declare function createReactNodes(options: {
    html: any[];
    allBlocks: IBlockBase[];
    block: IBlockBase;
    component?: JSX.Element;
    className?: string;
    customInternalLinkComponent?: CustomInternalLinkComponent;
    internalHrefReplacement?: InternalHrefReplacement;
    wpDomain?: string;
    siteDomain?: string;
}): any[];
