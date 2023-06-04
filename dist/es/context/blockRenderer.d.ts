import React from 'react';
import { CustomInternalLinkComponent, IBlockBase } from '../types';
export type IBlockRendererContext = {
    blocks: IBlockBase[];
    renderComponent?: (options: {
        block: IBlockBase;
        classNames?: string;
        styles?: {
            [key: string]: string | number;
        };
    }) => React.ReactElement | null;
    customInternalLinkComponent?: CustomInternalLinkComponent;
    wpDomain?: string;
};
export declare const BlockRendererContext: React.Context<IBlockRendererContext>;
export declare const BlockRendererProvider: ({ renderComponent, customInternalLinkComponent, wpDomain, blocks, children, }: IBlockRendererContext & {
    children?: JSX.Element | undefined;
}) => JSX.Element;
export declare const useBlockRendererContext: () => IBlockRendererContext;
