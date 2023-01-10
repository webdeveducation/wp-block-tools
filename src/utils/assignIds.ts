import { v4 as uuid } from 'uuid';
import { IBlockBase } from '../types';

export const assignIds = (blocks: IBlockBase[]) => {
  const blocksCopy = JSON.parse(JSON.stringify(blocks));

  const assignId = (b: IBlockBase[], parentId?: string) => {
    b.forEach((block: IBlockBase) => {
      block.id = uuid();
      if (parentId) {
        block.parentId = parentId;
      }
      if (block.innerBlocks?.length) {
        assignId(block.innerBlocks, block.id);
      }
    });
  };

  assignId(blocksCopy);

  return blocksCopy;
};
