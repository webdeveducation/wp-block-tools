import React, { useEffect, useState } from 'react';
import { createReactNodes } from '../../utils/createReactNodes';
import { IBlockBase } from '../../types';
import { BlockRenderer } from '../BlockRenderer';
import parse from 'html-dom-parser';
import { useBlockRendererContext } from '../../context';
import {
  assignIds,
  getBlockById,
  getClasses,
  getLinkTextStyle,
  getStyles,
} from '../../utils';
import PaginationPageNumber from './PaginationPageNumber';

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

  const [currentPage, setCurrentPage] = useState('1');
  const { htmlContent, innerBlocks } = block;
  const queryId = block?.attributes?.queryId;
  const parsedHTML: any = parse(htmlContent || '') || [];

  const [results, setResults] = useState(
    innerBlocks?.filter(
      (innerBlock) => innerBlock.name !== 'core/query-pagination'
    ) || []
  );

  const handlePageClick = (loadPageNum: number) => {
    loadPage(loadPageNum);
  };

  useEffect(() => {
    if (queryId) {
      const search = new URLSearchParams(window.location.search);
      const pageNumber = search.get(`query-${queryId}-page`) || '1';
      setCurrentPage(pageNumber);
      if (pageNumber && parseInt(pageNumber) > 1) {
        setResults([]);
        const fetchResults = async () => {
          const response = await fetch(
            `${wpDomain}/graphql?query=${`
            query CoreQuery {
              coreQuery(page: ${pageNumber}, postId: ${postId}, queryId: ${queryId})
            }
          `}`,
            {
              method: 'GET',
              headers: {
                'content-type': 'application/json',
              },
            }
          );
          const json = await response.json();
          // assign ids to new blocks
          const newBlocks = assignIds(json.data.coreQuery);
          setResults(newBlocks);
        };
        fetchResults();
      }
    }
  }, [queryId]);

  console.log('inner blocks: ', block.innerBlocks);

  const loadPage = async (loadPageNum: number) => {
    if (queryId) {
      const response = await fetch(
        `${wpDomain}/graphql?query=${`
      query CoreQuery {
        coreQuery(page: ${loadPageNum}, postId: ${postId}, queryId: ${queryId})
      }
    `}`,
        {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
          },
        }
      );
      const json = await response.json();
      // assign ids to new blocks
      const newBlocks = assignIds(json.data.coreQuery);
      setResults(newBlocks);
    }
  };

  return (
    <React.Fragment>
      {(innerBlocks || []).map((topInnerBlock) => {
        if (topInnerBlock.name === 'wp-block-tools/loop') {
          return createReactNodes({
            html: parsedHTML,
            block,
            allBlocks,
            component: <BlockRenderer blocks={results} />,
            wpDomain,
            siteDomain,
            customInternalLinkComponent,
            internalHrefReplacement,
          });
        } else if (topInnerBlock.name === 'core/query-pagination') {
          return (
            <nav
              key={topInnerBlock.id}
              className={`${getClasses(
                topInnerBlock
              )} wp-block-query-pagination`}
              style={getStyles(topInnerBlock)}
            >
              {topInnerBlock.innerBlocks?.map((innerBlock) => {
                const paginationArrow =
                  topInnerBlock.attributes?.paginationArrow;
                switch (innerBlock.name) {
                  case 'core/query-pagination-previous': {
                    return (
                      <a
                        key={innerBlock.id}
                        href={`?query-${queryId}-page=${
                          parseInt(currentPage) - 1
                        }`}
                        style={getLinkTextStyle(topInnerBlock.attributes)}
                        className="wp-block-query-pagination-previous"
                        onClick={(e: any) => {
                          e.preventDefault();
                          window.history.pushState(
                            { path: e.target.href },
                            '',
                            e.target.href
                          );
                          // load here
                          setCurrentPage(`${parseInt(currentPage) - 1}`);
                          loadPage(parseInt(currentPage) - 1);
                        }}
                      >
                        {paginationArrow === 'arrow' ? (
                          <span className="wp-block-query-pagination-previous-arrow is-arrow-arrow">
                            ←
                          </span>
                        ) : paginationArrow === 'chevron' ? (
                          <span className="wp-block-query-pagination-previous-arrow is-arrow-chevron">
                            «
                          </span>
                        ) : (
                          ''
                        )}{' '}
                        Previous Page
                      </a>
                    );
                  }
                  case 'core/query-pagination-next': {
                    return (
                      <a
                        key={innerBlock.id}
                        href={`?query-${queryId}-page=${
                          parseInt(currentPage) + 1
                        }`}
                        className="wp-block-query-pagination-next"
                        style={getLinkTextStyle(topInnerBlock.attributes)}
                        onClick={(e: any) => {
                          e.preventDefault();
                          window.history.pushState(
                            { path: e.target.href },
                            '',
                            e.target.href
                          );
                          // load here
                          setCurrentPage(`${parseInt(currentPage) + 1}`);
                          loadPage(parseInt(currentPage) + 1);
                        }}
                      >
                        Next Page{' '}
                        {paginationArrow === 'arrow' ? (
                          <span className="wp-block-query-pagination-next-arrow is-arrow-arrow">
                            →
                          </span>
                        ) : paginationArrow === 'chevron' ? (
                          <span className="wp-block-query-pagination-next-arrow is-arrow-chevron">
                            »
                          </span>
                        ) : (
                          ''
                        )}
                      </a>
                    );
                  }
                  case 'core/query-pagination-numbers': {
                    return (
                      <div
                        key={innerBlock.id}
                        className="wp-block-query-pagination-numbers"
                      >
                        {Array.from({
                          length: innerBlock.attributes.totalPages,
                        }).map((_, i) => {
                          return (
                            <PaginationPageNumber
                              key={i}
                              pageNumber={i + 1}
                              queryId={innerBlock.attributes.queryId}
                              onClick={handlePageClick}
                              style={getLinkTextStyle(topInnerBlock.attributes)}
                            />
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
        }
        return null;
      })}
    </React.Fragment>
  );
}
