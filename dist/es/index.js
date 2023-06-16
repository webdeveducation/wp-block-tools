import React, { useContext, Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { v4 } from 'uuid';
import { camelCase } from 'change-case';
import parse from 'html-dom-parser';

const assignIds = (blocks) => {
    const blocksCopy = JSON.parse(JSON.stringify(blocks));
    const assignId = (b, parentId) => {
        b.forEach((block) => {
            var _a;
            block.id = v4();
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
    if (typeof ((_b = (_a = attributes === null || attributes === void 0 ? void 0 : attributes.style) === null || _a === void 0 ? void 0 : _a.border) === null || _b === void 0 ? void 0 : _b.radius) === 'object') {
        const { radius } = attributes.style.border;
        borderRadiusStyle.borderBottomLeftRadius = radius.bottomLeft;
        borderRadiusStyle.borderTopLeftRadius = radius.topLeft;
        borderRadiusStyle.borderTopRightRadius = radius.topRight;
        borderRadiusStyle.borderBottomRightRadius = radius.bottomRight;
    }
    else if ((_d = (_c = attributes === null || attributes === void 0 ? void 0 : attributes.style) === null || _c === void 0 ? void 0 : _c.border) === null || _d === void 0 ? void 0 : _d.radius) {
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
    if (attributes.mediaWidth !== null &&
        attributes.mediaWidth !== 'undefined' &&
        attributes.mediaWidth !== undefined) {
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

const getStyles = (block) => {
    var _a, _b;
    const inlineStyles = {};
    const parsed = parse(block.htmlContent || '');
    const styleString = ((_b = (_a = parsed[0]) === null || _a === void 0 ? void 0 : _a.attribs) === null || _b === void 0 ? void 0 : _b.style) || '';
    const individualStyles = styleString.split(';');
    individualStyles.forEach((individualStyle) => {
        const propertyAndValue = individualStyle.split(':');
        if (propertyAndValue.length === 2) {
            const property = propertyAndValue[0];
            const value = propertyAndValue[1];
            inlineStyles[camelCase(property)] = value;
        }
    });
    const { attributes } = block;
    if (!attributes) {
        return null;
    }
    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, inlineStyles), getBorderRadiusStyle(attributes)), getBorderStyle(attributes)), getPaddingStyle(attributes)), getMarginStyle(attributes)), getTypographyStyle(attributes)), getTextStyle(attributes)), getBackgroundStyle(attributes)), getMediaTextWidthStyle(attributes)), getLayoutStyles(attributes));
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

const getBlockGapStyle = (attributes) => {
    var _a, _b;
    const blockGapStyle = {};
    if ((_b = (_a = attributes === null || attributes === void 0 ? void 0 : attributes.style) === null || _a === void 0 ? void 0 : _a.spacing) === null || _b === void 0 ? void 0 : _b.blockGap) {
        const blockGap = attributes.style.spacing.blockGap;
        if (typeof blockGap === 'object') {
            if (blockGap.left) {
                blockGapStyle.columnGap = parseValue(blockGap.left);
            }
            if (blockGap.top) {
                blockGapStyle.rowGap = parseValue(blockGap.top);
            }
        }
        else {
            blockGapStyle.gap = parseValue(blockGap);
        }
    }
    return blockGapStyle;
};

const getBlockGapStyleForChild = (attributes) => {
    var _a, _b;
    const blockGapStyle = {};
    if ((_b = (_a = attributes.style) === null || _a === void 0 ? void 0 : _a.spacing) === null || _b === void 0 ? void 0 : _b.blockGap) {
        blockGapStyle.marginBlockStart = parseValue(attributes.style.spacing.blockGap);
    }
    return blockGapStyle;
};

function convertStyleStringToReact(styleString) {
    const styles = {};
    // Split the style string into individual style declarations
    const declarations = styleString.split(';');
    declarations.forEach((declaration) => {
        // Split each style declaration into property and value
        // (cater for the style value having : for example background: url(http://test.com/img.jpg)))
        const property = declaration.substring(0, declaration.indexOf(':'));
        const value = declaration.substring(declaration.indexOf(':') + 1);
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

const convertAttributesToReactProps = (attribs) => {
    // Convert attributes to React props
    const props = {};
    for (const key in attribs) {
        if (attribs.hasOwnProperty(key) && key !== 'onerror') {
            if (key === 'style' && typeof attribs[key] === 'string') {
                props[key] = convertStyleStringToReact(attribs[key]);
            }
            else if (key === 'class') {
                props['className'] = attribs[key];
            }
            else if (key === 'viewbox') {
                props['viewBox'] = attribs[key];
            }
            else if (key === 'for') {
                props['htmlFor'] = attribs[key];
            }
            else if (key === 'tabindex') {
                props['tabIndex'] = attribs[key];
            }
            else if (key === 'srcset') {
                props['srcSet'] = attribs[key];
            }
            else if (key === 'value') {
                props['defaultValue'] = attribs[key];
            }
            else if (key === 'datetime') {
                props['dateTime'] = attribs[key];
            }
            else if (key === 'stroke-width') {
                props['strokeWidth'] = attribs[key];
            }
            else if (key === 'maxlength') {
                props['maxLength'] = attribs[key];
            }
            else if (key === 'novalidate') {
                props['noValidate'] = attribs[key];
            }
            else if (key === 'autocomplete') {
                props['autoComplete'] = attribs[key];
            }
            else {
                props[key] = attribs[key];
            }
        }
    }
    return props;
};

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

function createReactNodes(options) {
    const { block, allBlocks, wpDomain, customInternalLinkComponent, internalHrefReplacement, siteDomain, } = options;
    const traverse = (node) => {
        var _a;
        // if this is a text node, just return the text
        if (node.type === 'text') {
            return node.data;
        }
        // if this is already a react component, just return the component
        if (node.type === 'react') {
            return node.component || null;
        }
        const { type, name, attribs, children } = node;
        const props = convertAttributesToReactProps(attribs);
        if (!props.style) {
            props.style = {};
        }
        props.style = Object.assign(Object.assign({}, props.style), getBlockGapStyle(block.attributes));
        // if top level element and if generated class name of wp-container-{id}
        // we need to apply styles from the parent to this block
        if ((attribs === null || attribs === void 0 ? void 0 : attribs.class) &&
            ((_a = attribs.class) === null || _a === void 0 ? void 0 : _a.indexOf('wp-container-')) !== -1 &&
            block.parentId) {
            const parentBlock = getBlockById(options.allBlocks, block.parentId);
            if ((parentBlock === null || parentBlock === void 0 ? void 0 : parentBlock.name) === 'core/column') {
                props.style = Object.assign(Object.assign({}, props.style), getBlockGapStyleForChild(parentBlock.attributes));
            }
        }
        if (((options === null || options === void 0 ? void 0 : options.component) && !(options === null || options === void 0 ? void 0 : options.className)) ||
            ((options === null || options === void 0 ? void 0 : options.component) &&
                !!(options === null || options === void 0 ? void 0 : options.className) &&
                attribs.class &&
                attribs.class.split(' ').find((c) => c === options.className))) {
            return React.createElement(name, Object.assign(Object.assign({}, props), { key: v4() }), options.component);
        }
        const reactChildren = (children || []).map((child) => traverse(child));
        // Create React component based on the node type
        if (type === 'tag') {
            if (node.name === 'a') {
                const internalLinkComponent = getCustomInternalLinkComponent({
                    node,
                    allBlocks,
                    block,
                    customInternalLinkComponent,
                    internalHrefReplacement,
                    wpDomain,
                    siteDomain,
                });
                if (internalLinkComponent) {
                    return internalLinkComponent;
                }
            }
            return React.createElement(name, Object.assign(Object.assign({}, props), { key: v4() }), ...reactChildren);
        }
        else if (type === 'style') {
            return React.createElement('style', {
                scoped: !!Object.keys(node.attribs).find((s) => s === 'scoped'),
                dangerouslySetInnerHTML: { __html: node.children[0].data },
                key: v4(),
            });
        } // currently ignore type === "script"
        return null; // Return null for unsupported node types
    };
    return options.html.map((el) => traverse(el));
}

const getCustomInternalLinkComponent = (options) => {
    var _a, _b, _c;
    const { node, block, allBlocks, wpDomain, customInternalLinkComponent, internalHrefReplacement, siteDomain, } = options;
    if (wpDomain &&
        (customInternalLinkComponent || internalHrefReplacement !== 'none')) {
        const getInternalHref = (href) => {
            const siteDomainWithoutProtocol = (wpDomain || '')
                .replace('http://', '')
                .replace('https://', '');
            return (href
                .replace('http://', '')
                .replace('https://', '')
                .replace(siteDomainWithoutProtocol || '', '') || '/');
        };
        // process if anchor tag and has customInternalLinkComponent
        const href = ((_a = node.attribs) === null || _a === void 0 ? void 0 : _a.href) || '';
        const hrefWithoutProtocol = href
            .replace('http://', '')
            .replace('https://', '');
        const siteDomainWithoutProtocol = (wpDomain || '')
            .replace('http://', '')
            .replace('https://', '');
        if ((customInternalLinkComponent || internalHrefReplacement !== 'none') &&
            ((!!siteDomainWithoutProtocol &&
                hrefWithoutProtocol.indexOf(siteDomainWithoutProtocol) === 0) ||
                hrefWithoutProtocol.indexOf('/') === 0)) {
            const reactElement = createReactNodes({
                html: node.children,
                block,
                allBlocks,
            });
            let className;
            const style = ((_b = node.attribs) === null || _b === void 0 ? void 0 : _b.style)
                ? convertStyleStringToReact((_c = node.attribs) === null || _c === void 0 ? void 0 : _c.style)
                : null;
            if (!(node === null || node === void 0 ? void 0 : node.attribs)) {
                node.attribs = {};
            }
            else {
                className = node.attribs.class;
                delete node.attribs.class;
            }
            if (!!customInternalLinkComponent) {
                const internalLinkComponent = customInternalLinkComponent(Object.assign(Object.assign({}, ((node === null || node === void 0 ? void 0 : node.attribs) || {})), { style,
                    className, href: getInternalHref(href), children: reactElement, key: block.id }));
                return internalLinkComponent;
            }
            else if (internalHrefReplacement === 'absolute' && !!siteDomain) {
                return React.createElement('a', Object.assign(Object.assign({}, ((node === null || node === void 0 ? void 0 : node.attribs) || {})), { style,
                    className, href: `${siteDomain}${getInternalHref(href)}`, key: block.id }), reactElement);
            }
            else if (internalHrefReplacement === 'relative') {
                return React.createElement('a', Object.assign(Object.assign({}, ((node === null || node === void 0 ? void 0 : node.attribs) || {})), { style,
                    className, href: getInternalHref(href), key: block.id }), reactElement);
            }
        }
    }
};

const getClasses = (block) => {
    var _a, _b, _c, _d, _e;
    const htmlContentParsed = parse(block.htmlContent || '');
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

const BlockRendererContext = React.createContext({
    blocks: [],
    postId: 0,
});
const BlockRendererProvider = ({ renderComponent, customInternalLinkComponent, wpDomain, siteDomain, internalHrefReplacement = 'relative', blocks, children, postId, }) => {
    const blocksWithIds = assignIds(blocks);
    if (internalHrefReplacement === 'absolute' && !siteDomain) {
        console.warn('`siteDomain` must be specified when internalHrefReplacement="absolute"');
    }
    return (React.createElement(BlockRendererContext.Provider, { value: {
            postId,
            renderComponent,
            customInternalLinkComponent,
            internalHrefReplacement,
            wpDomain,
            siteDomain,
            blocks: blocksWithIds,
        } }, children ? children : React.createElement(RootBlockRenderer, null)));
};
const useBlockRendererContext = () => {
    const blockRendererContext = useContext(BlockRendererContext);
    return blockRendererContext;
};

const hasClass = (nd, className) => {
    var _a, _b, _c;
    return (!!((_a = nd.attribs) === null || _a === void 0 ? void 0 : _a.class) &&
        ((_c = (_b = nd.attribs) === null || _b === void 0 ? void 0 : _b.class) === null || _c === void 0 ? void 0 : _c.split(' ').find((c) => c === className)));
};

const TerminalBlock = ({ block }) => {
    const { blocks: allBlocks, customInternalLinkComponent, wpDomain, internalHrefReplacement, siteDomain, } = useBlockRendererContext();
    const parsedHTML = parse(block.htmlContent || '') || [];
    const traverse = (els) => {
        els.forEach((el) => {
            var _a, _b;
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
                const internalLinkComponent = getCustomInternalLinkComponent({
                    node: el,
                    block,
                    allBlocks,
                    customInternalLinkComponent,
                    internalHrefReplacement,
                    wpDomain,
                    siteDomain,
                });
                if (!!internalLinkComponent) {
                    el.type = 'react';
                    el.component = internalLinkComponent;
                }
            }
            if (el.children) {
                traverse(el.children);
            }
        });
    };
    traverse(parsedHTML);
    return (React.createElement(Fragment, null, createReactNodes({
        html: parsedHTML,
        block,
        allBlocks,
        wpDomain,
        siteDomain,
        customInternalLinkComponent,
        internalHrefReplacement,
    })));
};

function Navigation({ block, allBlocks }) {
    const { wpDomain, customInternalLinkComponent, internalHrefReplacement, siteDomain, } = useBlockRendererContext();
    const { htmlContent, innerBlocks } = block;
    const parsedHTML = parse(htmlContent || '') || [];
    useEffect(() => {
        var _a, _b, _c, _d;
        // logic to detect open / close mobile menu
        const tempHolder = document.createElement('div');
        tempHolder.innerHTML = htmlContent || '';
        const tempEl = (_a = tempHolder.querySelectorAll('[data-micromodal-trigger]')) === null || _a === void 0 ? void 0 : _a[0];
        if (tempEl) {
            const modalId = tempEl.getAttribute('data-micromodal-trigger') || '';
            const el = (_b = document.querySelectorAll(`[data-micromodal-trigger=${modalId}]`)) === null || _b === void 0 ? void 0 : _b[0];
            const handleOpenClick = () => {
                var _a;
                (_a = document
                    .getElementById(modalId)) === null || _a === void 0 ? void 0 : _a.classList.add('is-menu-open', 'has-modal-open');
            };
            const handleCloseClick = () => {
                var _a;
                (_a = document
                    .getElementById(modalId)) === null || _a === void 0 ? void 0 : _a.classList.remove('is-menu-open', 'has-modal-open');
            };
            const closeButton = (_d = (_c = document
                .getElementById(modalId)) === null || _c === void 0 ? void 0 : _c.querySelectorAll('[data-micromodal-close]')) === null || _d === void 0 ? void 0 : _d[0];
            if (closeButton) {
                closeButton.addEventListener('click', handleCloseClick);
            }
            el.addEventListener('click', handleOpenClick);
            return () => {
                if (closeButton) {
                    closeButton.removeEventListener('click', handleCloseClick);
                }
                el.removeEventListener('click', handleOpenClick);
            };
        }
    }, []);
    return (React.createElement(React.Fragment, null, createReactNodes({
        html: parsedHTML,
        block,
        allBlocks,
        component: React.createElement(BlockRenderer, { blocks: innerBlocks }),
        className: 'wp-block-navigation__container',
        wpDomain,
        siteDomain,
        customInternalLinkComponent,
        internalHrefReplacement,
    })));
}

function PaginationPageNumber({ pageNumber, queryId, onClick, style, }) {
    const handleClick = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        window.history.pushState({ path: e.target.href }, '', e.target.href);
        // load here
        onClick(pageNumber);
    });
    return (React.createElement("a", { className: "page-numbers", style: Object.assign({ padding: '0 2px' }, (style || {})), href: `?query-${queryId}-page=${pageNumber}`, onClick: handleClick }, pageNumber));
}

function Query({ block, allBlocks }) {
    var _a;
    const { wpDomain, customInternalLinkComponent, internalHrefReplacement, siteDomain, postId, } = useBlockRendererContext();
    const [currentPage, setCurrentPage] = useState(1);
    const { htmlContent, innerBlocks } = block;
    const queryId = (_a = block === null || block === void 0 ? void 0 : block.attributes) === null || _a === void 0 ? void 0 : _a.queryId;
    const parsedHTML = parse(htmlContent || '') || [];
    const [results, setResults] = useState((innerBlocks === null || innerBlocks === void 0 ? void 0 : innerBlocks.filter((innerBlock) => innerBlock.name !== 'core/query-pagination')) || []);
    const handlePageClick = (loadPageNum) => {
        setCurrentPage(loadPageNum);
        loadPage(loadPageNum);
    };
    useEffect(() => {
        if (queryId) {
            const search = new URLSearchParams(window.location.search);
            const pageNumber = search.get(`query-${queryId}-page`) || '1';
            const pageNumberParsed = pageNumber ? parseInt(pageNumber) : 1;
            setCurrentPage(pageNumberParsed);
            if (pageNumberParsed > 1) {
                setResults([]);
                const fetchResults = () => __awaiter(this, void 0, void 0, function* () {
                    const response = yield fetch(`${wpDomain}/graphql?query=${`
            query CoreQuery {
              coreQuery(page: ${pageNumber}, postId: ${postId}, queryId: ${queryId})
            }
          `}`, {
                        method: 'GET',
                        headers: {
                            'content-type': 'application/json',
                        },
                    });
                    const json = yield response.json();
                    // assign ids to new blocks
                    const newBlocks = assignIds(json.data.coreQuery);
                    setResults(newBlocks);
                });
                fetchResults();
            }
        }
    }, [queryId]);
    console.log('inner blocks: ', block.innerBlocks);
    const loadPage = (loadPageNum) => __awaiter(this, void 0, void 0, function* () {
        if (queryId) {
            const response = yield fetch(`${wpDomain}/graphql?query=${`
      query CoreQuery {
        coreQuery(page: ${loadPageNum}, postId: ${postId}, queryId: ${queryId})
      }
    `}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                },
            });
            const json = yield response.json();
            // assign ids to new blocks
            const newBlocks = assignIds(json.data.coreQuery);
            setResults(newBlocks);
        }
    });
    return (React.createElement(React.Fragment, null, (innerBlocks || []).map((topInnerBlock) => {
        var _a, _b;
        if (topInnerBlock.name === 'wp-block-tools/loop') {
            return createReactNodes({
                html: parsedHTML,
                block,
                allBlocks,
                component: React.createElement(BlockRenderer, { blocks: results }),
                wpDomain,
                siteDomain,
                customInternalLinkComponent,
                internalHrefReplacement,
            });
        }
        else if (topInnerBlock.name === 'core/query-pagination') {
            const paginationNumbersBlock = (_a = topInnerBlock === null || topInnerBlock === void 0 ? void 0 : topInnerBlock.innerBlocks) === null || _a === void 0 ? void 0 : _a.find((ib) => {
                return ib.name === 'core/query-pagination-numbers';
            });
            const paginationClasses = getClasses(topInnerBlock);
            return (React.createElement("nav", { key: topInnerBlock.id, className: `${paginationClasses || 'is-layout-flex'} wp-block-query-pagination`, style: getStyles(topInnerBlock) }, (_b = topInnerBlock.innerBlocks) === null || _b === void 0 ? void 0 : _b.map((innerBlock) => {
                var _a;
                const paginationArrow = (_a = topInnerBlock.attributes) === null || _a === void 0 ? void 0 : _a.paginationArrow;
                switch (innerBlock.name) {
                    case 'core/query-pagination-previous': {
                        const prevPageNumber = currentPage - 1;
                        return currentPage !== 1 ? (React.createElement("a", { key: innerBlock.id, href: `?query-${queryId}-page=${prevPageNumber}`, style: getLinkTextStyle(topInnerBlock.attributes), className: "wp-block-query-pagination-previous", onClick: (e) => {
                                e.preventDefault();
                                window.history.pushState({ path: e.target.href }, '', e.target.href);
                                // load here
                                setCurrentPage(prevPageNumber);
                                loadPage(prevPageNumber);
                            } },
                            paginationArrow === 'arrow' ? (React.createElement("span", { className: "wp-block-query-pagination-previous-arrow is-arrow-arrow" }, "\u2190")) : paginationArrow === 'chevron' ? (React.createElement("span", { className: "wp-block-query-pagination-previous-arrow is-arrow-chevron" }, "\u00AB")) : (''),
                            ' ',
                            "Previous Page")) : null;
                    }
                    case 'core/query-pagination-next': {
                        const nextPageNumber = currentPage + 1;
                        return currentPage !==
                            (paginationNumbersBlock === null || paginationNumbersBlock === void 0 ? void 0 : paginationNumbersBlock.attributes.totalPages) ? (React.createElement("a", { key: innerBlock.id, href: `?query-${queryId}-page=${nextPageNumber}`, className: "wp-block-query-pagination-next", style: getLinkTextStyle(topInnerBlock.attributes), onClick: (e) => {
                                e.preventDefault();
                                window.history.pushState({ path: e.target.href }, '', e.target.href);
                                // load here
                                setCurrentPage(nextPageNumber);
                                loadPage(nextPageNumber);
                            } },
                            "Next Page",
                            ' ',
                            paginationArrow === 'arrow' ? (React.createElement("span", { className: "wp-block-query-pagination-next-arrow is-arrow-arrow" }, "\u2192")) : paginationArrow === 'chevron' ? (React.createElement("span", { className: "wp-block-query-pagination-next-arrow is-arrow-chevron" }, "\u00BB")) : (''))) : null;
                    }
                    case 'core/query-pagination-numbers': {
                        return (React.createElement("div", { key: innerBlock.id, className: "wp-block-query-pagination-numbers" }, Array.from({
                            length: innerBlock.attributes.totalPages,
                        }).map((_, i) => {
                            const pNum = i + 1;
                            let canReturn = false;
                            if (innerBlock.attributes.totalPages > 7) {
                                if (pNum === 1 ||
                                    pNum === innerBlock.attributes.totalPages) {
                                    canReturn = true;
                                }
                                else if (currentPage === pNum) {
                                    canReturn = true;
                                }
                                else if (currentPage + 1 === pNum ||
                                    currentPage + 2 === pNum ||
                                    currentPage - 1 === pNum ||
                                    currentPage - 2 === pNum) {
                                    canReturn = true;
                                }
                            }
                            else {
                                canReturn = true;
                            }
                            if (canReturn) {
                                return currentPage === pNum ? (React.createElement("span", { key: i, "aria-current": "page", className: "page-numbers current" }, pNum)) : (React.createElement(PaginationPageNumber, { key: i, pageNumber: pNum, queryId: innerBlock.attributes.queryId, onClick: handlePageClick, style: getLinkTextStyle(topInnerBlock.attributes) }));
                            }
                            return null;
                        })));
                    }
                    default:
                        return null;
                }
            })));
        }
        return null;
    })));
}

const BlockRenderer = ({ blocks = [] }) => {
    const { renderComponent, blocks: allBlocks, wpDomain, siteDomain, customInternalLinkComponent, } = useBlockRendererContext();
    const inlineStylesheets = blocks
        .filter((block) => !!block.inlineStylesheet)
        .map((block) => block.inlineStylesheet);
    return (React.createElement(React.Fragment, null,
        !!inlineStylesheets.length && (React.createElement(Helmet, null, inlineStylesheets.map((stylesheet, i) => (React.createElement("style", { key: i }, stylesheet))))),
        blocks.map((block) => {
            var _a, _b, _c, _d;
            // render custom component for this block if exists
            const component = renderComponent === null || renderComponent === void 0 ? void 0 : renderComponent({
                block,
                styles: getStyles(block),
                classNames: getClasses(block),
            });
            if (component) {
                return React.createElement(React.Fragment, { key: block.id }, component);
            }
            // if no htmlContent but has inner blocks, just render the inner blocks
            if (!block.htmlContent && ((_a = block.innerBlocks) === null || _a === void 0 ? void 0 : _a.length)) {
                return React.createElement(BlockRenderer, { key: block.id, blocks: block.innerBlocks });
            }
            // if no inner blocks
            // here we need to render the terminal block which will
            // also cater for the siteDomain replace
            let parsedHTML = parse(block.htmlContent || '') || [];
            if (block.htmlContent && !((_b = block.innerBlocks) === null || _b === void 0 ? void 0 : _b.length)) {
                return React.createElement(TerminalBlock, { key: block.id, block: block });
            }
            // if html content and inner blocks
            if (block.htmlContent && ((_c = block.innerBlocks) === null || _c === void 0 ? void 0 : _c.length)) {
                switch (block.name) {
                    case 'core/block':
                        return (React.createElement(BlockRenderer, { key: block.id, blocks: block.innerBlocks }));
                    case 'core/media-text': {
                        return (React.createElement(React.Fragment, { key: block.id }, createReactNodes({
                            html: parsedHTML,
                            block,
                            allBlocks,
                            component: React.createElement(BlockRenderer, { blocks: block.innerBlocks }),
                            className: 'wp-block-media-text__content',
                            wpDomain,
                            siteDomain,
                            customInternalLinkComponent,
                        })));
                    }
                    case 'core/cover': {
                        return (React.createElement(React.Fragment, { key: block.id }, createReactNodes({
                            html: parsedHTML,
                            block,
                            allBlocks,
                            component: React.createElement(BlockRenderer, { blocks: block.innerBlocks }),
                            className: 'wp-block-cover__inner-container',
                            wpDomain,
                            siteDomain,
                            customInternalLinkComponent,
                        })));
                    }
                    case 'core/navigation-submenu': {
                        // get parent block
                        let showSubmenuIcon = false;
                        if (block.parentId) {
                            const parentBlock = getBlockById(allBlocks, block.parentId);
                            if (parentBlock) {
                                showSubmenuIcon = !!((_d = parentBlock.attributes) === null || _d === void 0 ? void 0 : _d.showSubmenuIcon);
                            }
                        }
                        if (showSubmenuIcon) {
                            let newHtmlContent = `${block.htmlContent}`;
                            newHtmlContent = newHtmlContent.replace('</a>', `</a><button class="wp-block-navigation__submenu-icon wp-block-navigation-submenu__toggle" aria-expanded="false"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" focusable="false"><path d="M1.50002 4L6.00002 8L10.5 4" stroke-width="1.5"></path></svg></button>`);
                            parsedHTML = parse(newHtmlContent || '') || [];
                        }
                        return (React.createElement(React.Fragment, { key: block.id }, createReactNodes({
                            html: parsedHTML,
                            block,
                            allBlocks,
                            component: React.createElement(BlockRenderer, { blocks: block.innerBlocks }),
                            className: 'wp-block-navigation__submenu-container',
                            wpDomain,
                            siteDomain,
                            customInternalLinkComponent,
                        })));
                    }
                    case 'core/query': {
                        return (React.createElement(Query, { key: block.id, block: block, allBlocks: allBlocks }));
                    }
                    case 'core/navigation': {
                        return (React.createElement(Navigation, { key: block.id, block: block, allBlocks: allBlocks }));
                    }
                    default: {
                        return (React.createElement(React.Fragment, { key: block.id }, createReactNodes({
                            html: parsedHTML,
                            block,
                            allBlocks,
                            component: React.createElement(BlockRenderer, { blocks: block.innerBlocks }),
                            wpDomain,
                            siteDomain,
                            customInternalLinkComponent,
                        })));
                    }
                }
            }
            return null;
        })));
};
const RootBlockRenderer = ({ blocks = [] }) => {
    const { blocks: allBlocks } = useBlockRendererContext();
    return (React.createElement("div", { className: "wp-site-blocks" },
        React.createElement(BlockRenderer, { blocks: allBlocks || blocks })));
};

export { BlockRenderer, BlockRendererContext, BlockRendererProvider, RootBlockRenderer, assignGatsbyImage, assignIds, convertStyleStringToReact, getBackgroundStyle, getBlockById, getBlockGapStyle, getBlockGapStyleForChild, getBorderRadiusStyle, getBorderStyle, getClasses, getCustomInternalLinkComponent, getLayoutStyles, getLinkTextStyle, getMarginStyle, getMediaTextWidthStyle, getPaddingStyle, getStyles, getTextStyle, getTypographyStyle, parseValue, useBlockRendererContext };
//# sourceMappingURL=index.js.map
