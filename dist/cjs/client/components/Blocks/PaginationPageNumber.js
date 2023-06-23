'use client';
Object.defineProperty(exports, '__esModule', { value: true });

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function PaginationPageNumber({ pageNumber, queryId, onClick, style, }) {
    const handleClick = (e) => _tslib.__awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        window.history.pushState({ path: e.target.href }, '', e.target.href);
        // load here
        onClick(pageNumber);
    });
    return (React__default["default"].createElement("a", { className: "page-numbers", style: Object.assign({ padding: '0 2px' }, (style || {})), href: `?query-${queryId}-page=${pageNumber}`, onClick: handleClick }, pageNumber));
}

exports["default"] = PaginationPageNumber;
//# sourceMappingURL=PaginationPageNumber.js.map
