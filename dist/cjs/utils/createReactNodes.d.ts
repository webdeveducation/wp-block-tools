/// <reference types="react" />
import { IBlockBase } from '../types';
export declare function createReactNodes(options: {
    html: any[];
    allBlocks: IBlockBase[];
    block: IBlockBase;
    component?: JSX.Element;
    className?: string;
}): any[];
