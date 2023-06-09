import React, { useContext } from 'react';
import { RootBlockRenderer } from '../components';
import {
  CustomInternalLinkComponent,
  IBlockBase,
  InternalHrefReplacement,
} from '../types';
import { assignIds } from '../utils';

export type IBlockRendererContext = {
  blocks: IBlockBase[];
  postId: number;
  renderComponent?: (options: {
    block: IBlockBase;
    classNames?: string;
    styles?: { [key: string]: string | number };
  }) => React.ReactElement | null;
  customInternalLinkComponent?: CustomInternalLinkComponent;
  internalHrefReplacement?: InternalHrefReplacement;
  wpDomain?: string;
  siteDomain?: string;
};

export const BlockRendererContext = React.createContext<IBlockRendererContext>({
  blocks: [],
  postId: 0,
});
export const BlockRendererProvider = ({
  renderComponent,
  customInternalLinkComponent,
  wpDomain,
  siteDomain,
  internalHrefReplacement = 'relative',
  blocks,
  children,
  postId,
}: IBlockRendererContext & { children?: JSX.Element }) => {
  const blocksWithIds = assignIds(blocks);
  if (internalHrefReplacement === 'absolute' && !siteDomain) {
    console.warn(
      '`siteDomain` must be specified when internalHrefReplacement="absolute"'
    );
  }
  return (
    <BlockRendererContext.Provider
      value={{
        postId,
        renderComponent,
        customInternalLinkComponent,
        internalHrefReplacement,
        wpDomain,
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
