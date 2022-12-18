"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignIds = void 0;
const uuid_1 = require("uuid");
const assignIds = (blocks) => {
    const assignId = (b) => {
        b.forEach((block) => {
            var _a;
            block.id = (0, uuid_1.v4)();
            if ((_a = block.innerBlocks) === null || _a === void 0 ? void 0 : _a.length) {
                assignId(block.innerBlocks);
            }
        });
    };
    assignId(blocks);
    return blocks;
};
exports.assignIds = assignIds;
