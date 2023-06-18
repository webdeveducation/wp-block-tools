import {
  CustomInternalLinkComponent,
  IBlockBase,
  InternalHrefReplacement,
} from '../types';

export type IServerContext = {
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

export default class ServerContext {
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
  private static instance: ServerContext;
  private constructor() {}
  public static setData(data: IServerContext): ServerContext {
    ServerContext.instance.blocks = data.blocks;
    ServerContext.instance.postId = data.postId;
    ServerContext.instance.renderComponent = data.renderComponent;
    ServerContext.instance.customInternalLinkComponent =
      data.customInternalLinkComponent;
    ServerContext.instance.internalHrefReplacement =
      data.internalHrefReplacement;
    ServerContext.instance.wpDomain = data.wpDomain;
    ServerContext.instance.siteDomain = data.siteDomain;
    return ServerContext.instance;
  }
  public static getInstance(): ServerContext {
    if (!ServerContext.instance) {
      ServerContext.instance = new ServerContext();
    }
    return ServerContext.instance;
  }
}
