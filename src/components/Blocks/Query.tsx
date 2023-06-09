import React, { useEffect, useState } from 'react';
import { createReactNodes } from '../../utils/createReactNodes';
import { IBlockBase } from '../../types';
import { BlockRenderer } from '../BlockRenderer';
import parse from 'html-dom-parser';
import { useBlockRendererContext } from '../../context';
import { assignIds, getClasses, getStyles } from '../../utils';

type Props = {
  block: IBlockBase;
  allBlocks: IBlockBase[];
};

export default function Query({ block, allBlocks }: Props) {
  const {
    wpDomain,
    customInternalLinkComponent,
    internalHrefReplacement,
    siteDomain,
    postId,
  } = useBlockRendererContext();
  const { htmlContent, innerBlocks } = block;
  const parsedHTML: any = parse(htmlContent || '') || [];

  const [results, setResults] = useState(
    innerBlocks?.filter(
      (innerBlock) => innerBlock.name !== 'core/query-pagination'
    ) || []
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);
    console.log({ searchParams });
  }, []);

  const paginationBlocks =
    innerBlocks?.filter(
      (innerBlock) => innerBlock.name === 'core/query-pagination'
    ) || [];

  return (
    <React.Fragment>
      {createReactNodes({
        html: parsedHTML,
        block,
        allBlocks,
        component: <BlockRenderer blocks={results} />,
        wpDomain,
        siteDomain,
        customInternalLinkComponent,
        internalHrefReplacement,
      })}
      {paginationBlocks.map((paginationBlock) => {
        return (
          <nav
            key={paginationBlock.id}
            className={`${getClasses(
              paginationBlock
            )} wp-block-query-pagination`}
            style={getStyles(paginationBlock)}
          >
            {paginationBlock.innerBlocks?.map((innerBlock) => {
              switch (innerBlock.name) {
                case 'core/query-pagination-numbers': {
                  console.log(innerBlock);
                  return (
                    <div
                      key={innerBlock.id}
                      className="wp-block-query-pagination-numbers"
                    >
                      {Array.from({
                        length: innerBlock.attributes.totalPages,
                      }).map((_, i) => {
                        return (
                          <a
                            className="page-numbers"
                            key={i}
                            style={{ padding: '0 2px' }}
                            href={`?query-${
                              innerBlock.attributes.queryId
                            }-page=${i + 1}`}
                            onClick={async (e: any) => {
                              e.preventDefault();
                              window.history.pushState(
                                { path: e.target.href },
                                '',
                                e.target.href
                              );
                              // load here
                              const response = await fetch(
                                `${wpDomain}/graphql`,
                                {
                                  method: 'POST',
                                  headers: {
                                    'content-type': 'application/json',
                                  },
                                  body: JSON.stringify({
                                    query: `
                                  query CoreQuery {
                                    coreQuery(page: ${
                                      i + 1
                                    }, postId: ${postId}, queryId: ${
                                      innerBlock.attributes.queryId
                                    })
                                  }
                                `,
                                  }),
                                }
                              );
                              const json = await response.json();
                              console.log({ json });
                              // assign ids to new blocks
                              const newBlocks = assignIds(json.data.coreQuery);
                              setResults(newBlocks);
                            }}
                          >
                            {i + 1}
                          </a>
                        );
                      })}
                    </div>
                  );
                }
                default:
                  return null;
              }
            })}
          </nav>
        );
      })}
    </React.Fragment>
  );
}
