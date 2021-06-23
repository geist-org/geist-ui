import Tree from './tree'
import TreeFile from './tree-file'
import TreeFolder from './tree-folder'

export type TreeComponentType = typeof Tree & {
  File: typeof TreeFile
  Folder: typeof TreeFolder
}
;(Tree as TreeComponentType).File = TreeFile
;(Tree as TreeComponentType).Folder = TreeFolder

export type { TreeProps, TreeFile } from './tree'
export default Tree as TreeComponentType
