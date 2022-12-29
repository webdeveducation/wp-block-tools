import { IBlockBase } from '../types';

const getAlias = (blockId: string = '') => {
  return `A${blockId.split('-').join('')}`;
};

export const assignGatsbyImage = async ({
  blocks = [],
  graphql,
  coreImage,
  coreMediaText,
  coreCover,
}: {
  blocks: IBlockBase[];
  graphql: any;
  coreImage?: boolean;
  coreMediaText?: boolean;
  coreCover?: boolean;
}) => {
  const blocksCopy = [...blocks];
  const imagesToRetrieve: any[] = [];

  const retrieveGatsbyImage = (b: IBlockBase[]) => {
    for (let i = 0; i < b.length; i++) {
      const block = b[i];
      if (
        (coreImage && block.name === 'core/image') ||
        (coreCover && block.name === 'core/cover') ||
        (coreMediaText && block.name === 'core/media-text')
      ) {
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
                  gatsbyImage(width: ${Math.min(width, 1200)}, formats: WEBP)
                }
              }
            `);
            imagesToRetrieve.push(query);
          } catch (e) {
            console.log('ERROR: ', e);
          }
        }
      }

      if (block.innerBlocks?.length) {
        retrieveGatsbyImage(block.innerBlocks);
      }
    }
  };

  retrieveGatsbyImage(blocksCopy);

  const images: any[] = await Promise.allSettled(imagesToRetrieve);

  const imagesMap: any = {};

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

  const setGatsbyImage = (b: IBlockBase[]) => {
    b.forEach((block) => {
      if (
        (block.id && coreImage && block.name === 'core/image') ||
        (coreCover && block.name === 'core/cover') ||
        (coreMediaText && block.name === 'core/media-text')
      ) {
        block.attributes.gatsbyImage =
          imagesMap[getAlias(block.id)]?.gatsbyImage;
      }
      if (block.innerBlocks?.length) {
        setGatsbyImage(block.innerBlocks);
      }
    });
  };

  setGatsbyImage(blocksCopy);

  return blocksCopy;
};
