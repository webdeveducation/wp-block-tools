import { parseValue } from './parseValue';

export const getBlockGapStyleForChild = (attributes: any) => {
  const blockGapStyle: any = {};
  if (attributes.style?.spacing?.blockGap) {
    blockGapStyle.marginBlockStart = parseValue(
      attributes.style.spacing.blockGap
    );
  }
  return blockGapStyle;
};
