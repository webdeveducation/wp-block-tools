export interface IBlockBase {
    id?: string;
    parentId?: string;
    name: string;
    attributes: {
        [key: string]: any;
    };
    originalContent?: string;
    dynamicContent?: string;
    innerBlocks?: IBlockBase[];
    inlineStylesheet?: string;
    inlineClassnames?: string;
    [key: string]: any;
}
