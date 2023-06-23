'use client';
Object.defineProperty(exports, '__esModule', { value: true });

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var createReactNodes = require('../../utils/createReactNodes.js');
var BlockRenderer = require('../BlockRenderer/BlockRenderer.js');
var parse = require('html-dom-parser');
var blockRenderer = require('../../context/blockRenderer.js');
var assignIds = require('../../utils/assignIds.js');
var getStyles = require('../../utils/getStyles.js');
var getLinkTextStyle = require('../../utils/getLinkTextStyle.js');
var getClasses = require('../../utils/getClasses.js');
var PaginationPageNumber = require('./PaginationPageNumber.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var parse__default = /*#__PURE__*/_interopDefaultLegacy(parse);

function Query({ block, allBlocks }) {
    var _a;
    const { wpDomain, customInternalLinkComponent, internalHrefReplacement, siteDomain, postId, } = blockRenderer.useBlockRendererContext();
    const [currentPage, setCurrentPage] = React.useState(1);
    const { htmlContent, innerBlocks } = block;
    const queryId = (_a = block === null || block === void 0 ? void 0 : block.attributes) === null || _a === void 0 ? void 0 : _a.queryId;
    const parsedHTML = parse__default["default"](htmlContent || '') || [];
    const [results, setResults] = React.useState((innerBlocks === null || innerBlocks === void 0 ? void 0 : innerBlocks.filter((innerBlock) => innerBlock.name !== 'core/query-pagination')) || []);
    const handlePageClick = (loadPageNum) => {
        setCurrentPage(loadPageNum);
        loadPage(loadPageNum);
    };
    React.useEffect(() => {
        if (queryId) {
            const search = new URLSearchParams(window.location.search);
            const pageNumber = search.get(`query-${queryId}-page`) || '1';
            const pageNumberParsed = pageNumber ? parseInt(pageNumber) : 1;
            setCurrentPage(pageNumberParsed);
            if (pageNumberParsed > 1) {
                setResults([]);
                const fetchResults = () => _tslib.__awaiter(this, void 0, void 0, function* () {
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
                    const newBlocks = assignIds.assignIds(json.data.coreQuery);
                    setResults(newBlocks);
                });
                fetchResults();
            }
        }
    }, [queryId]);
    const loadPage = (loadPageNum) => _tslib.__awaiter(this, void 0, void 0, function* () {
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
            const newBlocks = assignIds.assignIds(json.data.coreQuery);
            setResults(newBlocks);
        }
    });
    return (React__default["default"].createElement(React__default["default"].Fragment, null, (innerBlocks || []).map((topInnerBlock) => {
        var _a, _b;
        if (topInnerBlock.name === 'wp-block-tools/loop') {
            return createReactNodes.createReactNodes({
                html: parsedHTML,
                block,
                allBlocks,
                component: React__default["default"].createElement(BlockRenderer.BlockRenderer, { blocks: results }),
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
            const paginationClasses = getClasses.getClasses(topInnerBlock);
            return (React__default["default"].createElement("nav", { key: topInnerBlock.id, className: `${paginationClasses || 'is-layout-flex'} wp-block-query-pagination`, style: getStyles.getStyles(topInnerBlock) }, (_b = topInnerBlock.innerBlocks) === null || _b === void 0 ? void 0 : _b.map((innerBlock) => {
                var _a, _b, _c;
                const paginationArrow = (_a = topInnerBlock.attributes) === null || _a === void 0 ? void 0 : _a.paginationArrow;
                switch (innerBlock.name) {
                    case 'core/query-pagination-previous': {
                        const prevPageNumber = currentPage - 1;
                        return currentPage !== 1 ? (React__default["default"].createElement("a", { key: innerBlock.id, href: `?query-${queryId}-page=${prevPageNumber}`, style: getLinkTextStyle.getLinkTextStyle(topInnerBlock.attributes), className: "wp-block-query-pagination-previous", onClick: (e) => {
                                e.preventDefault();
                                window.history.pushState({ path: e.target.href }, '', e.target.href);
                                // load here
                                setCurrentPage(prevPageNumber);
                                loadPage(prevPageNumber);
                            } },
                            paginationArrow === 'arrow' ? (React__default["default"].createElement("span", { className: "wp-block-query-pagination-previous-arrow is-arrow-arrow" }, "\u2190")) : paginationArrow === 'chevron' ? (React__default["default"].createElement("span", { className: "wp-block-query-pagination-previous-arrow is-arrow-chevron" }, "\u00AB")) : (''),
                            ' ',
                            ((_b = innerBlock.attributes) === null || _b === void 0 ? void 0 : _b.label) || 'Previous Page')) : null;
                    }
                    case 'core/query-pagination-next': {
                        const nextPageNumber = currentPage + 1;
                        return currentPage !==
                            (paginationNumbersBlock === null || paginationNumbersBlock === void 0 ? void 0 : paginationNumbersBlock.attributes.totalPages) ? (React__default["default"].createElement("a", { key: innerBlock.id, href: `?query-${queryId}-page=${nextPageNumber}`, className: "wp-block-query-pagination-next", style: getLinkTextStyle.getLinkTextStyle(topInnerBlock.attributes), onClick: (e) => {
                                e.preventDefault();
                                window.history.pushState({ path: e.target.href }, '', e.target.href);
                                // load here
                                setCurrentPage(nextPageNumber);
                                loadPage(nextPageNumber);
                            } },
                            ((_c = innerBlock.attributes) === null || _c === void 0 ? void 0 : _c.label) || 'Next Page',
                            ' ',
                            paginationArrow === 'arrow' ? (React__default["default"].createElement("span", { className: "wp-block-query-pagination-next-arrow is-arrow-arrow" }, "\u2192")) : paginationArrow === 'chevron' ? (React__default["default"].createElement("span", { className: "wp-block-query-pagination-next-arrow is-arrow-chevron" }, "\u00BB")) : (''))) : null;
                    }
                    case 'core/query-pagination-numbers': {
                        let ellipsesAtStart = false;
                        let ellipsesAtEnd = false;
                        if (innerBlock.attributes.totalPages > 7) {
                            if (currentPage > 4) {
                                ellipsesAtStart = true;
                            }
                            if (currentPage < innerBlock.attributes.totalPages - 3) {
                                ellipsesAtEnd = true;
                            }
                        }
                        return (React__default["default"].createElement("div", { key: innerBlock.id, className: "wp-block-query-pagination-numbers" }, Array.from({
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
                                return currentPage === pNum ? (React__default["default"].createElement("span", { key: i, "aria-current": "page", className: "page-numbers current" }, pNum)) : (React__default["default"].createElement(React__default["default"].Fragment, { key: i },
                                    pNum === innerBlock.attributes.totalPages &&
                                        ellipsesAtEnd && (React__default["default"].createElement("span", { className: "page-numbers dots" }, "...")),
                                    React__default["default"].createElement(PaginationPageNumber["default"], { pageNumber: pNum, queryId: innerBlock.attributes.queryId, onClick: handlePageClick, style: getLinkTextStyle.getLinkTextStyle(topInnerBlock.attributes) }),
                                    pNum === 1 && ellipsesAtStart && (React__default["default"].createElement("span", { className: "page-numbers dots" }, "..."))));
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

exports["default"] = Query;
//# sourceMappingURL=Query.js.map
