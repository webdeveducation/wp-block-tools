import React from 'react';

type Props = {
  pageNumber: number;
  queryId: number;
  onClick: (loadPageNum: number) => void;
  style?: any;
};

export default function PaginationPageNumber({
  pageNumber,
  queryId,
  onClick,
  style,
}: Props) {
  const handleClick = async (e: any) => {
    e.preventDefault();
    window.history.pushState({ path: e.target.href }, '', e.target.href);
    // load here
    onClick(pageNumber);
  };
  return (
    <a
      className="page-numbers"
      style={{ padding: '0 2px', ...(style || {}) }}
      href={`?query-${queryId}-page=${pageNumber}`}
      onClick={handleClick}
    >
      {pageNumber}
    </a>
  );
}
