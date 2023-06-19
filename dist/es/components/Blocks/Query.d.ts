/// <reference types="react" />
import { CustomInternalLinkComponent, IBlockBase, InternalHrefReplacement } from '../../types';
type Props = {
    block: IBlockBase;
    allBlocks: IBlockBase[];
    wpDomain?: string;
    siteDomain?: string;
    postId: number;
    internalHrefReplacement?: InternalHrefReplacement;
    customInternalLinkComponent?: CustomInternalLinkComponent;
};
export declare function Query({ block, allBlocks, wpDomain, internalHrefReplacement, siteDomain, customInternalLinkComponent, postId, }: Props): JSX.Element;
export {};
