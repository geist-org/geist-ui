import React, { useMemo } from 'react'
import TreeFile from './tree-file'
import TreeFolder from './tree-folder'
import { TreeContext } from './tree-context'
import { tuple } from '../utils/prop-types'
import { sortChildren } from './tree-help'
import useClasses from '../use-classes'

const FileTreeValueType = tuple('directory', 'file')

const directoryType = FileTreeValueType[0]

export type TreeFile = {
  type: typeof FileTreeValueType[number]
  name: string
  extra?: string
  files?: Array<TreeFile>
}

interface Props {
  value?: Array<TreeFile>
  initialExpand?: boolean
  onClick?: (path: string) => void
  className?: string
  noSort?: boolean
}

const defaultProps = {
  initialExpand: false,
  className: '',
  noSort: false,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type TreeProps = Props & NativeAttrs

const makeChildren = (value: Array<TreeFile> = [], noSort: boolean) => {
  if (!value || !value.length) return null
  if (!noSort) {
    // Sort
    value = value.sort((a, b) => {
      if (a.type !== b.type) return a.type !== directoryType ? 1 : -1

      return `${a.name}`.charCodeAt(0) - `${b.name}`.charCodeAt(0)
    })
  }
  return value.map((item, index) => {
      if (item.type === directoryType)
        return (
          <TreeFolder
            name={item.name}
            extra={item.extra}
            key={`folder-${item.name}-${index}`}>
            {makeChildren(item.files, noSort)}
          </TreeFolder>
        )
      return (
        <TreeFile
          name={item.name}
          extra={item.extra}
          key={`file-${item.name}-${index}`}
        />
      )
    })
}

const Tree: React.FC<React.PropsWithChildren<TreeProps>> = ({
  children,
  onClick,
  initialExpand,
  value,
  className,
  noSort,
  ...props
}: React.PropsWithChildren<TreeProps> & typeof defaultProps) => {
  const isImperative = Boolean(value && value.length > 0)
  const onFileClick = (path: string) => {
    onClick && onClick(path)
  }

  const initialValue = useMemo(
    () => ({
      onFileClick,
      initialExpand,
      isImperative,
      noSort,
    }),
    [initialExpand],
  )

  const customChildren = isImperative
    ? makeChildren(value, noSort)
    : sortChildren(children, TreeFolder, noSort)

  return (
    <TreeContext.Provider value={initialValue}>
      <div className={useClasses('tree', className)} {...props}>
        {customChildren}
        <style jsx>{`
          .tree {
            padding-left: 1.625rem;
          }
        `}</style>
      </div>
    </TreeContext.Provider>
  )
}

Tree.defaultProps = defaultProps
Tree.displayName = 'GeistTree'
export default Tree
