const getTextStyle = (attributes) => {
    var _a, _b;
    const textStyle = {};
    if (attributes.textColor) {
        textStyle.color = `var(--wp--preset--color--${attributes.textColor})`;
    }
    if ((_b = (_a = attributes.style) === null || _a === void 0 ? void 0 : _a.color) === null || _b === void 0 ? void 0 : _b.text) {
        textStyle.color = attributes.style.color.text;
    }
    return textStyle;
};

export { getTextStyle };
//# sourceMappingURL=getTextStyle.js.map
