import React, { Fragment } from 'react';
import { useBlockRendererContext } from '../../../context';
import { IBlockBase } from '../../../types';
import parse from 'html-dom-parser';
import { createReactNodes } from '../../../utils/createReactNodes';
import {
  convertStyleStringToReact,
  getBlockById,
  getCustomInternalLinkComponent,
  getLinkTextStyle,
} from '../../../utils';
import { hasClass } from '../../../utils/hasClass';

export const TerminalBlock = ({ block }: { block: IBlockBase }) => {
  const {
    blocks: allBlocks,
    customInternalLinkComponent,
    wpDomain,
  } = useBlockRendererContext();

  const parsedHTML: any[] = parse(block.htmlContent || '') || [];

  const traverse = (els: any[]) => {
    els.forEach((el) => {
      // process social link based on parent "core/social-links" block attributes
      if (block.name === 'core/social-link') {
        // get parent
        if (block.parentId) {
          const parentBlock = getBlockById(allBlocks, block.parentId);
          if (!el.attribs) {
            el.attribs = {};
          }

          if (el.name === 'a') {
            if (parentBlock?.attributes?.openInNewTab) {
              el.attribs.target = '_blank';
              el.attribs.rel = 'noopener nofollow';
            }
          }
          if (
            parentBlock?.attributes?.showLabels &&
            hasClass(el, 'wp-block-social-link-label')
          ) {
            el.attribs.class = el.attribs.class.replace(
              'screen-reader-text',
              ''
            );
          }
        }
      }

      if (el.type === 'tag' && el.name === 'a') {
        // if anchor tag, check to see if it's being rendered within a paragraph block
        if (block.name === 'core/paragraph') {
          // get the link styles
          const linkStyles = getLinkTextStyle(block.attributes);
          if (!el.attribs) {
            el.attribs = {};
          }
          el.attribs.style = `color: ${linkStyles.color};${
            el.attribs.style || ''
          }`;
        }

        const internalLinkComponent = getCustomInternalLinkComponent({
          node: el,
          block,
          allBlocks,
          customInternalLinkComponent,
          wpDomain,
        });

        if (!!internalLinkComponent) {
          el.type = 'react';
          el.component = internalLinkComponent;
        }
      }
      if (el.children) {
        traverse(el.children);
      }
    });
  };

  traverse(parsedHTML);

  return (
    <Fragment>
      {createReactNodes({
        html: parsedHTML,
        block,
        allBlocks,
        wpDomain,
        customInternalLinkComponent,
      })}
    </Fragment>
  );
};
