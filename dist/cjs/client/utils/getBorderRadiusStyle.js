'use client';
Object.defineProperty(exports, '__esModule', { value: true });

const getBorderRadiusStyle = (attributes) => {
    var _a, _b, _c, _d;
    const borderRadiusStyle = {};
    if (typeof ((_b = (_a = attributes === null || attributes === void 0 ? void 0 : attributes.style) === null || _a === void 0 ? void 0 : _a.border) === null || _b === void 0 ? void 0 : _b.radius) === 'object') {
        const { radius } = attributes.style.border;
        borderRadiusStyle.borderBottomLeftRadius = radius.bottomLeft;
        borderRadiusStyle.borderTopLeftRadius = radius.topLeft;
        borderRadiusStyle.borderTopRightRadius = radius.topRight;
        borderRadiusStyle.borderBottomRightRadius = radius.bottomRight;
    }
    else if ((_d = (_c = attributes === null || attributes === void 0 ? void 0 : attributes.style) === null || _c === void 0 ? void 0 : _c.border) === null || _d === void 0 ? void 0 : _d.radius) {
        borderRadiusStyle.borderRadius = attributes.style.border.radius;
    }
    return borderRadiusStyle;
};

exports.getBorderRadiusStyle = getBorderRadiusStyle;
//# sourceMappingURL=getBorderRadiusStyle.js.map
