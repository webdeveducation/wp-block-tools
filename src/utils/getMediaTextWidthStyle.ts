export const getMediaTextWidthStyle = (attributes: any) => {
  const mediaTextWidthStyles: any = {};
  if (
    attributes.mediaWidth !== null &&
    attributes.mediaWidth !== 'undefined' &&
    attributes.mediaWidth !== undefined
  ) {
    if (attributes.mediaPosition === 'right') {
      mediaTextWidthStyles.gridTemplateColumns = `auto ${attributes.mediaWidth}%`;
    } else {
      mediaTextWidthStyles.gridTemplateColumns = `${attributes.mediaWidth}% auto`;
    }
  }
  return mediaTextWidthStyles;
};
