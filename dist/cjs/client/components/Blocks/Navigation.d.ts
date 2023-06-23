/// <reference types="react" />
import { IBlockBase } from '../../types';
type Props = {
    block: IBlockBase;
    allBlocks: IBlockBase[];
};
export default function Navigation({ block, allBlocks }: Props): JSX.Element;
export {};
