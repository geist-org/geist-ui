import React, { ReactNode } from 'react'

export const getId = () => {
  return Math.random().toString(32).slice(2, 10)
}

export const capitalize = (str: string | symbol | number | undefined | null) => {
  const safeStr = String(str).trim()
  return safeStr.charAt(0).toUpperCase() + safeStr.slice(1)
}

export const hasChild = (
  children: ReactNode | undefined,
  child: React.ElementType,
): boolean => {
  const types = React.Children.map(children, item => {
    if (!React.isValidElement(item)) return null
    return item.type
  })

  return (types || []).includes(child)
}

export const pickChild = (
  children: ReactNode | undefined,
  targetChild: React.ElementType,
): [ReactNode | undefined, ReactNode | undefined] => {
  let target: ReactNode[] = []
  const withoutTargetChildren = React.Children.map(children, item => {
    if (!React.isValidElement(item)) return item
    if (item.type === targetChild) {
      target.push(item)
      return null
    }
    return item
  })

  const targetChildren = target.length >= 0 ? target : undefined

  return [withoutTargetChildren, targetChildren]
}

export const pickChildByProps = (
  children: ReactNode | undefined,
  key: string,
  value: any,
): [ReactNode | undefined, ReactNode | undefined] => {
  let target: ReactNode[] = []
  const isArray = Array.isArray(value)
  const withoutPropChildren = React.Children.map(children, item => {
    if (!React.isValidElement(item)) return null
    if (!item.props) return item
    if (isArray) {
      if (value.includes(item.props[key])) {
        target.push(item)
        return null
      }
      return item
    }
    if (item.props[key] === value) {
      target.push(item)
      return null
    }
    return item
  })

  const targetChildren = target.length >= 0 ? target : undefined

  return [withoutPropChildren, targetChildren]
}

export const pickChildrenFirst = (
  children: ReactNode | undefined,
): ReactNode | undefined => {
  return React.Children.toArray(children)[0]
}

export const setChildrenProps = (
  children: ReactNode | undefined,
  props: Record<string, unknown>,
  targetComponents: Array<React.ElementType> = [],
): ReactNode | undefined => {
  if (React.Children.count(children) === 0) return []
  const allowAll = targetComponents.length === 0
  const clone = (child: React.ReactElement, props = {}) =>
    React.cloneElement(child, props)

  return React.Children.map(children, item => {
    if (!React.isValidElement(item)) return item
    if (allowAll) return clone(item, props)

    const isAllowed = targetComponents.find(child => child === item.type)
    if (isAllowed) return clone(item, props)
    return item
  })
}

export const setChildrenIndex = (
  children: ReactNode | undefined,
  targetComponents: Array<React.ElementType> = [],
): ReactNode | undefined => {
  if (React.Children.count(children) === 0) return []
  const allowAll = targetComponents.length === 0
  const clone = (child: React.ReactElement, props = {}) =>
    React.cloneElement(child, props)
  let index = 0

  return React.Children.map(children, item => {
    if (!React.isValidElement(item)) return item
    index = index + 1
    if (allowAll) return clone(item, { index })

    const isAllowed = targetComponents.find(child => child === item.type)
    if (isAllowed) return clone(item, { index })
    index = index - 1
    return item
  })
}

export const getReactNode = (
  node?: React.ReactNode | (() => React.ReactNode),
): React.ReactNode => {
  if (!node) return null

  if (typeof node !== 'function') return node
  return (node as () => React.ReactNode)()
}

export const isChildElement = (
  parent: Element | null | undefined,
  child: Element | null | undefined,
): boolean => {
  if (!parent || !child) return false
  let node: (Node & ParentNode) | null = child
  while (node) {
    if (node === parent) return true
    node = node.parentNode
  }
  return false
}
