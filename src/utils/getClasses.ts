import { IBlockBase } from '../types';
import parse from 'html-dom-parser';

export const getClasses = (block: IBlockBase) => {
  const parsed: any = parse(block.originalContent || '');
  return parsed[0]?.attribs?.class || '';
};
