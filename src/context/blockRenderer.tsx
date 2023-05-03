import React, { useContext } from 'react';
import { RootBlockRenderer } from '../components';
import { IBlockBase } from '../types';

export type IBlockRendererContext = {
  allBlocks: IBlockBase[];
  renderComponent?: (block: IBlockBase) => React.ReactElement | null;
  customInternalLinkComponent?: (
    n: any,
    index: string | number
  ) => React.ReactElement | null;
  siteDomain?: string;
  includeTemplate?: boolean;
};

export const BlockRendererContext = React.createContext<IBlockRendererContext>({
  allBlocks: [],
});
export const BlockRendererProvider = ({
  renderComponent,
  customInternalLinkComponent,
  siteDomain,
  allBlocks,
  children,
  includeTemplate,
}: IBlockRendererContext & { children?: JSX.Element }) => (
  <BlockRendererContext.Provider
    value={{
      renderComponent,
      customInternalLinkComponent,
      siteDomain,
      allBlocks,
      includeTemplate,
    }}
  >
    {children ? children : <RootBlockRenderer />}
  </BlockRendererContext.Provider>
);
export const useBlockRendererContext = () => {
  const blockRendererContext = useContext(BlockRendererContext);
  return blockRendererContext;
};
