/// <reference types="react" />
type Props = {
    pageNumber: number;
    queryId: number;
    onClick: (loadPageNum: number) => void;
    style?: any;
};
export declare function PaginationPageNumber({ pageNumber, queryId, onClick, style, }: Props): JSX.Element;
export {};
