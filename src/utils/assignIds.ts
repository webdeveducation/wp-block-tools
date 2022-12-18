import { v4 as uuid } from 'uuid';
import { IBlockBase } from '../types';

export const assignIds = (blocks: IBlockBase[]) => {
  const assignId = (b: IBlockBase[]) => {
    b.forEach((block: IBlockBase) => {
      block.id = uuid();
      if (block.innerBlocks?.length) {
        assignId(block.innerBlocks);
      }
    });
  };

  assignId(blocks);

  return blocks;
};
