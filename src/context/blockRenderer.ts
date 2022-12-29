import React, { useContext } from 'react';
import { IBlockBase } from '../types';

export const BlockRendererContext = React.createContext<{
  render?: (block: IBlockBase) => React.ReactElement | null;
  customInternalLinkComponent?: {
    render: (n: any, index: string | number) => React.ReactElement | null;
    siteDomain: string;
  };
}>({});
export const BlockRendererProvider = BlockRendererContext.Provider;
export const useBlockRendererContext = () => {
  const blockRendererContext = useContext(BlockRendererContext);
  return blockRendererContext;
};
