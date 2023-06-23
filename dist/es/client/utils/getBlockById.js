'use client';
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

export { getBlockById };
//# sourceMappingURL=getBlockById.js.map
