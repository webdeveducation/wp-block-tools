Object.defineProperty(exports, '__esModule', { value: true });

var _tslib = require('./_virtual/_tslib.js');

const query = (wpGraphQlUrl, queryString) => _tslib.__awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${wpGraphQlUrl}/?query=${queryString}`);
    const json = yield response.json();
    return json;
});

exports.query = query;
//# sourceMappingURL=query.js.map
