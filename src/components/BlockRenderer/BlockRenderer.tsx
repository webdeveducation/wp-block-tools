import React from 'react';
import convertHtmlToReact, {
  convertNodeToReactElement,
} from '@hedgedoc/html-to-react';
import { IBlockBase } from '../../types';
import { Helmet } from 'react-helmet';
import { useBlockRendererContext } from '../../context';
import { TerminalBlock } from './TerminalBlock';
import './style.scss';
import { hasClass } from '../../utils/hasClass';

export type BlockRendererProps = {
  blocks?: IBlockBase[];
};

export const BlockRenderer = ({ blocks = [] }: BlockRendererProps) => {
  const { renderComponent } = useBlockRendererContext();

  const inlineStylesheets = blocks
    .filter((block) => !!block.inlineStylesheet)
    .map((block) => block.inlineStylesheet);

  return (
    <>
      {!!inlineStylesheets.length && (
        <Helmet>
          {inlineStylesheets.map((stylesheet, i) => (
            <style key={i}>{stylesheet}</style>
          ))}
        </Helmet>
      )}
      {blocks.map((block) => {
        // render custom component for this block if exists
        const component = renderComponent?.(block);
        if (component) {
          return component;
        }

        const processNode = (shouldProcessNode: any) => {
          if (block.innerBlocks?.length) {
            const InnerBlocks = (
              <BlockRenderer key={block.id} blocks={block.innerBlocks || []} />
            );
            let isRootNode = false;
            return convertHtmlToReact(block.originalContent || '', {
              transform: (node: any, i) => {
                if (!node.attribs?.class) {
                  if (!node.attribs) {
                    node.attribs = {};
                  }
                }

                // process top level blocks that require is-layout-flex class
                if (i === 0 && !isRootNode) {
                  isRootNode = true;

                  if (
                    block.name === 'core/buttons' ||
                    block.name === 'core/columns' ||
                    block.name === 'core/social-links' ||
                    block.name === 'core/gallery'
                  ) {
                    node.attribs.class = `${node.attribs.class} is-layout-flex`;
                  }
                }

                if (block.attributes?.layout?.type) {
                  node.attribs.class = `${node.attribs.class} is-layout-${block.attributes?.layout?.type}`;
                }

                if (block.inlineClassnames) {
                  node.attribs.class = `${node.attribs.class} ${block.inlineClassnames}`;
                }

                if (
                  block.name === 'core/cover' &&
                  block.attributes.useFeaturedImage
                ) {
                  node.attribs.style = `background-image:url(${block.attributes.url});`;
                  if (!block.attributes.hasParallax) {
                    node.attribs.style = `${node.attribs.style}background-size: cover;`;
                  }
                }

                if (block.name === 'core/social-link') {
                  console.log('SOCIAL LINK: ', block);
                }

                // FIX when children have no data value,
                // it doesn't correctly "convertNodeToReactElement" / doesn't render
                if (!node.children?.length) {
                  node.children = [
                    {
                      data: '\n',
                    },
                  ];
                }
                if (shouldProcessNode(node)) {
                  return convertNodeToReactElement(node, i, () => InnerBlocks);
                }
              },
            });
          } else {
            // if no innerBlocks
            return <TerminalBlock key={block.id} block={block} />;
          }
        };

        if (
          !block.originalContent &&
          block.dynamicContent &&
          !block.innerBlocks?.length
        ) {
          return processNode(() => true);
        }

        if (!block.originalContent && block.innerBlocks?.length) {
          return (
            <div key={block.id}>
              <BlockRenderer blocks={block.innerBlocks} />
            </div>
          );
        }

        switch (block.name) {
          case 'core/media-text': {
            return processNode((node: any) =>
              hasClass(node, 'wp-block-media-text__content')
            );
          }
          case 'core/cover': {
            return processNode((node: any) =>
              hasClass(node, 'wp-block-cover__inner-container')
            );
          }
          default: {
            return processNode(() => true);
          }
        }
      })}
    </>
  );
};

export const RootBlockRenderer = ({ blocks = [] }: BlockRendererProps) => {
  const { allBlocks } = useBlockRendererContext();
  return (
    <div className="wp-site-blocks" style={{ paddingTop: 0 }}>
      <main className="is-layout-flow wp-block-group">
        <div className="has-global-padding is-layout-constrained entry-content wp-block-post-content">
          <BlockRenderer blocks={allBlocks || blocks} />
        </div>
      </main>
    </div>
  );
};
