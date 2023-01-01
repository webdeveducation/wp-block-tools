import { convertNodeToReactElement } from '@hedgedoc/html-to-react';
import { convertHtmlToReact } from '@hedgedoc/html-to-react/dist/convertHtmlToReact';
import React, { Fragment } from 'react';
import { useBlockRendererContext } from '../../../context';
import { IBlockBase } from '../../../types';
import { getBlockById } from '../../../utils';
import { hasClass } from '../../../utils/hasClass';

export const TerminalBlock = ({ block }: { block: IBlockBase }) => {
  const { allBlocks, customInternalLinkComponent, siteDomain } =
    useBlockRendererContext();

  const getInternalHref = (href: string) => {
    const siteDomainWithoutProtocol = siteDomain
      ?.replace('http://', '')
      .replace('https://', '');
    return href
      .replace('http://', '')
      .replace('https://', '')
      .replace(siteDomainWithoutProtocol || '', '');
  };

  return (
    <Fragment>
      {convertHtmlToReact(block.originalContent || block.dynamicContent || '', {
        transform: (node: any, index) => {
          return convertNodeToReactElement(
            node,
            index,
            function transform(n: any, i) {
              // process social link based on parent "core/social-links" block attributes
              if (block.name === 'core/social-link') {
                // get parent
                if (block.parentId) {
                  const parent = getBlockById(allBlocks, block.parentId);
                  if (!n.attribs) {
                    n.attribs = {};
                  }

                  if (n.name === 'a') {
                    if (parent?.attributes?.openInNewTab) {
                      n.attribs.target = '_blank';
                      n.attribs.rel = 'noopener nofollow';
                      return convertNodeToReactElement(n, i, (n1: any, i1) => {
                        console.log('N1: ', n1);
                        if (!n1.attribs) {
                          n1.attribs = {};
                        }

                        if (
                          parent?.attributes?.showLabels &&
                          hasClass(n1, 'wp-block-social-link-label')
                        ) {
                          n1.attribs.class = n1.attribs.class.replace(
                            'screen-reader-text',
                            ''
                          );
                          return convertNodeToReactElement(n1, i1);
                        }
                      });
                    }
                  }
                }
              }

              // process if anchor tag and has customInternalLinkComponent
              const href = n.attribs?.href || '';
              if (
                n.name === 'a' &&
                customInternalLinkComponent &&
                siteDomain &&
                (href.replace('http://', '').indexOf(siteDomain) === 0 ||
                  href.replace('https://', '').indexOf(siteDomain) === 0)
              ) {
                const reactElement: any = convertNodeToReactElement(n, i);
                return customInternalLinkComponent(
                  {
                    ...(n.attribs || {}),
                    internalHref: getInternalHref(href),
                    children: reactElement.props.children,
                  },
                  i
                );
              }
            }
          );
        },
      })}
    </Fragment>
  );
};
