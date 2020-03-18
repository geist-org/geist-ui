import React, { useEffect, useRef, useState } from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'
import ImageSkeleton from './image.skeleton'

interface Props {
  src: string,
  animation: boolean
  width?: number
  height?: number
  className?: string
}

const defaultProps = {
  animation: true,
  className: '',
}

export type ImageProps = Props & typeof defaultProps & React.ImgHTMLAttributes<any>

const Image: React.FC<ImageProps> = React.memo(({
  src, width, height, animation, className, ...props
}) => {
  const showAnimation = animation && width && height
  const theme = useTheme()
  const [loading, setLoading] = useState<boolean>(true)
  const [showSkeleton, setShowSkeleton] = useState<boolean>(true)
  const imageRef = useRef<HTMLImageElement>(null)
  const w = width ? `${width}px` : 'auto'
  const h = height ? `${height}px` : 'auto'
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
    }, 300)
    return () => clearTimeout(timer)
  }, [loading])
  
  return (
    <div className={`image ${className}`}>
      {(showSkeleton && showAnimation) && <ImageSkeleton opacity={loading ? .5 : 0} />}
      <img ref={imageRef} onLoad={imageLoaded} src={src} {...props} />
      <style jsx>{`
        .image {
          width: ${w};
          height: ${h};
          margin: 0 auto;
          position: relative;
          border-radius: ${theme.layout.radius};
          overflow: hidden;
        }
        
        img {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  )
})

export default withDefaults(Image, defaultProps)
