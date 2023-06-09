import { camelCase } from 'change-case';
import parse from 'html-dom-parser';
import { IBlockBase } from '../types';
import { getBackgroundStyle } from './getBackgroundStyle';
import { getBorderRadiusStyle } from './getBorderRadiusStyle';
import { getBorderStyle } from './getBorderStyle';
import { getMarginStyle } from './getMarginStyle';
import { getMediaTextWidthStyle } from './getMediaTextWidthStyle';
import { getPaddingStyle } from './getPaddingStyle';
import { getTextStyle } from './getTextStyle';
import { getTypographyStyle } from './getTypographyStyle';
import { getLayoutStyles } from './getLayoutStyles';

export const getStyles = (block: IBlockBase) => {
  const inlineStyles: { [key: string]: string } = {};
  const parsed: any = parse(block.htmlContent || '');
  const styleString = parsed[0]?.attribs?.style || '';
  const individualStyles: string[] = styleString.split(';');
  individualStyles.forEach((individualStyle) => {
    const propertyAndValue = individualStyle.split(':');
    if (propertyAndValue.length === 2) {
      const property = propertyAndValue[0];
      const value = propertyAndValue[1];
      inlineStyles[camelCase(property)] = value;
    }
  });

  const { attributes } = block;

  return {
    ...inlineStyles,
    ...getBorderRadiusStyle(attributes),
    ...getBorderStyle(attributes),
    ...getPaddingStyle(attributes),
    ...getMarginStyle(attributes),
    ...getTypographyStyle(attributes),
    ...getTextStyle(attributes),
    ...getBackgroundStyle(attributes),
    ...getMediaTextWidthStyle(attributes),
    ...getLayoutStyles(attributes),
  };
};
