'use client';
Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var BlockRenderer = require('../components/BlockRenderer/BlockRenderer.js');
var assignIds = require('../utils/assignIds.js');
require('change-case');
require('html-dom-parser');
require('uuid');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const BlockRendererContext = React__default["default"].createContext({
    blocks: [],
    postId: 0,
});
const BlockRendererProvider = ({ renderComponent, customInternalLinkComponent, wpDomain, siteDomain, internalHrefReplacement = 'relative', blocks, children, postId, }) => {
    const blocksWithIds = assignIds.assignIds(blocks);
    if (internalHrefReplacement === 'absolute' && !siteDomain) {
        console.warn('`siteDomain` must be specified when internalHrefReplacement="absolute"');
    }
    console.log({ blocks });
    return (React__default["default"].createElement(BlockRendererContext.Provider, { value: {
            postId,
            renderComponent,
            customInternalLinkComponent,
            internalHrefReplacement,
            wpDomain,
            siteDomain,
            blocks: blocksWithIds,
        } }, children ? children : React__default["default"].createElement(BlockRenderer.RootBlockRenderer, null)));
};
const useBlockRendererContext = () => {
    const blockRendererContext = React.useContext(BlockRendererContext);
    return blockRendererContext;
};

exports.BlockRendererContext = BlockRendererContext;
exports.BlockRendererProvider = BlockRendererProvider;
exports.useBlockRendererContext = useBlockRendererContext;
//# sourceMappingURL=blockRenderer.js.map
