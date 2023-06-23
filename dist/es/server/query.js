import { __awaiter } from './_virtual/_tslib.js';

const query = (wpGraphQlUrl, queryString) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${wpGraphQlUrl}/?query=${queryString}`);
    const json = yield response.json();
    return json;
});

export { query };
//# sourceMappingURL=query.js.map
