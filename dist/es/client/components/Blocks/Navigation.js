'use client';
import React, { useEffect } from 'react';
import { createReactNodes } from '../../utils/createReactNodes.js';
import { BlockRenderer } from '../BlockRenderer/BlockRenderer.js';
import parse from 'html-dom-parser';
import { useBlockRendererContext } from '../../context/blockRenderer.js';

function Navigation({ block, allBlocks }) {
    const { wpDomain, customInternalLinkComponent, internalHrefReplacement, siteDomain, } = useBlockRendererContext();
    const { htmlContent, innerBlocks } = block;
    const parsedHTML = parse(htmlContent || '') || [];
    console.log('IN HERE 1');
    useEffect(() => {
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

export { Navigation as default };
//# sourceMappingURL=Navigation.js.map
