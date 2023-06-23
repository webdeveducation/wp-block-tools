Object.defineProperty(exports, '__esModule', { value: true });

var _tslib = require('./_virtual/_tslib.js');

const getAlias = (blockId = '') => {
    return `A${blockId.split('-').join('')}`;
};
const assignGatsbyImage = ({ blocks = [], graphql, coreImage, coreMediaText, coreCover, }) => _tslib.__awaiter(void 0, void 0, void 0, function* () {
    const blocksCopy = [...blocks];
    const imagesToRetrieve = [];
    const retrieveGatsbyImage = (b) => {
        var _a;
        for (let i = 0; i < b.length; i++) {
            const block = b[i];
            if ((coreImage && block.name === 'core/image') ||
                (coreCover && block.name === 'core/cover') ||
                (coreMediaText && block.name === 'core/media-text')) {
                const id = block.attributes.id || block.attributes.mediaId;
                let width = block.attributes.width;
                if (block.name === 'core/media-text') {
                    width = Math.ceil(1200 * ((block.attributes.mediaWidth || 50) / 100));
                }
                if (block.name === 'core/image') {
                    width = 600;
                }
                if (!!id && !!block.id) {
                    try {
                        const query = graphql(`
              query ImageQuery${id} {
                ${getAlias(block.id)}: wpMediaItem(databaseId: { eq: ${id} }) {
                  databaseId
                  gatsbyImage(width: ${Math.min(width, 1200)}, formats: WEBP, outputPixelDensities: [0.125, 0.25, 0.5, 1, 2])
                }
              }
            `);
                        imagesToRetrieve.push(query);
                    }
                    catch (e) {
                        console.log('ERROR: ', e);
                    }
                }
            }
            if ((_a = block.innerBlocks) === null || _a === void 0 ? void 0 : _a.length) {
                retrieveGatsbyImage(block.innerBlocks);
            }
        }
    };
    retrieveGatsbyImage(blocksCopy);
    const images = yield Promise.allSettled(imagesToRetrieve);
    const imagesMap = {};
    images
        .filter((image) => {
        const key = Object.keys(image.value.data || {})[0];
        return !!key && !!image.value.data[key];
    })
        .forEach((image) => {
        if (image.status === 'fulfilled') {
            const key = Object.keys(image.value.data)[0];
            const { databaseId, gatsbyImage } = image.value.data[key];
            imagesMap[key] = {
                databaseId,
                gatsbyImage,
            };
        }
    });
    const setGatsbyImage = (b) => {
        b.forEach((block) => {
            var _a, _b;
            if ((block.id && coreImage && block.name === 'core/image') ||
                (coreCover && block.name === 'core/cover') ||
                (coreMediaText && block.name === 'core/media-text')) {
                block.attributes.gatsbyImage =
                    (_a = imagesMap[getAlias(block.id)]) === null || _a === void 0 ? void 0 : _a.gatsbyImage;
            }
            if ((_b = block.innerBlocks) === null || _b === void 0 ? void 0 : _b.length) {
                setGatsbyImage(block.innerBlocks);
            }
        });
    };
    setGatsbyImage(blocksCopy);
    return blocksCopy;
});

exports.assignGatsbyImage = assignGatsbyImage;
//# sourceMappingURL=assignGatsbyImage.js.map
