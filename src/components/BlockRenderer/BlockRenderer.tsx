import React from 'react';
import {
  CustomInternalLinkComponent,
  IBlockBase,
  InternalHrefReplacement,
} from '../../types';
import { TerminalBlock } from './TerminalBlock';
import './style.scss';
import { createReactNodes } from '../../utils/createReactNodes';
import parse from 'html-dom-parser';
import { assignIds, getBlockById, getClasses, getStyles } from '../../utils';
import ServerContext from '../../serverContext';
import { Navigation } from '../Blocks/Navigation';
import { Query } from '../Blocks/Query';

export type BlockRendererProps = {
  blocks?: IBlockBase[];
};

export const BlockRenderer = ({ blocks = [] }: BlockRendererProps) => {
  const {
    renderComponent,
    blocks: allBlocks,
    wpDomain,
    siteDomain,
    customInternalLinkComponent,
    internalHrefReplacement,
    postId,
  } = ServerContext.getInstance();

  return (
    <>
      {blocks.map((block) => {
        // render custom component for this block if exists
        const component = renderComponent?.({
          block,
          styles: getStyles(block),
          classNames: getClasses(block),
        });
        if (component) {
          return <React.Fragment key={block.id}>{component}</React.Fragment>;
        }

        // if no htmlContent but has inner blocks, just render the inner blocks
        if (!block.htmlContent && block.innerBlocks?.length) {
          return <BlockRenderer key={block.id} blocks={block.innerBlocks} />;
        }

        // if no inner blocks
        // here we need to render the terminal block which will
        // also cater for the siteDomain replace
        let parsedHTML: any = parse(block.htmlContent || '') || [];
        if (block.htmlContent && !block.innerBlocks?.length) {
          return <TerminalBlock key={block.id} block={block} />;
        }

        // if html content and inner blocks
        if (block.htmlContent && block.innerBlocks?.length) {
          switch (block.name) {
            case 'core/block':
              return (
                <BlockRenderer key={block.id} blocks={block.innerBlocks} />
              );
            case 'core/media-text': {
              return (
                <React.Fragment key={block.id}>
                  {createReactNodes({
                    html: parsedHTML,
                    block,
                    allBlocks,
                    component: <BlockRenderer blocks={block.innerBlocks} />,
                    className: 'wp-block-media-text__content',
                    wpDomain,
                    siteDomain,
                    customInternalLinkComponent,
                  })}
                </React.Fragment>
              );
            }
            case 'core/cover': {
              return (
                <React.Fragment key={block.id}>
                  {createReactNodes({
                    html: parsedHTML,
                    block,
                    allBlocks,
                    component: <BlockRenderer blocks={block.innerBlocks} />,
                    className: 'wp-block-cover__inner-container',
                    wpDomain,
                    siteDomain,
                    customInternalLinkComponent,
                  })}
                </React.Fragment>
              );
            }
            case 'core/navigation-submenu': {
              // get parent block
              let showSubmenuIcon = false;
              if (block.parentId) {
                const parentBlock = getBlockById(allBlocks, block.parentId);
                if (parentBlock) {
                  showSubmenuIcon = !!parentBlock.attributes?.showSubmenuIcon;
                }
              }
              if (showSubmenuIcon) {
                let newHtmlContent = `${block.htmlContent}`;
                newHtmlContent = newHtmlContent.replace(
                  '</a>',
                  `</a><button class="wp-block-navigation__submenu-icon wp-block-navigation-submenu__toggle" aria-expanded="false"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" focusable="false"><path d="M1.50002 4L6.00002 8L10.5 4" stroke-width="1.5"></path></svg></button>`
                );
                parsedHTML = parse(newHtmlContent || '') || [];
              }
              return (
                <React.Fragment key={block.id}>
                  {createReactNodes({
                    html: parsedHTML,
                    block,
                    allBlocks,
                    component: <BlockRenderer blocks={block.innerBlocks} />,
                    className: 'wp-block-navigation__submenu-container',
                    wpDomain,
                    siteDomain,
                    customInternalLinkComponent,
                  })}
                </React.Fragment>
              );
            }
            case 'core/query': {
              return (
                <Query
                  key={block.id}
                  block={block}
                  allBlocks={allBlocks}
                  wpDomain={wpDomain}
                  customInternalLinkComponent={customInternalLinkComponent}
                  internalHrefReplacement={internalHrefReplacement}
                  postId={postId}
                  siteDomain={siteDomain}
                />
              );
            }
            case 'core/navigation': {
              return (
                <Navigation key={block.id} htmlContent={block.htmlContent}>
                  {createReactNodes({
                    html: parsedHTML,
                    block,
                    allBlocks,
                    component: <BlockRenderer blocks={block.innerBlocks} />,
                    className: 'wp-block-navigation__container',
                    wpDomain,
                    siteDomain,
                    customInternalLinkComponent,
                    internalHrefReplacement,
                  })}
                </Navigation>
              );
            }
            default: {
              return (
                <React.Fragment key={block.id}>
                  {createReactNodes({
                    html: parsedHTML,
                    block,
                    allBlocks,
                    component: <BlockRenderer blocks={block.innerBlocks} />,
                    wpDomain,
                    siteDomain,
                    customInternalLinkComponent,
                  })}
                </React.Fragment>
              );
            }
          }
        }
        return null;
      })}
    </>
  );
};

export type RootBlockRendererProps = {
  blocks: IBlockBase[];
  postId: number;
  renderComponent?: (options: {
    block: IBlockBase;
    classNames?: string;
    styles?: { [key: string]: string | number };
  }) => React.ReactElement | null;
  customInternalLinkComponent?: CustomInternalLinkComponent;
  internalHrefReplacement?: InternalHrefReplacement;
  wpDomain?: string;
  siteDomain?: string;
};

export const RootBlockRenderer = (props: RootBlockRendererProps) => {
  ServerContext.setData(props);
  const blocksWithIds = assignIds(props.blocks);
  if (props.internalHrefReplacement === 'absolute' && !props.siteDomain) {
    console.warn(
      '`siteDomain` must be specified when internalHrefReplacement="absolute"'
    );
  }
  return (
    <div className="wp-site-blocks">
      <BlockRenderer blocks={blocksWithIds} />
    </div>
  );
};
