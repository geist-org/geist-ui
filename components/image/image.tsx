import React, { useEffect, useRef, useState } from 'react'
import useTheme from '../use-theme'
import ImageSkeleton from './image.skeleton'
import useScaleable, { withScaleable } from '../use-scaleable'

interface Props {
  src: string
  disableSkeleton?: boolean
  className?: string
  maxDelay?: number
}

const defaultProps = {
  disableSkeleton: false,
  className: '',
  maxDelay: 3000,
}

type NativeAttrs = Omit<React.ImgHTMLAttributes<any>, keyof Props>
export type ImageProps = Props & NativeAttrs

const ImageComponent: React.FC<ImageProps> = ({
  src,
  disableSkeleton,
  className,
  maxDelay,
  ...props
}: ImageProps & typeof defaultProps) => {
  const { SCALES, getScaleableProps } = useScaleable()
  const width = getScaleableProps(['width', 'w'])
  const height = getScaleableProps(['height', 'h'])
  const showAnimation = !disableSkeleton && width && height

  const theme = useTheme()
  const [loading, setLoading] = useState<boolean>(true)
  const [showSkeleton, setShowSkeleton] = useState<boolean>(true)
  const imageRef = useRef<HTMLImageElement>(null)

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

  return (
    <div className={`image ${className}`}>
      {showSkeleton && showAnimation && <ImageSkeleton opacity={loading ? 0.5 : 0} />}
      <img ref={imageRef} onLoad={imageLoaded} src={src} {...props} />
      <style jsx>{`
        .image {
          position: relative;
          border-radius: ${theme.layout.radius};
          overflow: hidden;
          max-width: 100%;
          width: ${SCALES.width(1, 'auto')};
          height: ${SCALES.height(1, 'auto')};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0, 'auto')} ${SCALES.mb(0)}
            ${SCALES.ml(0, 'auto')};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
        }

        img {
          width: ${SCALES.width(1, 'auto')};
          height: ${SCALES.height(1, 'auto')};
          object-fit: scale-down;
          display: block;
        }
      `}</style>
    </div>
  )
}

ImageComponent.defaultProps = defaultProps
ImageComponent.displayName = 'GeistImage'
const Image = withScaleable(ImageComponent)
export default Image
