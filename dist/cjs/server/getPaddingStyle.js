Object.defineProperty(exports, '__esModule', { value: true });

var parseValue = require('./parseValue.js');

const getPaddingStyle = (attributes) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const paddingStyle = {};
    if ((_c = (_b = (_a = attributes.style) === null || _a === void 0 ? void 0 : _a.spacing) === null || _b === void 0 ? void 0 : _b.padding) === null || _c === void 0 ? void 0 : _c.bottom) {
        paddingStyle.paddingBottom = parseValue.parseValue(attributes.style.spacing.padding.bottom);
    }
    if ((_f = (_e = (_d = attributes.style) === null || _d === void 0 ? void 0 : _d.spacing) === null || _e === void 0 ? void 0 : _e.padding) === null || _f === void 0 ? void 0 : _f.top) {
        paddingStyle.paddingTop = parseValue.parseValue(attributes.style.spacing.padding.top);
    }
    if ((_j = (_h = (_g = attributes.style) === null || _g === void 0 ? void 0 : _g.spacing) === null || _h === void 0 ? void 0 : _h.padding) === null || _j === void 0 ? void 0 : _j.left) {
        paddingStyle.paddingLeft = parseValue.parseValue(attributes.style.spacing.padding.left);
    }
    if ((_m = (_l = (_k = attributes.style) === null || _k === void 0 ? void 0 : _k.spacing) === null || _l === void 0 ? void 0 : _l.padding) === null || _m === void 0 ? void 0 : _m.right) {
        paddingStyle.paddingRight = parseValue.parseValue(attributes.style.spacing.padding.right);
    }
    return paddingStyle;
};

exports.getPaddingStyle = getPaddingStyle;
//# sourceMappingURL=getPaddingStyle.js.map
