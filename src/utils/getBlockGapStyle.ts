import { parseValue } from './parseValue';

export const getBlockGapStyle = (attributes: any) => {
  const blockGapStyle: any = {};
  if (attributes.style?.spacing?.blockGap) {
    blockGapStyle.gap = parseValue(attributes.style.spacing.blockGap);
  }
  return blockGapStyle;
};
