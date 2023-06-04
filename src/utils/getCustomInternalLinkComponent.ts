import { CustomInternalLinkComponent, IBlockBase } from '../types';
import { convertStyleStringToReact } from './convertStyleStringToReact';
import { createReactNodes } from './createReactNodes';

export const getCustomInternalLinkComponent = (options: {
  node: any;
  block: IBlockBase;
  allBlocks: IBlockBase[];
  wpDomain?: string;
  customInternalLinkComponent?: CustomInternalLinkComponent;
}) => {
  const { node, block, allBlocks, wpDomain, customInternalLinkComponent } =
    options;

  if (wpDomain && customInternalLinkComponent) {
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
      customInternalLinkComponent &&
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

      const internalLinkComponent = customInternalLinkComponent({
        ...(node?.attribs || {}),
        style,
        className,
        href: getInternalHref(href),
        children: reactElement,
        key: block.id,
      });
      return internalLinkComponent;
    }
  }
};
