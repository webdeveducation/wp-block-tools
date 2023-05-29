import React from 'react';
import { IBlockBase } from '../../types';
import { Helmet } from 'react-helmet';
import { useBlockRendererContext } from '../../context';
import { TerminalBlock } from './TerminalBlock';
import './style.scss';
import { createReactNodes } from '../../utils/createReactNodes';
import parse from 'html-dom-parser';
import Navigation from '../Blocks/Navigation';
import { getBlockById, getClasses, getStyles } from '../../utils';

export type BlockRendererProps = {
  blocks?: IBlockBase[];
};

export const BlockRenderer = ({ blocks = [] }: BlockRendererProps) => {
  const { renderComponent, blocks: allBlocks } = useBlockRendererContext();

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
                console.log('IN HERE: ', newHtmlContent);
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
                  })}
                </React.Fragment>
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
