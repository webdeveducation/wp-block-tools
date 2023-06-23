import React from 'react';
import { CustomInternalLinkComponent, IBlockBase, InternalHrefReplacement, RenderComponent } from '../types';
export type IBlockRendererContext = {
    blocks: IBlockBase[];
    postId: number;
    renderComponent?: RenderComponent;
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
