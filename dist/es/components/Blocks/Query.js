'use client';
import { __awaiter } from '../../_virtual/_tslib.js';
import React, { useState, useEffect } from 'react';
import { createReactNodes } from '../../utils/createReactNodes.js';
import { BlockRenderer } from '../BlockRenderer/BlockRenderer.js';
import parse from 'html-dom-parser';
import { assignIds } from '../../utils/assignIds.js';
import { getStyles } from '../../utils/getStyles.js';
import { getLinkTextStyle } from '../../utils/getLinkTextStyle.js';
import { getClasses } from '../../utils/getClasses.js';
import { PaginationPageNumber } from './PaginationPageNumber.js';

function Query({ block, allBlocks, wpDomain, internalHrefReplacement, siteDomain, customInternalLinkComponent, postId, }) {
    var _a;
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
                    console.log(json.data);
                    if (json.data) {
                        // assign ids to new blocks
                        const newBlocks = assignIds(json.data.coreQuery);
                        setResults(newBlocks);
                    }
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
                                return currentPage === pNum ? (React.createElement("span", { key: i, "aria-current": "page", className: "page-numbers current" }, pNum)) : (React.createElement(React.Fragment, { key: i },
                                    pNum === innerBlock.attributes.totalPages &&
                                        ellipsesAtEnd && (React.createElement("span", { className: "page-numbers dots" }, "...")),
                                    React.createElement(PaginationPageNumber, { pageNumber: pNum, queryId: innerBlock.attributes.queryId, onClick: handlePageClick, style: getLinkTextStyle(topInnerBlock.attributes) }),
                                    pNum === 1 && ellipsesAtStart && (React.createElement("span", { className: "page-numbers dots" }, "..."))));
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

export { Query };
//# sourceMappingURL=Query.js.map
