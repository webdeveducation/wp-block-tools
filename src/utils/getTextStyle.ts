export const getTextStyle = (attributes: any) => {
  const textStyle: any = {};
  if (attributes.textColor) {
    textStyle.color = `var(--wp--preset--color--${attributes.textColor})`;
  }
  if (attributes.style?.color?.text) {
    textStyle.color = attributes.style.color.text;
  }
  return textStyle;
};
