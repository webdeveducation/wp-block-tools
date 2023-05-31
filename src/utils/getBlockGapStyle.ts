import { parseValue } from './parseValue';

export const getBlockGapStyle = (attributes: any) => {
  const blockGapStyle: any = {};
  if (attributes?.style?.spacing?.blockGap) {
    const blockGap = attributes.style.spacing.blockGap;
    if (typeof blockGap === 'object') {
      if (blockGap.left) {
        blockGapStyle.columnGap = parseValue(blockGap.left);
      }
      if (blockGap.top) {
        blockGapStyle.rowGap = parseValue(blockGap.top);
      }
    } else {
      blockGapStyle.gap = parseValue(blockGap);
    }
  }
  return blockGapStyle;
};
