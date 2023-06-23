import { IBlockBase } from '../../types';
import './style.scss';
export type BlockRendererProps = {
    blocks?: IBlockBase[];
};
export declare const BlockRenderer: ({ blocks }: BlockRendererProps) => JSX.Element;
export declare const RootBlockRenderer: ({ blocks }: BlockRendererProps) => JSX.Element;
