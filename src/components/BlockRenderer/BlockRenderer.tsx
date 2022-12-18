import React, { Fragment } from 'react';
import convertHtmlToReact, {
  convertNodeToReactElement,
} from '@hedgedoc/html-to-react';
import { IBlockBase } from '../../types';

export type BlockRendererProps = {
  blocks?: IBlockBase[];
  render?: (block: IBlockBase) => React.ReactElement | null;
};

const hasClass = (nd: any, className: string) => {
  return (
    !!nd.attribs?.class &&
    nd.attribs?.class?.split(' ').find((c: string) => c === className)
  );
};

const Blocks = ({ blocks = [], render }: BlockRendererProps) => {
  return (
    <>
      {blocks.map((block) => {
        const component = render?.(block);
        if (component) {
          return component;
        }

        const processNode = (shouldProcessNode: any) => {
          if (block.innerBlocks?.length) {
            const InnerBlocks = (
              <Blocks
                key={block.id}
                blocks={block.innerBlocks || []}
                render={render}
              />
            );
            let topLevelFound = false;
            return convertHtmlToReact(block.originalContent || '', {
              transform: (node: any, i) => {
                if (i === 0 && !topLevelFound) {
                  topLevelFound = true;
                  if (!node.attribs?.class) {
                    if (!node.attribs) {
                      node.attribs = {};
                    }
                  }

                  if (block.attributes?.layout?.type) {
                    node.attribs.class = `${node.attribs.class} is-layout-${block.attributes?.layout?.type}`;
                  }

                  if (
                    block.name === 'core/buttons' ||
                    block.name === 'core/columns' ||
                    block.name === 'core/social-links'
                  ) {
                    node.attribs.class = `${node.attribs.class} is-layout-flex`;
                  }
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
          }
          return (
            <Fragment key={block.id}>
              {convertHtmlToReact(
                block.originalContent || block.dynamicContent || '',
                {
                  transform: (node, index) => {
                    return convertNodeToReactElement(node, index);
                  },
                }
              )}
            </Fragment>
          );
        };

        if (!block.originalContent && block.dynamicContent) {
          return processNode(() => true);
        }

        if (!block.originalContent && block.innerBlocks?.length) {
          return (
            <div key={block.id}>
              <Blocks blocks={block.innerBlocks} render={render} />
            </div>
          );
        }

        switch (block.name) {
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

export const BlockRenderer = ({ blocks = [], render }: BlockRendererProps) => {
  return (
    <div className="wp-site-blocks">
      <main className="is-layout-flow wp-block-group">
        <div className="has-global-padding is-layout-constrained entry-content wp-block-post-content">
          <Blocks blocks={blocks} render={render} />
        </div>
      </main>
    </div>
  );
};
