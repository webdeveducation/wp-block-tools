export interface IBlockBase {
    id?: string;
    name: string;
    originalContent?: string;
    dynamicContent?: string;
    innerBlocks?: IBlockBase[];
    inlineStylesheet?: string;
    inlineClassnames?: string;
    [key: string]: any;
}
