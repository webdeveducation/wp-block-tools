import { v4 as uuid } from 'uuid';
export const assignIds = (blocks) => {
    const assignId = (b) => {
        b.forEach((block) => {
            var _a;
            block.id = uuid();
            if ((_a = block.innerBlocks) === null || _a === void 0 ? void 0 : _a.length) {
                assignId(block.innerBlocks);
            }
        });
    };
    assignId(blocks);
    return blocks;
};
