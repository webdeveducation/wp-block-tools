'use client';
Object.defineProperty(exports, '__esModule', { value: true });

var parseValue = require('./parseValue.js');

const getBlockGapStyle = (attributes) => {
    var _a, _b;
    const blockGapStyle = {};
    if ((_b = (_a = attributes === null || attributes === void 0 ? void 0 : attributes.style) === null || _a === void 0 ? void 0 : _a.spacing) === null || _b === void 0 ? void 0 : _b.blockGap) {
        const blockGap = attributes.style.spacing.blockGap;
        if (typeof blockGap === 'object') {
            if (blockGap.left) {
                blockGapStyle.columnGap = parseValue.parseValue(blockGap.left);
            }
            if (blockGap.top) {
                blockGapStyle.rowGap = parseValue.parseValue(blockGap.top);
            }
        }
        else {
            blockGapStyle.gap = parseValue.parseValue(blockGap);
        }
    }
    return blockGapStyle;
};

exports.getBlockGapStyle = getBlockGapStyle;
//# sourceMappingURL=getBlockGapStyle.js.map