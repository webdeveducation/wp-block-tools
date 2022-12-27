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

  if (attributes.style?.typography?.fontStyle) {
    typographyStyle.fontStyle = attributes.style.typography.fontStyle;
  }

  if (attributes.style?.typography?.fontWeight) {
    typographyStyle.fontWeight = attributes.style.typography.fontWeight;
  }
  if (attributes.style?.typography?.lineHeight) {
    typographyStyle.lineHeight = attributes.style.typography.lineHeight;
  }
  if (attributes.style?.typography?.textDecoration) {
    typographyStyle.textDecoration = attributes.style.typography.textDecoration;
  }
  if (attributes.style?.typography?.textTransform) {
    typographyStyle.textTransform = attributes.style.typography.textTransform;
  }

  return typographyStyle;
};
