import { IBlockBase } from '../types';
import parse from 'html-dom-parser';

export const getClasses = (block: IBlockBase) => {
  const parsed: any = parse(block.originalContent || '');
  let classNames = parsed[0]?.attribs?.class || '';
  if (block.attributes.align) {
    const alignClass = `align${block.attributes.align}`;
    if (!classNames.split(' ').find((c: string) => c === alignClass)) {
      classNames = `${classNames} ${alignClass}`;
    }
  }
  return classNames;
};
