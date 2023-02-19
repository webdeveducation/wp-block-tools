import { IBlockBase } from '../types';
import parse from 'html-dom-parser';

export const getClasses = (block: IBlockBase) => {
  const originalContentParsed: any = parse(block.originalContent || '');
  const dynamicContentParsed: any = parse(block.dynamicContent || '');
  let originalContentClassNames =
    originalContentParsed[0]?.attribs?.class || '';
  let dynamicContentClassNames = dynamicContentParsed[0]?.attribs?.class || '';
  let classNames = `${originalContentClassNames} ${dynamicContentClassNames}`;
  if (block.attributes.align) {
    const alignClass = `align${block.attributes.align}`;
    if (!classNames.split(' ').find((c: string) => c === alignClass)) {
      classNames = `${classNames} ${alignClass}`;
    }
  }
  // remove duplicates in classNames
  const classNamesUnique: string[] = [];
  const classNamesSplit = classNames.split(' ').filter((c) => !!c);
  classNamesSplit.forEach((className) => {
    if (!classNamesUnique.find((c) => c === className)) {
      classNamesUnique.push(className);
    }
  });
  console.log('DYNAMIC CLASS NAMES: ', dynamicContentClassNames);
  return classNamesUnique.join(' ');
};
