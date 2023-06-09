import React from 'react';
import {
  CustomInternalLinkComponent,
  IBlockBase,
  InternalHrefReplacement,
} from '../types';
import { convertStyleStringToReact } from './convertStyleStringToReact';
import { createReactNodes } from './createReactNodes';

export const getCustomInternalLinkComponent = (options: {
  node: any;
  block: IBlockBase;
  allBlocks: IBlockBase[];
  wpDomain?: string;
  siteDomain?: string;
  customInternalLinkComponent?: CustomInternalLinkComponent;
  internalHrefReplacement?: InternalHrefReplacement;
}) => {
  const {
    node,
    block,
    allBlocks,
    wpDomain,
    customInternalLinkComponent,
    internalHrefReplacement,
    siteDomain,
  } = options;

  if (
    wpDomain &&
    (customInternalLinkComponent || internalHrefReplacement !== 'none')
  ) {
    const getInternalHref = (href: string) => {
      const siteDomainWithoutProtocol = (wpDomain || '')
        .replace('http://', '')
        .replace('https://', '');

      return (
        href
          .replace('http://', '')
          .replace('https://', '')
          .replace(siteDomainWithoutProtocol || '', '') || '/'
      );
    };
    // process if anchor tag and has customInternalLinkComponent
    const href = node.attribs?.href || '';
    const hrefWithoutProtocol = href
      .replace('http://', '')
      .replace('https://', '');
    const siteDomainWithoutProtocol = (wpDomain || '')
      .replace('http://', '')
      .replace('https://', '');

    if (
      (customInternalLinkComponent || internalHrefReplacement !== 'none') &&
      ((!!siteDomainWithoutProtocol &&
        hrefWithoutProtocol.indexOf(siteDomainWithoutProtocol) === 0) ||
        hrefWithoutProtocol.indexOf('/') === 0)
    ) {
      const reactElement: any = createReactNodes({
        html: node.children,
        block,
        allBlocks,
      });

      let className;
      const style = node.attribs?.style
        ? convertStyleStringToReact(node.attribs?.style)
        : null;

      if (!node?.attribs) {
        node.attribs = {};
      } else {
        className = node.attribs.class;
        delete node.attribs.class;
      }

      if (!!customInternalLinkComponent) {
        const internalLinkComponent = customInternalLinkComponent({
          ...(node?.attribs || {}),
          style,
          className,
          href: getInternalHref(href),
          children: reactElement,
          key: block.id,
        });
        return internalLinkComponent;
      } else if (internalHrefReplacement === 'absolute' && !!siteDomain) {
        return React.createElement(
          'a',
          {
            ...(node?.attribs || {}),
            style,
            className,
            href: `${siteDomain}${getInternalHref(href)}`,
            key: block.id,
          },
          reactElement
        );
      } else if (internalHrefReplacement === 'relative') {
        return React.createElement(
          'a',
          {
            ...(node?.attribs || {}),
            style,
            className,
            href: getInternalHref(href),
            key: block.id,
          },
          reactElement
        );
      }
    }
  }
};
