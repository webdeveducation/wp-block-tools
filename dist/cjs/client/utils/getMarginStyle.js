'use client';
Object.defineProperty(exports, '__esModule', { value: true });

var parseValue = require('./parseValue.js');

const getMarginStyle = (attributes) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const marginStyle = {};
    if ((_c = (_b = (_a = attributes.style) === null || _a === void 0 ? void 0 : _a.spacing) === null || _b === void 0 ? void 0 : _b.margin) === null || _c === void 0 ? void 0 : _c.bottom) {
        marginStyle.marginBottom = parseValue.parseValue(attributes.style.spacing.margin.bottom);
    }
    if ((_f = (_e = (_d = attributes.style) === null || _d === void 0 ? void 0 : _d.spacing) === null || _e === void 0 ? void 0 : _e.margin) === null || _f === void 0 ? void 0 : _f.top) {
        marginStyle.marginTop = parseValue.parseValue(attributes.style.spacing.margin.top);
    }
    if ((_j = (_h = (_g = attributes.style) === null || _g === void 0 ? void 0 : _g.spacing) === null || _h === void 0 ? void 0 : _h.margin) === null || _j === void 0 ? void 0 : _j.left) {
        marginStyle.marginLeft = parseValue.parseValue(attributes.style.spacing.margin.left);
    }
    if ((_m = (_l = (_k = attributes.style) === null || _k === void 0 ? void 0 : _k.spacing) === null || _l === void 0 ? void 0 : _l.margin) === null || _m === void 0 ? void 0 : _m.right) {
        marginStyle.marginRight = parseValue.parseValue(attributes.style.spacing.margin.right);
    }
    return marginStyle;
};

exports.getMarginStyle = getMarginStyle;
//# sourceMappingURL=getMarginStyle.js.map
