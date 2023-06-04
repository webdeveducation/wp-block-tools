import React, { useEffect, useRef } from 'react';
import { createReactNodes } from '../../utils/createReactNodes';
import { IBlockBase } from '../../types';
import { BlockRenderer } from '../BlockRenderer';
import parse from 'html-dom-parser';
import { useBlockRendererContext } from '../../context';

type Props = {
  block: IBlockBase;
  allBlocks: IBlockBase[];
};

export default function Navigation({ block, allBlocks }: Props) {
  const { wpDomain, customInternalLinkComponent } = useBlockRendererContext();
  const { htmlContent, innerBlocks } = block;
  const parsedHTML: any = parse(htmlContent || '') || [];

  useEffect(() => {
    // logic to detect open / close mobile menu
    const tempHolder = document.createElement('div');
    tempHolder.innerHTML = htmlContent || '';
    const tempEl = tempHolder.querySelectorAll(
      '[data-micromodal-trigger]'
    )?.[0];
    if (tempEl) {
      const modalId = tempEl.getAttribute('data-micromodal-trigger') || '';
      const el = document.querySelectorAll(
        `[data-micromodal-trigger=${modalId}]`
      )?.[0];
      const handleOpenClick = () => {
        document
          .getElementById(modalId)
          ?.classList.add('is-menu-open', 'has-modal-open');
      };
      const handleCloseClick = () => {
        document
          .getElementById(modalId)
          ?.classList.remove('is-menu-open', 'has-modal-open');
      };
      const closeButton = document
        .getElementById(modalId)
        ?.querySelectorAll('[data-micromodal-close]')?.[0];
      if (closeButton) {
        closeButton.addEventListener('click', handleCloseClick);
      }
      el.addEventListener('click', handleOpenClick);
      return () => {
        if (closeButton) {
          closeButton.removeEventListener('click', handleCloseClick);
        }
        el.removeEventListener('click', handleOpenClick);
      };
    }
  }, []);

  return (
    <React.Fragment>
      {createReactNodes({
        html: parsedHTML,
        block,
        allBlocks,
        component: <BlockRenderer blocks={innerBlocks} />,
        className: 'wp-block-navigation__container',
        wpDomain,
        customInternalLinkComponent,
      })}
    </React.Fragment>
  );
}
