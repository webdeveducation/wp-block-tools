'use client';
const parseValue = (value) => {
    if (value.indexOf('var:') === 0) {
        return `${value.replace(':', '(--wp--').split('|').join('--')})`;
    }
    return value;
};

export { parseValue };
//# sourceMappingURL=parseValue.js.map
