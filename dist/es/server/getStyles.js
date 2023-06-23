import { camelCase } from 'change-case';
import parse from 'html-dom-parser';
import { getBackgroundStyle } from './getBackgroundStyle.js';
import { getBorderRadiusStyle } from './getBorderRadiusStyle.js';
import { getBorderStyle } from './getBorderStyle.js';
import { getMarginStyle } from './getMarginStyle.js';
import { getMediaTextWidthStyle } from './getMediaTextWidthStyle.js';
import { getPaddingStyle } from './getPaddingStyle.js';
import { getTextStyle } from './getTextStyle.js';
import { getTypographyStyle } from './getTypographyStyle.js';
import { getLayoutStyles } from './getLayoutStyles.js';

const getStyles = (block) => {
    var _a, _b;
    const inlineStyles = {};
    const parsed = parse(block.htmlContent || '');
    const styleString = ((_b = (_a = parsed[0]) === null || _a === void 0 ? void 0 : _a.attribs) === null || _b === void 0 ? void 0 : _b.style) || '';
    const individualStyles = styleString.split(';');
    individualStyles.forEach((individualStyle) => {
        const propertyAndValue = individualStyle.split(':');
        if (propertyAndValue.length === 2) {
            const property = propertyAndValue[0];
            const value = propertyAndValue[1];
            inlineStyles[camelCase(property)] = value;
        }
    });
    const { attributes } = block;
    if (!attributes) {
        return null;
    }
    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, inlineStyles), getBorderRadiusStyle(attributes)), getBorderStyle(attributes)), getPaddingStyle(attributes)), getMarginStyle(attributes)), getTypographyStyle(attributes)), getTextStyle(attributes)), getBackgroundStyle(attributes)), getMediaTextWidthStyle(attributes)), getLayoutStyles(attributes));
};

export { getStyles };
//# sourceMappingURL=getStyles.js.map
