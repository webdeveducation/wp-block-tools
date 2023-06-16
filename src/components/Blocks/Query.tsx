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

  const [currentPage, setCurrentPage] = useState(1);
  const { htmlContent, innerBlocks } = block;
  const queryId = block?.attributes?.queryId;
  const parsedHTML: any = parse(htmlContent || '') || [];

  const [results, setResults] = useState(
    innerBlocks?.filter(
      (innerBlock) => innerBlock.name !== 'core/query-pagination'
    ) || []
  );

  const handlePageClick = (loadPageNum: number) => {
    setCurrentPage(loadPageNum);
    loadPage(loadPageNum);
  };

  useEffect(() => {
    if (queryId) {
      const search = new URLSearchParams(window.location.search);
      const pageNumber = search.get(`query-${queryId}-page`) || '1';
      const pageNumberParsed = pageNumber ? parseInt(pageNumber) : 1;
      setCurrentPage(pageNumberParsed);
      if (pageNumberParsed > 1) {
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
          const paginationNumbersBlock = topInnerBlock?.innerBlocks?.find(
            (ib) => {
              return ib.name === 'core/query-pagination-numbers';
            }
          );
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
                    const prevPageNumber = currentPage - 1;
                    return currentPage !== 1 ? (
                      <a
                        key={innerBlock.id}
                        href={`?query-${queryId}-page=${prevPageNumber}`}
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
                          setCurrentPage(prevPageNumber);
                          loadPage(prevPageNumber);
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
                    ) : null;
                  }
                  case 'core/query-pagination-next': {
                    const nextPageNumber = currentPage - 1;
                    return currentPage !==
                      paginationNumbersBlock?.attributes.totalPages ? (
                      <a
                        key={innerBlock.id}
                        href={`?query-${queryId}-page=${nextPageNumber}`}
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
                          setCurrentPage(nextPageNumber);
                          loadPage(nextPageNumber);
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
                    ) : null;
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
                          const pNum = i + 1;
                          let canReturn = false;
                          if (innerBlock.attributes.totalPages > 7) {
                            if (
                              pNum === 1 ||
                              pNum === innerBlock.attributes.totalPages
                            ) {
                              canReturn = true;
                            } else if (currentPage === pNum) {
                              canReturn = true;
                            } else if (
                              currentPage + 1 === pNum ||
                              currentPage + 2 === pNum ||
                              currentPage - 1 === pNum ||
                              currentPage - 2 === pNum
                            ) {
                              canReturn = true;
                            }
                          } else {
                            canReturn = true;
                          }
                          if (canReturn) {
                            return (
                              <PaginationPageNumber
                                key={i}
                                pageNumber={pNum}
                                queryId={innerBlock.attributes.queryId}
                                onClick={handlePageClick}
                                style={getLinkTextStyle(
                                  topInnerBlock.attributes
                                )}
                              />
                            );
                          }
                          return null;
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
