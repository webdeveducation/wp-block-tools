import React, { useContext } from 'react';
import { RootBlockRenderer } from '../components';
import { IBlockBase } from '../types';
import { assignIds } from '../utils';

export type IBlockRendererContext = {
  blocks: IBlockBase[];
  renderComponent?: (options: {
    block: IBlockBase;
    classNames?: string;
    styles?: { [key: string]: string | number };
  }) => React.ReactElement | null;
  customInternalLinkComponent?: (el: any) => React.ReactElement | null;
  siteDomain?: string;
};

export const BlockRendererContext = React.createContext<IBlockRendererContext>({
  blocks: [],
});
export const BlockRendererProvider = ({
  renderComponent,
  customInternalLinkComponent,
  siteDomain,
  blocks,
  children,
}: IBlockRendererContext & { children?: JSX.Element }) => {
  const blocksWithIds = assignIds(blocks);
  return (
    <BlockRendererContext.Provider
      value={{
        renderComponent,
        customInternalLinkComponent,
        siteDomain,
        blocks: blocksWithIds,
      }}
    >
      {children ? children : <RootBlockRenderer />}
    </BlockRendererContext.Provider>
  );
};
export const useBlockRendererContext = () => {
  const blockRendererContext = useContext(BlockRendererContext);
  return blockRendererContext;
};
