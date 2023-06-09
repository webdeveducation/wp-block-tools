import React from 'react';
import { CustomInternalLinkComponent, IBlockBase, InternalHrefReplacement } from '../types';
export type IBlockRendererContext = {
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
export declare const BlockRendererContext: React.Context<IBlockRendererContext>;
export declare const BlockRendererProvider: ({ renderComponent, customInternalLinkComponent, wpDomain, siteDomain, internalHrefReplacement, blocks, children, postId, }: IBlockRendererContext & {
    children?: JSX.Element | undefined;
}) => JSX.Element;
export declare const useBlockRendererContext: () => IBlockRendererContext;
