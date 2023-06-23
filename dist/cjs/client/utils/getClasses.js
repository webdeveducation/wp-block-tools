'use client';
Object.defineProperty(exports, '__esModule', { value: true });

var parse = require('html-dom-parser');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var parse__default = /*#__PURE__*/_interopDefaultLegacy(parse);

const getClasses = (block) => {
    var _a, _b, _c, _d, _e;
    const htmlContentParsed = parse__default["default"](block.htmlContent || '');
    let htmlContentClassNames = ((_b = (_a = htmlContentParsed[0]) === null || _a === void 0 ? void 0 : _a.attribs) === null || _b === void 0 ? void 0 : _b.class) || '';
    let classNames = `${htmlContentClassNames}`;
    if ((_c = block.attributes) === null || _c === void 0 ? void 0 : _c.align) {
        const alignClass = `align${block.attributes.align}`;
        if (!classNames.split(' ').find((c) => c === alignClass)) {
            classNames = `${classNames} ${alignClass}`;
        }
    }
    if (((_e = (_d = block.attributes) === null || _d === void 0 ? void 0 : _d.layout) === null || _e === void 0 ? void 0 : _e.type) === 'flex') {
        classNames = `${classNames} is-layout-flex`;
    }
    // remove duplicates in classNames
    const classNamesUnique = [];
    const classNamesSplit = classNames.split(' ').filter((c) => !!c);
    classNamesSplit.forEach((className) => {
        if (!classNamesUnique.find((c) => c === className)) {
            classNamesUnique.push(className);
        }
    });
    return classNamesUnique.join(' ');
};

exports.getClasses = getClasses;
//# sourceMappingURL=getClasses.js.map