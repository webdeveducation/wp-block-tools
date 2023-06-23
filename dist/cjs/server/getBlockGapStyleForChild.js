Object.defineProperty(exports, '__esModule', { value: true });

var parseValue = require('./parseValue.js');

const getBlockGapStyleForChild = (attributes) => {
    var _a, _b;
    const blockGapStyle = {};
    if ((_b = (_a = attributes.style) === null || _a === void 0 ? void 0 : _a.spacing) === null || _b === void 0 ? void 0 : _b.blockGap) {
        blockGapStyle.marginBlockStart = parseValue.parseValue(attributes.style.spacing.blockGap);
    }
    return blockGapStyle;
};

exports.getBlockGapStyleForChild = getBlockGapStyleForChild;
//# sourceMappingURL=getBlockGapStyleForChild.js.map
