Object.defineProperty(exports, '__esModule', { value: true });

const getBackgroundStyle = (attributes) => {
    var _a, _b;
    const backgroundStyle = {};
    if (attributes.backgroundColor) {
        backgroundStyle.backgroundColor = `var(--wp--preset--color--${attributes.backgroundColor})`;
    }
    if ((_b = (_a = attributes.style) === null || _a === void 0 ? void 0 : _a.color) === null || _b === void 0 ? void 0 : _b.background) {
        backgroundStyle.backgroundColor = attributes.style.color.background;
    }
    return backgroundStyle;
};

exports.getBackgroundStyle = getBackgroundStyle;
//# sourceMappingURL=getBackgroundStyle.js.map
