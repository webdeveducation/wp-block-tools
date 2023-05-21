import { parseValue } from './parseValue';

export const getLinkTextStyle = (attributes: any) => {
  const textStyle: any = {};
  // style.elements.link.color.text
  if (attributes?.style?.elements?.link?.color?.text) {
    textStyle.color = parseValue(attributes.style.elements.link.color.text);
  }
  return textStyle;
};
