import React, { useEffect, useMemo, useState } from 'react'
import { tuple } from '../utils/prop-types'
import useTheme from '../use-theme'
import PageContent from './page-content'
import { hasChild } from '../utils/collections'
import useScaleable, { withScaleable } from '../use-scaleable'

const renderMode = tuple('default', 'effect', 'effect-seo')

export type PageRenderMode = typeof renderMode[number]

interface Props {
  render?: PageRenderMode
  dotBackdrop?: boolean
}

const defaultProps = {
  render: 'default' as PageRenderMode,
  dotBackdrop: false,
}

const DotStyles: React.FC<unknown> = () => (
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
export type PageProps = Props & NativeAttrs

const PageComponent: React.FC<React.PropsWithChildren<PageProps>> = ({
  children,
  render,
  dotBackdrop,
  className,
  ...props
}: React.PropsWithChildren<PageProps> & typeof defaultProps) => {
  const theme = useTheme()
  const { SCALES } = useScaleable()
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
          max-width: 100vw;
          min-height: 100vh;
          box-sizing: border-box;
          position: relative;
          font-size: ${SCALES.font(1)};
          width: ${SCALES.width(1, 'calc(100% - 100pt)')};
          height: ${SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(0)} ${SCALES.pr(1.34)} ${SCALES.pb(0)} ${SCALES.pl(1.34)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0, 'auto')} ${SCALES.mb(0)}
            ${SCALES.ml(0, 'auto')};
        }
      `}</style>
    </section>
  )
}

PageComponent.defaultProps = defaultProps
PageComponent.displayName = 'GeistPage'
const Page = withScaleable(PageComponent)
export default Page
