'use client';
import { parseValue } from './parseValue.js';

const getLayoutStyles = (attributes) => {
    var _a, _b;
    const layoutStyle = {};
    if ((_a = attributes === null || attributes === void 0 ? void 0 : attributes.layout) === null || _a === void 0 ? void 0 : _a.type) {
        layoutStyle.display = parseValue(attributes.layout.type);
    }
    if ((_b = attributes === null || attributes === void 0 ? void 0 : attributes.layout) === null || _b === void 0 ? void 0 : _b.justifyContent) {
        layoutStyle.justifyContent = parseValue(attributes.layout.justifyContent);
    }
    return layoutStyle;
};

export { getLayoutStyles };
//# sourceMappingURL=getLayoutStyles.js.map
