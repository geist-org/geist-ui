import React, { ReactNode } from 'react'

export const sortChildren = (
  children: ReactNode | undefined,
  folderComponentType: React.ElementType,
) => {
  return React.Children.toArray(children).sort((a, b) => {
    if (!React.isValidElement(a) || !React.isValidElement(b)) return 0
    if (a.type !== b.type) return a.type !== folderComponentType ? 1 : -1
    return `${a.props.name}`.charCodeAt(0) - `${b.props.name}`.charCodeAt(0)
  })
}

export const makeChildPath = (name: string, parentPath?: string) => {
  if (!parentPath) return name
  return `${parentPath}/${name}`
}

export const stopPropagation = (event: React.MouseEvent) => {
  event.stopPropagation()
  event.nativeEvent.stopImmediatePropagation()
}
