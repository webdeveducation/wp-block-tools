export const getBackgroundStyle = (attributes: any) => {
  const backgroundStyle: any = {};
  if (attributes.backgroundColor) {
    backgroundStyle.backgroundColor = `var(--wp--preset--color--${attributes.backgroundColor})`;
  }
  if (attributes.style?.color?.background) {
    backgroundStyle.backgroundColor = attributes.style.color.background;
  }
  return backgroundStyle;
};
