'use client';
Object.defineProperty(exports, '__esModule', { value: true });

const getBlockById = (allBlocks, id) => {
    let foundBlock = null;
    const findBlock = (bs) => {
        var _a;
        for (let block of bs) {
            if (block.id === id) {
                foundBlock = block;
                break;
            }
            else if ((_a = block.innerBlocks) === null || _a === void 0 ? void 0 : _a.length) {
                findBlock(block.innerBlocks);
            }
        }
    };
    findBlock(allBlocks);
    return foundBlock;
};

exports.getBlockById = getBlockById;
//# sourceMappingURL=getBlockById.js.map
