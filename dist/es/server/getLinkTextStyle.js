import { parseValue } from './parseValue.js';

const getLinkTextStyle = (attributes) => {
    var _a, _b, _c, _d;
    const textStyle = {};
    // style.elements.link.color.text
    if ((_d = (_c = (_b = (_a = attributes === null || attributes === void 0 ? void 0 : attributes.style) === null || _a === void 0 ? void 0 : _a.elements) === null || _b === void 0 ? void 0 : _b.link) === null || _c === void 0 ? void 0 : _c.color) === null || _d === void 0 ? void 0 : _d.text) {
        textStyle.color = parseValue(attributes.style.elements.link.color.text);
    }
    return textStyle;
};

export { getLinkTextStyle };
//# sourceMappingURL=getLinkTextStyle.js.map
