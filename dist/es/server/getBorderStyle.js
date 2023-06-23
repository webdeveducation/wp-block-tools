import { parseValue } from './parseValue.js';

const getBorderStyle = (attributes) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3;
    const borderStyle = {};
    if (attributes.borderColor) {
        borderStyle.borderColor = `var(--wp--preset--color--${attributes.borderColor})`;
    }
    if ((_b = (_a = attributes.style) === null || _a === void 0 ? void 0 : _a.border) === null || _b === void 0 ? void 0 : _b.color) {
        borderStyle.borderColor = attributes.style.border.color;
    }
    if ((_d = (_c = attributes.style) === null || _c === void 0 ? void 0 : _c.border) === null || _d === void 0 ? void 0 : _d.width) {
        borderStyle.borderWidth = attributes.style.border.width;
    }
    if ((_g = (_f = (_e = attributes.style) === null || _e === void 0 ? void 0 : _e.border) === null || _f === void 0 ? void 0 : _f.bottom) === null || _g === void 0 ? void 0 : _g.color) {
        borderStyle.borderBottomColor = parseValue(attributes.style.border.bottom.color);
    }
    if ((_k = (_j = (_h = attributes.style) === null || _h === void 0 ? void 0 : _h.border) === null || _j === void 0 ? void 0 : _j.bottom) === null || _k === void 0 ? void 0 : _k.width) {
        borderStyle.borderBottomWidth = parseValue(attributes.style.border.bottom.width);
    }
    if ((_o = (_m = (_l = attributes.style) === null || _l === void 0 ? void 0 : _l.border) === null || _m === void 0 ? void 0 : _m.top) === null || _o === void 0 ? void 0 : _o.color) {
        borderStyle.borderTopColor = parseValue(attributes.style.border.top.color);
    }
    if ((_r = (_q = (_p = attributes.style) === null || _p === void 0 ? void 0 : _p.border) === null || _q === void 0 ? void 0 : _q.top) === null || _r === void 0 ? void 0 : _r.width) {
        borderStyle.borderTopWidth = parseValue(attributes.style.border.top.width);
    }
    if ((_u = (_t = (_s = attributes.style) === null || _s === void 0 ? void 0 : _s.border) === null || _t === void 0 ? void 0 : _t.left) === null || _u === void 0 ? void 0 : _u.color) {
        borderStyle.borderLeftColor = parseValue(attributes.style.border.left.color);
    }
    if ((_x = (_w = (_v = attributes.style) === null || _v === void 0 ? void 0 : _v.border) === null || _w === void 0 ? void 0 : _w.left) === null || _x === void 0 ? void 0 : _x.width) {
        borderStyle.borderLeftWidth = parseValue(attributes.style.border.left.width);
    }
    if ((_0 = (_z = (_y = attributes.style) === null || _y === void 0 ? void 0 : _y.border) === null || _z === void 0 ? void 0 : _z.right) === null || _0 === void 0 ? void 0 : _0.color) {
        borderStyle.borderRightColor = parseValue(attributes.style.border.right.color);
    }
    if ((_3 = (_2 = (_1 = attributes.style) === null || _1 === void 0 ? void 0 : _1.border) === null || _2 === void 0 ? void 0 : _2.right) === null || _3 === void 0 ? void 0 : _3.width) {
        borderStyle.borderRightWidth = parseValue(attributes.style.border.right.width);
    }
    return borderStyle;
};

export { getBorderStyle };
//# sourceMappingURL=getBorderStyle.js.map
