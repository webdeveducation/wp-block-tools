export interface IBlockBase {
    id?: string;
    name: string;
    originalContent?: string;
    dynamicContent?: string;
    [key: string]: any;
}
