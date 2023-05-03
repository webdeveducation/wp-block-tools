import React from 'react';
import { IBlockBase } from '../types';
export type IBlockRendererContext = {
    allBlocks: IBlockBase[];
    renderComponent?: (block: IBlockBase) => React.ReactElement | null;
    customInternalLinkComponent?: (n: any, index: string | number) => React.ReactElement | null;
    siteDomain?: string;
    includeTemplate?: boolean;
};
export declare const BlockRendererContext: React.Context<IBlockRendererContext>;
export declare const BlockRendererProvider: ({ renderComponent, customInternalLinkComponent, siteDomain, allBlocks, children, includeTemplate, }: IBlockRendererContext & {
    children?: JSX.Element | undefined;
}) => JSX.Element;
export declare const useBlockRendererContext: () => IBlockRendererContext;
