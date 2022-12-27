import React, { Fragment } from 'react';
import convertHtmlToReact, {
  convertNodeToReactElement,
} from '@hedgedoc/html-to-react';
import { IBlockBase } from '../../types';
import { Helmet } from 'react-helmet';
import './style.scss';

export type BlockRendererProps = {
  blocks?: IBlockBase[];
  render?: (block: IBlockBase) => React.ReactElement | null;
  customInternalLinkComponent?: {
    render: (n: any, index: string | number) => React.ReactElement | null;
    siteDomain: string;
  };
};

const hasClass = (nd: any, className: string) => {
  return (
    !!nd.attribs?.class &&
    nd.attribs?.class?.split(' ').find((c: string) => c === className)
  );
};

export const BlockRenderer = ({
  blocks = [],
  render,
  customInternalLinkComponent,
}: BlockRendererProps) => {
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
        const component = render?.(block);
        if (component) {
          return component;
        }

        const processNode = (shouldProcessNode: any) => {
          if (block.innerBlocks?.length) {
            const InnerBlocks = (
              <BlockRenderer
                key={block.id}
                blocks={block.innerBlocks || []}
                render={render}
                customInternalLinkComponent={customInternalLinkComponent}
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

                  if (
                    block.name === 'core/buttons' ||
                    block.name === 'core/columns' ||
                    block.name === 'core/social-links' ||
                    block.name === 'core/gallery'
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
                  transform: (node: any, index) => {
                    return convertNodeToReactElement(
                      node,
                      index,
                      function transform(n: any, i) {
                        // process if anchor tag and has customInternalLinkComponent
                        if (
                          n.name === 'a' &&
                          customInternalLinkComponent?.render &&
                          customInternalLinkComponent?.siteDomain &&
                          n.attribs.href.indexOf(
                            customInternalLinkComponent.siteDomain
                          ) === 0
                        ) {
                          const reactElement: any = convertNodeToReactElement(
                            n,
                            i
                          );
                          return customInternalLinkComponent.render(
                            {
                              ...(n.attribs || {}),
                              children: reactElement.props.children,
                            },
                            i
                          );
                        }
                      }
                    );
                  },
                }
              )}
            </Fragment>
          );
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
              <BlockRenderer blocks={block.innerBlocks} render={render} />
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

export const RootBlockRenderer = ({
  blocks = [],
  render,
  customInternalLinkComponent,
}: BlockRendererProps) => {
  return (
    <div className="wp-site-blocks" style={{ paddingTop: 0 }}>
      <main className="is-layout-flow wp-block-group">
        <div className="has-global-padding is-layout-constrained entry-content wp-block-post-content">
          <BlockRenderer
            blocks={blocks}
            render={render}
            customInternalLinkComponent={customInternalLinkComponent}
          />
        </div>
      </main>
    </div>
  );
};
