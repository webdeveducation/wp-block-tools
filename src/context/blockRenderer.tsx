import React, { useContext } from 'react';
import { IBlockBase } from '../types';

export type IBlockRendererContext = {
  renderComponent?: (block: IBlockBase) => React.ReactElement | null;
  customInternalLinkComponent?: (
    n: any,
    index: string | number
  ) => React.ReactElement | null;
  siteDomain?: string;
};

export const BlockRendererContext = React.createContext<IBlockRendererContext>(
  {}
);
export const BlockRendererProvider = ({
  renderComponent,
  customInternalLinkComponent,
  siteDomain,
  children,
}: IBlockRendererContext & { children: JSX.Element }) => (
  <BlockRendererContext.Provider
    value={{ renderComponent, customInternalLinkComponent, siteDomain }}
  >
    {children}
  </BlockRendererContext.Provider>
);
export const useBlockRendererContext = () => {
  const blockRendererContext = useContext(BlockRendererContext);
  return blockRendererContext;
};
