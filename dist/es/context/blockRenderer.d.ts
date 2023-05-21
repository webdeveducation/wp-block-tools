import React from 'react';
import { IBlockBase } from '../types';
export type IBlockRendererContext = {
    blocks: IBlockBase[];
    renderComponent?: (block: IBlockBase) => React.ReactElement | null;
    customInternalLinkComponent?: (el: any) => React.ReactElement | null;
    siteDomain?: string;
};
export declare const BlockRendererContext: React.Context<IBlockRendererContext>;
export declare const BlockRendererProvider: ({ renderComponent, customInternalLinkComponent, siteDomain, blocks, children, }: IBlockRendererContext & {
    children?: JSX.Element | undefined;
}) => JSX.Element;
export declare const useBlockRendererContext: () => IBlockRendererContext;
