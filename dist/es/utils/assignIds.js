'use client';
import { v4 } from 'uuid';

const assignIds = (blocks) => {
    const blocksCopy = JSON.parse(JSON.stringify(blocks));
    const assignId = (b, parentId) => {
        b.forEach((block) => {
            var _a;
            block.id = v4();
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

export { assignIds };
//# sourceMappingURL=assignIds.js.map
