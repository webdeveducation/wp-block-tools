import { parseValue } from './parseValue';

export const getMarginStyle = (attributes: any) => {
  const marginStyle: any = {};
  if (attributes.style?.spacing?.margin?.bottom) {
    marginStyle.marginBottom = parseValue(
      attributes.style.spacing.margin.bottom
    );
  }
  if (attributes.style?.spacing?.margin?.top) {
    marginStyle.marginTop = parseValue(attributes.style.spacing.margin.top);
  }
  if (attributes.style?.spacing?.margin?.left) {
    marginStyle.marginLeft = parseValue(attributes.style.spacing.margin.left);
  }
  if (attributes.style?.spacing?.margin?.right) {
    marginStyle.marginRight = parseValue(attributes.style.spacing.margin.right);
  }
  return marginStyle;
};
