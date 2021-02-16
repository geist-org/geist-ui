import React, { useMemo, ReactNode } from 'react'
import TreeFile from './tree-file'
import TreeFolder from './tree-folder'
import { TreeContext } from './tree-context'
import { tuple } from '../utils/prop-types'
import { sortChildren } from './/tree-help'

const FileTreeValueType = tuple('directory', 'file')

const directoryType = FileTreeValueType[0]

export type FolderValue = {
  type: typeof FileTreeValueType[0]
  name: string
  icon?: ReactNode
  expand?: boolean
  extra?: string
  files?: Array<FileTreeValue>
}

export type FileValue = {
  type: typeof FileTreeValueType[1]
  name: string
  icon?: ReactNode
  extra?: string
}

export type FileTreeValue = FolderValue | FileValue;

interface Props {
  value?: Array<FileTreeValue>
  initialExpand?: boolean
  onClick?: (path: string) => void
  className?: string
}

const defaultProps = {
  initialExpand: false,
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type TreeProps = Props & typeof defaultProps & NativeAttrs

const makeChildren = (value: Array<FileTreeValue> = []) => {
  if (!value || !value.length) return null
  return value
    .sort((a, b) => {
      if (a.type !== b.type) return a.type !== directoryType ? 1 : -1

      return `${a.name}`.charCodeAt(0) - `${b.name}`.charCodeAt(0)
    })
    .map((item, index) => {
      if (item.type === directoryType)
        return (
          <TreeFolder
            name={item.name}
            icon={item.icon}
            extra={item.extra}
            expand={item.expand}
            key={`folder-${item.name}-${index}`}>
            {makeChildren(item.files)}
          </TreeFolder>
        )
      return (
        <TreeFile
          name={item.name}
          icon={item.icon}
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
  ...props
}) => {
  const isImperative = Boolean(value && value.length > 0)
  const onFileClick = (path: string) => {
    onClick && onClick(path)
  }

  const initialValue = useMemo(
    () => ({
      onFileClick,
      initialExpand,
      isImperative,
    }),
    [initialExpand],
  )

  const customChildren = isImperative
    ? makeChildren(value)
    : sortChildren(children, TreeFolder)

  return (
    <TreeContext.Provider value={initialValue}>
      <div className={`tree ${className}`} {...props}>
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

type TreeComponent<P = {}> = React.FC<P> & {
  File: typeof TreeFile
  Folder: typeof TreeFolder
}

type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs

Tree.defaultProps = defaultProps

export default Tree as TreeComponent<ComponentProps>
