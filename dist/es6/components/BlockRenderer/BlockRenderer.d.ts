import React from 'react';
import { IBlockBase } from '../../types';
export type BlockRendererProps = {
    blocks?: IBlockBase[];
    render?: (block: IBlockBase) => React.ReactElement | null;
};
export declare const BlockRenderer: ({ blocks, render }: BlockRendererProps) => JSX.Element;
