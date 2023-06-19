'use client';
class ServerContext {
    constructor() { }
    static setData(data) {
        if (!ServerContext.instance) {
            ServerContext.instance = new ServerContext();
        }
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
    static getInstance() {
        if (!ServerContext.instance) {
            ServerContext.instance = new ServerContext();
        }
        return ServerContext.instance;
    }
}

export { ServerContext as default };
//# sourceMappingURL=index.js.map
