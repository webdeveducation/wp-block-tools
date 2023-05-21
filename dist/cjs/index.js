Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var reactHelmet = require('react-helmet');
var uuid = require('uuid');
var changeCase = require('change-case');
var parse = require('html-dom-parser');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var parse__default = /*#__PURE__*/_interopDefaultLegacy(parse);

const assignIds = (blocks) => {
    const blocksCopy = JSON.parse(JSON.stringify(blocks));
    const assignId = (b, parentId) => {
        b.forEach((block) => {
            var _a;
            block.id = uuid.v4();
            if (parentId) {
                block.parentId = parentId;
            }
            if ((_a = block.innerBlocks) === null || _a === void 0 ? void 0 : _a.length) {
                assignId(block.innerBlocks, block.id);
            }
        });
    };
    assignId(blocksCopy);
    return blocksCopy;
};

const getBorderRadiusStyle = (attributes) => {
    var _a, _b, _c, _d;
    const borderRadiusStyle = {};
    if (typeof ((_b = (_a = attributes.style) === null || _a === void 0 ? void 0 : _a.border) === null || _b === void 0 ? void 0 : _b.radius) === 'object') {
        const { radius } = attributes.style.border;
        borderRadiusStyle.borderBottomLeftRadius = radius.bottomLeft;
        borderRadiusStyle.borderTopLeftRadius = radius.topLeft;
        borderRadiusStyle.borderTopRightRadius = radius.topRight;
        borderRadiusStyle.borderBottomRightRadius = radius.bottomRight;
    }
    else if ((_d = (_c = attributes.style) === null || _c === void 0 ? void 0 : _c.border) === null || _d === void 0 ? void 0 : _d.radius) {
        borderRadiusStyle.borderRadius = attributes.style.border.radius;
    }
    return borderRadiusStyle;
};

const parseValue = (value) => {
    if (value.indexOf('var:') === 0) {
        return `${value.replace(':', '(--wp--').split('|').join('--')})`;
    }
    return value;
};

const getBorderStyle = (attributes) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3;
    const borderStyle = {};
    if (attributes.borderColor) {
        borderStyle.borderColor = `var(--wp--preset--color--${attributes.borderColor})`;
    }
    if ((_b = (_a = attributes.style) === null || _a === void 0 ? void 0 : _a.border) === null || _b === void 0 ? void 0 : _b.color) {
        borderStyle.borderColor = attributes.style.border.color;
    }
    if ((_d = (_c = attributes.style) === null || _c === void 0 ? void 0 : _c.border) === null || _d === void 0 ? void 0 : _d.width) {
        borderStyle.borderWidth = attributes.style.border.width;
    }
    if ((_g = (_f = (_e = attributes.style) === null || _e === void 0 ? void 0 : _e.border) === null || _f === void 0 ? void 0 : _f.bottom) === null || _g === void 0 ? void 0 : _g.color) {
        borderStyle.borderBottomColor = parseValue(attributes.style.border.bottom.color);
    }
    if ((_k = (_j = (_h = attributes.style) === null || _h === void 0 ? void 0 : _h.border) === null || _j === void 0 ? void 0 : _j.bottom) === null || _k === void 0 ? void 0 : _k.width) {
        borderStyle.borderBottomWidth = parseValue(attributes.style.border.bottom.width);
    }
    if ((_o = (_m = (_l = attributes.style) === null || _l === void 0 ? void 0 : _l.border) === null || _m === void 0 ? void 0 : _m.top) === null || _o === void 0 ? void 0 : _o.color) {
        borderStyle.borderTopColor = parseValue(attributes.style.border.top.color);
    }
    if ((_r = (_q = (_p = attributes.style) === null || _p === void 0 ? void 0 : _p.border) === null || _q === void 0 ? void 0 : _q.top) === null || _r === void 0 ? void 0 : _r.width) {
        borderStyle.borderTopWidth = parseValue(attributes.style.border.top.width);
    }
    if ((_u = (_t = (_s = attributes.style) === null || _s === void 0 ? void 0 : _s.border) === null || _t === void 0 ? void 0 : _t.left) === null || _u === void 0 ? void 0 : _u.color) {
        borderStyle.borderLeftColor = parseValue(attributes.style.border.left.color);
    }
    if ((_x = (_w = (_v = attributes.style) === null || _v === void 0 ? void 0 : _v.border) === null || _w === void 0 ? void 0 : _w.left) === null || _x === void 0 ? void 0 : _x.width) {
        borderStyle.borderLeftWidth = parseValue(attributes.style.border.left.width);
    }
    if ((_0 = (_z = (_y = attributes.style) === null || _y === void 0 ? void 0 : _y.border) === null || _z === void 0 ? void 0 : _z.right) === null || _0 === void 0 ? void 0 : _0.color) {
        borderStyle.borderRightColor = parseValue(attributes.style.border.right.color);
    }
    if ((_3 = (_2 = (_1 = attributes.style) === null || _1 === void 0 ? void 0 : _1.border) === null || _2 === void 0 ? void 0 : _2.right) === null || _3 === void 0 ? void 0 : _3.width) {
        borderStyle.borderRightWidth = parseValue(attributes.style.border.right.width);
    }
    return borderStyle;
};

const getMarginStyle = (attributes) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const marginStyle = {};
    if ((_c = (_b = (_a = attributes.style) === null || _a === void 0 ? void 0 : _a.spacing) === null || _b === void 0 ? void 0 : _b.margin) === null || _c === void 0 ? void 0 : _c.bottom) {
        marginStyle.marginBottom = parseValue(attributes.style.spacing.margin.bottom);
    }
    if ((_f = (_e = (_d = attributes.style) === null || _d === void 0 ? void 0 : _d.spacing) === null || _e === void 0 ? void 0 : _e.margin) === null || _f === void 0 ? void 0 : _f.top) {
        marginStyle.marginTop = parseValue(attributes.style.spacing.margin.top);
    }
    if ((_j = (_h = (_g = attributes.style) === null || _g === void 0 ? void 0 : _g.spacing) === null || _h === void 0 ? void 0 : _h.margin) === null || _j === void 0 ? void 0 : _j.left) {
        marginStyle.marginLeft = parseValue(attributes.style.spacing.margin.left);
    }
    if ((_m = (_l = (_k = attributes.style) === null || _k === void 0 ? void 0 : _k.spacing) === null || _l === void 0 ? void 0 : _l.margin) === null || _m === void 0 ? void 0 : _m.right) {
        marginStyle.marginRight = parseValue(attributes.style.spacing.margin.right);
    }
    return marginStyle;
};

const getPaddingStyle = (attributes) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const paddingStyle = {};
    if ((_c = (_b = (_a = attributes.style) === null || _a === void 0 ? void 0 : _a.spacing) === null || _b === void 0 ? void 0 : _b.padding) === null || _c === void 0 ? void 0 : _c.bottom) {
        paddingStyle.paddingBottom = parseValue(attributes.style.spacing.padding.bottom);
    }
    if ((_f = (_e = (_d = attributes.style) === null || _d === void 0 ? void 0 : _d.spacing) === null || _e === void 0 ? void 0 : _e.padding) === null || _f === void 0 ? void 0 : _f.top) {
        paddingStyle.paddingTop = parseValue(attributes.style.spacing.padding.top);
    }
    if ((_j = (_h = (_g = attributes.style) === null || _g === void 0 ? void 0 : _g.spacing) === null || _h === void 0 ? void 0 : _h.padding) === null || _j === void 0 ? void 0 : _j.left) {
        paddingStyle.paddingLeft = parseValue(attributes.style.spacing.padding.left);
    }
    if ((_m = (_l = (_k = attributes.style) === null || _k === void 0 ? void 0 : _k.spacing) === null || _l === void 0 ? void 0 : _l.padding) === null || _m === void 0 ? void 0 : _m.right) {
        paddingStyle.paddingRight = parseValue(attributes.style.spacing.padding.right);
    }
    return paddingStyle;
};

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

const getMediaTextWidthStyle = (attributes) => {
    const mediaTextWidthStyles = {};
    if (attributes.mediaWidth !== null && attributes.mediaWidth !== 'undefined') {
        if (attributes.mediaPosition === 'right') {
            mediaTextWidthStyles.gridTemplateColumns = `auto ${attributes.mediaWidth}%`;
        }
        else {
            mediaTextWidthStyles.gridTemplateColumns = `${attributes.mediaWidth}% auto`;
        }
    }
    return mediaTextWidthStyles;
};

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

const getTypographyStyle = (attributes) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const typographyStyle = {};
    if (attributes.fontFamily) {
        typographyStyle.fontFamily = `var(--wp--preset--font-family--${attributes.fontFamily})`;
    }
    if (attributes.fontSize) {
        typographyStyle.fontSize = `var(--wp--preset--font-size--${attributes.fontSize})`;
    }
    if ((_b = (_a = attributes.style) === null || _a === void 0 ? void 0 : _a.typography) === null || _b === void 0 ? void 0 : _b.fontSize) {
        typographyStyle.fontSize = attributes.style.typography.fontSize;
    }
    if ((_d = (_c = attributes.style) === null || _c === void 0 ? void 0 : _c.typography) === null || _d === void 0 ? void 0 : _d.fontStyle) {
        typographyStyle.fontStyle = attributes.style.typography.fontStyle;
    }
    if ((_f = (_e = attributes.style) === null || _e === void 0 ? void 0 : _e.typography) === null || _f === void 0 ? void 0 : _f.fontWeight) {
        typographyStyle.fontWeight = attributes.style.typography.fontWeight;
    }
    if ((_h = (_g = attributes.style) === null || _g === void 0 ? void 0 : _g.typography) === null || _h === void 0 ? void 0 : _h.lineHeight) {
        typographyStyle.lineHeight = attributes.style.typography.lineHeight;
    }
    if ((_k = (_j = attributes.style) === null || _j === void 0 ? void 0 : _j.typography) === null || _k === void 0 ? void 0 : _k.textDecoration) {
        typographyStyle.textDecoration = attributes.style.typography.textDecoration;
    }
    if ((_m = (_l = attributes.style) === null || _l === void 0 ? void 0 : _l.typography) === null || _m === void 0 ? void 0 : _m.textTransform) {
        typographyStyle.textTransform = attributes.style.typography.textTransform;
    }
    return typographyStyle;
};

const getStyles = (block) => {
    var _a, _b;
    const inlineStyles = {};
    const parsed = parse__default["default"](block.htmlContent || '');
    const styleString = ((_b = (_a = parsed[0]) === null || _a === void 0 ? void 0 : _a.attribs) === null || _b === void 0 ? void 0 : _b.style) || '';
    const individualStyles = styleString.split(';');
    individualStyles.forEach((individualStyle) => {
        const propertyAndValue = individualStyle.split(':');
        if (propertyAndValue.length === 2) {
            const property = propertyAndValue[0];
            const value = propertyAndValue[1];
            inlineStyles[changeCase.camelCase(property)] = value;
        }
    });
    const { attributes } = block;
    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, inlineStyles), getBorderRadiusStyle(attributes)), getBorderStyle(attributes)), getPaddingStyle(attributes)), getMarginStyle(attributes)), getTypographyStyle(attributes)), getTextStyle(attributes)), getBackgroundStyle(attributes)), getMediaTextWidthStyle(attributes));
};

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const getAlias = (blockId = '') => {
    return `A${blockId.split('-').join('')}`;
};
const assignGatsbyImage = ({ blocks = [], graphql, coreImage, coreMediaText, coreCover, }) => __awaiter(void 0, void 0, void 0, function* () {
    const blocksCopy = [...blocks];
    const imagesToRetrieve = [];
    const retrieveGatsbyImage = (b) => {
        var _a;
        for (let i = 0; i < b.length; i++) {
            const block = b[i];
            if ((coreImage && block.name === 'core/image') ||
                (coreCover && block.name === 'core/cover') ||
                (coreMediaText && block.name === 'core/media-text')) {
                const id = block.attributes.id || block.attributes.mediaId;
                let width = block.attributes.width;
                if (block.name === 'core/media-text') {
                    width = Math.ceil(1200 * ((block.attributes.mediaWidth || 50) / 100));
                }
                if (block.name === 'core/image') {
                    width = 600;
                }
                if (!!id && !!block.id) {
                    try {
                        const query = graphql(`
              query ImageQuery${id} {
                ${getAlias(block.id)}: wpMediaItem(databaseId: { eq: ${id} }) {
                  databaseId
                  gatsbyImage(width: ${Math.min(width, 1200)}, formats: WEBP, outputPixelDensities: [0.125, 0.25, 0.5, 1, 2])
                }
              }
            `);
                        imagesToRetrieve.push(query);
                    }
                    catch (e) {
                        console.log('ERROR: ', e);
                    }
                }
            }
            if ((_a = block.innerBlocks) === null || _a === void 0 ? void 0 : _a.length) {
                retrieveGatsbyImage(block.innerBlocks);
            }
        }
    };
    retrieveGatsbyImage(blocksCopy);
    const images = yield Promise.allSettled(imagesToRetrieve);
    const imagesMap = {};
    images
        .filter((image) => {
        const key = Object.keys(image.value.data || {})[0];
        return !!key && !!image.value.data[key];
    })
        .forEach((image) => {
        if (image.status === 'fulfilled') {
            const key = Object.keys(image.value.data)[0];
            const { databaseId, gatsbyImage } = image.value.data[key];
            imagesMap[key] = {
                databaseId,
                gatsbyImage,
            };
        }
    });
    const setGatsbyImage = (b) => {
        b.forEach((block) => {
            var _a, _b;
            if ((block.id && coreImage && block.name === 'core/image') ||
                (coreCover && block.name === 'core/cover') ||
                (coreMediaText && block.name === 'core/media-text')) {
                block.attributes.gatsbyImage =
                    (_a = imagesMap[getAlias(block.id)]) === null || _a === void 0 ? void 0 : _a.gatsbyImage;
            }
            if ((_b = block.innerBlocks) === null || _b === void 0 ? void 0 : _b.length) {
                setGatsbyImage(block.innerBlocks);
            }
        });
    };
    setGatsbyImage(blocksCopy);
    return blocksCopy;
});

const getLinkTextStyle = (attributes) => {
    var _a, _b, _c, _d;
    const textStyle = {};
    // style.elements.link.color.text
    if ((_d = (_c = (_b = (_a = attributes === null || attributes === void 0 ? void 0 : attributes.style) === null || _a === void 0 ? void 0 : _a.elements) === null || _b === void 0 ? void 0 : _b.link) === null || _c === void 0 ? void 0 : _c.color) === null || _d === void 0 ? void 0 : _d.text) {
        textStyle.color = parseValue(attributes.style.elements.link.color.text);
    }
    return textStyle;
};

function convertStyleStringToReact(styleString) {
    const styles = {};
    // Split the style string into individual style declarations
    const declarations = styleString.split(';');
    declarations.forEach((declaration) => {
        // Split each style declaration into property and value
        const [property, value] = declaration.split(':');
        if (property && value) {
            // Remove leading/trailing whitespaces from property and value
            const formattedProperty = property.trim();
            const formattedValue = value.trim();
            // Convert CSS property to camelCase for React
            const camelCasedProperty = formattedProperty.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
            // Add the style to the styles object
            styles[camelCasedProperty] = formattedValue;
        }
    });
    return styles;
}

const getBlockById = (allBlocks, id) => {
    let foundBlock = null;
    const findBlock = (bs) => {
        var _a;
        for (let block of bs) {
            if (block.id === id) {
                foundBlock = block;
                break;
            }
            else if ((_a = block.innerBlocks) === null || _a === void 0 ? void 0 : _a.length) {
                findBlock(block.innerBlocks);
            }
        }
    };
    findBlock(allBlocks);
    return foundBlock;
};

const getClasses = (block) => {
    var _a, _b;
    const htmlContentParsed = parse__default["default"](block.htmlContent || '');
    let htmlContentClassNames = ((_b = (_a = htmlContentParsed[0]) === null || _a === void 0 ? void 0 : _a.attribs) === null || _b === void 0 ? void 0 : _b.class) || '';
    let classNames = `${htmlContentClassNames}`;
    if (block.attributes.align) {
        const alignClass = `align${block.attributes.align}`;
        if (!classNames.split(' ').find((c) => c === alignClass)) {
            classNames = `${classNames} ${alignClass}`;
        }
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

const BlockRendererContext = React__default["default"].createContext({
    blocks: [],
});
const BlockRendererProvider = ({ renderComponent, customInternalLinkComponent, siteDomain, blocks, children, }) => {
    const blocksWithIds = assignIds(blocks);
    return (React__default["default"].createElement(BlockRendererContext.Provider, { value: {
            renderComponent,
            customInternalLinkComponent,
            siteDomain,
            blocks: blocksWithIds,
        } }, children ? children : React__default["default"].createElement(RootBlockRenderer, null)));
};
const useBlockRendererContext = () => {
    const blockRendererContext = React.useContext(BlockRendererContext);
    return blockRendererContext;
};

function createReactNodes(html, options) {
    const traverse = (node) => {
        // if this is a text node, just return the text
        if (node.type === 'text') {
            return node.data;
        }
        // if this is already a react component, just return the component
        if (node.type === 'react') {
            return node.component || null;
        }
        const { type, name, attribs, children } = node;
        // Convert attributes to React props
        const props = {};
        for (const key in attribs) {
            if (attribs.hasOwnProperty(key)) {
                if (key === 'style' && typeof attribs[key] === 'string') {
                    props[key] = convertStyleStringToReact(attribs[key]);
                }
                else if (key === 'class') {
                    props['className'] = attribs[key];
                }
                else if (key === 'viewbox') {
                    props['viewBox'] = attribs[key];
                }
                else {
                    props[key] = attribs[key];
                }
            }
        }
        if (((options === null || options === void 0 ? void 0 : options.component) && !(options === null || options === void 0 ? void 0 : options.className)) ||
            ((options === null || options === void 0 ? void 0 : options.component) &&
                !!(options === null || options === void 0 ? void 0 : options.className) &&
                attribs.class.split(' ').find((c) => c === options.className))) {
            return React__default["default"].createElement(name, Object.assign(Object.assign({}, props), { key: uuid.v4() }), options.component);
        }
        const reactChildren = children.map((child) => traverse(child));
        // Create React component based on the node type
        if (type === 'tag') {
            return React__default["default"].createElement(name, Object.assign(Object.assign({}, props), { key: uuid.v4() }), ...reactChildren);
        }
        else if (type === 'script' || type === 'style') {
            return React__default["default"].createElement('div', {
                dangerouslySetInnerHTML: { __html: node.children[0].data },
                key: uuid.v4(),
            });
        }
        return null; // Return null for unsupported node types
    };
    return html.map((el) => traverse(el));
}

const hasClass = (nd, className) => {
    var _a, _b, _c;
    return (!!((_a = nd.attribs) === null || _a === void 0 ? void 0 : _a.class) &&
        ((_c = (_b = nd.attribs) === null || _b === void 0 ? void 0 : _b.class) === null || _c === void 0 ? void 0 : _c.split(' ').find((c) => c === className)));
};

const TerminalBlock = ({ block }) => {
    const { blocks: allBlocks, customInternalLinkComponent, siteDomain, } = useBlockRendererContext();
    const parsedHTML = parse__default["default"](block.htmlContent || '') || [];
    const getInternalHref = (href) => {
        const siteDomainWithoutProtocol = (siteDomain || '')
            .replace('http://', '')
            .replace('https://', '');
        return href
            .replace('http://', '')
            .replace('https://', '')
            .replace(siteDomainWithoutProtocol || '', '');
    };
    const traverse = (els) => {
        els.forEach((el) => {
            var _a, _b, _c, _d, _e;
            // process social link based on parent "core/social-links" block attributes
            if (block.name === 'core/social-link') {
                // get parent
                if (block.parentId) {
                    const parentBlock = getBlockById(allBlocks, block.parentId);
                    if (!el.attribs) {
                        el.attribs = {};
                    }
                    if (el.name === 'a') {
                        if ((_a = parentBlock === null || parentBlock === void 0 ? void 0 : parentBlock.attributes) === null || _a === void 0 ? void 0 : _a.openInNewTab) {
                            el.attribs.target = '_blank';
                            el.attribs.rel = 'noopener nofollow';
                        }
                    }
                    if (((_b = parentBlock === null || parentBlock === void 0 ? void 0 : parentBlock.attributes) === null || _b === void 0 ? void 0 : _b.showLabels) &&
                        hasClass(el, 'wp-block-social-link-label')) {
                        el.attribs.class = el.attribs.class.replace('screen-reader-text', '');
                    }
                }
            }
            if (el.type === 'tag' && el.name === 'a') {
                // if anchor tag, check to see if it's being rendered within a paragraph block
                if (block.name === 'core/paragraph') {
                    // get the link styles
                    const linkStyles = getLinkTextStyle(block.attributes);
                    if (!el.attribs) {
                        el.attribs = {};
                    }
                    el.attribs.style = `color: ${linkStyles.color};${el.attribs.style || ''}`;
                }
                // process if anchor tag and has customInternalLinkComponent
                const href = ((_c = el.attribs) === null || _c === void 0 ? void 0 : _c.href) || '';
                const hrefWithoutProtocol = href
                    .replace('http://', '')
                    .replace('https://', '');
                const siteDomainWithoutProtocol = (siteDomain || '')
                    .replace('http://', '')
                    .replace('https://', '');
                if (customInternalLinkComponent &&
                    ((!!siteDomainWithoutProtocol &&
                        hrefWithoutProtocol.indexOf(siteDomainWithoutProtocol) === 0) ||
                        hrefWithoutProtocol.indexOf('/') === 0)) {
                    const reactElement = createReactNodes([el]);
                    const style = ((_d = el.attribs) === null || _d === void 0 ? void 0 : _d.style)
                        ? convertStyleStringToReact((_e = el.attribs) === null || _e === void 0 ? void 0 : _e.style)
                        : null;
                    const internalLinkComponent = customInternalLinkComponent(Object.assign(Object.assign({}, ((el === null || el === void 0 ? void 0 : el.attribs) || {})), { style, internalHref: getInternalHref(href), children: reactElement }));
                    if (!!internalLinkComponent) {
                        el.type = 'react';
                        el.component = internalLinkComponent;
                    }
                }
            }
            if (el.children) {
                traverse(el.children);
            }
        });
    };
    traverse(parsedHTML);
    return React__default["default"].createElement(React.Fragment, null, createReactNodes(parsedHTML));
};

const BlockRenderer = ({ blocks = [] }) => {
    const { renderComponent } = useBlockRendererContext();
    const inlineStylesheets = blocks
        .filter((block) => !!block.inlineStylesheet)
        .map((block) => block.inlineStylesheet);
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        !!inlineStylesheets.length && (React__default["default"].createElement(reactHelmet.Helmet, null, inlineStylesheets.map((stylesheet, i) => (React__default["default"].createElement("style", { key: i }, stylesheet))))),
        blocks.map((block) => {
            var _a, _b, _c;
            // render custom component for this block if exists
            const component = renderComponent === null || renderComponent === void 0 ? void 0 : renderComponent(block);
            if (component) {
                return React__default["default"].createElement(React__default["default"].Fragment, { key: block.id }, component);
            }
            // if no htmlContent but has inner blocks, just render the inner blocks
            if (!block.htmlContent && ((_a = block.innerBlocks) === null || _a === void 0 ? void 0 : _a.length)) {
                return React__default["default"].createElement(BlockRenderer, { key: block.id, blocks: block.innerBlocks });
            }
            // if no inner blocks
            // here we need to render the terminal block which will
            // also cater for the siteDomain replace
            const parsedHTML = parse__default["default"](block.htmlContent || '') || [];
            if (block.htmlContent && !((_b = block.innerBlocks) === null || _b === void 0 ? void 0 : _b.length)) {
                return React__default["default"].createElement(TerminalBlock, { key: block.id, block: block });
            }
            // if html content and inner blocks
            if (block.htmlContent && ((_c = block.innerBlocks) === null || _c === void 0 ? void 0 : _c.length)) {
                switch (block.name) {
                    case 'core/block':
                        return (React__default["default"].createElement(BlockRenderer, { key: block.id, blocks: block.innerBlocks }));
                    case 'core/media-text': {
                        return (React__default["default"].createElement(React__default["default"].Fragment, { key: block.id }, createReactNodes(parsedHTML, {
                            component: React__default["default"].createElement(BlockRenderer, { blocks: block.innerBlocks }),
                            className: 'wp-block-media-text__content',
                        })));
                    }
                    case 'core/cover': {
                        return (React__default["default"].createElement(React__default["default"].Fragment, { key: block.id }, createReactNodes(parsedHTML, {
                            component: React__default["default"].createElement(BlockRenderer, { blocks: block.innerBlocks }),
                            className: 'wp-block-cover__inner-container',
                        })));
                    }
                    default: {
                        return (React__default["default"].createElement(React__default["default"].Fragment, { key: block.id }, createReactNodes(parsedHTML, {
                            component: React__default["default"].createElement(BlockRenderer, { blocks: block.innerBlocks }),
                        })));
                    }
                }
            }
            return null;
        })));
};
const RootBlockRenderer = ({ blocks = [] }) => {
    const { blocks: allBlocks } = useBlockRendererContext();
    return (React__default["default"].createElement("div", { className: "wp-site-blocks", style: { paddingTop: 0 } },
        React__default["default"].createElement("main", { className: "is-layout-flow wp-block-group" },
            React__default["default"].createElement("div", { className: "has-global-padding is-layout-constrained entry-content wp-block-post-content" },
                React__default["default"].createElement(BlockRenderer, { blocks: allBlocks || blocks })))));
};

exports.BlockRenderer = BlockRenderer;
exports.BlockRendererContext = BlockRendererContext;
exports.BlockRendererProvider = BlockRendererProvider;
exports.RootBlockRenderer = RootBlockRenderer;
exports.assignGatsbyImage = assignGatsbyImage;
exports.assignIds = assignIds;
exports.convertStyleStringToReact = convertStyleStringToReact;
exports.getBackgroundStyle = getBackgroundStyle;
exports.getBlockById = getBlockById;
exports.getBorderRadiusStyle = getBorderRadiusStyle;
exports.getBorderStyle = getBorderStyle;
exports.getClasses = getClasses;
exports.getLinkTextStyle = getLinkTextStyle;
exports.getMarginStyle = getMarginStyle;
exports.getMediaTextWidthStyle = getMediaTextWidthStyle;
exports.getPaddingStyle = getPaddingStyle;
exports.getStyles = getStyles;
exports.getTextStyle = getTextStyle;
exports.getTypographyStyle = getTypographyStyle;
exports.parseValue = parseValue;
exports.useBlockRendererContext = useBlockRendererContext;
//# sourceMappingURL=index.js.map
