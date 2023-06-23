import React from 'react';
import { IBlockBase } from '../../types';
import { useBlockRendererContext } from '../../context';
import { TerminalBlock } from './TerminalBlock';
import './style.scss';
import { createReactNodes } from '../../utils/createReactNodes';
import parse from 'html-dom-parser';
import Navigation from '../Blocks/Navigation';
import {
  getBlockById,
  getClasses,
  getStyles,
  getUnstableGalleryGapStyle,
} from '../../utils';
import Query from '../Blocks/Query';

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
  } = useBlockRendererContext();

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
            case 'core/gallery': {
              return (
                <figure
                  key={block.id}
                  className={getClasses(block)}
                  style={{
                    ...getStyles(block),
                    ...getUnstableGalleryGapStyle(block.attributes),
                  }}
                >
                  <BlockRenderer blocks={block.innerBlocks} />
                </figure>
              );
            }
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
                <Query key={block.id} block={block} allBlocks={allBlocks} />
              );
            }
            case 'core/navigation': {
              return (
                <Navigation
                  key={block.id}
                  block={block}
                  allBlocks={allBlocks}
                />
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

export const RootBlockRenderer = ({ blocks = [] }: BlockRendererProps) => {
  const { blocks: allBlocks } = useBlockRendererContext();
  return (
    <div className="wp-site-blocks">
      <BlockRenderer blocks={allBlocks || blocks} />
    </div>
  );
};
