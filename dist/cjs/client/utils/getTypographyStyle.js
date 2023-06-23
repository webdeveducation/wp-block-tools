'use client';
Object.defineProperty(exports, '__esModule', { value: true });

const getTypographyStyle = (attributes) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const typographyStyle = {};
    if (attributes.fontFamily) {
        typographyStyle.fontFamily = `var(--wp--preset--font-family--${attributes.fontFamily})`;
    }
    if (attributes.fontSize) {
        typographyStyle.fontSize = `var(--wp--preset--font-size--${attributes.fontSize})`;
    }
    if ((_b = (_a = attributes.style) === null || _a === void 0 ? void 0 : _a.typography) === null || _b === void 0 ? void 0 : _b.fontSize) {
        typographyStyle.fontSize = attributes.style.typography.fontSize;
    }
    if ((_d = (_c = attributes.style) === null || _c === void 0 ? void 0 : _c.typography) === null || _d === void 0 ? void 0 : _d.fontStyle) {
        typographyStyle.fontStyle = attributes.style.typography.fontStyle;
    }
    if ((_f = (_e = attributes.style) === null || _e === void 0 ? void 0 : _e.typography) === null || _f === void 0 ? void 0 : _f.fontWeight) {
        typographyStyle.fontWeight = attributes.style.typography.fontWeight;
    }
    if ((_h = (_g = attributes.style) === null || _g === void 0 ? void 0 : _g.typography) === null || _h === void 0 ? void 0 : _h.lineHeight) {
        typographyStyle.lineHeight = attributes.style.typography.lineHeight;
    }
    if ((_k = (_j = attributes.style) === null || _j === void 0 ? void 0 : _j.typography) === null || _k === void 0 ? void 0 : _k.textDecoration) {
        typographyStyle.textDecoration = attributes.style.typography.textDecoration;
    }
    if ((_m = (_l = attributes.style) === null || _l === void 0 ? void 0 : _l.typography) === null || _m === void 0 ? void 0 : _m.textTransform) {
        typographyStyle.textTransform = attributes.style.typography.textTransform;
    }
    return typographyStyle;
};

exports.getTypographyStyle = getTypographyStyle;
//# sourceMappingURL=getTypographyStyle.js.map
