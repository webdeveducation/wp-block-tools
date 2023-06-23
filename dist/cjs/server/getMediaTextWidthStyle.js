Object.defineProperty(exports, '__esModule', { value: true });

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

exports.getMediaTextWidthStyle = getMediaTextWidthStyle;
//# sourceMappingURL=getMediaTextWidthStyle.js.map
