import { getBackgroundStyle } from './getBackgroundStyle';
import { getBorderRadiusStyle } from './getBorderRadiusStyle';
import { getBorderStyle } from './getBorderStyle';
import { getMarginStyle } from './getMarginStyle';
import { getPaddingStyle } from './getPaddingStyle';
import { getTextStyle } from './getTextStyle';
import { getTypographyStyle } from './getTypographyStyle';

export const getStyles = (attributes: any) => {
  return {
    ...getBorderRadiusStyle(attributes),
    ...getBorderStyle(attributes),
    ...getPaddingStyle(attributes),
    ...getMarginStyle(attributes),
    ...getTypographyStyle(attributes),
    ...getTextStyle(attributes),
    ...getBackgroundStyle(attributes),
  };
};
