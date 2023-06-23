Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var convertStyleStringToReact = require('./convertStyleStringToReact.js');
var createReactNodes = require('./createReactNodes.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
            const reactElement = createReactNodes.createReactNodes({
                html: node.children,
                block,
                allBlocks,
            });
            let className;
            const style = ((_b = node.attribs) === null || _b === void 0 ? void 0 : _b.style)
                ? convertStyleStringToReact.convertStyleStringToReact((_c = node.attribs) === null || _c === void 0 ? void 0 : _c.style)
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
                return React__default["default"].createElement('a', Object.assign(Object.assign({}, ((node === null || node === void 0 ? void 0 : node.attribs) || {})), { style,
                    className, href: `${siteDomain}${getInternalHref(href)}`, key: block.id }), reactElement);
            }
            else if (internalHrefReplacement === 'relative') {
                return React__default["default"].createElement('a', Object.assign(Object.assign({}, ((node === null || node === void 0 ? void 0 : node.attribs) || {})), { style,
                    className, href: getInternalHref(href), key: block.id }), reactElement);
            }
        }
    }
};

exports.getCustomInternalLinkComponent = getCustomInternalLinkComponent;
//# sourceMappingURL=getCustomInternalLinkComponent.js.map