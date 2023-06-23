'use client';
const getMediaTextWidthStyle = (attributes) => {
    const mediaTextWidthStyles = {};
    if (attributes.mediaWidth !== null &&
        attributes.mediaWidth !== 'undefined' &&
        attributes.mediaWidth !== undefined) {
        if (attributes.mediaPosition === 'right') {
            mediaTextWidthStyles.gridTemplateColumns = `auto ${attributes.mediaWidth}%`;
        }
        else {
            mediaTextWidthStyles.gridTemplateColumns = `${attributes.mediaWidth}% auto`;
        }
    }
    return mediaTextWidthStyles;
};

export { getMediaTextWidthStyle };
//# sourceMappingURL=getMediaTextWidthStyle.js.map
