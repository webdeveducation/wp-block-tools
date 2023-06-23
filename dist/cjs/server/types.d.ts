/// <reference types="react" />
export type RenderComponent = (options: {
    block: IBlockBase;
    classNames?: string;
    styles?: {
        [key: string]: string | number;
    };
}) => React.ReactElement | null;
export interface IBlockBase {
    id?: string;
    parentId?: string;
    name: string;
    attributes: {
        [key: string]: any;
    };
    htmlContent?: string;
    innerBlocks?: IBlockBase[];
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
export type CustomInternalLinkComponent = (el: any) => React.ReactElement | null;
export type InternalHrefReplacement = 'absolute' | 'relative' | 'none';
