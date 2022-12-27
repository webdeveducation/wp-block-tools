import React from 'react';
import { IBlockBase } from '../../types';
import './style.scss';
export type BlockRendererProps = {
    blocks?: IBlockBase[];
    render?: (block: IBlockBase) => React.ReactElement | null;
    customInternalLinkComponent?: {
        render: (n: any, index: string | number) => React.ReactElement | null;
        siteDomain: string;
    };
};
export declare const BlockRenderer: ({ blocks, render, customInternalLinkComponent, }: BlockRendererProps) => JSX.Element;
export declare const RootBlockRenderer: ({ blocks, render, customInternalLinkComponent, }: BlockRendererProps) => JSX.Element;
