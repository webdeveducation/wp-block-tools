import { parseValue } from './parseValue';

export const getPaddingStyle = (attributes: any) => {
  const paddingStyle: any = {};
  if (attributes.style?.spacing?.padding?.bottom) {
    paddingStyle.paddingBottom = parseValue(
      attributes.style.spacing.padding.bottom
    );
  }
  if (attributes.style?.spacing?.padding?.top) {
    paddingStyle.paddingTop = parseValue(attributes.style.spacing.padding.top);
  }
  if (attributes.style?.spacing?.padding?.left) {
    paddingStyle.paddingLeft = parseValue(
      attributes.style.spacing.padding.left
    );
  }
  if (attributes.style?.spacing?.padding?.right) {
    paddingStyle.paddingRight = parseValue(
      attributes.style.spacing.padding.right
    );
  }
  return paddingStyle;
};
