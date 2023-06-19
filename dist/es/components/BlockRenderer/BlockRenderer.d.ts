import React from 'react';
import { CustomInternalLinkComponent, IBlockBase, InternalHrefReplacement } from '../../types';
import './style.scss';
export type BlockRendererProps = {
    blocks?: IBlockBase[];
};
export declare const BlockRenderer: ({ blocks }: BlockRendererProps) => JSX.Element;
export type RootBlockRendererProps = {
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
export declare const RootBlockRenderer: (props: RootBlockRendererProps) => JSX.Element;
