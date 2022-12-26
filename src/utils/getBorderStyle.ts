import { parseValue } from './parseValue';

export const getBorderStyle = (attributes: any) => {
  const borderStyle: any = {};
  if (attributes.borderColor) {
    borderStyle.borderColor = `var(--wp--preset--color--${attributes.borderColor})`;
  }
  if (attributes.style?.border?.color) {
    borderStyle.borderColor = attributes.style.border.color;
  }
  if (attributes.style?.border?.width) {
    borderStyle.borderWidth = attributes.style.border.width;
  }
  if (attributes.style?.border?.bottom?.color) {
    borderStyle.borderBottomColor = parseValue(
      attributes.style.border.bottom.color
    );
  }
  if (attributes.style?.border?.bottom?.width) {
    borderStyle.borderBottomWidth = parseValue(
      attributes.style.border.bottom.width
    );
  }
  if (attributes.style?.border?.top?.color) {
    borderStyle.borderTopColor = parseValue(attributes.style.border.top.color);
  }
  if (attributes.style?.border?.top?.width) {
    borderStyle.borderTopWidth = parseValue(attributes.style.border.top.width);
  }
  if (attributes.style?.border?.left?.color) {
    borderStyle.borderLeftColor = parseValue(
      attributes.style.border.left.color
    );
  }
  if (attributes.style?.border?.left?.width) {
    borderStyle.borderLeftWidth = parseValue(
      attributes.style.border.left.width
    );
  }
  if (attributes.style?.border?.right?.color) {
    borderStyle.borderRightColor = parseValue(
      attributes.style.border.right.color
    );
  }
  if (attributes.style?.border?.right?.width) {
    borderStyle.borderRightWidth = parseValue(
      attributes.style.border.right.width
    );
  }

  return borderStyle;
};
