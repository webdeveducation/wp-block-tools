import React from 'react';
import { IBlockBase } from '../../types';
import { Helmet } from 'react-helmet';
import { useBlockRendererContext } from '../../context';
import { TerminalBlock } from './TerminalBlock';
import './style.scss';
import { createReactNodes } from '../../utils/createReactNodes';
import parse from 'html-dom-parser';

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
                  {createReactNodes(parsedHTML, {
                    component: <BlockRenderer blocks={block.innerBlocks} />,
                    className: 'wp-block-media-text__content',
                  })}
                </React.Fragment>
              );
            }
            case 'core/cover': {
              return (
                <React.Fragment key={block.id}>
                  {createReactNodes(parsedHTML, {
                    component: <BlockRenderer blocks={block.innerBlocks} />,
                    className: 'wp-block-cover__inner-container',
                  })}
                </React.Fragment>
              );
            }
            default: {
              return (
                <React.Fragment key={block.id}>
                  {createReactNodes(parsedHTML, {
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
    <div className="wp-site-blocks" style={{ paddingTop: 0 }}>
      <main className="is-layout-flow wp-block-group">
        <div className="has-global-padding is-layout-constrained entry-content wp-block-post-content">
          <BlockRenderer blocks={allBlocks || blocks} />
        </div>
      </main>
    </div>
  );
};
