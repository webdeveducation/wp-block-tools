Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var uuid = require('uuid');
var convertAttributesToReactProps = require('./convertAttributesToReactProps.js');
var getBlockGapStyle = require('./getBlockGapStyle.js');
var getBlockById = require('./getBlockById.js');
var getBlockGapStyleForChild = require('./getBlockGapStyleForChild.js');
var getCustomInternalLinkComponent = require('./getCustomInternalLinkComponent.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
        const props = convertAttributesToReactProps.convertAttributesToReactProps(attribs);
        if (!props.style) {
            props.style = {};
        }
        props.style = Object.assign(Object.assign({}, props.style), getBlockGapStyle.getBlockGapStyle(block.attributes));
        // if top level element and if generated class name of wp-container-{id}
        // we need to apply styles from the parent to this block
        if ((attribs === null || attribs === void 0 ? void 0 : attribs.class) &&
            ((_a = attribs.class) === null || _a === void 0 ? void 0 : _a.indexOf('wp-container-')) !== -1 &&
            block.parentId) {
            const parentBlock = getBlockById.getBlockById(options.allBlocks, block.parentId);
            if ((parentBlock === null || parentBlock === void 0 ? void 0 : parentBlock.name) === 'core/column') {
                props.style = Object.assign(Object.assign({}, props.style), getBlockGapStyleForChild.getBlockGapStyleForChild(parentBlock.attributes));
            }
        }
        if (((options === null || options === void 0 ? void 0 : options.component) && !(options === null || options === void 0 ? void 0 : options.className)) ||
            ((options === null || options === void 0 ? void 0 : options.component) &&
                !!(options === null || options === void 0 ? void 0 : options.className) &&
                attribs.class &&
                attribs.class.split(' ').find((c) => c === options.className))) {
            return React__default["default"].createElement(name, Object.assign(Object.assign({}, props), { key: uuid.v4() }), options.component);
        }
        const reactChildren = (children || []).map((child) => traverse(child));
        // Create React component based on the node type
        if (type === 'tag') {
            if (node.name === 'a') {
                const internalLinkComponent = getCustomInternalLinkComponent.getCustomInternalLinkComponent({
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
            return React__default["default"].createElement(name, Object.assign(Object.assign({}, props), { key: uuid.v4() }), ...reactChildren);
        }
        else if (type === 'style') {
            return React__default["default"].createElement('style', {
                scoped: !!Object.keys(node.attribs).find((s) => s === 'scoped'),
                dangerouslySetInnerHTML: { __html: node.children[0].data },
                key: uuid.v4(),
            });
        } // currently ignore type === "script"
        return null; // Return null for unsupported node types
    };
    return options.html.map((el) => traverse(el));
}

exports.createReactNodes = createReactNodes;
//# sourceMappingURL=createReactNodes.js.map
