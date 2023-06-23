export const getPageBlocksByPageUri = async (uri: string) => {
  // first query for the category and tag prefixes
  // then check to see if the uri starts with either of those prefixes,
  // if yes, then use archivePageBlocks(uri: uri)
};
