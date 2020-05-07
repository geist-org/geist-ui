import React, { useEffect, useMemo, useState } from 'react'
import { NormalSizes, tuple } from '../utils/prop-types'
import { getPageSize } from './styles'
import useTheme from '../styles/use-theme'
import PageHeader from './page-header'
import PageContent from './page-content'
import { hasChild } from '../utils/collections'
import PageFooter from './page-footer'

const renderMode = tuple('default', 'effect', 'effect-seo')

export type PageSize = NormalSizes | string
export type PageRenderMode = typeof renderMode[number]

interface Props {
  size?: PageSize
  render?: PageRenderMode
  dotBackdrop: boolean
}

const defaultProps = {
  size: 'medium' as PageSize,
  render: 'default' as PageRenderMode,
  dotBackdrop: false,
}

const DotStyles: React.FC<{}> = () => (
  <span>
    <style jsx>{`
      :global(body) {
        background-image: radial-gradient(#e3e3e3 1px, transparent 0),
          radial-gradient(#e3e3e3 1px, transparent 0);
        background-position: 0 0, 25px 25px;
        background-attachment: fixed;
        background-size: 50px 50px;
      }
    `}</style>
  </span>
)

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type NoteProps = Props & typeof defaultProps & NativeAttrs

const Page: React.FC<React.PropsWithChildren<NoteProps>> = ({
  children,
  size,
  render,
  dotBackdrop,
  className,
  ...props
}) => {
  const theme = useTheme()
  const width = useMemo(() => getPageSize(size, theme.layout), [size, theme.layout])
  const showDot = useMemo<boolean>(() => {
    if (theme.type === 'dark') return false
    return dotBackdrop
  }, [dotBackdrop, theme.type])
  const [preventRender, setPreventRender] = useState<boolean>(render !== 'default')

  useEffect(() => {
    setPreventRender(false)
  }, [])

  if (preventRender) {
    const renderSEO = render === 'effect-seo'
    if (!renderSEO) return null
    return (
      <div className="hidden" aria-hidden="true">
        {children}
        <style jsx>{`
          .hidden {
            opacity: 0;
            display: none;
          }
        `}</style>
      </div>
    )
  }

  const hasContent = hasChild(children, PageContent)

  return (
    <section className={className} {...props}>
      {hasContent ? children : <PageContent>{children}</PageContent>}
      {showDot && <DotStyles />}
      <style jsx>{`
        section {
          width: ${width};
          max-width: 100vw;
          min-height: 100vh;
          margin: 0 auto;
          box-sizing: border-box;
          position: relative;
        }

        @media only screen and (max-width: ${theme.layout.breakpointMobile}) {
          section {
            max-width: 90vw;
            min-height: -webkit-fill-available;
          }
        }
      `}</style>
    </section>
  )
}

type MemoPageComponent<P = {}> = React.NamedExoticComponent<P> & {
  Header: typeof PageHeader
  Content: typeof PageContent
  Body: typeof PageContent
  Footer: typeof PageFooter
}
type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs

Page.defaultProps = defaultProps

export default React.memo(Page) as MemoPageComponent<ComponentProps>
