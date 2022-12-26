import React from 'react';
import { IBlockBase } from '../../types';
import './style.scss';
export type BlockRendererProps = {
    blocks?: IBlockBase[];
    render?: (block: IBlockBase) => React.ReactElement | null;
};
export declare const BlockRenderer: ({ blocks, render }: BlockRendererProps) => JSX.Element;
export declare const RootBlockRenderer: ({ blocks, render, }: BlockRendererProps) => JSX.Element;
