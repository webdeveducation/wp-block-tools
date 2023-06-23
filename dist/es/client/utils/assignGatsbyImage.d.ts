import { IBlockBase } from '../types';
export declare const assignGatsbyImage: ({ blocks, graphql, coreImage, coreMediaText, coreCover, }: {
    blocks: IBlockBase[];
    graphql: any;
    coreImage?: boolean | undefined;
    coreMediaText?: boolean | undefined;
    coreCover?: boolean | undefined;
}) => Promise<IBlockBase[]>;
