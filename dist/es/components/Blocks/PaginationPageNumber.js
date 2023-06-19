'use client';
import { __awaiter } from '../../_virtual/_tslib.js';
import React from 'react';

function PaginationPageNumber({ pageNumber, queryId, onClick, style, }) {
    const handleClick = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        window.history.pushState({ path: e.target.href }, '', e.target.href);
        // load here
        onClick(pageNumber);
    });
    return (React.createElement("a", { className: "page-numbers", style: Object.assign({ padding: '0 2px' }, (style || {})), href: `?query-${queryId}-page=${pageNumber}`, onClick: handleClick }, pageNumber));
}

export { PaginationPageNumber };
//# sourceMappingURL=PaginationPageNumber.js.map
