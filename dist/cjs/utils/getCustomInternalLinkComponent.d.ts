/// <reference types="react" />
import { CustomInternalLinkComponent, IBlockBase } from '../types';
export declare const getCustomInternalLinkComponent: (options: {
    node: any;
    block: IBlockBase;
    allBlocks: IBlockBase[];
    wpDomain?: string;
    customInternalLinkComponent?: CustomInternalLinkComponent;
}) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | null | undefined;
