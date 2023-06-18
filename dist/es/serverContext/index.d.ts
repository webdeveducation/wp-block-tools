/// <reference types="react" />
import { CustomInternalLinkComponent, IBlockBase, InternalHrefReplacement } from '../types';
export type IServerContext = {
    blocks: IBlockBase[];
    postId: number;
    renderComponent?: (options: {
        block: IBlockBase;
        classNames?: string;
        styles?: {
            [key: string]: string | number;
        };
    }) => React.ReactElement | null;
    customInternalLinkComponent?: CustomInternalLinkComponent;
    internalHrefReplacement?: InternalHrefReplacement;
    wpDomain?: string;
    siteDomain?: string;
};
export default class ServerContext {
    blocks: IBlockBase[];
    postId: number;
    renderComponent?: (options: {
        block: IBlockBase;
        classNames?: string;
        styles?: {
            [key: string]: string | number;
        };
    }) => React.ReactElement | null;
    customInternalLinkComponent?: CustomInternalLinkComponent;
    internalHrefReplacement?: InternalHrefReplacement;
    wpDomain?: string;
    siteDomain?: string;
    private static instance;
    private constructor();
    static setData(data: IServerContext): ServerContext;
    static getInstance(): ServerContext;
}
