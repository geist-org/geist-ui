import React, { useEffect, useRef, useState } from 'react'
import useTheme from '../use-theme'
import ImageSkeleton from './image.skeleton'
import ImageBrowser from './image-browser'
import useRealShape from '../utils/use-real-shape'
import useCurrentState from '../utils/use-current-state'
import useResize from '../utils/use-resize'
import { PropsOf } from '../utils/prop-types'

export type Assign<T extends object, U extends object> = T & Omit<U, keyof T>

export type Props<T extends React.ReactElement | React.ComponentType<any>> = Assign<
  {
    src: string
    disableAutoResize?: boolean
    disableSkeleton?: boolean
    width?: number
    height?: number
    className?: string
    scale?: string
    maxDelay?: number
    component?: T
  },
  PropsOf<T>
>

export type PropsWithNative<
  TAs extends React.ReactElement | React.ComponentType<any> = React.ElementType<HTMLImageElement>
> = Assign<Props<TAs>, React.ImgHTMLAttributes<any>>

const defaultProps = {
  disableSkeleton: false,
  disableAutoResize: false,
  className: '',
  scale: '100%',
  maxDelay: 3000,
}

const Image = <T extends React.ReactElement | React.ComponentType<any>>({
  src,
  width,
  height,
  disableSkeleton,
  className,
  scale,
  maxDelay,
  disableAutoResize,
  component,
  ...props
}: PropsWithNative<T>) => {
  const showAnimation = !disableSkeleton && width && height
  const w = width ? `${width}px` : 'auto'
  const h = height ? `${height}px` : 'auto'

  const theme = useTheme()
  const [loading, setLoading] = useState<boolean>(true)
  const [showSkeleton, setShowSkeleton] = useState<boolean>(true)
  const [zoomHeight, setZoomHeight, zoomHeightRef] = useCurrentState<string>(h)
  const imageRef = useRef<HTMLImageElement>(null)
  const [shape, updateShape] = useRealShape(imageRef)
  const Component = (component ? component : 'img') as any

  const imageLoaded = () => {
    if (!showAnimation) return
    setLoading(false)
  }

  useEffect(() => {
    if (!showAnimation) return
    if (!imageRef.current) return
    if (imageRef.current.complete) {
      setLoading(false)
      setShowSkeleton(false)
    }
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      if (showAnimation) {
        setShowSkeleton(false)
      }
      clearTimeout(timer)
    }, maxDelay)
    return () => clearTimeout(timer)
  }, [loading])

  /**
   * On mobile devices, the render witdth may be less than CSS width value.
   * If the image is scaled, set the height manually.
   * This is to ensure the aspect ratio of the image.
   *
   * If the image is auto width, ignore all.
   */
  useEffect(() => {
    if (disableAutoResize) return
    const notLoaded = shape.width === 0
    const isAutoZoom = zoomHeightRef.current === 'auto'
    if (notLoaded || !width || !height) return
    if (shape.width < width) {
      !isAutoZoom && setZoomHeight('auto')
    } else {
      isAutoZoom && setZoomHeight(h)
    }
  }, [shape, width])

  useResize(() => {
    if (disableAutoResize) return
    updateShape()
  })

  return (
    <div className={`image ${className}`}>
      {showSkeleton && showAnimation && <ImageSkeleton opacity={loading ? 0.5 : 0} />}
      <Component
        ref={imageRef}
        width={width}
        height={height}
        onLoad={imageLoaded}
        src={src}
        {...props}
      />
      <style jsx>{`
        .image {
          width: ${w};
          height: ${zoomHeight};
          margin: 0 auto;
          position: relative;
          border-radius: ${theme.layout.radius};
          overflow: hidden;
          max-width: 100%;
        }

        img {
          width: ${scale};
          height: ${scale};
          object-fit: scale-down;
          display: block;
        }
      `}</style>
    </div>
  )
}

type GeistUIImage = typeof Image & {
  Browser: typeof ImageBrowser
}
Image.defaultProps = defaultProps

export default Image as GeistUIImage
