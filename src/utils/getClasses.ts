import { IBlockBase } from '../types';
import parse from 'html-dom-parser';

export const getClasses = (block: IBlockBase) => {
  const htmlContentParsed: any = parse(block.htmlContent || '');
  let htmlContentClassNames = htmlContentParsed[0]?.attribs?.class || '';
  let classNames = `${htmlContentClassNames}`;
  if (block.attributes.align) {
    const alignClass = `align${block.attributes.align}`;
    if (!classNames.split(' ').find((c: string) => c === alignClass)) {
      classNames = `${classNames} ${alignClass}`;
    }
  }
  if (block.attributes?.layout?.type === 'flex') {
    classNames = `${classNames} is-layout-flex`;
  }
  // remove duplicates in classNames
  const classNamesUnique: string[] = [];
  const classNamesSplit = classNames.split(' ').filter((c) => !!c);
  classNamesSplit.forEach((className) => {
    if (!classNamesUnique.find((c) => c === className)) {
      classNamesUnique.push(className);
    }
  });
  return classNamesUnique.join(' ');
};
