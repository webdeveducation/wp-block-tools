export const getMediaTextWidthStyle = (attributes: any) => {
  const mediaTextWidthStyles: any = {};
  if (attributes.mediaWidth !== null && attributes.mediaWidth !== 'undefined') {
    mediaTextWidthStyles.gridTemplateColumns = `auto ${attributes.mediaWidth}%`;
  }
  return mediaTextWidthStyles;
};
