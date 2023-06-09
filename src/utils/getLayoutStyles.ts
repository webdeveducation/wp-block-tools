import { parseValue } from './parseValue';

export const getLayoutStyles = (attributes: any) => {
  const layoutStyle: any = {};
  if (attributes?.layout?.type) {
    layoutStyle.display = parseValue(attributes.layout.type);
  }
  if (attributes?.layout?.justifyContent) {
    layoutStyle.justifyContent = parseValue(attributes.layout.justifyContent);
  }
  return layoutStyle;
};
