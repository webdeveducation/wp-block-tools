'use client';
import { parseValue } from './parseValue.js';

const getUnstableGalleryGapStyle = (attributes) => {
    var _a, _b;
    let gap = (_b = (_a = attributes === null || attributes === void 0 ? void 0 : attributes.style) === null || _a === void 0 ? void 0 : _a.spacing) === null || _b === void 0 ? void 0 : _b.blockGap;
    // Skip if gap value contains unsupported characters.
    // Regex for CSS value borrowed from `safecss_filter_attr`, and used here
    // because we only want to match against the value, not the CSS attribute.
    if (typeof gap === 'object') {
        if (gap.top) {
            gap.top = parseValue(gap.top);
        }
        if (gap.left) {
            gap.left = parseValue(gap.left);
        }
    }
    else if (typeof gap === 'string') {
        gap = parseValue(gap);
    }
    // --gallery-block--gutter-size is deprecated. --wp--style--gallery-gap-default should be used by themes that want to set a default
    // gap on the gallery.
    const fallbackGap = 'var( --wp--style--gallery-gap-default, var( --gallery-block--gutter-size, var( --wp--style--block-gap, 0.5em ) ) )';
    let gapValue = gap || fallbackGap;
    let gapColumn = gapValue;
    if (typeof gapValue === 'object') {
        const gapRow = gap.top || fallbackGap;
        gapColumn = gap.left || fallbackGap;
        gapValue = gapRow === gapColumn ? gapRow : `${gapRow} ${gapColumn}`;
    }
    // The unstable gallery gap calculation requires a real value (such as `0px`) and not `0`.
    if (gapColumn === '0') {
        gapColumn = '0px';
    }
    // Set the CSS variable to the column value, and the `gap` property to the combined gap value.
    return {
        '--wp--style--unstable-gallery-gap': gapColumn,
        gap: gapValue,
    };
};

export { getUnstableGalleryGapStyle };
//# sourceMappingURL=getUnstableGalleryGapStyle.js.map
