Object.defineProperty(exports, '__esModule', { value: true });

var uuid = require('uuid');

const assignIds = (blocks) => {
    const blocksCopy = JSON.parse(JSON.stringify(blocks));
    const assignId = (b, parentId) => {
        b.forEach((block) => {
            var _a;
            block.id = uuid.v4();
            if (parentId) {
                block.parentId = parentId;
            }
            if ((_a = block.innerBlocks) === null || _a === void 0 ? void 0 : _a.length) {
                assignId(block.innerBlocks, block.id);
            }
        });
    };
    assignId(blocksCopy);
    return blocksCopy;
};

exports.assignIds = assignIds;
//# sourceMappingURL=assignIds.js.map
