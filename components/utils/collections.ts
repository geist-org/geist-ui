import React, { ReactNode } from 'react'

export const getId = () => {
  return Math.random().toString(32).slice(2, 10)
}

export const hasChild = (
  children: ReactNode | undefined,
  child: React.ElementType
): boolean => {
  const types = React.Children.map(children, item => {
    if (!React.isValidElement(item)) return null
    return item.type
  })
  
  return (types || []).includes(child)
}

export const pickChild = (
  children: ReactNode | undefined,
  targetChild: React.ElementType
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
  const withoutPropChildren = React.Children.map(children, item => {
    if (!React.isValidElement(item)) return null
    if (!item.props) return item
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
  props: object = {},
  targetComponents: Array<React.ElementType> = []
): ReactNode | undefined => {
  if (React.Children.count(children) === 0) return []
  const allowAll = targetComponents.length === 0
  const clone = (child: React.ReactElement, props = {}) => React.cloneElement(child, props)

  return React.Children.map(children, item => {
    if (!React.isValidElement(item)) return item
    if (allowAll) return clone(item, props)

    const isAllowed = targetComponents.find(child => child === item.type)
    if (isAllowed) return clone(item, props)
    return item
  })
}

export type ShapeType = {
  width: number
  height: number
}

export const getRealShape = (el: HTMLElement | null): ShapeType => {
  const defaultShape: ShapeType = { width: 0, height: 0 }
  if (!el || typeof window === 'undefined') return defaultShape
  
  const rect = el.getBoundingClientRect()
  const { width, height } = window.getComputedStyle(el)
  
  const getCSSStyleVal = (str: string, parentNum: number) => {
    if (!str) return 0
    const strVal = str.includes('px') ? +str.split('px')[0]
      : str.includes('%') ? +str.split('%')[0] * parentNum * 0.01 : str
    
    return Number.isNaN(+strVal) ? 0 : +strVal
  }

  return {
    width: getCSSStyleVal(`${width}`, rect.width),
    height: getCSSStyleVal(`${height}`, rect.height),
  }
}
