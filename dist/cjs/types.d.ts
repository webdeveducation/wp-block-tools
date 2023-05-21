export interface IBlockBase {
    id?: string;
    parentId?: string;
    name: string;
    attributes: {
        [key: string]: any;
    };
    htmlContent?: string;
    innerBlocks?: IBlockBase[];
    inlineStylesheet?: string;
    inlineClassnames?: string;
    [key: string]: any;
}
export interface IParsedHTML {
    tag?: string;
    nodeType: NodeType;
    content?: string;
    attributes?: {
        [key: string]: string;
    };
    children?: IParsedHTML[];
}
export declare enum NodeType {
    Text = "text",
    Node = "node"
}
