import React from 'react';
import { IBlockBase } from '../types';
export type IBlockRendererContext = {
    renderComponent?: (block: IBlockBase) => React.ReactElement | null;
    customInternalLinkComponent?: (n: any, index: string | number) => React.ReactElement | null;
    siteDomain?: string;
};
export declare const BlockRendererContext: React.Context<IBlockRendererContext>;
export declare const BlockRendererProvider: ({ renderComponent, customInternalLinkComponent, siteDomain, children, }: IBlockRendererContext & {
    children: JSX.Element;
}) => JSX.Element;
export declare const useBlockRendererContext: () => IBlockRendererContext;
