import React, { useMemo } from 'react'
import Link from '../link'
import { Props as LinkProps } from '../link/link'
import useTheme from '../use-theme'
import ImageBrowserHttpsIcon from './image-browser-https-icon'
import { getBrowserColors, BrowserColors } from './styles'
import useScaleable, { withScaleable } from '../use-scaleable'

export type ImageAnchorProps = Omit<React.AnchorHTMLAttributes<any>, keyof LinkProps>

interface Props {
  title?: string
  url?: string
  showFullLink?: boolean
  invert?: boolean
  anchorProps?: ImageAnchorProps
  className?: string
}

const defaultProps = {
  className: '',
  showFullLink: false,
  anchorProps: {} as ImageAnchorProps,
  invert: false,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type ImageBrowserProps = Props & NativeAttrs

const getHostFromUrl = (url: string) => {
  try {
    return new URL(url).host
  } catch (e) {
    return url
  }
}

const getTitle = (title: string, colors: BrowserColors) => (
  <div className="title">
    {title}
    <style jsx>{`
      .title {
        color: ${colors.titleColor};
        font-size: 0.75em;
      }
    `}</style>
  </div>
)

const getAddressInput = (
  url: string,
  showFullLink: boolean,
  colors: BrowserColors,
  anchorProps: ImageAnchorProps,
) => (
  <div className="address-input">
    <span className="https">
      <ImageBrowserHttpsIcon />
    </span>
    <Link href={url} title={url} target="_blank" {...anchorProps}>
      {showFullLink ? url : getHostFromUrl(url)}
    </Link>
    <style jsx>{`
      .address-input {
        height: 1.75em;
        max-width: 60%;
        min-width: 40%;
        background-color: ${colors.inputBgColor};
        color: inherit;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 10px;
        overflow: hidden;
        position: relative;
      }

      .address-input :global(*) {
        font-size: 0.75em;
        color: inherit;
      }

      .address-input :global(a) {
        max-width: 90%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: inline-block;
        color: inherit;
      }

      .https {
        width: 0.75em;
        height: 0.75em;
        font-size: 1em;
        margin-right: 0.31em;
        user-select: none;
        margin-top: -1px;
        color: inherit;
        display: inline-flex;
        align-items: center;
      }
    `}</style>
  </div>
)

const ImageBrowserComponent = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<ImageBrowserProps>
>(
  (
    {
      url,
      title,
      children,
      showFullLink,
      invert,
      anchorProps,
      className,
      ...props
    }: React.PropsWithChildren<ImageBrowserProps> & typeof defaultProps,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const theme = useTheme()
    const { SCALES } = useScaleable()
    const colors = useMemo(
      () => getBrowserColors(invert, theme.palette),
      [invert, theme.palette],
    )
    const input = useMemo(() => {
      if (url) return getAddressInput(url, showFullLink, colors, anchorProps)
      if (title) return getTitle(title, colors)
      return null
    }, [url, showFullLink, title, colors, anchorProps])

    return (
      <div className={`bowser ${className}`} ref={ref} {...props}>
        <header>
          <div className="traffic">
            <span className="close" />
            <span className="mini" />
            <span className="full" />
          </div>
          {input}
        </header>
        {children}
        <style jsx>{`
          .bowser {
            background-color: transparent;
            box-shadow: ${theme.expressiveness.shadowLarge};
            max-width: 100%;
            border-radius: ${theme.layout.radius};
            overflow: hidden;
            font-size: ${SCALES.font(1)};
            width: ${SCALES.width(1, 'max-content')};
            height: ${SCALES.height(1, 'auto')};
            margin: ${SCALES.mt(0)} ${SCALES.mr(0, 'auto')} ${SCALES.mb(0)}
              ${SCALES.ml(0, 'auto')};
            padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          }

          .bowser :global(.image) {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
          }

          header {
            height: 2.5em;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            color: ${colors.color};
            background-color: ${colors.barBgColor};
            border-bottom: 1px solid ${colors.borderColor};
          }

          .traffic {
            width: auto;
            position: absolute;
            left: ${theme.layout.gapHalf};
            top: 50%;
            transform: translateY(-50%);
            bottom: 0;
            height: 100%;
            display: flex;
            align-items: center;
            user-select: none;
            font-size: inherit;
          }

          .traffic span {
            border-radius: 50%;
            width: 0.75em;
            height: 0.75em;
            max-width: 20px;
            max-height: 20px;
            display: inline-block;
            margin-right: 0.5em;
          }

          .close {
            background-color: #ff5f56;
          }

          .mini {
            background-color: #ffbd2e;
          }

          .full {
            background-color: #27c93f;
          }
        `}</style>
      </div>
    )
  },
)

ImageBrowserComponent.defaultProps = defaultProps
ImageBrowserComponent.displayName = 'GeistImageBrowser'
const ImageBrowser = withScaleable(ImageBrowserComponent)
export default ImageBrowser
