Object.defineProperty(exports, '__esModule', { value: true });

const parseValue = (value) => {
    if (value.indexOf('var:') === 0) {
        return `${value.replace(':', '(--wp--').split('|').join('--')})`;
    }
    return value;
};

exports.parseValue = parseValue;
//# sourceMappingURL=parseValue.js.map
