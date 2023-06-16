/// <reference types="react" />
import { IBlockBase } from '../../types';
type Props = {
    block: IBlockBase;
    allBlocks: IBlockBase[];
};
export default function Query({ block, allBlocks }: Props): JSX.Element;
export {};
