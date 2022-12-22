export interface IBlockBase {
  id?: string;
  name: string;
  originalContent?: string;
  dynamicContent?: string;
  innerBlocks?: IBlockBase[];
  [key: string]: any;
}
