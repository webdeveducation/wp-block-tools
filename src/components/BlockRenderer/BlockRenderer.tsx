import React from 'react';
import { IBlockBase } from '../../types';
import { Helmet } from 'react-helmet';
import { useBlockRendererContext } from '../../context';
import { TerminalBlock } from './TerminalBlock';
import './style.scss';
import { createReactNodes } from '../../utils/createReactNodes';
import parse from 'html-dom-parser';
import Navigation from '../Blocks/Navigation';
import { getClasses, getStyles } from '../../utils';

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
        const parsedHTML: any = parse(block.htmlContent || '') || [];
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
                    component: <BlockRenderer blocks={block.innerBlocks} />,
                    className: 'wp-block-cover__inner-container',
                  })}
                </React.Fragment>
              );
            }
            case 'core/navigation-submenu': {
              return (
                <React.Fragment key={block.id}>
                  {createReactNodes({
                    html: parsedHTML,
                    block,
                    component: <BlockRenderer blocks={block.innerBlocks} />,
                    className: 'wp-block-navigation__submenu-container',
                  })}
                </React.Fragment>
              );
            }
            case 'core/navigation': {
              return <Navigation key={block.id} block={block} />;
            }
            default: {
              return (
                <React.Fragment key={block.id}>
                  {createReactNodes({
                    html: parsedHTML,
                    block,
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
