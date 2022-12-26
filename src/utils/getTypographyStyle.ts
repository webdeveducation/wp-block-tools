export const getTypographyStyle = (attributes: any) => {
  const typographyStyle: any = {};
  if (attributes.fontFamily) {
    typographyStyle.fontFamily = `var(--wp--preset--font-family--${attributes.fontFamily})`;
  }

  if (attributes.fontSize) {
    typographyStyle.fontSize = `var(--wp--preset--font-size--${attributes.fontSize})`;
  }

  if (attributes.style?.typography?.fontSize) {
    typographyStyle.fontSize = attributes.style.typography.fontSize;
  }

  return typographyStyle;
};
