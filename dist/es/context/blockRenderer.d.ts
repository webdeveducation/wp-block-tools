import React from 'react';
import { IBlockBase } from '../types';
export declare const BlockRendererContext: React.Context<{
    render?: ((block: IBlockBase) => React.ReactElement | null) | undefined;
    customInternalLinkComponent?: {
        render: (n: any, index: string | number) => React.ReactElement | null;
        siteDomain: string;
    } | undefined;
}>;
export declare const BlockRendererProvider: React.Provider<{
    render?: ((block: IBlockBase) => React.ReactElement | null) | undefined;
    customInternalLinkComponent?: {
        render: (n: any, index: string | number) => React.ReactElement | null;
        siteDomain: string;
    } | undefined;
}>;
export declare const useBlockRendererContext: () => {
    render?: ((block: IBlockBase) => React.ReactElement | null) | undefined;
    customInternalLinkComponent?: {
        render: (n: any, index: string | number) => React.ReactElement | null;
        siteDomain: string;
    } | undefined;
};
