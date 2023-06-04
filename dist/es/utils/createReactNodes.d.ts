/// <reference types="react" />
import { CustomInternalLinkComponent, IBlockBase } from '../types';
export declare function createReactNodes(options: {
    html: any[];
    allBlocks: IBlockBase[];
    block: IBlockBase;
    component?: JSX.Element;
    className?: string;
    customInternalLinkComponent?: CustomInternalLinkComponent;
    wpDomain?: string;
}): any[];
