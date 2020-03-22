import React, { ReactNode, useMemo } from 'react'
import withDefaults from '../utils/with-defaults'
import { NormalTypes } from '../utils/prop-types'
import TextChild from './child'

interface Props {
  h1?: boolean
  h2?: boolean
  h3?: boolean
  h4?: boolean
  h5?: boolean
  h6?: boolean
  p?: boolean
  b?: boolean
  small?: boolean
  i?: boolean
  span?: boolean
  del?: boolean
  em?: boolean
  className?: string
  type?: NormalTypes
}

const defaultProps = {
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  h5: false,
  h6: false,
  p: false,
  b: false,
  small: false,
  i: false,
  span: false,
  del: false,
  em: false,
  className: '',
  type: 'default' as NormalTypes,
}

type ElementMap = { [key in (keyof JSX.IntrinsicElements)]?: boolean }

export type TextProps = Props & typeof defaultProps & React.HTMLAttributes<any>

const getModifierChild = (tags: Array<keyof JSX.IntrinsicElements>, children: ReactNode) => {
  if (!tags.length) return children
  const nextTag = tags.slice(1, tags.length)
  return (
    <TextChild tag={tags[0]}>
      {getModifierChild(nextTag, children)}
    </TextChild>
  )
}

const getModifiers = (inlineElements: ElementMap, children: ReactNode) => {
  const names = Object.keys(inlineElements)
    .filter((name: keyof JSX.IntrinsicElements) => inlineElements[name])
  if (!names.length) return children
  
  return getModifierChild(names as Array<keyof JSX.IntrinsicElements>, children)
}

const Text: React.FC<React.PropsWithChildren<TextProps>> = React.memo(({
  h1, h2, h3, h4, h5, h6, p, b, small, i, span, del, em, children, className, ...props
}) => {
  const elements: ElementMap = { h1, h2, h3, h4, h5, h6, p, small }
  const inlineElements: ElementMap = { b, small, i, span, del, em }
  const names = Object.keys(elements)
    .filter((name: keyof JSX.IntrinsicElements) => elements[name])
  const inlineNames = Object.keys(inlineElements)
    .filter((name: keyof JSX.IntrinsicElements) => inlineElements[name])
  
  /**
   *  Render element "p" only if no element is found.
   *  If there is only one modifier, just rendered one modifier element
   *  e.g.
   *    <Text /> => <p />
   *    <Text em /> => <em />
   *    <Text p em /> => <p><em>children</em></p>
   *
   */

  const notSpecialElement = !names[0]
  const defaultElement = (inlineNames[0] || 'p') as keyof JSX.IntrinsicElements
  const tag = notSpecialElement ? defaultElement : (names[0]) as keyof JSX.IntrinsicElements
  const modifers = useMemo(
    () => {
      if (notSpecialElement) return children
      return getModifiers(inlineElements, children)
    },
    [inlineElements, children],
  )
  return (
    <TextChild className={className} tag={tag} {...props}>{modifers}</TextChild>
  )
})

export default withDefaults(Text, defaultProps)

