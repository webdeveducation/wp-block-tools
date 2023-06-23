'use client';
Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var createReactNodes = require('../../utils/createReactNodes.js');
var BlockRenderer = require('../BlockRenderer/BlockRenderer.js');
var parse = require('html-dom-parser');
var blockRenderer = require('../../context/blockRenderer.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var parse__default = /*#__PURE__*/_interopDefaultLegacy(parse);

function Navigation({ block, allBlocks }) {
    const { wpDomain, customInternalLinkComponent, internalHrefReplacement, siteDomain, } = blockRenderer.useBlockRendererContext();
    const { htmlContent, innerBlocks } = block;
    const parsedHTML = parse__default["default"](htmlContent || '') || [];
    console.log('IN HERE 1');
    React.useEffect(() => {
        var _a, _b, _c, _d;
        console.log('IN HERE');
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
    return (React__default["default"].createElement(React__default["default"].Fragment, null, createReactNodes.createReactNodes({
        html: parsedHTML,
        block,
        allBlocks,
        component: React__default["default"].createElement(BlockRenderer.BlockRenderer, { blocks: innerBlocks }),
        className: 'wp-block-navigation__container',
        wpDomain,
        siteDomain,
        customInternalLinkComponent,
        internalHrefReplacement,
    })));
}

exports["default"] = Navigation;
//# sourceMappingURL=Navigation.js.map
