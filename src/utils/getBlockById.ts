import { IBlockBase } from '../types';

export const getBlockById = (
  allBlocks: IBlockBase[],
  id: string
): IBlockBase | null => {
  let foundBlock: IBlockBase | null = null;

  const findBlock = (bs: IBlockBase[]): IBlockBase | void => {
    for (let block of bs) {
      if (block.id === id) {
        foundBlock = block;
        break;
      } else if (block.innerBlocks?.length) {
        findBlock(block.innerBlocks);
      }
    }
  };
  findBlock(allBlocks);
  return foundBlock;
};
