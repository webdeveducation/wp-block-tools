Object.defineProperty(exports, '__esModule', { value: true });

var changeCase = require('change-case');
var parse = require('html-dom-parser');
var getBackgroundStyle = require('./getBackgroundStyle.js');
var getBorderRadiusStyle = require('./getBorderRadiusStyle.js');
var getBorderStyle = require('./getBorderStyle.js');
var getMarginStyle = require('./getMarginStyle.js');
var getMediaTextWidthStyle = require('./getMediaTextWidthStyle.js');
var getPaddingStyle = require('./getPaddingStyle.js');
var getTextStyle = require('./getTextStyle.js');
var getTypographyStyle = require('./getTypographyStyle.js');
var getLayoutStyles = require('./getLayoutStyles.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var parse__default = /*#__PURE__*/_interopDefaultLegacy(parse);

const getStyles = (block) => {
    var _a, _b;
    const inlineStyles = {};
    const parsed = parse__default["default"](block.htmlContent || '');
    const styleString = ((_b = (_a = parsed[0]) === null || _a === void 0 ? void 0 : _a.attribs) === null || _b === void 0 ? void 0 : _b.style) || '';
    const individualStyles = styleString.split(';');
    individualStyles.forEach((individualStyle) => {
        const propertyAndValue = individualStyle.split(':');
        if (propertyAndValue.length === 2) {
            const property = propertyAndValue[0];
            const value = propertyAndValue[1];
            inlineStyles[changeCase.camelCase(property)] = value;
        }
    });
    const { attributes } = block;
    if (!attributes) {
        return null;
    }
    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, inlineStyles), getBorderRadiusStyle.getBorderRadiusStyle(attributes)), getBorderStyle.getBorderStyle(attributes)), getPaddingStyle.getPaddingStyle(attributes)), getMarginStyle.getMarginStyle(attributes)), getTypographyStyle.getTypographyStyle(attributes)), getTextStyle.getTextStyle(attributes)), getBackgroundStyle.getBackgroundStyle(attributes)), getMediaTextWidthStyle.getMediaTextWidthStyle(attributes)), getLayoutStyles.getLayoutStyles(attributes));
};

exports.getStyles = getStyles;
//# sourceMappingURL=getStyles.js.map
